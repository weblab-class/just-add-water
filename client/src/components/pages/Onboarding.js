import React, {Component} from 'react';
import {Button, Slider, FormGroup, InputBase, InputLabel, TextField, InputAdornment} from '@material-ui/core';
function Welcome(){
    return(
        <>
            <h1>welcome to h2gro</h1>
            <h2>how does it work?</h2>
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