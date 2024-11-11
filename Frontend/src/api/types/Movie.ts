import { z } from 'zod';

export const MovieSchema = z.object({
    id: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
    releaseDate: z.string(),
    director: z.string(),
    duration: z.string(),
    cast: z.string(),
    background: z.string(),
});

export const MoviesSchema = z.object({
    id: z.string(),
    authorName: z.string(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
    background: z.string(),
}).array();

export type Movie = z.infer<typeof MovieSchema>;
export type Movies = z.infer<typeof MovieSchema>[]