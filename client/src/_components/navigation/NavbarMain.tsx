import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

function NavbarMain() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full">
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
