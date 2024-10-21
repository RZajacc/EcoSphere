import EventsTable from "@/_components/user_events/EventsTable";

export default async function Home() {
  return (
    <div className="mx-auto mb-7 mt-7 max-w-2xl">
      <h1 className="mb-3 text-center text-2xl font-bold">All events:</h1>
      <div className="grid gap-2">
        <EventsTable />
      </div>
    </div>
  );
}
