import Image from "next/image";
import { eventDetails } from "../../../../types/EventTypes";
import noUser from "@/assets/noUser.png";

export const revalidate = 1800;

async function page({ params }: { params: { title: string } }) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("title", decodeURI(params.title));

  const response = await fetch("http://localhost:5000/events/getEventByTitle", {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data: eventDetails = await response.json();
  const eventDate = new Date(data.date);

  return (
    <div className="mt-7">
      <section className="mx-auto mb-7 max-w-lg">
        <p className="text-3xl font-extrabold">{data.title}</p>
        <div className="mt-3 flex items-center gap-3">
          <Image
            src={noUser}
            alt="nouserImage"
            width={42}
            className="rounded-full"
          />
          <section>
            <p>Hosted by:</p>
            <p className="font-semibold">{data.user_name}</p>
          </section>
        </div>
      </section>
      <hr className="border-[1px] border-gray-300" />
      <div className="bg-gray-100 pb-10">
        <section className="mx-auto max-w-lg py-4">
          <Image
            src={data.imageurl}
            alt="event_image"
            width={300}
            height={200}
            className="mx-auto rounded-sm"
          />
        </section>

        <section className="mx-auto max-w-lg py-2">
          <h1 className="text-lg font-bold">Details</h1>
          <p>{data.description}</p>
          <h1 className="mt-2 text-lg font-bold">Location</h1>
          <p>{data.adress}</p>
          <h1 className="mt-2 text-lg font-bold">Date</h1>
          <p>{eventDate.toLocaleDateString()}</p>
          <h1 className="mt-2 text-lg font-bold">Atendees ()</h1>
        </section>
      </div>
      <hr className="border-[1px] border-gray-300" />
    </div>
  );
}

export default page;
