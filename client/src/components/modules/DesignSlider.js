import React, { Component } from 'react';
import { Button, Slider, FormGroup, InputLabel, TextField, FormControlLabel, RadioGroup, Radio, FormLabel } from '@material-ui/core';
function DesignSlider(props){
    /** proptypes
     * @param parent slider container component in which to set state
     * @param min
     * @param max
     * @param step
     * @param name
     */
    return(
        <FormGroup>
        <InputLabel id={props.name+"Label"}>{props.labelText}</InputLabel>
        <Slider 
            name={props.name}
            min = {props.min}
            max = {props.max}
            step={props.step}
            onChange={(event, value)=>props.parent.setState({[props.name]:value})}
            getAriaLabel={num=>num.toString()} 
            type={"number"}
            value={props.parent.state[props.name]}
            />
        </FormGroup>    )
}
export default DesignSlider;