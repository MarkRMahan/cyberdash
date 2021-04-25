import React, { Component } from "react";
import ImageDataService from "../services/image.service";
import '../nightcity.css';

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

  logToConsole() {
    console.log("Clicked");
  }

  hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
  }

  render() {
    return (
      <div className="h-100 nc-row">
        <div className="nc-col h-100 img-container">
          <img src={`data:image/png;base64,${this.state.nightCityDisplayImg}`} className="night-city-img" useMap="#nightcitymap"/>
        </div>
        <div className="nc-col">
          Get this text on the right
        </div>
      </div>
    );
  }

}