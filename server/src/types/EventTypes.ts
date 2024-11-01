export type EventByDate = {
  event_id: number;
  title: string;
  user_id: number;
  description: string;
  date: string;
  adress: string;
  imageurl: string;
};

export type EventByTitle = {
  user_name: string;
  title: string;
  description: string;
  date: string;
  adress: string;
  imageurl: string;
};
