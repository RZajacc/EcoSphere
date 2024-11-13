import Image from "next/image";
import NavigationLink from "./NavigationLink";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import noUserImg from "../../assets/noUser.png";
import pointerUp from "../../assets/pointerup.svg";
import pointerDown from "../../assets/pointerdown.svg";
import { User } from "../../../types/UserTypes";
import Link from "next/link";

type Props = {
  user: User | undefined;
};

function Dropdown({ user }: Props) {
  const { logout, showDropdown, toggleDropdown, setShowDropdown } =
    useContext(AuthContext);

  const renderedEl = user ? (
    <>
      <section className="relative z-10">
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
          className={`${!showDropdown ? "hidden" : ""} absolute right-7 top-[52px] w-40 rounded-md border border-zinc-300 bg-white p-2`}
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
      {/* Dropdown */}
      <div
        className={
          showDropdown ? "fixed left-0 top-0 z-0 h-full w-full" : "hidden"
        }
        onClick={() => {
          setShowDropdown(false);
        }}
        onScroll={() => {
          setShowDropdown(false);
        }}
      >
        as
      </div>
    </>
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
  );
  return renderedEl;
}

export default Dropdown;
