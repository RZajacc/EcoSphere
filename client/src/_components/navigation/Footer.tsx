import Link from "next/link";

function Footer() {
  return (
    <div className="bg-zinc-700 py-1">
      <div className="flex justify-around">
        <section>
          <p className="font-semibold text-stone-50">Your Account</p>
          <ul className="ml-1 space-y-1 text-sm text-stone-300">
            <li>
              <Link
                href={"/signup"}
                className="transition duration-1000 hover:text-yellow-300"
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                href={"/login"}
                className="transition duration-1000 hover:text-yellow-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <p className="font-semibold text-stone-50">Discover</p>
          <ul className="ml-1 space-y-1 text-sm text-stone-300">
            <li>
              <Link
                href={"/"}
                className="transition duration-1000 hover:text-yellow-300"
              >
                Events
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <p className="font-semibold text-stone-50">Ecosphere</p>
          <ul className="ml-1 space-y-1 text-sm text-stone-300">
            <li>
              <Link
                href={"/about"}
                className="transition duration-1000 hover:text-yellow-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className="transition duration-1000 hover:text-yellow-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Footer;
