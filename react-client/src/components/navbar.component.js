const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/weapons" className="navbar-brand nav-option">
            Cyberdash
          </a>
        </li>
        <li className="nav-item">
          <a href="/weapons" className="navbar-brand nav-option">
            Weapons
          </a>
        </li>
        <li className="nav-item">
          <a href="/nightcity" className="navbar-brand nav-option">
            Night City
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;