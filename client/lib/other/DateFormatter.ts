import { weekdaysShort } from "./DaysArray";
import { monthsShort } from "./MonthsArray";

export default function DateFormatter(timestamp: string) {
  const displayDate = new Date(timestamp);

  const [day, month, eventDate, hours, minutes] = [
    displayDate.getDay(),
    displayDate.getMonth(),
    displayDate.getDate().toString(),
    displayDate.getHours().toString(),
    displayDate.getMinutes().toString(),
  ];
  const fullMinutes = minutes === "0" ? "00" : minutes;
  const dateToDisplay =
    weekdaysShort[day] +
    "," +
    monthsShort[month] +
    " " +
    eventDate +
    " • " +
    hours +
    ":" +
    fullMinutes;

  return dateToDisplay;
}
