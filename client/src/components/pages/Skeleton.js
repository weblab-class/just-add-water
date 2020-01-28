import React, { Component } from "react";
import {Button,ButtonGroup} from '@material-ui/core';
import { Canvas} from 'react-three-fiber';
import * as maptest from '../../test/MapTest';
import * as THREE from 'three';
import * as gmap from '../modules/Map';
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Skeleton.css";
import LoginButton from "../modules/LoginButton";
import WaterCounter from "../modules/WaterCounter";
import {hybridize, randomFlower} from "../modules/hybridize.js";
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
    };
    this.groundColor = "#8C7A6f"
    this.parent1 = null; this.parent2 = null;
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
    if (this.state.inputMode="pick"){
      console.log("picked flower: ", params.flower);
      if (!this.parent1){
        this.parent1 = params.flower;
        this.setState({
          parent1:params.flower,
          captionText:"pick a second flower"
        });
      }
      else if (!this.parent2){
        this.parent2 = params.flower;
        this.setState({
          plantToAdd:hybridize(this.parent1, this.parent2),
          captionText:"select a spot to plant this seed",
          inputMode:"add"
        })
        this.parent1 = null; this.parent2 = null;
      }
    }
  }

  handleClickAddMode(params){
    this.setState({caption:"added plant"});
    this.getMapData();
    this.setViewMode();
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
    this.getMapData();
    this.setState({
      captionText:"click to add a flower",
      inputMode:"add"
    })
  }

  addNewRandom = () =>{
    const newFlower = randomFlower();
    this.setState({
      plantToAdd:newFlower
    })
    this.setAddMode();
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
    this.getMapData();
    this.setState({
      inputMode:"view",
      captionText:""
    })
  }

  setPickMode = () =>{
    this.setState({
      inputMode:"pick",
      captionText: "click to select plants"
    })
  }
  handleDelete = (params)=>{
    try{
      this.getMapData()
    }
    catch {
      let newTileArr = this.state.tiles;
      newTileArr[newTileArr.findIndex(tile._id=params.id)].isDeleted = true;
      this.setState(
        {tiles:newTileArr}
      )
    }
  }
  handleFinishWater=() =>{
    this.setViewMode();
    // wait for animation to finish before refreshing map
    setTimeout(() => this.getMapData(), 600)
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
          </div>

          <div className="control-bar">
            <a className={this.state.inputMode == "water" ? "button-water-active":"button-water-inactive"} onClick={this.handleClickWaterButton} ></a>
            <ButtonGroup orientation="vertical">
            <Button onClick={this.addNewRandom}>Add</Button>
            <Button onClick={this.setPickMode}>Pick</Button>
            <Button onClick={this.setMoveMode}>Move</Button>
            <Button onClick={this.setDeleteMode}>Delete</Button>
            {this.state.inputMode == "view"? <span/>:<Button onClick={this.setViewMode}>Done</Button>}
            </ButtonGroup>
          </div>
        <div className="caption-bottom">design plants <a href="https://ju-de.itch.io/inflorescence">here</a></div>
        {/* <a className={this.state.inputMode == "move" ? "button-drag-active" : "button-drag-inactive"} onClick={this.setMoveMode}></a> */}
      <div className="canvasContainer">

        <Canvas orthographic={true} camera={{zoom:8, position:[gmap.worldLengthX,25,gmap.worldLengthZ],rotation:isometricRotation}}>
          <gmap.GameMap  tileIDs = {this.state.tileIDs} tiles={this.state.tiles}
            inputMode={this.state.inputMode}
            handleFinishWater={this.handleFinishWater} 
            canAdd={this.state.canAdd} plantToAdd={this.state.plantToAdd} 
            handleClickAddMode={this.handleClickAddMode}
            handleClickPickMode={this.handleClickPickMode}
            handleDelete = {this.handleDelete}
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
