import { eventDetails } from "../../../../types/EventTypes";

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

  return <div>test {data.title}</div>;
}

export default page;
