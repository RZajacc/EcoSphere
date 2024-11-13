"use client";
import Link from "next/link";
import SearchBar from "@/_components/ui/navigation/SearchBar";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import noUserImg from "../../assets/noUser.png";
import pointerUp from "../../assets/pointerup.svg";
import pointerDown from "../../assets/pointerdown.svg";
import Image from "next/image";
import NavigationLink from "./NavigationLink";

function NavDesktop() {
  const { user, logout, showDropdown, toggleDropdown } =
    useContext(AuthContext);

  return (
    <div className="hidden items-center justify-between py-4 sm:flex">
      <section>
        <Link
          href={"/"}
          className="ml-7 font-serif text-xl italic tracking-wider text-emerald-500"
        >
          EcoSphere
        </Link>
      </section>
      <section>
        <SearchBar />
      </section>

      {/* If user is logged in */}
      {user ? (
        <section className="relative">
          <button className="mr-7 flex items-center" onClick={toggleDropdown}>
            <span className="h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={user.image.public_url ? user.image.public_url : noUserImg}
                alt="user image"
                width={user.image.width ? user.image.width : 42}
                height={user.image.height ? user.image.height : 42}
                className="h-full w-full object-cover"
              />
            </span>
            <Image
              src={showDropdown ? pointerUp : pointerDown}
              alt="Pointer down"
              width={25}
            />
          </button>
          <ul
            className={`${!showDropdown ? "hidden" : ""} absolute right-7 top-12 w-40 rounded-md border border-zinc-300 p-2`}
          >
            <NavigationLink
              path="/"
              title="All events"
              callback={toggleDropdown}
            />
            <NavigationLink
              path="/profile"
              title="View profile"
              callback={toggleDropdown}
            />
            <hr />
            <NavigationLink path="/" title="Log out" callback={logout} />
          </ul>
        </section>
      ) : (
        // If user is not logged in
        <section className="mr-7 space-x-4">
          <Link href={"/login"} className="font-semibold hover:text-teal-600">
            Login
          </Link>
          <Link
            href={"/signup"}
            className="rounded-lg bg-teal-600 px-6 py-[5px] font-semibold text-white transition-colors delay-150 duration-500 hover:bg-teal-700"
          >
            Signup
          </Link>
        </section>
      )}
    </div>
  );
}

export default NavDesktop;
