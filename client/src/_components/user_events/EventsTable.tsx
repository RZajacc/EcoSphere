import { eventType } from "@/app/page";
import EventItem from "./EventItem";

type Props = {
  eventsData: eventType[];
};

function EventsTable({ eventsData }: Props) {
  let prevMonth: number | null = null;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      {eventsData &&
        eventsData.map((event) => {
          const currentMonth = new Date(event.date).getMonth();
          if (prevMonth === currentMonth) {
            return (
              <EventItem
                key={event.event_id}
                imageUrl={event.imageurl}
                date={event.date}
                title={event.title}
                adress={event.adress}
              />
            );
          } else {
            prevMonth = currentMonth;
            return (
              <>
                <h3 className="ml-1 text-lg font-semibold">
                  {months[currentMonth]}
                </h3>
                <hr className="border-t border-zinc-700" />
                <EventItem
                  key={event.event_id}
                  imageUrl={event.imageurl}
                  date={event.date}
                  title={event.title}
                  adress={event.adress}
                />
              </>
            );
          }
        })}
    </>
  );
}

export default EventsTable;
