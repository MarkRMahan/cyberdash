import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddWeapon from "./components/add-weapon.component";
import Weapon from "./components/weapon.component";
import WeaponsList from "./components/weapons-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/weapons" className="navbar-brand">
          Cyberdash
          </a>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/weapons"} className="nav-link">
            Weapons
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
            Add
            </Link>
          </li>
          </div>
        </nav>

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
