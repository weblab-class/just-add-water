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
            <ButtonGroup orientation="vertical">
            <Button onClick={props.addNewRandom}>
              <LocalFloristSharpIcon/>
              Add</Button>
            <Button onClick={props.setPickMode}>
              <ColorizeSharpIcon/>
              Pick</Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical">
            <Button onClick={props.setMoveMode}>
              <PanToolSharpIcon/>
               Move
            </Button>
            <Button onClick={props.setDeleteMode}>
              <DeleteSharpIcon/>
              Delete</Button>
            </ButtonGroup>
            {props.inputMode == "view"? <span/>:
            <ButtonGroup orientation="vertical">
              // todo - add icons. also the whole button bar could be flexbox?
              <Button onClick={props.setViewMode}>Done</Button>
              <Button onClick={props.setViewMode}>Cancel</Button>
            </ButtonGroup>
            }
          </div>
     )
}
export default ControlBar;