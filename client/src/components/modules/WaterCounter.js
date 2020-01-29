import React, { Component, img } from "react";
import './WaterCounter.css'
function WaterCounter(props){
    /**proptypes
     * @param waterPerDay
     * @param waterConsumed
     * @param cupSize
     * @param inputMode
     * @param handleClickWaterButton
     */
    console.log(props);
    const waterRemaining = props.waterPerDay-props.waterConsumed;
    const cupsConsumed = Math.round(props.waterConsumed/props.cupSize);
    const cupsRemaining = Math.ceil(waterRemaining/props.cupSize);
    const cupsTotal = Math.ceil(props.waterPerDay/props.cupSize);
    return (<div>
        <div className="water-top"/>
        <div className="water-counter">
            </div>
            </div>)
}

export default WaterCounter;