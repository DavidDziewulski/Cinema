import { request } from "@/lib/Client/apiClient";
import { queryKeys } from "@/lib/Client/queryKeys";
import { queryClient } from "@/lib/queryClient/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const ResponseValidationSchema = z.string();

type InputData = {
  eventId: string;
  amount: number;
};

export const useBookReservation = () => {
  const { id } = useParams<{ id: string }>();

  return useMutation({
    mutationFn: (input: InputData) =>
      request({
        url: `/reservation`,
        method: "post",
        schema: ResponseValidationSchema,
        data: input,
      }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: queryKeys.getMovie(id ?? "0"),
      });

      toast.success("✅ Rezerwacja udana!", {
        style: {
          backgroundColor: "#28a745",
          color: "#fff",
        },
      });
    },
    onError: () => {
        toast.error("❌ Wystąpił błąd podczas rezerwacji.", {
            style: {
              backgroundColor: "#dc3545", 
              color: "#fff", 
            },
          });
    },
    onSettled: () => {
        toast.info("⏳ Rezerwacja w toku...", {
            style: {
              backgroundColor: "#17a2b8", 
              color: "#fff", 
            },
          });
    }
  });
};
