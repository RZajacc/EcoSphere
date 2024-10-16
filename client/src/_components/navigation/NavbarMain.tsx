import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

function NavbarMain() {
  return (
    <>
      <nav className="fixed left-0 top-0 z-10 w-full bg-white">
        {/* Desktop navigation */}
        <NavDesktop />
        {/* Mobile navigation */}
        <NavMobile />
      </nav>
      <hr />
    </>
  );
}

export default NavbarMain;
