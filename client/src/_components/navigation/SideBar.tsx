import cancelImage from "@/assets/cancel-svgrepo-com.svg";
import { SetStateAction } from "react";
import Image from "next/image";
import MobileNavLink from "../ui/MobileNavLink";

type Props = {
  sideBarActive: boolean;
  setSideBarActive: React.Dispatch<SetStateAction<boolean>>;
};

function SideBar({ sideBarActive, setSideBarActive }: Props) {
  // Classes to manage display and transitions of sidebar and backdrop
  const sideBarShowClass =
    "fixed -left-1/2 top-0 z-20 h-full w-1/2 translate-x-full bg-white duration-700 ease-out";
  const sideBarHideClass =
    "fixed -left-1/2 top-0 h-full w-1/2 -translate-x-full bg-white duration-700 ease-in";
  const backdropActiveClass =
    "fixed left-0 top-0 z-10 h-full w-full bg-zinc-500 opacity-50 transition-opacity duration-1000 pointer-events-auto";
  const backdrophidden =
    "fixed left-0 top-0 -z-10 h-full w-full bg-zinc-500 opacity-0 transition-opacity duration-1000 pointer-events-none";
  return (
    <>
      <div className={sideBarActive ? sideBarShowClass : sideBarHideClass}>
        {/* <div className="fixed -left-1/2 top-0 z-20 h-full w-1/2 translate-x-full bg-white duration-700 ease-out"> */}
        <div className="relative z-20 grid h-1/2 content-center justify-center">
          {/* Close sidebar button */}
          <button
            className="absolute right-2 top-2 animate-pulse"
            onClick={() => setSideBarActive(false)}
          >
            <Image src={cancelImage} alt="cancel-image" width={42} />
          </button>
          {/* Main navigation */}
          <h1 className="font-serif text-xl font-semibold text-emerald-500">
            Ecospehere
          </h1>
          <hr className="my-2 h-[2px] bg-emerald-400" />
          <MobileNavLink setSideBarActive={setSideBarActive} href="/">
            Home
          </MobileNavLink>
          <MobileNavLink setSideBarActive={setSideBarActive} href="/login">
            Login
          </MobileNavLink>
          <MobileNavLink setSideBarActive={setSideBarActive} href="/signup">
            Signup
          </MobileNavLink>
        </div>
      </div>
      {/* Backrop for the page */}
      <div
        onClick={() => setSideBarActive(false)}
        onScroll={() => setSideBarActive(false)}
        className={sideBarActive ? backdropActiveClass : backdrophidden}
      ></div>
    </>
  );
}

export default SideBar;
