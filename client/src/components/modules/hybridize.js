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
export {hybridize}