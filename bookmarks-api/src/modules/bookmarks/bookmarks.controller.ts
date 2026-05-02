import type { Request, Response } from "express";
import type {
  BookmarkIdParam,
  CreateBookmarkBody,
  UpdateBookmarkBody
} from "./bookmark.schema";
import { sendSuccess } from "../../utils/response";
import { BookmarksService } from "./bookmarks.service";

export class BookmarksController {
  constructor(private readonly service: BookmarksService) {}

  listBookmarks = (_req: Request, res: Response): Response => {
    const bookmarks = this.service.listBookmarks();
    return sendSuccess(res, 200, "Bookmarks fetched successfully", bookmarks);
  };

  getBookmark = (req: Request, res: Response): Response => {
    const { id } = req.params as BookmarkIdParam;
    const bookmark = this.service.getBookmarkById(id);
    return sendSuccess(res, 200, "Bookmark fetched successfully", bookmark);
  };

  createBookmark = (req: Request, res: Response): Response => {
    const payload = req.body as CreateBookmarkBody;
    const created = this.service.createBookmark(payload);
    return sendSuccess(res, 201, "Bookmark created successfully", created);
  };

  updateBookmark = (req: Request, res: Response): Response => {
    const { id } = req.params as BookmarkIdParam;
    const payload = req.body as UpdateBookmarkBody;
    const updated = this.service.updateBookmark(id, payload);
    return sendSuccess(res, 200, "Bookmark updated successfully", updated);
  };

  deleteBookmark = (req: Request, res: Response): Response => {
    const { id } = req.params as BookmarkIdParam;
    this.service.deleteBookmark(id);
    return sendSuccess(res, 200, "Deleted", null);
  };
}
