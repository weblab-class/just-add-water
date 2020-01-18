import * as Flowers from '../js-plant-gen/ExampleFlowers';
/** 
 * data for rendering a test map
 * things to check for
 * - map is right size
 * - plants are placed in the right tiles
 * - if plants are different then they are rendered correctly 
 * 
 */

 const emptyMap={
    mapDimX: 4,
    /** Z-length of map, in tiles */
    mapDimZ: 4,
    /** tiles on map that contain plants, i.e. have been changed */
    tiles: [],
 }

 const mapTwoFlowers={
    mapDimX: 4,
    /** Z-length of map, in tiles */
    mapDimZ: 4,
    /** tiles on map that contain plants, i.e. have been changed */
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
            x: 3,
            z: 3,
            // if one exists
            flower: Flowers.poppy,
            growth_state: 10, },
    ],
 }
 export {emptyMap, mapTwoFlowers};