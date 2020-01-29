import * as tinycolor from "tinycolor2";
/** return hex of a random color between color1 and color2 */
function colorBetween(color1, color2){
    let randomWeight = Math.random()*100;
    let newColor = tinycolor.mix(color1, color2,randomWeight);
    return newColor.toHexString();
    
}
/** randomly pick trait from p1, p2. default chance 50% */
function pickOne(trait, p1, p2){
    const inventory = [p1[trait], p2[trait]];
    let randomTrait = inventory[Math.floor(Math.random()*inventory.length)];
    return randomTrait;
}
const leafStemColor="#69a339";
const minValues = {
      numPetals:1,
      petalLength:6,
      petalPitch : -10*Math.PI/180,
      petalInnerXRelative:0,
      petalOuterXRelative:-1,
      petalInnerYRelative:0,
      petalOuterYRelative:-1,
      leafRotAngle:0,
      leafLength:0,
      leafSpacing:0.5,
      stemHeight:10,
      leafInner:0,
      leafOuter:0,
      leafPitch: -90*Math.PI/180,
      leavesTopBound:0.5,
      stemRadius:0.35,
}
const maxValues = {
      numPetals:12,
      petalLength:14,
      petalPitch : 60*Math.PI/180,
      petalInnerXRelative:2,
      petalOuterXRelative:2,
      petalInnerYRelative:2,
      petalOuterYRelative:2,
      leafRotAngle:2,
      leafLength:2,
      leafSpacing:10,
      stemHeight:20,
      leafInner:2,
      leafOuter:2,
      leafPitch: 90*Math.PI/180,
      leavesTopBound:0.5,
      stemRadius:0.35,
}
function randomBetween(minimum, maximum){
    return minimum + Math.random()*(maximum - minimum);
}
function randomFlower(){
    const flowerData = {
      numPetals:Math.ceil(16*Math.random()),
      petalLength:Math.random()*8,
      petalPitch : randomBetween(minValues.petalPitch, maxValues.petalPitch),
      petalInnerXRelative:randomBetween(minValues.petalInnerXRelative, maxValues.petalInnerXRelative),
      petalOuterXRelative:randomBetween(minValues.petalOuterXRelative, maxValues.petalOuterXRelative),
      petalInnerYRelative:randomBetween(minValues.petalInnerYRelative, maxValues.petalInnerYRelative),
      petalOuterYRelative:randomBetween(minValues.petalOuterYRelative, maxValues.petalOuterYRelative),
      flowerColor:tinycolor({
          r:255*Math.random(),
          g:255*Math.random(),
          b:255*Math.random(),
      }).toHexString(),
      leafStemColor:"#69a339",
      leafRotAngle:randomBetween(minValues.leafRotAngle,maxValues.leafRotAngle),
      leafLength:randomBetween(minValues.leafLength,maxValues.leafLength),
      leafSpacing:randomBetween(minValues.leafSpacing,maxValues.leafSpacing),
      stemHeight:randomBetween(minValues.stemHeight, maxValues.stemHeight),
      leafInner:randomBetween(minValues.leafInner, maxValues.leafInner),
      leafOuter:randomBetween(minValues.leafOuter, maxValues.leafOuter),
      leafPitch: randomBetween(minValues.leafPitch, maxValues.leafPitch),
      leavesTopBound: randomBetween(minValues.leavesTopBound,maxValues.leavesTopBound),
    }
    return flowerData;
}
/** cross p1 and p2 (json objects containing flower data) */
function hybridize(p1, p2){
    let flowerData = {
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
      stemHeight:15,
      leafInner:0.2,
      leafOuter:0,
      leafPitch: 30*Math.PI/180,
      leavesTopBound:0.5,
    }
    for (const trait in p1){
        flowerData[trait] = pickOne(trait,p1,p2);
    }
    flowerData.flowerColor = colorBetween(p1.flowerColor,p2.flowerColor);
    return flowerData;
}
export {hybridize, randomFlower}