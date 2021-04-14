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
        nationality: "",
        type: "",
        damage: "",
        rof: 0,
        magazine: 0,
        skill: "",
        concealable: false,
        attachments: "",
        hands: 0,
        cost: 0,
        quality: "",
        body_min: 0
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

  showInfo() {
    document.getElementById("weapon-info").addEventListener("click", (e) => {
      if (e.target && e.target.matches("#weapon-info")) {

      }
    });
  }

  // name: "",
  // description: "",
  // nationality: "",
  // type: "",
  // damage: "",
  // rof: 0,
  // magazine: 0,
  // skill: "",
  // concealable: false,
  // attachments: "",
  // hands: 0,
  // cost: 0,
  // quality: "",
  // body_min: 0

  render() {
    const { currentWeapon } = this.state;
    const hyphenName = this.props.weapons.name.replaceAll(" ", "-").replaceAll("\"", "");
    // use clip-path
    return (
      <div className="card weapon-card weapon-info">
        <div className="card-header" id={`${hyphenName}-heading`}>
          <h2 className="mb-0">
            <button className="btn weapon-btn" type="button" data-toggle="collapse" data-target={`#${hyphenName}`} aria-expanded="true">
              {this.props.weapons.name}
            </button>
          </h2>
        </div>
        <div id={hyphenName} className="collapse" aria-labelledby={`${hyphenName}-heading`}>
          <div className="card-body">
            <div className="row weapon-row">
              <div className="col-md-3">
                <span>Type: {this.props.weapons.type}</span>
              </div>
              <div className="col-md-3">
                <span>Damage: {this.props.weapons.damage}</span>
              </div>
              <div className="col-md-3">
                <span>Rate of Fire: {this.props.weapons.rof}</span>
              </div>
              <div className="col-md-3">
                <span>Nationality: {this.props.weapons.nationality}</span>
              </div>
            </div>
            <div className="row weapon-row">
              <div className="col-md-3">
                <span>Magazine: {this.props.weapons.magazine}</span>
              </div>
              <div className="col-md-3">
                <span>Skill: {this.props.weapons.skill}</span>
              </div>
              <div className="col-md-3">
                <span>Concealable: {this.props.weapons.concealable}</span>
              </div>
              <div className="col-md-3">
                <span>Cost: {this.props.weapons.cost}eb</span>
              </div>
            </div>
            <div className="row weapon-description">
              <div className="col-md-8">
                  <p>
                    <span>Description: {this.props.weapons.description}</span>
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
