import Link from "next/link";
import React from "react";

type Props = {
  path: string;
  title: string;
  callback: () => void;
};

function NavigationLink({ path, title, callback }: Props) {
  return (
    <li
      className="transition-colors duration-500 hover:text-teal-400"
      onClick={callback}
    >
      <Link href={path}>{title}</Link>
    </li>
  );
}

export default NavigationLink;
