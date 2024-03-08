import { z } from "zod";
import { authorSchema } from "./author";

// Define schema for comment
export const commentSchema = z.object({
    id: z.string(),
    content: z.string(),
    author: authorSchema,
}).optional();

export type CommentType = z.infer<typeof commentSchema>;