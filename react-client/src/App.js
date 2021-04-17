import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/collapse";
import "./app.css";

import AddWeapon from "./components/add-weapon.component";
import Tabs from "./components/tabs.component";
import Weapon from "./components/weapon.component";
import WeaponsList from "./components/weapons-list.component";
import NavBar from "./components/navbar.component";

class App extends Component {
  render() {
    return (
      <div className="background">

        <NavBar />

        <div className="mt-3 main-page">
          <Switch>
          <Route exact path={["/", "/weapons"]} component={WeaponsList} />
          {/* <Route exact path="/add" component={AddWeapon} /> */}
          <Route path="/weapons" component={Weapon} />
          </Switch>
        </div> 
      </div>
    );
  }
}

export default App;
