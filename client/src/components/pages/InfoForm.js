import React, { Component } from 'react';
import { Button, Slider, FormGroup, InputLabel, TextField, FormControlLabel, RadioGroup, Radio, FormLabel } from '@material-ui/core';
import { get, post } from "../../utilities";
export class InfoForm extends Component {
    /** Prop types:
     * @param userId: String
     */
    constructor(props) {
        super(props);
        this.state = {
            weight: null,
            activity: null,
            cupSize: null,
            age:null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    saveWaterInfo(){
        post('/api/setWaterInfo', {userId: this.props.userId, weight:this.state.weight, activity:this.state.activity, cupSize:this.state.cupSize});
    }
    handleChange(event) {
        console.log(event);
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        // route to game screen or next part of tutorial
        this.saveWaterInfo();
    }
    render() {
        return (<div>
            <h1>let's get started</h1>
            <FormGroup>
                <TextField name="weight" id="weight" type='number' label="weight" required={true} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
                <TextField name="age" id="age" type='number' label="age" required={true} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
                <InputLabel id="cup-label">my typical cup of water is</InputLabel>
                <Slider name="cupSize" type="number" label="cup-label" marks={[{ value: 8, label: "8 oz" }, { value: 16, label: "16 oz" }, { value: 32, label: "32 oz" }]} step={2} min={2} max={32} valueLabelDisplay="auto" valueLabelFormat={(num) => (JSON.stringify(num) + " oz")} onChange={(event, value) => this.setState({ cupSize: value })} />
            </FormGroup>
            <FormGroup>
                <FormLabel>on average, I get ___ minutes of exercise per day</FormLabel>
                <Slider name="activity" type="number" 
                marks={true, [{value:15,label:"15 min"}, {value:30, label:"30 min"}, {value:45, label:"45 min"},{value:60, label:">60 min"}]} step={5} min={0} max={60} valueLabelDisplay="auto"  onChange={(event, value) => this.setState({ activity: value })} />
            </FormGroup>
            <Button>next</Button >
        </div>);
    }
}
