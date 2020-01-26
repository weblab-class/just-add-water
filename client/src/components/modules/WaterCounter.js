import React, { Component } from "react";
function WaterCounter(props){
    /**proptypes
     * @param waterPerDay
     * @param waterConsumed
     * @param cupSize
     */
    console.log(props);
    const waterRemaining = props.waterPerDay-props.waterConsumed;
    const cupsConsumed = props.waterConsumed/props.cupSize;
    const cupsRemaining = waterRemaining/props.cupSize;
    const cupsTotal = props.waterPerDay/props.cupSize;
    return (
        <div>
            {cupsConsumed} out of {cupsTotal} cups consumed
        </div>
    )
}

export default WaterCounter;