// objects (flowers, etc) packaged as components using react-three-fiber
// globally define flower stem length and ground height
// would probably be easier to rotate camera if i'm doing grid thing
import {useFrame} from 'react-three-fiber';
import React, {useRef } from "react";
import * as DrawFlower from '../../js-plant-gen/DrawFlower';
import * as THREE from 'three';
const isometricRotation = new THREE.Euler(-.8,0,0.8);
function flowerModel(props){
    const flowerData=props.flowerData;
    const mesh =  DrawFlower.plantModel(flowerData);
    const position = props.hasOwnProperty("position") ? props.position:[0,0,0];
    return <primitive object={mesh} position={position} rotation={isometricRotation}/>
}
function tile(props){
    const size = props.hasOwnProperty(size) ? props.size: 10;
    const position = props.hasOwnProperty("position") ? props.position: [10,6,-20];
    const colorTop = props.hasOwnProperty(colorTop) ? props.colorTop: "#88cc00";
    return <mesh position={position} rotation={isometricRotation}>
        <boxGeometry args={[size,size,size]} attach="geometry"/>
        <meshToonMaterial color={colorTop} attach="material"/>
    </mesh>
}
export {flowerModel, tile};