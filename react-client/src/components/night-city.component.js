import React, { Component } from "react";
import ImageDataService from "../services/image.service";
import ImageArea from './image-area.component';
import '../nightcity.css';
import ImageMapper from 'react-img-mapper';

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
    const myMap = {
      name: 'my-map',
      areas: [
        {
          "id": "469f9800-c45a-483f-b13e-bd24f3fb79f4",
          "title": "Hardwood",
          "shape": "poly",
          "name": "1",
          "fillColor": "#eab54d4d",
          "strokeColor": "black",
          "coords": [
            520.0646766169153,
            393.0348258706467,
            85.23880597014923,
            378.6069651741293,
            637,
            479,
            13.099502487562177,
            478.10945273631836,
            11.606965174129343,
            438.3084577114427
          ],
          "polygon": [
            [
              520.0646766169153,
              393.0348258706467
            ],
            [
              85.23880597014923,
              378.6069651741293
            ],
            [
              637,
              479
            ],
            [
              13.099502487562177,
              478.10945273631836
            ],
            [
              11.606965174129343,
              438.3084577114427
            ]
          ]
        }
      ]
    }
    return (
      <div className="h-100 nc-row">
        <div className="nc-col h-100 img-container">
          <ImageMapper src={`data:image/png;base64,${this.state.nightCityDisplayImg}`} map={myMap} onClick={this.logToConsole}/>
          {/* <img src={`data:image/png;base64,${this.state.nightCityDisplayImg}`} className="night-city-img"/> */}
          <div id="image-areas">
            <ImageArea id="executive-zone" boxType="smallBox" top="30.6%" left="77.5%" showBox="true"/>
            
          </div>
        </div>
        <div  className="nc-col">
          Get this text on the right
        </div>
      </div>
    );
  }

}