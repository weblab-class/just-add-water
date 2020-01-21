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
// input switching suddenly broke?? why??? could be the asynchronous setstate thing
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
    this.updatePosition=this.updatePosition.bind(this);

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
    console.log(this.state.tiles);
  }

  updatePosition(id, newXGrid, newZGrid){
    const newArr = this.state.tiles.slice(0);
    tileById(newArr, id).xGrid = newXGrid ;
    tileById(newArr, id).zGrid = newZGrid ;
    console.log(newArr);
    this.setState({tiles:newArr});
  }


  setMoveMode(){
    this.setState({
      canDrag:true,
      canWater:false});
  }

  setWaterMode(){
    console.log('water mode');
    this.setState({
      canWater:true,
      canDrag:false});
    console.log(this.state);
  }
  render() {
    const dragCaption = "click and drag to move plants around";
    const waterCaption = "click a plant to water it";
    // z axis is coming out of page - remember
    return (
      <>
        <div className="caption">{this.state.canDrag ? dragCaption:waterCaption}</div>
        <a className={this.state.canDrag ? "button-drag-active" : "button-drag-inactive"} onClick={this.setMoveMode}></a>
        <a className={this.state.canWater ? "button-water-active":"button-water-inactive"} onClick={this.setWaterMode} ></a>
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
          <gmap.GameMap tiles={this.state.tiles} canDrag={this.state.canDrag} canWater={this.state.canWater} updateGrowth={this.updateGrowth} updatePosition={this.updatePosition}/>
        </Canvas>
      </div>
      </>
    );
  }
}

export default Skeleton;
