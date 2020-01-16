import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import ThreeScene from '../modules/ThreeScene';
import { Canvas} from 'react-three-fiber';
import FiberScene from '../modules/FiberScene';


import "../../utilities.css";
import "./Skeleton.css";


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
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
      <Canvas>
        <FiberScene />
      </Canvas>
      </>
    );
  }
}

export default Skeleton;
