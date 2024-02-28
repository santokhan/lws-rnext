import { z } from "zod";

export const ArticleSchema = z.object({
    source: z.object({ id: z.string().nullable(), name: z.string() }),
    author: z.string().nullable(),
    title: z.string(),
    description: z.string().nullable(),
    url: z.string(),
    urlToImage: z.string().nullable(),
    publishedAt: z.date(),
    content: z.string().nullable(),
});

export const ArticleListSchema = z.array(ArticleSchema);

export type ArticleListSchemaType = z.infer<typeof ArticleListSchema>;