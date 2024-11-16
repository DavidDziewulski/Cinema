import { Button } from "@/components/ui/button"; // Upewnij się, że masz komponent Button z shadcn/ui
import { Input } from "@/components/ui/input"; // Komponent Input z shadcn/ui
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const reservationSchema = z.object({
  numberOfTickets: z
    .number()
    .min(1, "Przynajmniej jeden bilet wymagany")
    .max(10, "You can only book up to 10 tickets")
    .positive("The number must be positive")
    .int("The number must be an integer"),
});

type ReservationFormInputs = z.infer<typeof reservationSchema>;

type Props = {
  title: string;
  description: string;
  picture: string;
  handleCloseModal: () => void;
};

export const ReservationModal = ({ title, description, picture, handleCloseModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReservationFormInputs>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      numberOfTickets: 1,
    },
  });

  const onSubmit = (data: ReservationFormInputs) => {
    console.log("Booking Data:", data);
    handleCloseModal();
  };

  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto relative flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{title}</h2>
              <Button variant="ghost" onClick={handleCloseModal}>
                X
              </Button>
            </div>
            <div className="mb-4">
              <img src={picture} alt={title} className="w-full h-32 object-cover rounded" />
            </div>
            <p className="text-gray-700 mb-4">{description}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="numberOfTickets" className="block font-medium">
                  Liczba biletów
                </label>
                <Input
                  type="number"
                  id="numberOfTickets"
                  {...register("numberOfTickets", { valueAsNumber: true })}
                  className="mt-1 block w-full"
                />
                {errors.numberOfTickets && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.numberOfTickets.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={!isValid}>
                Zarezerwuj
              </Button>
            </form>
          </div>
        </div>
    </div>
  );
};
