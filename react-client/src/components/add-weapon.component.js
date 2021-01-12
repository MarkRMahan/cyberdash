import React, { Component } from "react";
import WeaponDataService from "../services/weapon.service";

export default class AddWeapon extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveWeapon = this.saveWeapon.bind(this);
    this.newWeapon = this.newWeapon.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      type: "",
      skill: "",
      concealable: true,
      damage: 0,
      magazine: 0,
      rof: 2,
      hands: 1,
      cost: 0
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveWeapon() {
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    WeaponDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newWeapon() {
    this.setState({
      id: null,
      name: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newWeapon}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveWeapon} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
