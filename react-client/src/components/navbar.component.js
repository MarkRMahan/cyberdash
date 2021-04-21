const NavBar = () => {
  return (
    <nav className="cybernav navbar navbar-expand navbar-dark bg-dark">
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
      <div className="outer-nav-art rounded-top">
        <svg xmlns="http://www.w3.org/2000/svg" width="0.266667in" height="10.6667in" viewBox="0 0 24 960" preserveAspectRatio="xMinYMid slice">
          <path id="Imported Path"
                fill="#343a40" stroke="black" stroke-width="1"
                d="M 24.00,952.00
                  C 24.00,952.00 24.00,800.00 24.00,800.00
                    24.00,800.00 24.00,792.00 24.00,792.00
                    24.00,792.00 24.00,680.00 24.00,680.00
                    24.00,680.00 24.00,672.00 24.00,672.00
                    24.00,672.00 24.00,440.00 24.00,440.00
                    24.00,440.00 24.00,432.00 24.00,432.00
                    24.00,432.00 24.00,376.00 24.00,376.00
                    24.00,376.00 24.00,360.00 24.00,360.00
                    24.00,360.00 24.00,8.00 24.00,8.00
                    24.00,8.00 16.00,0.00 16.00,0.00
                    16.00,0.00 16.00,0.00 16.00,0.00
                    16.00,0.00 16.00,0.00 16.00,0.00
                    16.00,0.00 0.00,0.00 0.00,0.00
                    0.00,0.00 0.00,360.00 0.00,360.00
                    0.00,360.00 0.00,368.00 0.00,368.00
                    0.00,368.00 0.00,432.00 0.00,432.00
                    0.00,432.00 0.00,440.00 0.00,440.00
                    0.00,440.00 0.00,504.00 0.00,504.00
                    0.00,504.00 8.00,512.00 8.00,512.00
                    8.00,512.00 8.00,720.00 8.00,720.00
                    8.00,720.00 0.00,728.00 0.00,728.00
                    0.00,728.00 0.00,960.00 0.00,960.00
                    0.00,960.00 16.00,960.00 16.00,960.00
                    16.00,960.00 24.00,952.00 24.00,952.00" />
        </svg>
      </div>
    </nav>
  );
}

export default NavBar;