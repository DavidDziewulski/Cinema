import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { useBookReservation } from "@/hooks/useBookTickets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EventWithBackground } from "./useMovie.vm";

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
  event: EventWithBackground;
  handleCloseModal: () => void;
};

export const ReservationModal = ({ event, handleCloseModal }: Props) => {
  const { mutate } = useBookReservation();
console.log(event.availableSeats)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReservationFormInputs>({
    resolver: zodResolver(reservationSchema(event.availableSeats)),
    defaultValues: {
      numberOfTickets: 1,
    },
  });

  const onSubmit = (data: ReservationFormInputs) => {
    mutate(
      { eventId: event.id, amount: data.numberOfTickets },
      { onSuccess: () =>  handleCloseModal() }
    );
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[5px] z-50">
        <div className=" p-6 rounded-lg shadow-lg w-full max-w-lg h-auto bg-black/50 relative flex flex-col space-y-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <Button variant="ghost" onClick={handleCloseModal} className="text-white">
              X
            </Button>
          </div>
          <div className="mb-4">
            <img
              src={event.background}
              alt={event.title}
              className="w-full h-32 object-cover rounded"
            />
          </div>
          <p className="text-gray-300 mb-4">{event.description}</p>
          <p className="text-gray-300">Liczba dostępnych biletów: {event.availableSeats}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="numberOfTickets" className="block font-medium text-white">
                Liczba biletów
              </label>
              <Input
                type="number"
                id="numberOfTickets"
                {...register("numberOfTickets", { valueAsNumber: true })}
                className="mt-1 block w-ful"
              />
              {errors.numberOfTickets && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.numberOfTickets.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-600" disabled={!isValid}>
              Zarezerwuj
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
