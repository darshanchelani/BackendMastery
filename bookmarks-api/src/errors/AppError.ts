export interface AppErrorOptions {
  code?: string;
  details?: Array<{ field: string; message: string }>;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string;
  public readonly details?: Array<{ field: string; message: string }>;

  constructor(statusCode: number, message: string, options: AppErrorOptions = {}) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = options.isOperational ?? true;
    this.code = options.code ?? "APP_ERROR";
    this.details = options.details;
    Error.captureStackTrace(this, this.constructor);
  }
}
