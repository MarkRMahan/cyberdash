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

        <NavBar />

        <div className="mt-3 main-page">
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
