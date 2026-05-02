import { env } from "./config/env";
import { logger } from "./utils/logger";
import { createApp } from "./app";

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`Bookmarks API listening on port ${env.PORT}`, { env: env.NODE_ENV });
});

const gracefulShutdown = (reason: string): void => {
  logger.warn("Shutdown signal received", { reason });

  server.close((closeError) => {
    if (closeError) {
      logger.error("Error while closing server", { closeError });
      process.exit(1);
    }

    logger.info("HTTP server closed cleanly");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Force shutdown after timeout");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled promise rejection", { reason });
  gracefulShutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception", { error });
  gracefulShutdown("uncaughtException");
});
