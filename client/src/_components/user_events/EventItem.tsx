import DateFormatter from "../../../lib/other/DateFormatter";
import Image from "next/image";
import Link from "next/link";
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
    <Link
      className="event rounded-sm transition-colors duration-500 hover:cursor-pointer hover:bg-zinc-100"
      href={`/eventDetails/${title}`}
    >
      <section className="event_image relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px)"
          priority={true}
          className="rounded-lg p-2"
        />
      </section>
      <section className="event_date content-end font-semibold text-gray-500">
        {dateToDisplay}
      </section>
      <div className="event_title text-lg font-semibold">{title}</div>
      <p className="event_adress text-sm font-semibold text-gray-400">
        {adress}
      </p>
    </Link>
  );
}

export default EventItem;
