import { Event } from "@/api/types/Movie";
import { Button } from "@/components/ui/button"; // Upewnij się, że masz komponent Button z shadcn/ui
import { Input } from "@/components/ui/input"; // Komponent Input z shadcn/ui
import { useBokkTickets } from "@/hooks/useBookTickets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";


const reservationSchema = (availableSeats: number) =>
  z.object({
    numberOfTickets: z
      .number()
      .min(1, "Przynajmniej jeden bilet wymagany")
      .max(availableSeats, `Możesz zarezerwować maksymalnie ${availableSeats} biletów`)
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
  event: Event;
  handleCloseModal: () => void;
};

export const ReservationModal = ({ event, handleCloseModal }: Props) => {
  const  { mutate, status } = useBokkTickets();

  useEffect(() => {
    if (status === "success") {
      toast.success("✅ Rezerwacja udana!", {
        style: {
          backgroundColor: "#28a745",
          color: "#fff", 
        },
      });
      handleCloseModal();
    } else if (status === "error") {
      toast.error("❌ Wystąpił błąd podczas rezerwacji.", {
        style: {
          backgroundColor: "#dc3545", 
          color: "#fff", 
        },
      });
    } else if (status === "pending") {
      toast.info("⏳ Rezerwacja w toku...", {
        style: {
          backgroundColor: "#17a2b8", 
          color: "#fff", 
        },
      });
    }
  }, [status]);

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
     mutate({eventId:event.id, amount: data.numberOfTickets})
  };


  return (
    <div>
      
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto relative flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <Button variant="ghost" onClick={handleCloseModal}>
                X
              </Button>
              
            </div>
            <div className="mb-4">
              <img src={event.background} alt={event.title} className="w-full h-32 object-cover rounded" />
            </div>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <p>Liczba dostępnych biletów: {event.availableSeats}</p>
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
