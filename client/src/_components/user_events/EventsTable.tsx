import { eventType } from "@/app/page";
import EventItem from "./EventItem";

type Props = {
  eventsData: eventType[];
};

function EventsTable({ eventsData }: Props) {
  let prevMonth: number | null = null;
  let prevDay: number | null = null;
  const dateToday = new Date();
  const monthToday = dateToday.getMonth();
  const dayToday = dateToday.getDay();
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
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
          const currentDay = new Date(event.date).getDay();
          const currentDate = new Date(event.date).getDate();

          if (prevMonth === currentMonth && prevDay === currentDay) {
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
            prevDay = currentDay;
            return (
              <>
                <h3 className="ml-1 text-lg font-semibold">
                  {currentDay === dayToday && currentMonth === monthToday
                    ? "Today"
                    : weekdays[currentDay] +
                      ", " +
                      months[currentMonth] +
                      " " +
                      currentDate}
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
