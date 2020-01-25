import React, {Component} from 'react';
import {Button, InputBase, InputAdornment} from '@material-ui/core';
import LoginButton from '../modules/LoginButton'
import { InfoForm } from './InfoForm';
function Welcome(props){
    return(
        <>
            <LoginButton {...props}/>
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
class Onboarding extends Component{
    /** Prop types:
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
            <Welcome {...this.props}/>
            <InfoForm userId={this.props.userId}/>
            </>
        )
    }
}

export default Onboarding;