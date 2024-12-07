import { ReservationSchema } from "@/api/types/Reservation";
import { request } from "@/lib/Client/apiClient";
import { queryKeys } from "@/lib/Client/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetReservation = () => {
  const query = useQuery({
    queryKey: queryKeys.getReservations(),
    queryFn: () =>
      request({
        url: `reservation`,
        method: "GET",
        schema: ReservationSchema,
        onError: (error) => {
          console.log({ error });
        },
      }),
  });

  return {
    ...query,
  };
};
