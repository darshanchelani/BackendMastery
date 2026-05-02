import type { Bookmark } from "./bookmark.types";

export interface IBookmarksRepository {
  findAll(): Bookmark[];
  findById(id: string): Bookmark | null;
  create(bookmark: Bookmark): Bookmark;
  update(id: string, bookmark: Bookmark): Bookmark;
  delete(id: string): boolean;
}
