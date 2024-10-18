"use client";
import useSWR from "swr";
import { weekdaysLong } from "../../../lib/other/DaysArray";
import { monthsLong } from "../../../lib/other/MonthsArray";
import EventItem from "./EventItem";
import { eventType } from "../../../types/EventTypes";
import { useEvents } from "../../../lib/utils/useUser";

function EventsTable() {
  // Variables necessary for proper display
  let prevMonth: number | null = null;
  let prevDay: number | null = null;
  const dateToday = new Date();
  const monthToday = dateToday.getMonth();
  // Data fetching method
  const dayToday = dateToday.getDay();

  const { eventsData } = useEvents();

  return (
    <>
      {eventsData &&
        eventsData.result.map((event) => {
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
                    : weekdaysLong[currentDay] +
                      ", " +
                      monthsLong[currentMonth] +
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
