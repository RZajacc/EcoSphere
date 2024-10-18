import EventsTable from "@/_components/user_events/EventsTable";

export default async function Home() {
  // const response = await fetch("http://localhost:5000/events/getAllEvents", {
  //   method: "GET",
  //   redirect: "follow",
  // });

  // if (!response.ok) {
  //   throw Error("Something went wrong");
  // }

  // const eventData: { result: eventType[] } = await response.json();

  return (
    <div className="mx-auto mb-7 mt-7 max-w-2xl">
      <h1 className="mb-3 text-center text-2xl font-bold">All events:</h1>
      <div className="mb-5 flex items-center justify-center gap-3">
        <p className="font-semibold">Select date:</p>
        <input type="date" className="rounded-lg border border-gray-400 p-1" />
      </div>
      <div className="grid gap-2">
        <EventsTable />
      </div>
    </div>
  );
}
