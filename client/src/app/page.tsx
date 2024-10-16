import EventItem from "@/_components/user_events/EventItem";
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
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw Error("Something went wrong");
  }

  const eventData: { result: eventType[] } = await response.json();
  return (
    <div className="mx-auto max-w-lg">
      <h1>Ecosphere home</h1>
      <div className="grid gap-3">
        {eventData &&
          eventData.result.map((event) => {
            return (
              <EventItem
                key={event.event_id}
                imageUrl={event.imageurl}
                date={event.date}
                title={event.title}
                adress={event.adress}
              />
            );
          })}
      </div>
    </div>
  );
}
