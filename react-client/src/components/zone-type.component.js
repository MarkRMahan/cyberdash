import React, { Component } from "react";

export default class ZoneType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blue: "rgb(88,100,255)",
      green: "linear-gradient(rgba(42,112,37,1) 50%, rgba(89,176,120,1) 50%)",
      orange: "linear-gradient(rgba(255,106,0,1) 50%, rgba(255,166,93,1) 50%)",
      red: "linear-gradient(rgba(240,63,63,1) 50%, rgba(244,123,123,1) 50%)",
      black: "rgb(0,0,0)",
      white: "rgb(255,255,255)"
    };

  }

  componentDidMount() {
    const zone = document.querySelector(`.zone-type-${this.props.zoneColor}`);
    const pageZoneDesc = document.getElementById("zoneDescription");
    zone.addEventListener("click", (event) => {
      pageZoneDesc.innerHTML = this.props.zoneText;
    });
  }

  render() {
    return (
      <div className={`zone-type zone-type-${this.props.zoneColor}`}>
        <div className=" zone-threat-level" style={{background: this.state[this.props.zoneColor]}}></div>
        <span>{this.props.zoneHeader}</span>
      </div>
    );
  }
}