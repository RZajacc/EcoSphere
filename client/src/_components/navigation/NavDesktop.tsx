import Link from "next/link";
import SearchBar from "../ui/SearchBar";

function NavDesktop() {
  return (
    <div className="hidden sm:flex py-4 justify-between items-center">
      <section>
        <Link
          href={"/"}
          className="text-xl ml-7 text-emerald-500 font-serif italic tracking-wider"
        >
          EcoSphere
        </Link>
      </section>
      <section>
        <SearchBar />
      </section>
      <section className="mr-7 space-x-4">
        <Link href={"/login"} className="hover:text-teal-600 font-semibold">
          Login
        </Link>
        <Link
          href={"/signup"}
          className="transition-colors delay-150 bg-teal-600 px-6 py-[5px] rounded-lg font-semibold text-white hover:bg-teal-700 duration-500"
        >
          Signup
        </Link>
      </section>
    </div>
  );
}

export default NavDesktop;
