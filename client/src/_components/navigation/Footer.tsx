function Footer() {
  return (
    <div className="bg-zinc-600">
      <div className="flex justify-around">
        <section>
          <p>Your account</p>
          <ul>
            <li>Signup</li>
            <li>Login</li>
          </ul>
        </section>
        <section>
          <p>Discover</p>
          <ul>
            <li>Events</li>
          </ul>
        </section>
        <section>
          <p>Ecosphere</p>
          <ul>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Footer;
