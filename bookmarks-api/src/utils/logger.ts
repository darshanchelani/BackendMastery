type LogLevel = "INFO" | "WARN" | "ERROR";

const formatMessage = (level: LogLevel, message: string, meta?: unknown): string => {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    meta: meta ?? null
  };

  return JSON.stringify(payload);
};

export const logger = {
  info(message: string, meta?: unknown): void {
    console.log(formatMessage("INFO", message, meta));
  },

  warn(message: string, meta?: unknown): void {
    console.warn(formatMessage("WARN", message, meta));
  },

  error(message: string, meta?: unknown): void {
    console.error(formatMessage("ERROR", message, meta));
  }
};
