import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

function NavbarMain() {
  return (
    <>
      <nav>
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
