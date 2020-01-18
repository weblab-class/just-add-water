import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Canvas} from 'react-three-fiber';
import * as fc from '../modules/FlowerComponents';
import * as THREE from 'three';
import GameMap from '../modules/Map';

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

// const isometricRotation = new THREE.Euler(60*Math.PI/180,0,-45*Math.PI/180, "ZXY");
const isometricRotation = new THREE.Euler(-30*Math.PI/180,45*Math.PI/180,0 ,"YXZ");
class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
    this.groundColor = "#8C7A6f"
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    // z axis is coming out of page - remember
    // angle to rotate orthographic camera by for isometric view
    // const isometricRotation = new THREE.Euler(-.8,0,0.8);
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
        <Canvas orthographic={true} camera={{zoom:10, position:[fc.worldLengthX,10,fc.worldLengthZ],rotation:isometricRotation}}>
          <GameMap tiles={[]}/>
        </Canvas>
      </div>
      </>
    );
  }
}

export default Skeleton;
