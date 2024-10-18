import useSWR from "swr";
import { eventType } from "../../types/EventTypes";

// Fetching function
const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
  });

  if (!response.ok) {
    throw Error("Something went wrong");
  }

  const result: { result: eventType[] } = await response.json();
  return result;
};

// Method returning data
export function useEvents() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/events/getAllEvents",
    fetcher,
  );

  return {
    eventsData: data,
    isLoading,
    isError: error,
  };
}
