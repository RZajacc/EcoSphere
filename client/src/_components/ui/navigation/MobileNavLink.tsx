import Link from "next/link";
import React, { SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
  setSideBarActive: React.Dispatch<SetStateAction<boolean>>;
  href: string;
  callback?: () => void;
};

function MobileNavLink({ children, setSideBarActive, href, callback }: Props) {
  return (
    <>
      <Link
        href={href}
        onClick={() => {
          setSideBarActive(false);
          if (callback) {
            callback();
          }
        }}
        className="rounded-md p-1 text-center font-semibold transition-colors duration-300 hover:bg-emerald-500 hover:text-white"
      >
        {children}
      </Link>
      <hr />
    </>
  );
}

export default MobileNavLink;
