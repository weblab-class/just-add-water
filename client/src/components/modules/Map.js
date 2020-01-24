// objects (flowers, etc) packaged as components using react-three-fiber
// globally define flower stem length and ground height
// would probably be easier to rotate camera if i'm doing grid thing
import React, {useRef, Fragment, forwardRef } from "react";
import * as PropTypes from 'prop-types';
import * as THREE from 'three';
import {useHover, useDrag, useGesture} from "react-use-gesture";
import {useSpring, useSprings, a} from 'react-spring/three';
import {PlantMesh} from './Flower';
import { useThree } from 'react-three-fiber';
import { get, post } from "../../utilities";

// lighter color
// const soilColor = "#AD907F"
const soilColor = "#8C7A6F";
// length/width/depth of one grid space in world units
const tileSize = 10;
const soilHeight = tileSize;
// number of spaces in grid
const numTilesX = 4;
const numTilesZ = 4;
const worldLengthX = numTilesX*tileSize;
const worldLengthZ = numTilesZ*tileSize;
const growthIncrement = 0.2;
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

function Tile(props){
    const height = soilHeight;
    const x = props.hasOwnProperty("x")? props.x : 0;
    const z = props.hasOwnProperty("z")? props.z : 0;
    const y = 0;

    // animation and input stuff
    const [spring, setSpring] = useSpring(() => ({
        scale: [1, 1, 1],
        position: [x, y, z],
        rotation: [0, 0, 0],
        config: { mass: 3, friction: 30, tension: 700 }
    }));

    // set up ref to be able to access plant model animations
    let growthState = props.growthState;
    const plantSpringRef = useRef();
    const plantMesh=(
        <PlantMesh name="plantMesh"  {...props.flower} x={0}  y={props.flower.stemHeight} z={0} growthState={growthState} springRef={plantSpringRef}/>);
    const mouseRef=props.mouseRef;
    const bindGesture = useGesture(
        {
            onDrag: (dragEvent) => {
                if (props.canDrag){
                    dragEvent.event.stopPropagation();
                    setSpring({position:[mouseRef.current.x, mouseRef.current.y, mouseRef.current.z]});
                }
            },
            onDragEnd: (dragEndEvent)=>{
                if (props.canDrag){
                    dragEndEvent.event.stopPropagation();
                    setSpring({position:[mouseRef.current.x, mouseRef.current.y, mouseRef.current.z]});
                    post('/api/updateTile', {id:props._id, updateObj:{xGrid: toGridUnits(mouseRef.current.x), zGrid: toGridUnits(mouseRef.current.z)}});
                }
            },
            onHover: ({hovering}) => setSpring({ scale: hovering ? [1, 1.2, 1] : [1, 1, 1] }),
            onClick: (event) => {
                if (props.canWater)// && growthState < 1){
                    console.log("growth triggered");
                    event.stopPropagation();
                    post('/api/updateTile', {id:props._id, updateObj:{growthState:growthState}});
                    growthState += growthIncrement;

                    const setPlantSpring = plantSpringRef.current;
                    setPlantSpring({growthIncrement:growthIncrement});
                }
            },
        {pointerEvents: true}
    );


    console.log("ref is ", plantSpringRef.current);
    // get mouse position on ground from hook
    return <a.group position={[x,y,z]} {...spring} {...bindGesture()} >
        <mesh name="soilMesh" visible={true}>
            <boxGeometry args={[tileSize,height,tileSize]} attach="geometry"/>
            <meshStandardMaterial color={soilColor} attach="material" roughness={1}/>
            {plantMesh}
        </mesh>
    </a.group>
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
function toGridUnits(worldUnits){
    return worldUnits/tileSize;
}
function GameMap(props){
    console.log("tile ids", props.tileIDs);
    let tileList;
    Promise.all(props.tileIDs.map(id => get("/api/tileById", {tileID: id}))).then(tileListObj => {
        console.log("tilelistobj", tileListObj);
        tileList = tileListObj;
        console.log("tile list", tileList);
    });
    // hook for where on the ground the mouse currently is
    const groundPosition = useRef(null);
    const mapTiles = props.tiles.map((tile) => 
        <React.Fragment key = {JSON.stringify(tile)}>
            <Tile {...{flower:tile.flower,x:toWorldUnits(tile.xGrid),z:toWorldUnits(tile.zGrid), mouseRef:groundPosition, growthState:tile.growthState, canDrag:props.canDrag, canWater:props.canWater, updateGrowth:props.updateGrowth,_id:tile._id, }}/>
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
        </>
    );
}

export {GameMap, worldLengthX, worldLengthZ,tileSize};