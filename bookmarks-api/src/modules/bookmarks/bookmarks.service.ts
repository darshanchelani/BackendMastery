import { randomUUID } from "crypto";
import { AppError } from "../../errors/AppError";
import type { IBookmarksRepository } from "./bookmarks.repository.interface";
import type { Bookmark, CreateBookmarkInput, UpdateBookmarkInput } from "./bookmark.types";

export class BookmarksService {
  constructor(private readonly repository: IBookmarksRepository) {}

  listBookmarks(): Bookmark[] {
    return this.repository.findAll();
  }

  getBookmarkById(id: string): Bookmark {
    const bookmark = this.repository.findById(id);

    if (!bookmark) {
      throw new AppError(404, "Bookmark not found", { code: "BOOKMARK_NOT_FOUND" });
    }

    return bookmark;
  }

  createBookmark(input: CreateBookmarkInput): Bookmark {
    const bookmark: Bookmark = {
      id: randomUUID(),
      url: input.url,
      title: input.title,
      tags: input.tags ?? [],
      createdAt: new Date().toISOString()
    };

    return this.repository.create(bookmark);
  }

  updateBookmark(id: string, input: UpdateBookmarkInput): Bookmark {
    const existing = this.repository.findById(id);

    if (!existing) {
      throw new AppError(404, "Bookmark not found", { code: "BOOKMARK_NOT_FOUND" });
    }

    const updated: Bookmark = {
      ...existing,
      ...input
    };

    return this.repository.update(id, updated);
  }

  deleteBookmark(id: string): void {
    const deleted = this.repository.delete(id);

    if (!deleted) {
      throw new AppError(404, "Bookmark not found", { code: "BOOKMARK_NOT_FOUND" });
    }
  }
}
