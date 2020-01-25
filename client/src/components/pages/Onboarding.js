import React, {Component} from 'react';
import {Button, Slider, FormGroup, InputBase, InputLabel, TextField, InputAdornment, FormControlLabel, RadioGroup, Radio, FormLabel} from '@material-ui/core';
import { get, post } from "../../utilities";
function Welcome(){
    return(
        <>
            <h1>welcome to h2gro</h1>
            <ol>
                <li>track</li>
                <li>grow</li>
                <li>create</li>
            </ol>
            <Button>get started</Button>
        </>
    )
}
class InfoForm extends Component{
    /** Prop types:
     * @param userId: String 
     */
    constructor(props){
        super(props);
        this.state = {
            weight:null,
            activity:null,
            cupSize:null
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event){
        console.log(event);
        this.setState({[event.target.name]:event.target.value});
    }
    handleSubmit(event){

    }
    render() {
        return(<div>
            <h1>let's get started</h1>
            <FormGroup>
                <InputLabel id="weight-label">I weigh about</InputLabel>
                <TextField name="weight" 
                    id="weight" 
                    type='number' 
                    label="weight"
                    required= {true}
                    onChange={this.handleChange}
                    />
            </FormGroup>
            <FormGroup>
                <InputLabel id="cup-label">my typical cup of water is</InputLabel>
                <Slider name="cupSize" type="number" label="cup-label" marks={
                    [{value:8, label:"8 oz"}, {value:16, label:"16 oz"}, {value:32, label:"32 oz"}]} step={2} min={2} max={32} valueLabelDisplay="auto" valueLabelFormat={(num) => (JSON.stringify(num) + " oz")} onChange={(event, value) => this.setState({cupSize:value})} 
                    />
            </FormGroup>
            <FormGroup>
                <FormLabel>my activity level is</FormLabel>
                <RadioGroup name="activity" onChange={this.handleChange}>
                    <FormControlLabel value="low" label="sedentary (0-5 minutes/day)" labelPlacement="end" control={<Radio/>}/>
                    <FormControlLabel value="medium" label="medium (15-30 minutes/day)" labelPlacement="end" control={<Radio/>}/>
                    <FormControlLabel value="high" label="high (2 or more hours/day)" labelPlacement="end" control={<Radio/>}/>
                </RadioGroup>
            </FormGroup>
            <Button>next</Button>
        </div>)
    }
}
class Onboarding extends Component{
    /** Prop types:
     * @param parent: component
     * @param onChange: function
     */
    constructor(props){
        super(props);
    }
    // have both parts on one page for web, or scrolling for mobile
    // then - design your first flower (limited slider version)
    // place it on map (with one other randomly generated flower)
    // animation to show pollination
    // log water to see what you get
    render(){
        return(
            <>
            <Welcome/>
            <InfoForm {...this.props}/>
            </>
        )
    }
}

export default Onboarding;