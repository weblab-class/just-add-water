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
    return <mesh rotation={rotateToXZPlane} >
        <meshLambertMaterial name = "flowerMesh" attach="material" color={props.flowerColor}/>
        <primitive object={flowerGeometry} attach="geometry"/>
    </mesh>
}
function StemMesh(flowerData){
  const stemHeight=flowerData.stemHeight;
  const stemColor=flowerData.leafStemColor;
  const stemSubdivisions=3;
  const stemRadius = flowerData.stemRadius || 0.25;
//   let stemGeometry = new THREE.CylinderGeometry(stemRadius, stemRadius, stemHeight,stemSubdivisions);
//   stemGeometry.rotateX(0.5*Math.PI);
  return <mesh name="stemMesh" position={[0,-0.5*stemHeight,0]}> 
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

function LeafMesh(flowerData){
    let leafRotAngle = flowerData.leafRotAngle;
    let leafFoldAngle = 20 * (Math.PI/180);
    let leafLength = flowerData.leafLength;
    let leafSpacing = flowerData.leafSpacing;
    let leafInner = flowerData.leafInner*leafLength;
    let leafOuter = flowerData.leafOuter*leafLength;
    let leafPitch = flowerData.leafPitch;
    let leavesTopBound = -flowerData.stemHeight*(1-flowerData.leavesTopBound);
    let leavesBottomBound =  -flowerData.stemHeight*0.9;
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
    return <mesh name="leafMesh" rotation={rotateToXZPlane}>
        <primitive attach="geometry" object={leafGeometry}/>
        <meshLambertMaterial attach="material" color={flowerData.leafStemColor} />
    </mesh>
}

function PlantMesh(props){
    const x = props.x || 0;
    const y = props.y || 0;
    const z = props.z || 0;
    return <group position={[x,y,z]}>
        <FlowerMesh attachArray = "children" {...props}/>
        <StemMesh attachArray = "children" {...props}/>
        <LeafMesh attachArray = "children" {...props}/>
    </group>
}
export {FlowerMesh,PlantMesh,LeafMesh,StemMesh};