import React, { Component } from "react";
import WeaponDataService from "../services/weapon.service";
import Weapon from "./weapon.component"

export default class WeaponsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    //this.retrieveWeapons = this.retrieveWeapons.bind(this);
    //this.refreshList = this.refreshList.bind(this);
    this.setActiveWeapon = this.setActiveWeapon.bind(this);
    this.removeAllWeapons = this.removeAllWeapons.bind(this);
    this.searchName = this.searchName.bind(this);
    this.randomWeapon = this.randomWeapon.bind(this);

    this.state = {
      weapons: [],
      currentWeapon: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  setActiveWeapon(weapon, index) {
    this.setState({
      currentWeapon: weapon,
      currentIndex: index
    });
  }

  removeAllWeapons() {
    WeaponDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    WeaponDataService.findByName(this.state.searchName)
      .then(response => {
        // for (let weaponKey in response) {
        //   console.log(`wList retrieved: ${JSON.stringify(response[weaponKey], null, 4)}`);
        // }
        if (response.length) {
          this.setState({
            weapons: response
          });
          //console.log(JSON.stringify(this.state.weapons, null, 4));
        }
      })
      .catch(e => {
        console.log(`Error receiving weapon: ${e}`);
      });
  }

  randomWeapon() {
    WeaponDataService.getRandomWeapon()
      .then(response => {
        console.log(response);
        this.setState({
          weapons: [
            ...response,
            ...this.state.weapons
          ]
        });
      })
      .catch(e => {
        console.log(`Error finding random weapon: ${e}`)
      });
  }

  render() {
    const { searchName, weapons, currentWeapon, currentIndex } = this.state;

    return (
      <div className="mt-3 main-page">
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={this.onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchName}
                >
                  Search
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.randomWeapon}
                >
                  Random Weapon
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12" key="hmm">

            <h4 key="fake">Weapons</h4>

            <div className="accordion" id="weapon-accordion" key="fake-key">
              {this.state.weapons.map((weapon, i) => (
                <div key={`weapon-${i}`}>
                  <Weapon name = {i} weapons = {weapon} />
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
