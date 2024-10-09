"use client";
import Link from "next/link";
import SearchBar from "../ui/SearchBar";
import HamburgerButton from "../ui/HamburgerButton";
import SideNav from "./SideNav";

function NavMobile() {
  return (
    <>
      <div className="block sm:hidden py-4">
        <section className="justify-between items-center flex">
          <HamburgerButton
            onClickHandler={() => {
              console.log("Clicked");
            }}
          />
          <Link
            href={"/"}
            className="text-xl mr-7 text-emerald-500 font-serif italic tracking-wider"
          >
            EcoSphere
          </Link>
        </section>
        <section className="mt-2">
          <SearchBar />
        </section>
      </div>
      <SideNav />
    </>
  );
}

export default NavMobile;
