import { z } from 'zod';

export const MovieSchema = z.object({
    id: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
});

export type Movie = z.infer<typeof MovieSchema>;