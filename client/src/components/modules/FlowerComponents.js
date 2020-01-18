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
const rotateToXZPlane = new THREE.Euler(90*Math.PI/180,0,0);
function flowerModel(props){
    const flowerData=props.flowerData;
    const mesh =  DrawFlower.plantModel(flowerData);
    const position = props.hasOwnProperty("position") ? props.position:[0,0,0];
    return <primitive object={mesh} position={position}/>
}
function ground(props){
    const lengthY = props.hasOwnProperty(lengthY) ? props.lengthY: tileSize*numTilesX;
    const lengthX = props.hasOwnProperty(lengthX) ? props.lengthX: tileSize*numTilesZ;
    // this is now the vertical height. why is it internally inconsistent?!!
    const lengthZ = props.hasOwnProperty(lengthZ) ? props.lengthZ: soilHeight;
    const position = props.hasOwnProperty("position") ? props.position: [10,6,-20];
    const color = props.hasOwnProperty(color) ? props.color: soilColor;
    return <mesh position={position}>
        <boxGeometry args={[lengthX,lengthY,lengthZ]} attach="geometry"/>
        <meshStandardMaterial color={color} attach="material" roughness={1}/>
    </mesh>
}

function tileGrid(props){
    return (
        <gridHelper args={[100,10]} rotation={rotateToXZPlane} position={[0,1,0]}/>
    );
}

export {flowerModel, ground, tileSize, tileGrid};