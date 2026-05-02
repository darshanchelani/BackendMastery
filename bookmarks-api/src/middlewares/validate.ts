import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, type ZodTypeAny } from "zod";
import { AppError } from "../errors/AppError";

type ValidationSource = "body" | "params" | "query";

const formatZodDetails = (error: ZodError): Array<{ field: string; message: string }> => {
  return error.issues.map((issue) => ({
    field: issue.path.join(".") || "root",
    message: issue.message
  }));
};

export const validate = (schema: ZodTypeAny, source: ValidationSource): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return next(
        new AppError(400, "Validation failed", {
          code: "VALIDATION_ERROR",
          details: formatZodDetails(result.error)
        })
      );
    }

    req[source] = result.data;
    return next();
  };
};
