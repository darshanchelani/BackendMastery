import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";
import { buildErrorEnvelope } from "../utils/response";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json(buildErrorEnvelope(err.message, { code: err.code, details: err.details }));
  }

  if (err instanceof ZodError) {
    const details = err.issues.map((issue) => ({
      field: issue.path.join(".") || "root",
      message: issue.message
    }));

    return res
      .status(400)
      .json(buildErrorEnvelope("Validation failed", { code: "VALIDATION_ERROR", details }));
  }

  logger.error("Unhandled error", { err });

  return res
    .status(500)
    .json(buildErrorEnvelope("Internal server error", { code: "INTERNAL_SERVER_ERROR" }));
};
