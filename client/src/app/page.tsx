import EventItem from "@/_components/user_events/EventItem";
import EventsTable from "@/_components/user_events/EventsTable";
import Image from "next/image";

export type eventType = {
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
    <div className="mx-auto mt-7 max-w-lg">
      <h1 className="mb-3 text-center text-2xl font-bold">All events:</h1>
      <div className="grid gap-3">
        <EventsTable eventsData={eventData.result} />
      </div>
    </div>
  );
}
