import Image from "next/image";
import React from "react";

type Props = {
  imageUrl: string;
  date: string;
  title: string;
  adress: string;
};

function EventItem({ imageUrl, date, title, adress }: Props) {
  const displayDate = new Date(date);
  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [day, month, eventDate, hours, minutes] = [
    displayDate.getDay(),
    displayDate.getMonth(),
    displayDate.getDate().toString(),
    displayDate.getHours().toString(),
    displayDate.getMinutes().toString(),
  ];
  const fullMinutes = minutes === "0" ? "00" : minutes;
  const dateToDisplay =
    weekdays[day] +
    "," +
    months[month] +
    " " +
    eventDate +
    " • " +
    hours +
    ":" +
    fullMinutes;
  return (
    <div>
      <section>
        <Image src={imageUrl} alt={title} width={100} height={100} />
      </section>
      <p>{dateToDisplay}</p>

      <h1>{title}</h1>
      <p>{adress}</p>
    </div>
  );
}

export default EventItem;
