import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Canvas} from 'react-three-fiber';
import * as maptest from '../../test/MapTest';
import * as THREE from 'three';
import * as gmap from '../modules/Map';
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";
import LoginButton from "../modules/LoginButton"

const GOOGLE_CLIENT_ID = "165089793235-ovm7mojq6cb3advrbqmis38sqqk144jt.apps.googleusercontent.com";
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
      // tiles:maptest.mapDiffGrowth.tiles,
      tiles:[],
      tileIDs:[],
      canDrag:false,
      canWater:true,
    };
    this.groundColor = "#8C7A6f"
    this.setMoveMode=this.setMoveMode.bind(this);
    this.setWaterMode=this.setWaterMode.bind(this);

  }

  componentDidMount() {
    get('/api/tilesByUser',{creator_id:"me"}).then(obj =>{
      const tileArr = obj;
      console.log(tileArr);
      this.setState({
        tiles:tileArr
      });
    });
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
    console.log("state when rendering",this.state);
    const dragCaption = "click and drag to move plants around";
    const waterCaption = "click a plant to water it";
    // z axis is coming out of page - remember
    return (
      <div id="game">

      <LoginButton {...this.props}/>
      {this.props.userId ? (
      <div>
        <div className="caption">{this.state.canDrag ? dragCaption:waterCaption}</div>
        <div className="caption-bottom">design plants <a href="https://ju-de.itch.io/inflorescence">here</a></div>
        <a className={this.state.canDrag ? "button-drag-active" : "button-drag-inactive"} onClick={this.setMoveMode}></a>
        <a className={this.state.canWater ? "button-water-active":"button-water-inactive"} onClick={this.setWaterMode} ></a>
      <div className="canvasContainer">

        <Canvas orthographic={true} camera={{zoom:8, position:[gmap.worldLengthX,25,gmap.worldLengthZ],rotation:isometricRotation}}>
          <gmap.GameMap  tileIDs = {this.state.tileIDs} tiles={this.state.tiles} canDrag={this.state.canDrag} canWater={this.state.canWater} updateGrowth={this.updateGrowth} />
        </Canvas>

      </div>
      </div>) : (
        <div className="loginMessage">login to begin</div>
        )
      }
      </div>
    );
  }
}

export default Skeleton;
