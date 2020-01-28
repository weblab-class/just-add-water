import React, { Component } from 'react';
import './Flower';
import { Canvas} from 'react-three-fiber';
import { PlantMesh } from './Flower';
import * as THREE from 'three';
const isometricRotation = new THREE.Euler(-30*Math.PI/180,45*Math.PI/180,0 ,"YXZ");
function FlowerViewport(props){
    return <Canvas style={{height:"100vh", width:"50vh"}} orthographic={true} camera={{zoom:15, position:[10,0,10], rotation:isometricRotation}}>
        <mesh>
            <hemisphereLight intensity={0.5}/>
            <directionalLight intensity={0.9} position={[-20,5,20]}/>
            <directionalLight intensity={0.7}/>
            <ambientLight intensity={0.1}/>
            <PlantMesh {...props} />
        </mesh>
    </Canvas>
}
export default FlowerViewport;