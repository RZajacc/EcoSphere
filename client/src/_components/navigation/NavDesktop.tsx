"use client";
import Link from "next/link";
import SearchBar from "@/_components/ui/navigation/SearchBar";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

import Image from "next/image";
import NavigationLink from "./NavigationLink";
import Dropdown from "./Dropdown";

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

      {/* Render different elemenets depending on user status */}
      <Dropdown user={user} />
    </div>
  );
}

export default NavDesktop;
