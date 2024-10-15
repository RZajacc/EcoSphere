export default function DateFormatter(timestamp: string) {
  const displayDate = new Date(timestamp);
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

  return dateToDisplay;
}
