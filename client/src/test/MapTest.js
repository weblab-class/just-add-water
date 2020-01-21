import * as Flowers from './ExampleFlowers';
const mongoose = require("mongoose");
/** 
 * data for rendering a test map
 * things to check for
 * - map is right size
 * - plants are placed in the right tiles
 * - if plants are different then they are rendered correctly 
 * 
 */
function blueFlowerTile(xGrid,zGrid){
    const tile = 
        {
            _id: mongoose.Types.ObjectId(),
            creator_id: "test",
            xGrid: xGrid,
            zGrid: zGrid,
            // if one exists
            flower: Flowers.blueSixPetals,
            growthState: 1, };
    return tile;
}
 const emptyMap={

    tiles: [],
 }

 const mapTwoFlowers={
    tiles: [
        {
            creator_id: "u1",
            _id: mongoose.Types.ObjectId(),
            xGrid: 0,
            zGrid: 0,
            // if one exists
            flower: Flowers.blueSixPetals,
            growthState: 1, },
        {
            creator_id: "u1",
            xGrid: 2,
            zGrid: 2,
            // if one exists
            flower: Flowers.poppy,
            growthState: 1, },
    ],
 }
 const mapAdjFlowers={
    tiles: [
        {
            creator_id: "u1",
            _id: mongoose.Types.ObjectId(),
            xGrid: 0,
            zGrid: 0,
            // if one exists
            flower: Flowers.blueSixPetals,
            growthState: 1, },
        {
            creator_id: "u1",
            _id: mongoose.Types.ObjectId(),
            xGrid: 0,
            zGrid: 1,
            // if one exists
            flower: Flowers.poppy,
            growthState: 1, },
        {
            creator_id: "u1",
            _id: mongoose.Types.ObjectId(),
            xGrid: 0,
            zGrid: 2,
            // if one exists
            flower: Flowers.poppy,
            growthState: 1, },
    ],
 };
 const mapDiffGrowth={
    tiles: [
        {
            creator_id: "u1",
            _id: mongoose.Types.ObjectId(),
            xGrid: 0,
            zGrid: 0,
            // if one exists
            flower: Flowers.blueSixPetals,
            growthState: 0.5, },
        {
            creator_id: "u1",
            _id: mongoose.Types.ObjectId(),
            xGrid: 1,
            zGrid: 1,
            // if one exists
            flower: Flowers.blueSixPetals,
            growthState: 0.2, },
        {
            creator_id: "u1",
            _id: mongoose.Types.ObjectId(),
            xGrid: 0,
            zGrid: 1,
            // if one exists
            flower: Flowers.poppy,
            growthState: 0.7, },
        {
            creator_id: "u1",
            _id: mongoose.Types.ObjectId(),
            xGrid: 0,
            zGrid: 2,
            // if one exists
            flower: Flowers.poppy,
            growthState: 1, }
    ]};
 const mapFull={
    tiles : [
        blueFlowerTile(0,-2),
        blueFlowerTile(0,-1),
        blueFlowerTile(0,0),
        blueFlowerTile(0,1),
        blueFlowerTile(0,2),

        blueFlowerTile(1,-2),
        blueFlowerTile(1,-1),
        blueFlowerTile(1,0),
        blueFlowerTile(1,1),
        blueFlowerTile(1,2),
        blueFlowerTile(2,-2),
        blueFlowerTile(2,-1),
        blueFlowerTile(2,0),
        blueFlowerTile(2,1),
        blueFlowerTile(2,2),
        blueFlowerTile(-1,-2),
        blueFlowerTile(-1,-1),
        blueFlowerTile(-1,0),
        blueFlowerTile(-1,1),
        blueFlowerTile(-1,2),
        blueFlowerTile(-2,-2),
        blueFlowerTile(-2,-1),
        blueFlowerTile(-2,0),
        blueFlowerTile(-2,1),
        blueFlowerTile(-2,2),
    ]
 }
 export {emptyMap, mapTwoFlowers, mapAdjFlowers,mapFull, mapDiffGrowth};