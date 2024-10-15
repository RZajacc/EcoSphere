import DateFormatter from "@/utils/DateFormatter";
import Image from "next/image";
import React from "react";

type Props = {
  imageUrl: string;
  date: string;
  title: string;
  adress: string;
};

function EventItem({ imageUrl, date, title, adress }: Props) {
  // Get preformatted date from timestamp
  const dateToDisplay = DateFormatter(date);

  return (
    <div className="event">
      <section className="event_image">
        <Image src={imageUrl} alt={title} width={100} height={100} />
      </section>
      <p className="event_date">{dateToDisplay}</p>
      <h1 className="event_title">{title}</h1>
      <p className="event_adress">{adress}</p>
    </div>
  );
}

export default EventItem;
