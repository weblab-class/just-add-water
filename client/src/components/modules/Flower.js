import * as THREE from 'three';
import React, {useImperativeHandle, useRef} from 'react';
import {useSpring, a, useSprings} from 'react-spring/three';
import { tileSize } from './Map';

const rotateToXZPlane = new THREE.Euler(-90*Math.PI/180,0,0);
function makePetalGeometry(xOrigin, yOrigin, flowerData){
    // petal shape control - keep these positive to avoid clipping, but clipping also looks sorta cool
    let xCp1 = xOrigin + flowerData.petalLength*flowerData.petalInnerXRelative
    let yCp1 = yOrigin+ flowerData.petalLength*flowerData.petalInnerYRelative;
    let yCp2 = yOrigin+ flowerData.petalLength*flowerData.petalOuterYRelative;
    // lies along x Axis
    let xCp2 = xOrigin + flowerData.petalLength*flowerData.petalOuterXRelative;

    // curve along x axis from (xOrigin, yOrigin) to (xOrigin, petalLength)
    var petalShape = new THREE.Shape();
    petalShape.bezierCurveTo(xCp1,yCp1, xCp2, yCp2, flowerData.petalLength, yOrigin );
    petalShape.bezierCurveTo(xCp2, - yCp2, xCp1, -yCp1, xOrigin, yOrigin);

    var geometry = new THREE.ShapeGeometry( petalShape );
    return geometry;
};

function makeFlowerGeometry(flowerData) {
  let flowerGeometry = new THREE.Geometry();
  for (let i = 0; i < flowerData.numPetals; i++){
    let petalGeometry = makePetalGeometry(0,0, flowerData);
    petalGeometry.rotateY(-flowerData.petalPitch);
    let rotAngle = 2*Math.PI/ flowerData.numPetals;
    petalGeometry.rotateZ(rotAngle*i);
    flowerGeometry.merge(petalGeometry);
  }
  return flowerGeometry;
  }

function FlowerMesh(props){
    let flowerGeometry = makeFlowerGeometry(props); 
    return <a.mesh rotation={rotateToXZPlane} position={props.position} {...props.spring}>
        <meshLambertMaterial name = "flowerMesh" attach="material" color={props.flowerColor}/>
        <primitive object={flowerGeometry} attach="geometry"/>
    </a.mesh>
}
function StemMesh(props){
    const stemHeight=props.stemHeight*props.growthState;
    const stemColor=props.leafStemColor;
    const stemSubdivisions=3;
    const stemRadius = props.stemRadius || 0.25;

    return <a.mesh name="stemMesh" {...props.spring} > 
        <cylinderGeometry attach="geometry" args={[stemRadius,stemRadius,stemHeight,stemSubdivisions]}/>
        <meshBasicMaterial attach="material" color={stemColor} />
    </a.mesh>

}

function makeLeafGeometry(xOrigin, yOrigin, leafLength, width1, width2, leafFoldAngle){
  let yCp1 = width1;
  let yCp2 = width2;
  // lies along x Axis
  let xCp1 = 0;
  let xCp2 = leafLength;

  var shape1 = new THREE.Shape();
  shape1.bezierCurveTo( xOrigin + xCp1, yOrigin + yCp1, xOrigin + xCp2, yOrigin+yCp2, leafLength, yOrigin );
  // draw 2 halves of leaf by copying and rotating the geometry
  var geometry1 = new THREE.ShapeGeometry( shape1 );
  var shape2 = new THREE.Shape();
  shape2.bezierCurveTo( xOrigin + xCp1, yOrigin - yCp1, xOrigin + xCp2, yOrigin-yCp2, leafLength, yOrigin );
  var geometry2 = new THREE.ShapeGeometry( shape2);
  geometry1.rotateX(leafFoldAngle);
  geometry2.rotateX(-leafFoldAngle);
  geometry2.merge(geometry1);
  return geometry2;
}

