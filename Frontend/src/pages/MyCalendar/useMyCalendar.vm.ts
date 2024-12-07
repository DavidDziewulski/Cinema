
import { Reservation } from "@/api/types/Reservation";
import { useGetReservation } from "@/hooks/useGetReservation";
import { useState } from "react";

export const useMyCalendarVm = () => {
    const {data, isLoading, isError} = useGetReservation();

    const [selectedEvent, setSelectedEvent] = useState<Reservation>();

    const handleEventClick = (eventInfo: any) => {
        const { id } = eventInfo.event;

        if(!data){
            return;
        }
        
        const chosenEvent =  data.find(item => item.id === id);

        if(!chosenEvent){
            return; 
        }

        setSelectedEvent(chosenEvent);
        };
    
    const events = data?.map(item => ({
        ...item,
        start: item.event.start,
        end: item.event.end,
    })) ?? [];

    const handleCloseModal = () => {
        setSelectedEvent(undefined);
    }

    return {
        data,
        events,
        isError,
        isLoading,
        selectedEvent,
        handleEventClick,
        handleCloseModal,
    }
}