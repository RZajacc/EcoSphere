import useSWR from "swr";
import { eventType } from "../../types/EventTypes";

// Fetching function
const fetcher = async (date: string) => {
  // Define headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // Define body
  const urlencoded = new URLSearchParams();
  urlencoded.append("date", date);

  // Fetch data from the server
  const response = await fetch("http://localhost:5000/events/getAllByDate", {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  });

  if (!response.ok) {
    throw Error("Something went wrong");
  }

  const result: { result: eventType[] } = await response.json();
  return result;
};

// Method returning data
export function useEvents(date: string) {
  const { data, error, isLoading } = useSWR(date, fetcher);

  return {
    eventsData: data,
    isLoading,
    isError: error,
  };
}
