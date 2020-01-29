import React, { Component } from "react";
import './WaterCounter.css';
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

    const progressBarVal = 100*(props.waterConsumed/props.waterPerDay);
    return (
        <div className="water-counter">
            <div className="water-counter-text">
                <span className="number">{cupsConsumed}/{cupsTotal} </span>
            cups logged today</div>
            {progressBarVal >= 100 ? <div> congrats! you're done for the day </div> :<></>}
            <LinearProgress className="water-bar" color="secondary" variant="determinate" value={progressBarVal} />
        </div>
    )
}

export default WaterCounter;