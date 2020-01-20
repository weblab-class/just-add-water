import * as THREE from 'three';
import React from 'react';

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
    return <mesh rotation={rotateToXZPlane} position={props.position}>
        <meshLambertMaterial name = "flowerMesh" attach="material" color={props.flowerColor}/>
        <primitive object={flowerGeometry} attach="geometry"/>
    </mesh>
}
function StemMesh(props){
    const growthState = props.hasOwnProperty("growthState") ? props.growthState : 1;
    const stemHeight=props.stemHeight*growthState;
    const stemColor=props.leafStemColor;
    const stemSubdivisions=3;
    const stemRadius = props.stemRadius || 0.25;
    return <mesh name="stemMesh" > 
        <cylinderGeometry attach="geometry" args={[stemRadius,stemRadius,stemHeight,stemSubdivisions]}/>
        <meshBasicMaterial attach="material" color={stemColor} />
    </mesh>
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
    let leafRotAngle = props.leafRotAngle;
    let leafFoldAngle = 20 * (Math.PI/180);
    let leafLength = props.leafLength;
    let leafSpacing = props.leafSpacing;
    let leafInner = props.leafInner*leafLength;
    let leafOuter = props.leafOuter*leafLength;
    let leafPitch = props.leafPitch;
    let leavesTopBound = -props.stemHeight*(1-props.leavesTopBound);
    let leavesBottomBound =  -props.stemHeight*0.9;
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
    // base of the plant is at origin
    const x = props.x || 0;
    const y = props.y || 0;
    const z = props.z || 0;
    const yHeightOfStem= props.stemHeight/2*props.growthState;
    return <group position={[x,y,z]}>
        <FlowerMesh attachArray = "children" {...props} position={[0,yHeightOfStem,0]}/>
        <StemMesh attachArray = "children" {...props}/>
        <LeafMesh attachArray = "children" {...props} position={[0,yHeightOfStem,0]}/>
    </group>
}
export {FlowerMesh,PlantMesh,LeafMesh,StemMesh};