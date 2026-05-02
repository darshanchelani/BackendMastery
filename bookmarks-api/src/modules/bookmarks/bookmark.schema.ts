import { z } from "zod";

const nonEmptyTrimmedString = z.string().trim().min(1, "Must not be empty");

export const bookmarkIdParamSchema = z
  .object({
    id: z.string().uuid("Bookmark id must be a valid UUID")
  })
  .strict();

export const createBookmarkBodySchema = z
  .object({
    url: z.string().url("url must be a valid URL"),
    title: z.string().trim().min(1).max(200),
    tags: z.array(nonEmptyTrimmedString).optional().default([])
  })
  .strict();

export const updateBookmarkBodySchema = z
  .object({
    url: z.string().url("url must be a valid URL").optional(),
    title: z.string().trim().min(1).max(200).optional(),
    tags: z.array(nonEmptyTrimmedString).optional()
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided for update"
  });

export type CreateBookmarkBody = z.infer<typeof createBookmarkBodySchema>;
export type UpdateBookmarkBody = z.infer<typeof updateBookmarkBodySchema>;
export type BookmarkIdParam = z.infer<typeof bookmarkIdParamSchema>;
