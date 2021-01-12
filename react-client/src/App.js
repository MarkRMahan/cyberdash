import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddWeapon from "./components/add-weapon.component";
import Weapon from "./components/weapon.component";
import WeaponsList from "./components/weapons-list.component";
import NavBar from "./components/navbar.component";

class App extends Component {
  render() {
    return (

      <div className="background">

      <NavBar />

        <div className="container mt-3">
          <Switch>
          <Route exact path={["/", "/weapons"]} component={WeaponsList} />
          <Route exact path="/add" component={AddWeapon} />
          <Route path="/weapons/:id" component={Weapon} />
          </Switch>
        </div> 
      </div>
    );
  }
}

export default App;
