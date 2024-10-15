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
    <div>
      <section>
        <Image src={imageUrl} alt={title} width={100} height={100} />
      </section>
      <p>{dateToDisplay}</p>

      <h1>{title}</h1>
      <p>{adress}</p>
    </div>
  );
}

export default EventItem;
