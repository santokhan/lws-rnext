import { z } from "zod";

// Define schema for author
export const authorSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    avatar: z.string().nullable(),
});

export type AuthSchema = z.infer<typeof authorSchema>;