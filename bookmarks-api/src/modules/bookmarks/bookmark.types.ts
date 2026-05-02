export interface Bookmark {
  id: string;
  url: string;
  title: string;
  tags: string[];
  createdAt: string;
}

export type CreateBookmarkInput = Omit<Bookmark, "id" | "createdAt">;

export type UpdateBookmarkInput = Partial<Pick<Bookmark, "url" | "title" | "tags">>;
