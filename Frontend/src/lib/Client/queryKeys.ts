export const queryKeys = {
  getMovies: (title: string) => ["movies", title],
  getMovie: (id: string) => ["movie", id],
  getReservations: () => ["reservations"],
  updateReservation: (id: string) => ["reservation", id],
} as const;
