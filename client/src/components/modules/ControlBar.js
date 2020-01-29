import React, {Component} from "react";
import WaterCounter from './WaterCounter';
import {Button, ButtonGroup} from '@material-ui/core';
function ControlBar(props){
    /**prop types
     * @param addNewRandom
     * @param setPickMode
     * @param setMoveMode
     * @param setDeleteMode
     * @param setViewMode
     */

     return(
          <div className="control-bar">
            <a className={props.inputMode == "water" ? "button-water-active":"button-water-inactive"} onClick={props.handleClickWaterButton} ></a>
            <ButtonGroup orientation="vertical">
            <Button onClick={props.addNewRandom}>Add</Button>
            <Button onClick={props.setPickMode}>Pick</Button>
            <Button onClick={props.setMoveMode}>Move</Button>
            <Button onClick={props.setDeleteMode}>Delete</Button>
            {props.inputMode == "view"? <span/>:<Button onClick={props.setViewMode}>Done</Button>}
            </ButtonGroup>
          </div>
     )
}
export default ControlBar;