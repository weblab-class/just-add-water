import React, {Component} from 'react';
import {Button, InputBase, InputAdornment} from '@material-ui/core';
import LoginButton from '../modules/LoginButton'
import { InfoForm } from './InfoForm';
import './Onboarding.css';
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
            <div className="container">
                <LoginButton{...this.props}/>
            <InfoForm userId={this.props.userId}/>
            <div className="next"></div>
            </div>
        )
    }
}

export default Onboarding;