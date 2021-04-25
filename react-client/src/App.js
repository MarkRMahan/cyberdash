import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse";
import "./app.css";

import WeaponsList from "./components/weapons-list.component";
import NavBar from "./components/navbar.component";
import NightCityMap from "./components/night-city.component";

class App extends Component {
  render() {
    return (
      <div className="background">
        <link rel="stylesheet" media="all" href="https://public-assets.envato-static.com/assets/market/pages/preview/index-004d35cdd5d555cdd3e956d1b916825642de06529f0fe91fd9f390813761d2fc.css" />
        <NavBar />

        <div id="top-div">
          <Switch>
          <Route exact path={["/", "/weapons"]} component={WeaponsList} />
          <Route path="/weapons" component={WeaponsList} />
          <Route path="/nightcity" component={NightCityMap} />
          </Switch>
        </div> 
      </div>
    );
  }
}

export default App;
