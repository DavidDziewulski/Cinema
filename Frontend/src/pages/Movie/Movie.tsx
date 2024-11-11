import { ErrorDisplay } from '@/components/error-display';
import { Spinner } from '@/components/spinner';
import { Card } from '@/components/ui/card';
import { Header } from '@/partials/header/Header';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';
import { useMovieVm } from './useMovie.vm';

type EventData = {
    id: string;
    title: string;
    start: string;
    end: string;
    availableSeats: number;
    price: number;
    description: string;
};

const sampleEvents = [
    {
        id: '1',
        title: 'Sala 1',
        start: '2024-11-27T12:00:00',
        end: '2024-11-27T14:00:00',
        availableSeats: 50,
        price: 20,
        description: 'Film animowany dla całej rodziny. Przyjdź i baw się dobrze!', // Dodano opis
    },
    {
        id: '2',
        title: 'Sala 2',
        start: '2024-11-28T15:00:00',
        end: '2024-11-28T17:00:00',
        availableSeats: 30,
        price: 20,
        description: 'Drugi seans, świetna komedia, która rozśmieszy każdego!', // Dodano opis
    },
    // Dodaj więcej wydarzeń według potrzeb
];
export const Movie = () => {
    const vm = useMovieVm();

    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

    if (vm.isLoading) {
        return <Spinner />;
    }

    if (vm.isError) {
        return <ErrorDisplay error={'Problem z pobraniem informacji o filmie'} />;
    }

    if (!vm.data) {
        return <h1> Nie ma takiego filmu</h1>;
    }

        // Funkcja wywoływana po kliknięciu na zdarzenie
        const handleEventClick = (eventInfo: any) => {
            const { id, title, extendedProps, startStr, endStr } = eventInfo.event;
            setSelectedEvent({
                id: id as string,
                title: title || '',
                start: startStr,
                end: endStr,
                availableSeats: extendedProps.availableSeats,
                price: extendedProps.price,
                description: extendedProps.description,
            });
        };
    
        // Funkcja zamykająca modal
        const closeModal = () => {
            setSelectedEvent(null);
        };

        const renderEventContent = (eventInfo: any) => {
            return (
                <div className="p-2 bg-black bg-opacity-80 text-gray-200 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="text-lg font-semibold">
                        {eventInfo.timeText}
                    </div>
                    <div className="text-sm font-medium">
                        {eventInfo.event.title}
                    </div>
                    <div className="text-xs text-gray-400">
                        {eventInfo.event.extendedProps.description}
                    </div>
                </div>
            );
        };

    return (
        <div className="w-4/5 mx-auto min-h-screen">
            <Header isSearch={false} />
            <div className="flex flex-col mt-8">
            <Card className="flex flex-col md:flex-row bg-black bg-opacity-80 p-6 shadow-lg">
                    {/* Obraz filmu */}
                    <div
                        className="w-full md:w-1/4 h-64 md:h-auto bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${vm.data.background})` }}
                    />

                    {/* Informacje o filmie */}
                    <div className="flex flex-col justify-start p-6 md:w-3/4 space-y-4">
                        <h3 className="text-4xl font-bold text-white mb-2">{vm.data.title}</h3>
                        <p className="text-lg text-gray-300 mb-4">{vm.data.description}</p>

                        {/* Informacje dodatkowe */}
                        <div className="grid grid-cols-2 gap-4 text-gray-400">
                            <div>
                                <h4 className="text-sm font-semibold">Data premiery</h4>
                                <p className="text-sm">{vm.data.releaseDate || "29 lis 2024"}</p> {/* Data premiery */}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold">Reżyseria</h4>
                                <p className="text-sm">{vm.data.director || "David G. Derrick Jr."}</p> {/* Reżyser */}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold">Czas</h4>
                                <p className="text-sm">{vm.data.duration || "1 godz. 40 min."}</p> {/* Czas trwania */}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold">Obsada</h4>
                                <p className="text-sm">{vm.data.cast || "Dwayne Johnson, Auli'i Cravalho"}</p> {/* Obsada */}
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="p-4 rounded-lg shadow-lg mt-6">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="timeGridWeek"
                        events={sampleEvents}
                        eventClick={handleEventClick}
                        eventContent={renderEventContent}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        buttonText={{
                            today: 'Dzisiaj',
                            month: 'Miesiąc',
                            week: 'Tydzień',
                            day: 'Dzień',
                        }}
                        themeSystem="standard"
                        height="auto"
                    />
                </div>
            </div>
        </div>
    );
};
