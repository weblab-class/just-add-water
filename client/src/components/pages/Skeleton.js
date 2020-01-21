import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Game from "../modules/Game";

import "../../utilities.css";
import "./Skeleton.css";

const GOOGLE_CLIENT_ID = "165089793235-ovm7mojq6cb3advrbqmis38sqqk144jt.apps.googleusercontent.com";
// input switching suddenly broke?? why??? could be the asynchronous setstate thing
class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    // z axis is coming out of page - remember
    return (
      <>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}

      <div className="canvasContainer">
        <Game/>
      </div>
      </>
    );
  }
}

export default Skeleton;
