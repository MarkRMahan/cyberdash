import React, { Component } from "react";

export default class ZoneType extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="zone-type">
        <div className="zone-threat-level"></div>
        <span>{this.props.zoneText}</span>
      </div>
    );
  }
}