// json data for a bunch of example flowers
const blueSixPetals = {
    numPetals:6,
    petalLength:5,
    petalPitch : 30*Math.PI/180,
    petalInnerXRelative:0,
    petalOuterXRelative:1,
    petalInnerYRelative:0.1,
    petalOuterYRelative:0.5,
    flowerColor:"#24afff",
    leafStemColor:"#69a339",
    leafRotAngle:120 * (Math.PI/180),
    leafLength:10,
    leafSpacing:3,
    stemHeight:6,
    stemRadius:0.3,
    leafInner:0.2,
    leafOuter:0,
    leafPitch: 30*Math.PI/180,
    leavesTopBound:0.5,
};

const yellowStar = {
  numPetals: 5,
  petalLength: 4.5,
  petalPitch: 0.329203673205103,
  petalInnerXRelative: 0.4,
  petalOuterXRelative: 0.3,
  petalInnerYRelative: 0.4,
  petalOuterYRelative: 0.2,
  flowerColor: "#fcc400",
  leafStemColor: "#69a339",
  leafRotAngle: 2.47,
  leafLength: 10.5,
  leafSpacing: 0.5,
  stemHeight: 15,
  leafInner: 0.1,
  leafOuter: 0.1,
  leafPitch: 1.1292036732051,
  leavesTopBound: 0.29,
};
const poppy = {
  numPetals: 21,
  petalLength: 3.7,
  petalPitch: 0.409203673205103,
  petalInnerXRelative: 0.8,
  petalOuterXRelative: 0.9,
  petalInnerYRelative: -0.1,
  petalOuterYRelative: 0.5,
  flowerColor: "#9f0500",
  leafStemColor: "#69a339",
  leafRotAngle: 2.47,
  stemRadius:0.35,
  leafLength: 4,
  leafSpacing: 1.5,
  stemHeight: 9,
  leafInner: 0.1,
  leafOuter: 0.8,
  leafPitch: 0,
  leavesTopBound: 0.6,
  flowerUpdated: false,
  leafUpdated: false
};

export {blueSixPetals, yellowStar, poppy};