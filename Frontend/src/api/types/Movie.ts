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
    events: z.object({
        id: z.string(),
        title: z.string(),
        start: z.string(),
        end: z.string(),
        availableSeats: z.number(),
        price: z.number(),
        description: z.string(),
    }).array()
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
export type Event = z.infer<typeof MovieSchema>['events'][0]