import type { Response } from "express";
import type { ApiEnvelope, ApiErrorBody } from "../types/api";

const now = (): string => new Date().toISOString();

export const buildSuccessEnvelope = <T>(message: string, data: T): ApiEnvelope<T> => ({
  success: true,
  message,
  data,
  timestamp: now()
});

export const buildErrorEnvelope = (
  message: string,
  error: ApiErrorBody,
  data: null = null
): ApiEnvelope<null> => ({
  success: false,
  message,
  error,
  data,
  timestamp: now()
});

export const sendSuccess = <T>(res: Response, statusCode: number, message: string, data: T): Response => {
  return res.status(statusCode).json(buildSuccessEnvelope(message, data));
};
