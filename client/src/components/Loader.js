import React, { Component } from "react";
import "./style/Loader.css";
export default class Loader extends Component {
  render() {
    return (
      <>
        <div className="spinnerClock">
          <div className="spinnerClock__clock"></div>
          <div className="spinnerClock__minHand"></div>
          <div className="spinnerClock__secHand"></div>
        </div>
      </>
    );
  }
}
