import React, { Component } from 'react';
import "./Designer.css";
import * as examples from './../../test/ExampleFlowers';
import FlowerViewport from './FlowerViewport';
import { Button, Slider, FormGroup, InputLabel, TextField, FormControlLabel, RadioGroup, Radio, FormLabel } from '@material-ui/core';
import DesignSlider from "./DesignSlider";
class Designer extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...examples.blueSixPetals,
      growthState:1,
      alwaysShowFlower:true
    }
    this.onChange = this.onChange.bind(this);
    this.onLeafChange = this.onLeafChange.bind(this);
  }
  onChange(event){
    this.setState( {[event.target.name]: parseFloat(event.target.value)});
  }
  onLeafChange(event){
    this.setState({[event.target.name]: parseFloat(event.target.value)});
  }
  onColorChange(color,event){
    this.setState( ...{flowerColor:color.hex});
  }
  /** object containing current flower stats, from which this model can be recreated */
  getFlowerData(){
    // only get flower stats, since state contains many things
    const flowerData = {
      numPetals:this.state.numPetals,
      petalLength:this.state.petalLength,
      petalPitch : this.state.petalPitch,
      petalInnerXRelative:this.state.petalInnerXRelative,
      petalOuterXRelative:this.state.petalOuterXRelative,
      petalInnerYRelative:this.state.petalInnerYRelative,
      petalOuterYRelative:this.state.petalOuterYRelative,
      flowerColor:this.state.flowerColor,
      leafStemColor:this.state.leafStemColor,
      leafRotAngle:this.state.leafRotAngle,
      leafLength:this.state.leafLength,
      leafSpacing:this.state.leafSpacing,
      stemHeight:this.state.stemHeight,
      leafInner:this.state.leafInner,
      leafOuter:this.state.leafOuter,
      leafPitch: this.state.leafPitch,
      leavesTopBound:this.state.leavesTopBound,
    }
    return flowerData;
  }

  /** import flowerData object and draw it */
  showFlower(flowerData){
    this.setState({flowerUpdated:true,leafUpdated:true});
    this.setState(flowerData);
  }

  handleChange = (event)=> {
    this.setState({ [event.target.name]: event.target.value })};
  render() {
    return (
        <div className="container">
          <div className="viewport">
            <FlowerViewport {...this.state}/>
          </div>
          <div className="sliders">
              <DesignSlider name="numPetals" min={0} max={24} step={1} parent={this} labelText="number" />
              <DesignSlider name="petalLength" min={0} max={8} step={0.1} parent={this} labelText="size" />
              <DesignSlider name="petalPitch" min={-90*Math.PI/180} max={90*Math.PI/180}step={.01} parent={this} labelText="pitch"/>
              <DesignSlider name="petalInnerXRelative" min={0} max={2} step={0.1} parent={this} labelText="innerX" />
              <DesignSlider name="petalInnerYRelative" min={-2} max={2} step={0.1} parent={this} labelText="innerY" />
              <DesignSlider name="petalOuterXRelative" min={0} max={2} step={0.1} parent={this} labelText="outerX" />
              <DesignSlider name="petalOuterYRelative" min={-2} max={2} step={0.1} parent={this} labelText="outerY" />
              <DesignSlider name="stemHeight" min={1} max={20} step={0.2} parent={this} labelText="height" />
          </div>
        </div>
    );
  }
}

export default Designer;
