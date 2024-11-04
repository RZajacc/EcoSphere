"use client";
import Link from "next/link";
import SearchBar from "@/_components/ui/navigation/SearchBar";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import noUserImg from "../../assets/noUser.png";
import pointerUp from "../../assets/pointerup.svg";
import pointerDown from "../../assets/pointerdown.svg";
import Image from "next/image";

function NavDesktop() {
  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
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
      {user ? (
        <section>
          <button
            className="mr-7 flex items-center"
            onClick={() => {
              setShowDropdown((prevVal) => !prevVal);
            }}
          >
            <Image
              src={noUserImg}
              alt="No user image"
              width={42}
              className="rounded-full"
            />
            <Image
              src={showDropdown ? pointerDown : pointerUp}
              alt="Pointer down"
              width={25}
            />
          </button>
        </section>
      ) : (
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
