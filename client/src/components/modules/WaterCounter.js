import React, { Component } from "react";
import './Watercounter.css';
import {LinearProgress} from "@material-ui/core";
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

    const progressBarVal = 100*(props.waterconsumed/props.waterPerDay);
    return (
        <div className="water-counter">
            <div className="water-counter-text">
                <span className="number">{cupsConsumed}/{cupsTotal} </span>
                  cups logged today</div>
            <LinearProgress className="water-bar" variant="determinate" value={progressBarVal>= 100 ? completed : progressBarVal} />
        </div>
    )
}

export default WaterCounter;