import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Canvas} from 'react-three-fiber';
import * as maptest from '../../test/MapTest';
import * as THREE from 'three';
import * as gmap from '../modules/Map';

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

// const isometricRotation = new THREE.Euler(60*Math.PI/180,0,-45*Math.PI/180, "ZXY");
const isometricRotation = new THREE.Euler(-30*Math.PI/180,45*Math.PI/180,0 ,"YXZ");
const moveMode = {
  canDrag:true,
  canWater:false,
  handleChange:null
}
const waterMode={
  canDrag: true,
  canWater:false,
  handleChange:null
}
class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      mapToUse:maptest.mapDiffGrowth,
      canDrag:false,
      canWater:false,
    };
    this.groundColor = "#8C7A6f"
    this.setMoveMode=this.setMoveMode.bind(this);
    this.setWaterMode=this.setWaterMode.bind(this);
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  setMoveMode(){
    this.setState({canDrag:true});
    console.log("move mode set");
  }

  setWaterMode(){
    this.setState({canDrag:false});
  }
  render() {
    // z axis is coming out of page - remember
    return (
      <>
        <button onClick={this.setMoveMode}>move</button>
        <button onClick={this.setWaterMode}>no move</button>
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
        <Canvas orthographic={true} camera={{zoom:10, position:[gmap.worldLengthX,25,gmap.worldLengthZ],rotation:isometricRotation}}>
          <gmap.GameMap {...this.state.mapToUse} canDrag={this.state.canDrag}/>
        </Canvas>
      </div>
      </>
    );
  }
}

export default Skeleton;