function LeafMesh(props){
    if(props.growthState<0.6){
        return <mesh/>
    }
    const stemHeight=props.stemHeight*props.growthState;
    let leafRotAngle = props.leafRotAngle;
    let leafFoldAngle = 20 * (Math.PI/180);
    let leafLength = props.leafLength;
    let leafSpacing = props.leafSpacing;
    let leafInner = props.leafInner*leafLength;
    let leafOuter = props.leafOuter*leafLength;
    let leafPitch = props.leafPitch;
    let leavesTopBound = -stemHeight*(1-props.leavesTopBound);
    let leavesBottomBound =  -stemHeight*0.9;
    let translateBy = leavesBottomBound;
    // absolutely no leaves above here
    let flowersTopBound = 0;
    let leafGeometry = new THREE.Geometry();
    for (let i = 0; translateBy < leavesTopBound && translateBy < flowersTopBound; i++){
      translateBy  += leafSpacing;
      let newLeaf = makeLeafGeometry(0,0,leafLength,leafInner, leafOuter, leafFoldAngle);
      newLeaf.rotateY(-leafPitch);
      newLeaf.rotateZ(i*leafRotAngle);
      //cut off if above flower plane
      newLeaf.translate(0,0,translateBy);
      leafGeometry.merge(newLeaf)
    }
    return <mesh name="leafMesh" position={props.position}rotation={rotateToXZPlane}>
        <primitive attach="geometry" object={leafGeometry}/>
        <meshLambertMaterial attach="material" color={props.leafStemColor} />
    </mesh>
}

function PlantMesh(props){
    // const useFlowerSpring =useRef();
    // for animating growth
    const currentHeight = props.growthState*props.stemHeight;
    const springConfig = {
        config: { mass: 3, friction: 30, tension: 700 }
    }
    const [stemSpring, setStemSpring] = useSpring(() => ({
        scale: [1, 1, 1],
        position: [0, 0, 0],
        config:springConfig
    }));
    const stemMesh = ( <StemMesh attachArray = "children" {...props} spring={stemSpring}/>)

    const isFlowerVisible = props.alwaysShowFlower || props.growthState >=1
    const [flowerSpring, setFlowerSpring] = useSpring(() => ({
        scale:isFlowerVisible?[1,1,1] : [0.01,0.01,0.01],
        position: [0, 0.5*currentHeight, 0],
        rotation: [rotateToXZPlane.x, 0,0],
        config:springConfig
    }));
    const [budSpring, setBudSpring] = useSpring(() => ({
        scale:[1,1,1],
        position: [0, 0.5*currentHeight, 0],
        config:springConfig
    }));
    const flowerMesh=(<FlowerMesh attachArray = "children" {...props} position={[0,0.5*currentHeight,0]} spring={flowerSpring}/>)

    const budMesh = (
        <a.mesh {...budSpring}>
            <sphereGeometry attach="geometry" radius={0.4} widthSegments={4} heightSegments={4} position={[0,currentHeight,0]} />
            <meshBasicMaterial attach="material" color={props.leafStemColor} />
        </a.mesh>
    );

    const usePlantSpring = (params) =>{
        const growthFactor = (props.growthIncrement+props.growthState)/props.growthState;
        setStemSpring({scale:[1,growthFactor,1]});
        console.log("stem spring set to ", stemSpring);
        setFlowerSpring({position:[0, 0.5*currentHeight*growthFactor, 0]});
        setBudSpring({position:[0, 0.5*currentHeight*growthFactor, 0]});
        const isBlooming = params.newGrowthState >= 1;
        if (isBlooming){
            setBudSpring({scale:[0.01,0.01,0.01]});
            // spins on vertical axis - strange order bc flower is constructed facing the wrong way
            setFlowerSpring({scale:[1,1,1], rotation:[rotateToXZPlane.x,0,4*Math.PI] });
        }
    }
    if(props.springRef){
        props.springRef.current = usePlantSpring;
    }

    // base of the plant is at origin
    const x = props.x || 0;
    const y = props.y || 0;
    const z = props.z || 0;

    return <group position={[x,y-props.stemHeight+tileSize/2,z]} >
        {isFlowerVisible ? flowerMesh: budMesh}
        {stemMesh}
        {flowerMesh}
        <LeafMesh attachArray = "children" {...props} position={[0,0.5*currentHeight,0]}/>
    </group>
}
export {FlowerMesh,PlantMesh,LeafMesh,StemMesh};