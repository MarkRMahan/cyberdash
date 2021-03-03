const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/weapons" className="navbar-brand">
            Cyberdash
          </a>
        </li>
        <li className="nav-item">
          <a href="/weapons" className="navbar-brand">
            Weapons
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;