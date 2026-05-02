import { Router } from "express";
import { validate } from "../../middlewares/validate";
import {
  bookmarkIdParamSchema,
  createBookmarkBodySchema,
  updateBookmarkBodySchema
} from "./bookmark.schema";
import { BookmarksController } from "./bookmarks.controller";
import { BookmarksService } from "./bookmarks.service";
import { InMemoryBookmarksRepository } from "./bookmarks.inmemory.repository";

const repository = new InMemoryBookmarksRepository();
const service = new BookmarksService(repository);
const controller = new BookmarksController(service);

export const bookmarksRouter = Router();

bookmarksRouter.get("/", controller.listBookmarks);
bookmarksRouter.get("/:id", validate(bookmarkIdParamSchema, "params"), controller.getBookmark);
bookmarksRouter.post("/", validate(createBookmarkBodySchema, "body"), controller.createBookmark);
bookmarksRouter.put(
  "/:id",
  validate(bookmarkIdParamSchema, "params"),
  validate(updateBookmarkBodySchema, "body"),
  controller.updateBookmark
);
bookmarksRouter.delete("/:id", validate(bookmarkIdParamSchema, "params"), controller.deleteBookmark);
