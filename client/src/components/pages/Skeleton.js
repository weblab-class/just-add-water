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

function getTile (tileArr, x,z){
    const tile = tileArr.find(tile => tile.xGrid === x && tile.zGrid === z);
    return tile;
}

function tileById(tileArr, id){
  const tile = tileArr.find(tile => tile._id == id);
  return tile;
}
// const isometricRotation = new THREE.Euler(60*Math.PI/180,0,-45*Math.PI/180, "ZXY");
const isometricRotation = new THREE.Euler(-30*Math.PI/180,45*Math.PI/180,0 ,"YXZ");
class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      tiles:maptest.mapDiffGrowth.tiles,
      canDrag:false,
      canWater:true,
    };
    this.groundColor = "#8C7A6f"
    this.setMoveMode=this.setMoveMode.bind(this);
    this.setWaterMode=this.setWaterMode.bind(this);
    this.updateGrowth=this.updateGrowth.bind(this);

  }

  componentDidMount() {
    console.log(this.state.tiles)
    // remember -- api calls go here!
  }

  // construct well organized tile array in beginning?
  updateGrowth(id, increment){
    // immutable array because react won't update it if you change elements, this makes a copy
    const newArr = this.state.tiles.slice(0);
    tileById(newArr, id).growthState += increment;
    this.setState({tiles:newArr});
  }


  setMoveMode(){
    this.setState({
      canDrag:true,
      canWater:false});
    console.log("move mode set");
  }

  setWaterMode(){
    this.setState({
      canWater:true,
      canDrag:false});
  }
  render() {
    // z axis is coming out of page - remember
    return (
      <>
        <button onClick={this.setMoveMode}>move</button>
        <button onClick={this.setWaterMode}>water</button>
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
          <gmap.GameMap tiles={this.state.tiles} canDrag={this.state.canDrag} canWater={this.state.canWater} updateGrowth={this.updateGrowth}/>
        </Canvas>
      </div>
      </>
    );
  }
}

export default Skeleton;
