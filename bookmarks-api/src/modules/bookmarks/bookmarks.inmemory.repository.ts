import type { IBookmarksRepository } from "./bookmarks.repository.interface";
import type { Bookmark } from "./bookmark.types";

export class InMemoryBookmarksRepository implements IBookmarksRepository {
  private readonly storage = new Map<string, Bookmark>();

  findAll(): Bookmark[] {
    return Array.from(this.storage.values());
  }

  findById(id: string): Bookmark | null {
    return this.storage.get(id) ?? null;
  }

  create(bookmark: Bookmark): Bookmark {
    this.storage.set(bookmark.id, bookmark);
    return bookmark;
  }

  update(id: string, bookmark: Bookmark): Bookmark {
    this.storage.set(id, bookmark);
    return bookmark;
  }

  delete(id: string): boolean {
    return this.storage.delete(id);
  }
}
