const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/weapons" className="navbar-brand">
        Cyberdash
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <a href="/weapons" className="nav-link">
            Weapons
          </a>
        </li>
        <li className="nav-item">
          <a href="/add" className="nav-link">
            Add
          </a>
        </li>
      </div>
    </nav>
  );
}

export default NavBar;