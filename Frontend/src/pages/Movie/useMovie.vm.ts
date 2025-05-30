import { useGetMovie } from "@/hooks/useGetMovie";
import { useState } from "react";

export type EventWithBackground = {
        background: string;
        id: string;
        title: string;
        description: string;
        start: string;
        end: string;
        availableSeats: number;
        price: number;
}

export const useMovieVm = () => {
    const {data, isLoading, isError} = useGetMovie();

    const [selectedEvent, setSelectedEvent] = useState<EventWithBackground>();

    const handleEventClick = (eventInfo: any) => {
        const { id } = eventInfo.event;
        if(!data){
            return;
        }
        
        const chosenEvent =  data.events.find(item => item.id === id);

        if(!chosenEvent){
            return; 
        }

        const event = {...chosenEvent, background: data.background};

        setSelectedEvent(event);
        };
    

    const handleCloseModal = () => {
        setSelectedEvent(undefined);
    }

    return {
        data,
        isError,
        isLoading,
        selectedEvent,
        handleEventClick,
        handleCloseModal,
    }
}