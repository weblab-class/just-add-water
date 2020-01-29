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
        <div className="water-counter"><a>
            <div className="water-counter-text">
                {cupsConsumed} out of {cupsTotal} cups consumed
            </div>
            <LinearProgress variant="determinate" value={progressBarVal>= 100 ? completed : progressBarVal} />
        </a></div>
    )
}

export default WaterCounter;