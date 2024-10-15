import Image from "next/image";

type eventType = {
  event_id: number;
  title: string;
  user_id: number;
  description: string;
  date: string;
  adress: string;
  imageurl: string;
};

export default async function Home() {
  const response = await fetch("http://localhost:5000/events/getAllEvents", {
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  });
  if (!response.ok) {
    throw Error("Something went wrong");
  }

  const eventData: { result: eventType[] } = await response.json();
  return (
    <div>
      <h1>Ecosphere home</h1>
      <ul>
        {eventData &&
          eventData.result.map((event) => {
            return <li key={event.event_id}>{event.title}</li>;
          })}
      </ul>
    </div>
  );
}
