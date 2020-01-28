import React, { Component } from 'react';
import "./Designer.css";
import * as examples from './../../test/ExampleFlowers';
import FlowerViewport from './FlowerViewport';
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


  render() {
    return (
        <div className="container">
          <div className="viewport">
            <FlowerViewport {...this.state}/>
          </div>
        </div>
    );
  }
}

export default Designer;
