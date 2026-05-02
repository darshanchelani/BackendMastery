import express, { type Request, type Response } from "express";
import { AppError } from "./errors/AppError";
import { errorHandler } from "./middlewares/errorHandler";
import { bookmarksRouter } from "./modules/bookmarks/bookmarks.routes";
import { sendSuccess } from "./utils/response";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    return sendSuccess(res, 200, "OK", {});
  });

  app.use("/api/bookmarks", bookmarksRouter);

  app.use((req: Request, _res: Response, next) => {
    next(
      new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`, {
        code: "ROUTE_NOT_FOUND"
      })
    );
  });

  app.use(errorHandler);

  return app;
};
