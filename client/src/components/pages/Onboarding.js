import React, {Component} from 'react';
import {Button, Slider, FormGroup, InputBase, InputLabel, TextField, InputAdornment} from '@material-ui/core';
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
     * @param parent: component
     * @param onChange: function
     */
    constructor(props){
        super(props);
    }
    render() {
        return(<div>
            <h1>let's get started</h1>
            <FormGroup>
                <InputLabel id="weight-label">I weigh about</InputLabel>
                <TextField 
                    id="weight" 
                    type='number' 
                    label="weight"
                    required= {true}
                    />
            </FormGroup>
            <FormGroup>
                <InputLabel>my typical cup of water is</InputLabel>
                <a>mult. choice labels with units</a>
            </FormGroup>
            <FormGroup>
                <InputLabel>my activity level is</InputLabel>
                <p>sedentary/medium/high</p>
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