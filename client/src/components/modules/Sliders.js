import React, { Component } from 'react';
import "./Designer";
import PropTypes from "prop-types";
import SliderPicker, { CompactPicker } from "react-color";

class Sliders extends Component {
  /**
   * @param parent
   * @changeHandler
   */
    render(){
        let parent = this.props.parent;
        return(
        <div id="inputs">
          <ul>
            <li>
              <span>
                <button type="button" onClick={parent.saveCached}>save current flower</button>
                <button type="button" onClick={parent.loadCached}>load saved flower</button>
              </span>
            </li>
            <li>
              <CompactPicker onChange={parent.onColorChange}/>
            </li>
            <li><h3>petals</h3></li>
            <li>
              <label>number</label>
              <input type="range" name = "numPetals" value={parent.state.numPetals} onChange={this.props.changeHandler} min={0} max={24}step={1}/>
            </li>
            <li>
              <label>size</label>
              <input type="range" name = "petalLength" value={parent.state.petalLength} onChange={this.props.changeHandler} min={0} max={8}step={0.1}/>
            </li>
            <li>
              <label>pitch</label>
              <input type="range" name = "petalPitch" value={parent.state.petalPitch} onChange={this.props.changeHandler} min={-90*Math.PI/180} max={90*Math.PI/180}step={.01}/>
            </li>
            <li>
              <label>innerX</label>
              <input type="range" name = "petalInnerXRelative" value={parent.state.petalInnerXRelative} onChange={this.props.changeHandler} min={0} max={2}step={0.1}/>
            </li>
            <li>
              <label>innerY</label>
              <input type="range" name = "petalInnerYRelative" value={parent.state.petalInnerYRelative} onChange={this.props.changeHandler} min={-2} max={2}step={0.1}/>
            </li>
            <li>
              <label>outerX</label>
              <input type="range" name = "petalOuterXRelative" value={parent.state.petalOuterXRelative} onChange={this.props.changeHandler} min={0} max={2}step={0.1}/>
            </li>
            <li>
              <label>outerY</label>
              <input type="range" name = "petalOuterYRelative" value={parent.state.petalOuterYRelative} onChange={this.props.changeHandler} min={-2} max={2}step={0.1}/>
            </li>
            <li><h3>leaves</h3></li>
            <li>
              <label>inner</label>
              <input type="range" name = "leafInner" value={parent.state.leafInner} onChange={this.props.parent.onLeafChange} min={0} max={2}step={0.1}/>
            </li>
            <li>
              <label>outer</label>
              <input type="range" name = "leafOuter" value={parent.state.leafOuter} onChange={this.props.parent.onLeafChange} min={0} max={2}step={0.1}/>
            </li>
            <li>
              <label>length</label>
              <input type="range" name = "leafLength" value={parent.state.leafLength} onChange={this.props.parent.onLeafChange} min={0} max={15}step={0.1}/>
            </li>
            <li>
              <label>rot. angle</label>
              <input type="range" name = "leafRotAngle" value={parent.state.RotAngle} onChange={this.props.parent.onLeafChange} min={0} max={360*Math.PI/180}step={.01}/>
            </li>
            <li>
              <label>height</label>
              <input type="range" name = "leavesTopBound" value={parent.state.leavesTopBound} onChange={this.props.parent.onLeafChange} min={0} max={1}step={.01}/>
            </li>
            <li>
              <label>spacing</label>
              <input type="range" name = "leafSpacing" value={parent.state.leafSpacing} onChange={this.props.parent.onLeafChange} min={0.5} max={10}step={.01}/>
            </li>
            <li>
              <label>pitch</label>
              <input type="range" name = "leafPitch" value={parent.state.leafPitch} onChange={this.props.parent.onLeafChange} min={-90*Math.PI/180} max={90*Math.PI/180}step={.01}/>
            </li>
          </ul>
        </div>
        )
    }
}
export default Sliders;