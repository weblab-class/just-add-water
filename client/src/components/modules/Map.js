// objects (flowers, etc) packaged as components using react-three-fiber
// globally define flower stem length and ground height
// would probably be easier to rotate camera if i'm doing grid thing
import React, {useRef, Fragment, forwardRef } from "react";
import * as PropTypes from 'prop-types';
import * as THREE from 'three';
import {useHover, useDrag, useGesture} from "react-use-gesture";
import {useSpring, useSprings, a} from 'react-spring/three';
import { useThree, useUpdate } from 'react-three-fiber';
import { get, post } from "../../utilities";
import { PlaneGeometry } from "three";
import Tile from "./Tile";

// lighter color
// const soilColor = "#AD907F"
export const soilColor = "#8C7A6F";
// length/width/depth of one grid space in world units
const tileSize = 10;
export const soilHeight = tileSize;
// number of spaces in grid
const numTilesX = 4;
const numTilesZ = 4;
const worldLengthX = numTilesX*tileSize;
const worldLengthZ = numTilesZ*tileSize;
export const growthIncrement = 0.2;
function Ground(props){
    // ground is drawn with a  margin so it's slightly bigger than the map and flowers don't run off the edge
    const lengthX = worldLengthX+tileSize;
    const lengthZ = worldLengthZ+tileSize;
    const lengthY = soilHeight;
    const position = props.hasOwnProperty("position") ? props.position: [0,-soilHeight*0.4,0];
    const color = props.hasOwnProperty(color) ? props.color: soilColor;
    return <mesh position={position}>
        <boxGeometry args={[lengthX,lengthY,lengthZ]} attach="geometry"/>
        <meshStandardMaterial color={color} attach="material" roughness={1}/>
    </mesh>
}

function SnapGrid(props){
    return (
        <gridHelper args={[worldLengthX,numTilesX*2]}  position={[0,0,0]} colorGrid="#ffffff"onPointerOver={event=>{
            props.mouseRef.current=event.point;
        }}/>
    );
}

function GuideGrid(props){
    return (
        <gridHelper args={[worldLengthX,numTilesX]}  position={[0,1,0]} colorGrid="#ffffff"/>
    );
}

function addPlant(params){
    /**proptypes
     * @param xGrid
     * @param zGrid
     * @param userId
     * @param plantToAdd
     */
    console.log(params);
    post('/api/newTile', {
      creator_id: params.userId,
      xGrid: params.xGrid,
      zGrid:params.zGrid,
      flower:params.plantToAdd,
      growthState:0.2
      });
  }
function NewPlantCursor(props){
    /**proptypes
     * @param canAdd
     * @param mouseRef
     * @param plantToAdd
     * @param userId
     * @param inputMode
     */
    const mouseRef=props.mouseRef;
    const [spring, setSpring] = useSpring(() => ({
        scale: [1,1,1],
        position:[0,0,0],
        rotation:[0,0,0],
        immediate:true
    }));
    const bindGesture = useGesture({
        onPointerMove: (event)=> {
            setSpring({position:[mouseRef.current.x, mouseRef.current.y, mouseRef.current.z]});
        },
        onClick: (event)=>{
            event.stopPropagation();
            addPlant({
                xGrid:toGridUnits(mouseRef.current.x), 
                zGrid:toGridUnits(mouseRef.current.z),
                plantToAdd:props.plantToAdd,
                userId:props.userId
                });
            props.handleClick(); }
        },
        {pointerEvents:true});

    return <a.mesh visible={props.inputMode =="add"} name="soilMesh" x={mouseRef.current.x} z={mouseRef.current.z} y={0}{...spring} {...bindGesture()}>
        <boxGeometry args={[tileSize,soilHeight,tileSize]} attach="geometry"/>
        <meshLambertMaterial color={"#ffc7c7"} attach="material" roughness={1} emissive="white" emissiveIntensity={0.3} wireframe={true} wireframeLinewidth={2}/>
    </a.mesh>
}
// cannot return a canvas element because of weird DOM shit; this just puts together everything required in the map
// write test map to render
GameMap.propTypes = {
    /** tiles on map that contain plants, i.e. have been changed */
    tiles: PropTypes.array,
};
function MapLighting(props){
    return(
        <>
          <hemisphereLight intensity={0.5}/>
          <directionalLight intensity={0.7}/>
          <directionalLight intensity={0.9} position={[-20,5,20]}/>
           {/* <spotLight position={[25,20,20]} /> */}
          <ambientLight intensity={0.1}/>
        </>
    )
}
function toWorldUnits(tileUnits){
    return tileUnits*tileSize;
}
export function toGridUnits(worldUnits){
    return worldUnits/tileSize;
}
function GameMap(props){
    console.log("canWater in map =", props.canWater);
    // hook for where on the ground the mouse currently is
    const groundPosition = useRef({x:0,z:0});
    const mapTiles = props.tiles.map((tile) => 
        <React.Fragment key = {JSON.stringify(tile)}>
            <Tile {...{
                flower:tile.flower,x:toWorldUnits(tile.xGrid),z:toWorldUnits(tile.zGrid), mouseRef:groundPosition, growthState:tile.growthState, inputMode:props.inputMode, _id:tile._id, handleFinishWater:props.handleFinishWater, isDeleted:tile.isDeleted, handleClickPickMode:props.handleClickPickMode, handleDelete:props.handleDelete}}/>
        </React.Fragment>
    );
    return(
        <>
          <MapLighting/>
          <>
          {mapTiles}
          </>
          <Ground />
          <SnapGrid mouseRef={groundPosition} />
          <GuideGrid/>
          <NewPlantCursor inputMode={props.inputMode} mouseRef={groundPosition} plantToAdd={props.plantToAdd} handleClick={props.handleClickAddMode} userId={props.userId}/>
        </>
    );
}

export {GameMap, worldLengthX, worldLengthZ,tileSize};