import React, {Component} from 'react';
import LoginButton from "../modules/LoginButton";
import Paper from '@material-ui/core/Paper';
import './Splash.css';
import { Typography } from '@material-ui/core';
function Splash(props){
    return(
        <div className="splash-root">
        <div className="splash-info">
            <h1>welcome to <em>h2gro</em></h1>
            <h2>how does it work?</h2>
            <ol>
                <li>
                    <h3>keep track of how much water you're drinking</h3>
                    <p>each time you hydrate, log it in the app</p>
                </li>
                <li>
                    <h3>use each cup of water to grow flowers</h3>
                    <p>plant seeds and discover new plants by cross-breeding what's growing in your garden</p>
                </li>
                <li>
                    <h3>see what you can make</h3>
                    <p>that's it! log in to start ↗️</p>
                </li>
            </ol>
        </div>  
        <div className="login-pane">
            <div className="brown">
            <div className="loginstuff">
            <span className="login"><LoginButton {...props}/></span>
            </div></div>
        </div>
      </div>
    );
}
export default Splash