import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse";
import "./app.css";

import WeaponsList from "./components/weapons-list.component";
import NavBar from "./components/navbar.component";
import NightCityMap from "./components/night-city.component";
import BodyCountLottery from "./components/body-count-lottery.component";

class App extends Component {
  render() {
    return (
      <div id="top-most">
        <div className="background">
          <link rel="stylesheet" media="all" href="https://public-assets.envato-static.com/assets/market/pages/preview/index-004d35cdd5d555cdd3e956d1b916825642de06529f0fe91fd9f390813761d2fc.css" />
          <NavBar />

          <div id="top-div">
            <Switch>
            <Route exact path={["/", "/weapons"]} component={WeaponsList} />
            <Route path="/weapons" component={WeaponsList} />
            <Route path="/nightcity" component={NightCityMap} />
            <Route path="/lottery" component={BodyCountLottery} />
            </Switch>
          </div> 
          <div className="nc-col">
            <div className="outer-art right right-art">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 1040.5" preserveAspectRatio="xMinYMid slice">
                <path d="M58.5 1022l-12.287 12H16.685l-5.747 6H.505V550.745l13.311-13.006V180.454L.505 167.448V.5h45.713l12.287 12z" fill="#181a1a" stroke="#65c5cc"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
