// objects (flowers, etc) packaged as components using react-three-fiber
// globally define flower stem length and ground height
// would probably be easier to rotate camera if i'm doing grid thing
import React, {useRef, Fragment } from "react";
import * as PropTypes from 'prop-types';
import * as THREE from 'three';
import {useHover, useDrag} from "react-use-gesture";
import {useSpring, a} from 'react-spring/three';
import {PlantMesh} from './Flower';
import { useThree } from 'react-three-fiber';

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

function mouseCrdsToWorld(x, y, viewport, camera){
    console.log("mouse crds");
    console.log(x,y);
    var vector = new THREE.Vector3( x, y, -1).unproject( camera );
    var worldPosition = new THREE.Vector3(vector.x-camera.position.x,-vector.y+camera.position.y,vector.z-camera.position.z);
    console.log(worldPosition);
    return [worldPosition.x, worldPosition.y, worldPosition.z]
}
function Tile(props){
    // tile lights on hover, depresses on click (while flower comes up)
    // planted tiles elevated or not?
    const height = soilHeight;
    const x = props.hasOwnProperty("x")? props.x : 0;
    const z = props.hasOwnProperty("z")? props.z : 0;
    const y = 0;

    const [spring, set] = useSpring(() => ({
        scale: [1, 1, 1],
        // y is one space below ground to prevent clipping on unhover
        position: [x, y-1, z],
        rotation: [0, 0, 0],
        config: { mass: 3, friction: 30, tension: 700 }
    }));
    const bindHover = useHover(({ hovering }) => set({ scale: hovering ? [1, 1.2, 1] : [1, 1, 1] }), {
        pointerEvents: true
    });

    // get mouse position on ground from hook
    const mouseRef=props.mouseRef;
    const bindDrag = useDrag(
        (event) => {
            set({position:[mouseRef.current.x, mouseRef.current.y, mouseRef.current.z]});
        },
        { pointerEvents: true }
    )

    return <a.group position={[x,y,z]} {...spring} {...bindDrag()} {...bindHover()} >
        <mesh name="soilMesh" visible={true}>
            <boxGeometry args={[tileSize,height,tileSize]} attach="geometry"/>
            <meshStandardMaterial color={soilColor} attach="material" roughness={1}/>
        </mesh>
        <PlantMesh name="plantMesh"  {...props.flower} x={0}  y={props.flower.stemHeight} z={0} growthState={props.growthState}/>
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
function GameMap(props){
    // hook for where on the ground the mouse currently is
    const groundPosition = useRef(null);
    const mapTiles = props.tiles.map((tile) => 
        <React.Fragment key = {JSON.stringify(tile)}>
            <Tile {...{flower:tile.flower,x:toWorldUnits(tile.xGrid),z:toWorldUnits(tile.zGrid), mouseRef:groundPosition, growthState:tile.growthState}}/>
        </React.Fragment>
    );
    console.log(mapTiles);
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