import { z } from "zod";

export const ReservationSchema = z.object({
  id: z.string(),
  amount: z.number(),
  title: z.string(),
  description: z.string(),
  background: z.string(),
  event: z.object({
    id: z.string(),
    title: z.string(),
    start: z.string(),
    end: z.string(),
    availableSeats: z.number(),
    price: z.number(),
    description: z.string(),
  }),
}).array();

export type Reservations = z.infer<typeof ReservationSchema>;
export type Reservation = z.infer<typeof ReservationSchema>[0]