import React, { Component } from "react";
import WeaponDataService from "../services/weapon.service";

export default class Weapon extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getWeapon = this.getWeapon.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateWeapon = this.updateWeapon.bind(this);
    this.deleteWeapon = this.deleteWeapon.bind(this);

    this.state = {
      currentWeapon: {
        name: "",
        description: "",
        type: "",
        skill: "",
        concealable: false,
        damage: "",
        magazine: 0,
        rof: 0,
        hands: 0,
        cost: 0
      },
      message: ""
    };
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentWeapon: {
          ...prevState.currentWeapon,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentWeapon: {
        ...prevState.currentWeapon,
        description: description
      }
    }));
  }

  getWeapon(id) {
    WeaponDataService.get(id)
      .then(response => {
        this.setState({
          currentWeapon: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentWeapon.id,
      name: this.state.currentWeapon.name,
      description: this.state.currentWeapon.description,
      published: status
    };

    WeaponDataService.update(this.state.currentWeapon.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentWeapon: {
            ...prevState.currentWeapon,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateWeapon() {
    WeaponDataService.update(
      this.state.currentWeapon.id,
      this.state.currentWeapon
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The weapon was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteWeapon() {    
    WeaponDataService.delete(this.state.currentWeapon.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/weapons')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentWeapon } = this.state;

    return (
      <div>
        <span>
          {this.props.weapons.name}
        </span>
        <div>
          <span>Description:</span>
          <div>
            {this.props.weapons.description}
          </div>
        </div>
      </div>
    );
  }
}
