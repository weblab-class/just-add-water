// objects (flowers, etc) packaged as components using react-three-fiber
// globally define flower stem length and ground height
// would probably be easier to rotate camera if i'm doing grid thing
import {useFrame} from 'react-three-fiber';
import React, {useRef } from "react";
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
// const rotateToXZPlane = new THREE.Euler(90*Math.PI/180,0,0);
const rotateToXZPlane = new THREE.Euler(0,0,0);
function flowerModel(props){
    const flowerData=props.flowerData;
    const mesh =  DrawFlower.plantModel(flowerData);
    const position = props.hasOwnProperty("position") ? props.position:[0,0,0];
    return <primitive object={mesh} position={position}/>
}
function ground(props){
    const lengthX = worldLengthX;
    const lengthZ = worldLengthZ;
    // this is now the vertical height. why is it internally inconsistent?!!
    const lengthY = soilHeight;
    const position = props.hasOwnProperty("position") ? props.position: [0,0,-soilHeight];
    const color = props.hasOwnProperty(color) ? props.color: soilColor;
    return <mesh position={position}>
        <boxGeometry args={[lengthX,lengthY,lengthZ]} attach="geometry"/>
        <meshStandardMaterial color={color} attach="material" roughness={1}/>
    </mesh>
}

function tileGrid(props){
    return (
        <gridHelper args={[worldLengthX,tileSize]} rotation={rotateToXZPlane} position={[0,0,0]}/>
    );
}

export {flowerModel, ground, tileSize, tileGrid, worldLengthX, worldLengthZ};