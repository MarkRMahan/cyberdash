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
        id: null,
        name: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getWeapon(this.props.match.params.id);
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
        {currentWeapon ? (
          <div className="edit-form">
            <h4>Weapon</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentWeapon.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentWeapon.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentWeapon.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentWeapon.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateConcealable(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateConcealable(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteWeapon}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateWeapon}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Weapon...</p>
          </div>
        )}
      </div>
    );
  }
}
