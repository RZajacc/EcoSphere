import Link from "next/link";

function NavbarMain() {
  return (
    <>
      <nav className="flex py-4  justify-between">
        <section>
          <Link href={"/"} className="font-bold text-xl ml-7">
            EcoSphere
          </Link>
        </section>
        <section>
          <button>Search bar</button>
        </section>
        <section className="mr-7 space-x-4">
          <Link href={"/login"} className="hover:text-teal-700 font-semibold">
            Login
          </Link>
          <Link
            href={"/signup"}
            className="bg-teal-600 px-6 py-[5px] rounded-lg font-semibold text-white hover:bg-teal-700"
          >
            Signup
          </Link>
        </section>
      </nav>
      <hr />
    </>
  );
}

export default NavbarMain;
