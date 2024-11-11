import { z } from 'zod';

export const MovieSchema = z.object({
    id: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
    background: z.string(),
});

export const MoviesSchema = z.array(MovieSchema);

export type Movie = z.infer<typeof MovieSchema>;
export type Movies = Movie[];