import React, {Component} from "react";
import WaterCounter from './WaterCounter';
import {Button, ButtonGroup, SvgIcon} from '@material-ui/core';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import PanToolSharpIcon from '@material-ui/icons/PanToolSharp';
import ColorizeSharpIcon from '@material-ui/icons/ColorizeSharp';
import LocalFloristSharpIcon from '@material-ui/icons/LocalFloristSharp';
import './ControlBar.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

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
            <ButtonGroup orientation="horizontal" className="input-buttons">
            <Button color="primary" onClick={props.addNewRandom}>
              <LocalFloristSharpIcon/>
              Add</Button>
            <Button color="primary" onClick={props.setPickMode}>
              <ColorizeSharpIcon/>
              Pick</Button>
            <Button color="primary" onClick={props.setMoveMode}>
              <PanToolSharpIcon/>
               Move
            </Button>
            <Button color="primary" onClick={props.setDeleteMode}>
              <DeleteSharpIcon/>
              Delete</Button>
            </ButtonGroup>
            {props.inputMode == "view"? <span/>:<ButtonGroup><Button color="primary" onClick={props.setViewMode}>Done</Button></ButtonGroup>}
          </div>
     )
}
export default ControlBar;