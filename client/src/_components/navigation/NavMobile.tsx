"use client";
import Link from "next/link";
import SearchBar from "../ui/navigation/SearchBar";
import HamburgerButton from "../ui/navigation/HamburgerButton";
import SideBar from "./SideBar";
import { useState } from "react";

function NavMobile() {
  const [sideBarActive, setSideBarActive] = useState(false);
  return (
    <>
      <div className="py-4 sm:hidden">
        <section className="flex items-center justify-between">
          <HamburgerButton
            onClickHandler={() => {
              setSideBarActive(true);
            }}
          />
          <Link
            href={"/"}
            className="mr-7 font-serif text-xl italic tracking-wider text-emerald-500"
          >
            EcoSphere
          </Link>
        </section>
        <section className="mt-2">
          <SearchBar />
        </section>
      </div>
      <SideBar
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      />
    </>
  );
}

export default NavMobile;
