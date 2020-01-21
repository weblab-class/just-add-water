import * as api from "../client/src/utilities";
const expect = require('chai').expect;
const should = require('chai').should();

function testPrintTiles(){
    get("api/all_tiles").then((tileArr)=>{
        return tileArr;
    })
}
function testNewTile(){
    post("api/new_tile",{
        creator_id: "u1",
        xGrid: 0,
        zGrid: 0,
        flower: {
          numPetals:6,
          petalLength:5,
          petalPitch : 30*3.1416/180,
          petalInnerXRelative:0,
          petalOuterXRelative:1,
          petalInnerYRelative:0.1,
          petalOuterYRelative:0.5,
          flowerColor:"#24afff",
          leafStemColor:"#69a339",
          leafRotAngle:120 * (3.1416/180),
          leafLength:10,
          leafSpacing:3,
          stemHeight:6,
          stemRadius:0.3,
          leafInner:0.2,
          leafOuter:0,
          leafPitch: 30*3.1416/180,
          leavesTopBound:0.5,},
        growthState: 1, },
    );
}