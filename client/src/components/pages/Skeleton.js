import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Canvas} from 'react-three-fiber';
import * as maptest from '../../test/MapTest';
import * as THREE from 'three';
import * as gmap from '../modules/Map';
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";
import LoginButton from "../modules/LoginButton";
import WaterCounter from "../modules/WaterCounter";

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
      canWater:false,
      waterPerDay:null,
      cupSize:null,
      waterConsumedToday:null,
    };
    this.groundColor = "#8C7A6f"
    this.setMoveMode=this.setMoveMode.bind(this);
    this.setWaterMode=this.setWaterMode.bind(this);
    this.setViewMode=this.setViewMode.bind(this);
    this.drinkWater = this.drinkWater.bind(this);
    this.handleClickWaterButton=this.handleClickWaterButton.bind(this);

  }

  componentDidMount() {
    get('/api/tilesByUser',{creator_id:"me"}).then(obj =>{
      const tileArr = obj;
      console.log(tileArr);
      this.setState({
        tiles:tileArr
      });
    });
    get('/api/getWaterProfile', {userId:this.props.userId}).then(profile => {
      console.log("got water profile: ", profile);
      this.setState(profile);
    });
  }


  drinkWater(){
    const newWaterConsumed = this.state.waterConsumedToday+this.state.cupSize;
    this.setState({waterConsumedToday:newWaterConsumed});
    post('/api/updateWaterConsumed',{userId:this.props.userId, waterConsumed:newWaterConsumed});
  }

  handleClickWaterButton(){
    this.drinkWater();
    this.setWaterMode();
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

  setViewMode(){
    this.setState({
      canWater:false,
      canDrag:false
    })
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
        <div className="caption">
          {this.state.canDrag ? dragCaption:waterCaption}
          <WaterCounter waterPerDay = {this.state.waterPerDay} waterConsumed = {this.state.waterConsumedToday} cupSize={this.state.cupSize} />
          </div>
        <div className="caption-bottom">design plants <a href="https://ju-de.itch.io/inflorescence">here</a></div>
        <a className={this.state.canDrag ? "button-drag-active" : "button-drag-inactive"} onClick={this.setMoveMode}></a>
        <a className={this.state.canWater ? "button-water-active":"button-water-inactive"} onClick={this.handleClickWaterButton} ></a>
      <div className="canvasContainer">

        <Canvas orthographic={true} camera={{zoom:8, position:[gmap.worldLengthX,25,gmap.worldLengthZ],rotation:isometricRotation}}>
          <gmap.GameMap  tileIDs = {this.state.tileIDs} tiles={this.state.tiles} canDrag={this.state.canDrag} canWater={this.state.canWater}  handleFinishWater={this.setViewMode}/>
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
