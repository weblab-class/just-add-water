// objects (flowers, etc) packaged as components using react-three-fiber
// globally define flower stem length and ground height
// would probably be easier to rotate camera if i'm doing grid thing
import {useFrame} from 'react-three-fiber';
import React, {useRef } from "react";
import * as DrawFlower from '../../js-plant-gen/DrawFlower';
import * as THREE from 'three';
const soilColor = "#AD907F"
const soilHeight = 10;
// length of one grid space in world units
const gridUnit = 10;
// number of spaces in grid
const gridSizeX = 4;
const gridSizeZ = 4;
function flowerModel(props){
    const flowerData=props.flowerData;
    const mesh =  DrawFlower.plantModel(flowerData);
    const position = props.hasOwnProperty("position") ? props.position:[0,0,0];
    return <primitive object={mesh} position={position}/>
}
function tile(props){
    const lengthY = props.hasOwnProperty(lengthY) ? props.lengthY: gridUnit*gridSizeX;
    const lengthX = props.hasOwnProperty(lengthX) ? props.lengthX: gridUnit*gridSizeZ;
    // this is now the vertical height. why is it internally inconsistent?!!
    const lengthZ = props.hasOwnProperty(lengthZ) ? props.lengthZ: soilHeight;
    const position = props.hasOwnProperty("position") ? props.position: [10,6,-20];
    const color = props.hasOwnProperty(color) ? props.color: soilColor;
    return <mesh position={position}>
        <boxGeometry args={[lengthX,lengthY,lengthZ]} attach="geometry"/>
        <meshStandardMaterial color={color} attach="material" roughness={1}/>
    </mesh>
}
export {flowerModel, tile};