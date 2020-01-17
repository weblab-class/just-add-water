// objects (flowers, etc) packaged as components using react-three-fiber
import {useFrame} from 'react-three-fiber';
import React, {useRef } from "react";
import * as DrawFlower from '../../js-plant-gen/DrawFlower';
import * as THREE from 'three';
function flowerModel(flowerData){
    const mesh =  DrawFlower.plantModel(flowerData);
    return <primitive object={mesh} position={[0,0,0]} rotation={new THREE.Euler(-.8,0,0)}/>
}
export {flowerModel};