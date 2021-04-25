import React, { Component } from "react";
import '../nightcity.css';

export default class ImageArea extends Component {

  constructor(props) {
    super(props);
    this.boxType = props.boxType;
    this.showBox = props.showBox == "true" ? true : false;
    this.state = {
      smallBox: {
        minWidth: '4rem',
        minHeight: '1rem',
        backgroundColor: this.showBox ? 'black' : 'none',
        top: props.top,
        left: props.left,
        position: 'absolute',
        cursor: 'pointer'
      }
    };
  }

  render() {
    return(
      <div style={this.state[this.boxType]}></div>
    );
  }
}