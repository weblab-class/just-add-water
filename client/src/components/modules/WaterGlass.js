import React from 'react';
import './WaterGlass.css'
function WaterGlass(props){
    /** 
     * @param handleClickWaterButton
     * @param inputMode
     */
    return(
        <div className="glass">
            <a className={props.inputMode == "water" ? "button-water button-water-active":"button-water button-water-inactive"} onClick={props.handleClickWaterButton} ></a>
        </div>
    )
}
export default WaterGlass