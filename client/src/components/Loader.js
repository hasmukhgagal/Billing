import React, { Component } from "react";
import "./style/Loader.css"
export default class Loader extends Component {
  render() {
		return(
    <>
			<div class='spinnerClock'>
				<div class="spinnerClock__clock"></div>
				<div class="spinnerClock__minHand"></div>
				<div class="spinnerClock__secHand"></div>
			</div>
    </>
		)
    }
}