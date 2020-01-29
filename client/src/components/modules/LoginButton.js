import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import './LoginButton.css';
const GOOGLE_CLIENT_ID = "165089793235-ovm7mojq6cb3advrbqmis38sqqk144jt.apps.googleusercontent.com";
function LoginButton(props){
    return( <div className="login-button">
    {props.userId ? (
        <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={props.handleLogout}
        onFailure={(err) => console.log(err)}
        />
    ) : (
        <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={props.handleLogin}
        onFailure={(err) => console.log(err)}
        />
    )}</div>)
}
export default LoginButton;