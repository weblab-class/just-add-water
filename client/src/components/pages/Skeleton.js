import React, { Component } from "react";
import {Button} from '@material-ui/core';
import { Canvas} from 'react-three-fiber';
import * as maptest from '../../test/MapTest';
import * as THREE from 'three';
import * as gmap from '../modules/Map';
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";
import LoginButton from "../modules/LoginButton";
import WaterCounter from "../modules/WaterCounter";
import {yellowStar, blueSixPetals} from '../../test/ExampleFlowers';

// const isometricRotation = new THREE.Euler(60*Math.PI/180,0,-45*Math.PI/180, "ZXY");
const isometricRotation = new THREE.Euler(-30*Math.PI/180,45*Math.PI/180,0 ,"YXZ");
class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      // tiles:maptest.mapDiffGrowth.tiles,
      tiles:[],
      waterPerDay:null,
      cupSize:null,
      waterConsumedToday:null,
      captionText : "click the cup to drink water",
      inputMode:"view",
      plantToAdd:blueSixPetals,
      parent1:null,
    };
    this.groundColor = "#8C7A6f"
    this.setMoveMode=this.setMoveMode.bind(this);
    this.setWaterMode=this.setWaterMode.bind(this);
    this.setViewMode=this.setViewMode.bind(this);
    this.setAddMode=this.setAddMode.bind(this);
    this.setDeleteMode=this.setDeleteMode.bind(this);
    this.drinkWater = this.drinkWater.bind(this);
    this.handleClickWaterButton=this.handleClickWaterButton.bind(this);
    this.handleClickAddMode=this.handleClickAddMode.bind(this);
    this.getMapData=this.getMapData.bind(this);

    // testing flags
    this.unlimitedWater = true;
  }

  componentDidMount() {
    if (this.props.userId){
      this.getMapData();
      this.getWaterData();
    }
  }
  componentDidUpdate(){
    if(!this.state.waterPerDay){
      this.getWaterData();
    }
    if(this.state.tiles.length == 0){
      this.getMapData();
    }
  }

  getMapData(){
    console.log("fetching map...");
    get('/api/tilesByUser',{creator_id:this.props.userId}).then(obj =>{
      const tileArr = obj;
      console.log("loaded map: ", tileArr);
      this.setState({
        tiles:tileArr
      });
    });
  }
  getWaterData(){
    get('/api/getWaterProfile', {userId:this.props.userId}).then(profile => {
      console.log("got water profile: ", profile);
      this.setState(profile);
    });
  }

  handleClickPickMode = params =>{
    const parent = params.flower;
    this.setState({parent1:parent});
  }
  handleClickAddMode(params){
    this.setState({caption:"added plant"});
    this.getMapData();
  }

  drinkWater(){
    const newWaterConsumed = this.state.waterConsumedToday+this.state.cupSize;
    this.setState({waterConsumedToday:newWaterConsumed});
    post('/api/updateWaterConsumed',{userId:this.props.userId, waterConsumed:newWaterConsumed});
  }

  hasConsumedMaxWater(){
    return this.state.waterConsumedToday >= this.state.waterPerDay;
  }

  handleClickWaterButton(){
    if (this.unlimitedWater || !this.hasConsumedMaxWater()){
      this.drinkWater();
      this.setWaterMode();
    }
    else{
      this.setState({captionText:"you have already finished your water for today"})
    }
  }

  setMoveMode(){
    const dragCaption = "click and drag to move plants around";
    this.setState({
      captionText:dragCaption,
      inputMode:"move",});
  }

  setAddMode(){
    this.setState({
      captionText:"click to add a flower",
      inputMode:"add"
    })
  }

  setPickMode(){
    this.setState({
      captionText: "click two flowers to cross them",
      inputMode:"pick"
    })
  }

  setDeleteMode(){
    this.setState({
      captionText:"click a plant to delete",
      inputMode:"delete"
    })
  }

  setWaterMode(){
    const waterCaption = "click a plant to water it";
    this.setState({
      captionText:waterCaption,
      inputMode:"water"
    });
  }

  setViewMode(){
    this.setState({
      inputMode:"view"
    })
  }

  setPickMode = () =>{
    this.setState({
      inputMode:"pick",
      captionText: "click to select plants"
    })
  }
  render() {
    console.log("state when rendering",this.state);
    // z axis is coming out of page - remember
    return (
      <div id="game">

      <LoginButton {...this.props}/>
      {/* {true ? ( */}
      {this.props.userId ? (
      <div>
        <div className="caption">
          {this.state.captionText}
          <WaterCounter waterPerDay = {this.state.waterPerDay} waterConsumed = {this.state.waterConsumedToday} cupSize={this.state.cupSize} />
        <Button onClick={this.setDeleteMode}>Delete</Button>
        <Button onClick={this.setAddMode}>Add</Button>
        <Button onClick={this.setPickMode}>Pick</Button>
          </div>
        <div className="caption-bottom">design plants <a href="https://ju-de.itch.io/inflorescence">here</a></div>
        <a className={this.state.inputMode == "move" ? "button-drag-active" : "button-drag-inactive"} onClick={this.setMoveMode}></a>
        <a className={this.state.inputMode == "water" ? "button-water-active":"button-water-inactive"} onClick={this.handleClickWaterButton} ></a>
      <div className="canvasContainer">

        <Canvas orthographic={true} camera={{zoom:8, position:[gmap.worldLengthX,25,gmap.worldLengthZ],rotation:isometricRotation}}>
          <gmap.GameMap  tileIDs = {this.state.tileIDs} tiles={this.state.tiles}
            inputMode={this.state.inputMode}
            // this.getMapData() here so that Map component always has fresh data
            handleFinishWater={()=>{this.getMapData();this.setViewMode();} }
            canAdd={this.state.canAdd} plantToAdd={this.state.plantToAdd} 
            handleClickAddMode={this.handleClickAddMode}
            handleClickPickMode={this.handleClickPickMode}
            userId={this.state.userId} />
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
