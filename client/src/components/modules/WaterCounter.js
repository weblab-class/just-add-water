import React, { Component } from "react";
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
        <div>
            {cupsConsumed} out of {cupsTotal} cups consumed
        </div>
    )
}

export default WaterCounter;