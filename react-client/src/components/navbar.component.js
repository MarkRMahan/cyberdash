const NavBar = () => {
  return (
    <div className="outer-art nav-art">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.567 1040.5" preserveAspectRatio="xMinYMid slice">
        <path d="M.5 12.5L12.787.5h164.28V1040H12.786L.499 1028V914.75l12.287-12V92.5L.499 80.5z" fill="#181a1a" stroke="#65c5cc"/>
        <foreignObject x="8%" y="33%" width="160" height="1020">
          <nav className="cybernav navbar navbar-expand">
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
        </foreignObject>
      </svg>
    </div>
  );
}

export default NavBar;