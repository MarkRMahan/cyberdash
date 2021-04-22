import React, { Component } from "react";
import ImageDataService from "../services/image.service";

export default class NightCityMap extends Component {

  constructor(props) {
    super(props);
    this.nightCityImgName = "Night-City-Presentation.png";

    this.state = {
      nightCityDisplayImg: this.getImage(this.nightCityImgName)
    };
  }

  getImage(name) {
    ImageDataService.getImgByName(name)
      .then(response => {
        console.log(`Response: ${JSON.stringify(response, null, 4)}`);
        if (response[0].image.data) {
          this.setState({ 
            nightCityDisplayImg: new Buffer(response[0].image.data).toString('base64')
          });
        }
      })
      .catch(err => {
        console.log(`Error retrieving Night City img: ${err}`);
      });
  }

  hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          Good morning Night City!
        </div>
        <div className="col-md-8">
          <img src={`data:image/png;base64,${this.state.nightCityDisplayImg}`} width="100%" height="100%"/>
        </div>
      </div>
    );
  }

}