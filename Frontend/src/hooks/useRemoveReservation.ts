import { request } from "@/lib/Client/apiClient";
import { queryKeys } from "@/lib/Client/queryKeys";
import { queryClient } from "@/lib/queryClient/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";

const ResponseValidationSchema = z.string();

export const useRemoveReservation = (handleCloseModal: () => void) => {
  return useMutation({
    mutationFn: (id: string) =>
      request({
        url: `/reservation/${id}`,
        method: 'DELETE',
        schema: ResponseValidationSchema,
      }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: queryKeys.getReservations(),
      });

      handleCloseModal();

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
    },
  });
};
