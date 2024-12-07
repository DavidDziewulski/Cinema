import { ErrorDisplay } from "@/components/error-display";
import { Spinner } from "@/components/spinner";
import { truncateText } from "@/lib/utils";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventModal } from "./EventModal";
import { useMyCalendarVm } from "./useMyCalendar.vm";

export const MyCalendar = () => {
  const vm = useMyCalendarVm();

  if (vm.isLoading) {
    return <Spinner />;
  }

  if (vm.isError) {
    return (
      <ErrorDisplay
        error={"Problem z pobraniem informacji o twoim kalendarzu"}
      />
    );
  }

  if (!vm.data) {
    return <h1> Nie mozemy pobrać informacji odnośńie Twojego kalendarza</h1>;
  }

  const renderEventContent = (eventInfo: any) => {
    return (
      <div className="p-2 bg-black bg-opacity-80 text-gray-200 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="text-sm font-medium">{eventInfo.event.title}</div>
        <div className="text-xs text-gray-400">
          {truncateText(eventInfo.event.extendedProps.description, 40)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <div className="flex flex-col mt-8">
        {vm.selectedEvent && (
          <EventModal
            reservation={vm.selectedEvent}
            handleCloseModal={vm.handleCloseModal}
          />
        )}
        <div className="p-4 rounded-lg shadow-lg mt-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            events={vm.events}
            eventClick={vm.handleEventClick}
            eventContent={renderEventContent}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            buttonText={{
              today: "Dzisiaj",
              month: "Miesiąc",
              week: "Tydzień",
              day: "Dzień",
            }}
            themeSystem="standard"
            height="auto"
          />
        </div>
      </div>
    </div>
  );
};
