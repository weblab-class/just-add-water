import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Canvas} from 'react-three-fiber';
import * as Examples from '../../js-plant-gen/ExampleFlowers';
import * as fc from '../modules/FlowerComponents';
import * as THREE from 'three';

import "../../utilities.css";
import "./Skeleton.css";


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

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
    const isometricRotation = new THREE.Euler(60*Math.PI/180,0,-45*Math.PI/180, "ZXY");
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
        <Canvas orthographic={true} camera={{zoom:10, position:[-10,0,0], rotation:isometricRotation}}>
          <hemisphereLight intensity={0.7}/>
          <spotLight position={[15,20,15]} />
          <ambientLight intensity={0.1}/>
          <fc.flowerModel flowerData={Examples.blueSixPetals} position={[10,0,0]}/>
          <fc.flowerModel flowerData={Examples.poppy} position={[10,10,0]} />
          <fc.tile/>
        </Canvas>
      </div>
      </>
    );
  }
}

export default Skeleton;
