import Link from "next/link";
import SearchBar from "@/_components/ui/navigation/SearchBar";

function NavDesktop() {
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
    </div>
  );
}

export default NavDesktop;
