// objects (flowers, etc) packaged as components using react-three-fiber
// globally define flower stem length and ground height
// would probably be easier to rotate camera if i'm doing grid thing
import {useFrame} from 'react-three-fiber';
import React, {useRef } from "react";
import * as DrawFlower from '../../js-plant-gen/DrawFlower';
import * as THREE from 'three';
const soilColor = "#AD907F"
function flowerModel(props){
    const flowerData=props.flowerData;
    const mesh =  DrawFlower.plantModel(flowerData);
    const position = props.hasOwnProperty("position") ? props.position:[0,0,0];
    return <primitive object={mesh} position={position}/>
}
function tile(props){
    const lengthY = props.hasOwnProperty(lengthY) ? props.lengthY: 20;
    const lengthX = props.hasOwnProperty(lengthX) ? props.lengthX: 20;
    // this is now the vertical height. why is it internally inconsistent?!!
    const lengthZ = props.hasOwnProperty(lengthZ) ? props.lengthZ: 10;
    const position = props.hasOwnProperty("position") ? props.position: [10,6,-20];
    const color = props.hasOwnProperty(color) ? props.color: soilColor;
    return <mesh position={position}>
        <boxGeometry args={[lengthX,lengthY,lengthZ]} attach="geometry"/>
        <meshStandardMaterial color={color} attach="material" roughness={0.9}/>
    </mesh>
}
export {flowerModel, tile};