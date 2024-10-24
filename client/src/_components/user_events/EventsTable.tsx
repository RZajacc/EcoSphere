"use client";
import React from "react";
import { weekdaysLong } from "../../../lib/other/DaysArray";
import { monthsLong } from "../../../lib/other/MonthsArray";
import EventItem from "./EventItem";
import { useEvents } from "../../../lib/utils/useEvents";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventsTable() {
  // Variables necessary for proper display
  let prevMonth: number | null = null;
  let prevDay: number | null = null;
  const dateToday = new Date();
  const monthToday = dateToday.getMonth();
  const dayToday = dateToday.getDay();
  // Date from the calendar input
  const [value, onChange] = useState<Value>(new Date());
  // Data fetching method
  const { eventsData } = useEvents(value ? value.toLocaleString() : "");

  return (
    <>
      <div className="mx-auto md:col-span-4 md:mx-0">
        <Calendar
          onChange={onChange}
          value={value}
          className="rounded-lg p-2"
          locale="en-GB"
        />
      </div>
      <div className="md:col-span-8">
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
                <React.Fragment key={event.event_id}>
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
                    imageUrl={event.imageurl}
                    date={event.date}
                    title={event.title}
                    adress={event.adress}
                  />
                </React.Fragment>
              );
            }
          })}
      </div>
    </>
  );
}

export default EventsTable;
