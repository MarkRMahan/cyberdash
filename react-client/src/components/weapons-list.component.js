import React, { Component } from "react";
import WeaponDataService from "../services/weapon.service";
import { Link } from "react-router-dom";

export default class WeaponsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveWeapons = this.retrieveWeapons.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveWeapon = this.setActiveWeapon.bind(this);
    this.removeAllWeapons = this.removeAllWeapons.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      weapons: [],
      currentWeapon: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveWeapons();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveWeapons() {
    WeaponDataService.getAll()
      .then(response => {
        this.setState({
          weapons: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveWeapons();
    this.setState({
      currentWeapon: null,
      currentIndex: -1
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
        this.setState({
          weapons: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, weapons, currentWeapon, currentIndex } = this.state;

    return (
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
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Weapons List</h4>

          <ul className="list-group">
            {weapons &&
              weapons.map((weapon, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveWeapon(weapon, index)}
                  key={index}
                >
                  {weapon.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllWeapons}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentWeapon ? (
            <div>
              <h4>Weapon</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentWeapon.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentWeapon.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentWeapon.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/weapons/" + currentWeapon.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Weapon...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
