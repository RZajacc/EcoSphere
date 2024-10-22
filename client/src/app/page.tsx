import EventsTable from "@/_components/user_events/EventsTable";

export default async function Home() {
  return (
    <div className="mx-auto mb-7 mt-7 max-w-4xl">
      <h1 className="mb-3 text-center text-2xl font-bold">All events:</h1>
      <div className="grid grid-cols-12 gap-5">
        <EventsTable />
      </div>
    </div>
  );
}
