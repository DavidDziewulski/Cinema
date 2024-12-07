
import { request } from "@/lib/Client/apiClient";
import { paths } from "@/router/Router";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useStore } from "./useStore";

const ResponseValidationSchema = z.object({
  token: z.string(),
  expiration: z.string(),
  refreshToken: z.string(),
});

type InputData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();

  const { saveToken } = useStore();

  return useMutation({
    mutationFn: (input: InputData) => {
      return request({
        url: `/auth/login`,
        method: "post",
        schema: ResponseValidationSchema,
        data: input,
      });
    },
    onSuccess: (data) => {
      // Obsługa tokena
      const { token, expiration, refreshToken } = data;

      saveToken(token, expiration, refreshToken);

      toast.success("Pomyślnie zostałeś zalogowany do systemu");

      // Przekierowanie na stronę główną lub inną
      navigate(paths.home);
    },
    onError: () => {
      toast.error("Nie udało się zalogować do systemu");
    },
  });
};
