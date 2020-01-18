// objects (flowers, etc) packaged as components using react-three-fiber
// globally define flower stem length and ground height
// would probably be easier to rotate camera if i'm doing grid thing
import React, {useRef, Fragment } from "react";
import * as Examples from '../../js-plant-gen/ExampleFlowers';
import * as PropTypes from 'prop-types';
import * as DrawFlower from '../../js-plant-gen/DrawFlower';
import * as THREE from 'three';
const soilColor = "#AD907F"
// length/width/depth of one grid space in world units
const tileSize = 10;
const soilHeight = tileSize;
// number of spaces in grid
const numTilesX = 4;
const numTilesZ = 4;
const worldLengthX = numTilesX*tileSize;
const worldLengthZ = numTilesZ*tileSize;
const rotateToXZPlane = new THREE.Euler(-90*Math.PI/180,0,0);
// const rotateToXZPlane = new THREE.Euler(0,0,0);
function FlowerModel(props){
    const flowerData=props.flowerData;
    const mesh =  DrawFlower.plantModel(flowerData);
    const position = props.hasOwnProperty("position") ? props.position:[0,0,0];
    return <primitive object={mesh} position={position} rotation={rotateToXZPlane}/>
}
function Ground(props){
    // ground is drawn with a 0.5*tileSize-width margin so it's slightly bigger than the map and flowers don't run off the edge
    const lengthX = worldLengthX+0.5*tileSize;
    const lengthZ = worldLengthZ+0.5*tileSize;
    const lengthY = soilHeight;
    const position = props.hasOwnProperty("position") ? props.position: [0,-soilHeight*0.5,0];
    const color = props.hasOwnProperty(color) ? props.color: soilColor;
    return <mesh position={position}>
        <boxGeometry args={[lengthX,lengthY,lengthZ]} attach="geometry"/>
        <meshStandardMaterial color={color} attach="material" roughness={1}/>
    </mesh>
}

function TileGrid(props){
    return (
        <gridHelper args={[worldLengthX,numTilesX]}  position={[0,0.1,0]} colorGrid="#ffffff"/>
    );
}

// cannot return a canvas element because of weird DOM shit; this just puts together everything required in the map
// write test map to render
GameMap.propTypes = {
    /** tiles on map that contain plants, i.e. have been changed */
    tiles: PropTypes.array.tile,
};
function MapLighting(props){
    return(
        <>
          <hemisphereLight intensity={0.7}/>
          <spotLight position={[25,20,20]} />
          <ambientLight intensity={0.1}/>
        </>
    )
}
function toWorldUnits(tileUnits){
    return tileUnits*tileSize;
}
function GameMap(props){
    const flowers = props.tiles.map((tile) => 
        <><FlowerModel key = {JSON.stringify(tile)} flowerData={tile.flower} position={[toWorldUnits(tile.x),tile.flower.stemHeight, toWorldUnits(tile.z)]}/></>
    );
    console.log(flowers);
    return(
        <>
          <MapLighting/>
          <>
          {flowers}
          {/* <FlowerModel flowerData={Examples.poppy} position={[10,10,0]} /> */} */}
          </>
          <Ground/>
          <TileGrid/>
        </>
    );
}

export {GameMap, worldLengthX, worldLengthZ};