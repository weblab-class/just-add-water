import React, {Component} from "react";
import WaterCounter from './WaterCounter';
import {Button, ButtonGroup, SvgIcon} from '@material-ui/core';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import PanToolSharpIcon from '@material-ui/icons/PanToolSharp';
import ColorizeSharpIcon from '@material-ui/icons/ColorizeSharp';
import LocalFloristSharpIcon from '@material-ui/icons/LocalFloristSharp';
import './ControlBar.css';
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
            <a className={props.inputMode == "water" ? "button-water button-water-active":"button-water button-water-inactive"} onClick={props.handleClickWaterButton} ></a>
            <ButtonGroup orientation="horizontal" className="input-buttons">
            <Button onClick={props.addNewRandom}>
              <LocalFloristSharpIcon/>
              Add</Button>
            <Button onClick={props.setPickMode}>
              <ColorizeSharpIcon/>
              Pick</Button>
            <Button onClick={props.setMoveMode}>
              <PanToolSharpIcon/>
               Move
            </Button>
            <Button onClick={props.setDeleteMode}>
              <DeleteSharpIcon/>
              Delete</Button>
            </ButtonGroup>
            {props.inputMode == "view"? <span/>:<ButtonGroup><Button onClick={props.setViewMode}>Done</Button></ButtonGroup>}
          </div>
     )
}
export default ControlBar;