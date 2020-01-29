import React, { Component } from "react";
import './Watercounter.css';
function WaterCounter(props){
    /**proptypes
     * @param waterPerDay
     * @param waterConsumed
     * @param cupSize
     */
    console.log(props);
    const waterRemaining = props.waterPerDay-props.waterConsumed;
    const cupsConsumed = Math.round(props.waterConsumed/props.cupSize);
    const cupsRemaining = Math.ceil(waterRemaining/props.cupSize);
    const cupsTotal = Math.ceil(props.waterPerDay/props.cupSize);
    return (
        <div className="water-counter"><a>
            {cupsConsumed} out of {cupsTotal} cups consumed
        </a></div>
    )
}

export default WaterCounter;