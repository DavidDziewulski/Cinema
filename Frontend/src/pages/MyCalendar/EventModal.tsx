import { Reservation } from "@/api/types/Reservation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRemoveReservation } from "@/hooks/useRemoveReservation";
import { useUpdateReservation } from "@/hooks/useUpdateReservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const reservationSchema = (availableSeats: number) =>
  z.object({
    numberOfTickets: z
      .number()
      .min(1, "Przynajmniej jeden bilet wymagany")
      .max(
        availableSeats,
        `Możesz zarezerwować maksymalnie ${availableSeats} biletów`
      )
      .positive("Liczba musi być dodatnia")
      .int("Liczba musi być całkowita")
      .refine(
        (value) => value <= availableSeats,
        "Nie można zarezerwować więcej biletów niż jest dostępne"
      ),
  });

type ReservationFormInputs = {
  numberOfTickets: number;
};

type Props = {
  reservation: Reservation;
  handleCloseModal: () => void;
};

export const EventModal = ({ reservation, handleCloseModal }: Props) => {
  const { mutate } = useUpdateReservation(handleCloseModal);

  const { mutate: removeReservation } = useRemoveReservation(handleCloseModal);

  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ReservationFormInputs>({
    resolver: zodResolver(
      reservationSchema(reservation.event.availableSeats + reservation.amount)
    ),
    defaultValues: {
      numberOfTickets: reservation.amount,
    },
  });

  const onSubmit = (data: ReservationFormInputs) => {
    mutate({ id: reservation.id, amount: data.numberOfTickets });
  };

  const handleRemoveReservation = () => {
    removeReservation(reservation.id);
  };

  const editForm = isEdit && (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="numberOfTickets" className="block font-medium text-white">
          Liczba biletów które chcę zarezerwować:
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
      <div className="flex gap-3">
        <Button
          type="button"
          className="w-full bg-red-700 hover:bg-red-600 text-white"
          onClick={() => {
            setIsEdit((prev) => !prev);
            reset();
          }}
        >
          Anuluj zmiany
        </Button>
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 text-white"
          disabled={!isValid}
        >
          Zapisz zmiany
        </Button>
      </div>
    </form>
  );
  
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[0.8px] z-50">
        <div className=" p-6 rounded-lg shadow-lg w-full bg-black/50  max-w-lg h-auto relative flex flex-col space-y-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{reservation.title}</h2>
            <Button variant="ghost" onClick={handleCloseModal} className="text-white">
              X
            </Button>
          </div>
          <div className="mb-4">
            <img
              src={reservation.background}
              alt={reservation.title}
              className="w-full h-32 object-cover rounded"
            />
          </div>
          <p className="text-gray-300 mb-4">{reservation.description}</p>
          <p className="text-gray-300">
            Liczba dostępnych biletów: {reservation.event.availableSeats}
          </p>
          <p className="text-gray-300">
            Liczba zarezerwowanych biletów przez Ciebie: {reservation.amount}
          </p>
          {!isEdit && (
            <>
              <div className="flex gap-3">
                <Button
                  onClick={handleRemoveReservation}
                  type="button"
                  className="w-full bg-red-700 hover:bg-red-600 text-white"
                >
                  Anuluj rezerwacje
                </Button>
                <Button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  Edytuj rezerwacje
                </Button>
              </div>
            </>
          )}
          {editForm}
        </div>
      </div>
    </div>
  );  
};
