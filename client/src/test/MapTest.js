import * as Flowers from '../js-plant-gen/ExampleFlowers';
/** 
 * data for rendering a test map
 * things to check for
 * - map is right size
 * - plants are placed in the right tiles
 * - if plants are different then they are rendered correctly 
 * 
 */
function blueFlowerTile(x,z){
    const tile = 
        {
            creator_id: "test",
            x: x,
            z: z,
            // if one exists
            flower: Flowers.blueSixPetals,
            growth_state: 10, };
    return tile;
}
 const emptyMap={

    tiles: [],
 }

 const mapTwoFlowers={
    tiles: [
        {
            creator_id: "u1",
            x: 0,
            z: 0,
            // if one exists
            flower: Flowers.blueSixPetals,
            growth_state: 10, },
        {
            creator_id: "u1",
            x: 2,
            z: 2,
            // if one exists
            flower: Flowers.poppy,
            growth_state: 10, },
    ],
 }
 const mapAdjFlowers={
    tiles: [
        {
            creator_id: "u1",
            x: 0,
            z: 0,
            // if one exists
            flower: Flowers.blueSixPetals,
            growth_state: 10, },
        {
            creator_id: "u1",
            x: 0,
            z: 1,
            // if one exists
            flower: Flowers.poppy,
            growth_state: 10, },
        {
            creator_id: "u1",
            x: 0,
            z: 2,
            // if one exists
            flower: Flowers.poppy,
            growth_state: 10, },
    ],
 }
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
 export {emptyMap, mapTwoFlowers, mapAdjFlowers,mapFull};