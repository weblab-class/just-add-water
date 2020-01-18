import React, {useRef, Fragment } from "react";
import * as Examples from '../../js-plant-gen/ExampleFlowers';
import * as fc from '../modules/FlowerComponents';
import * as PropTypes from 'prop-types';

// cannot return a canvas element because of weird DOM shit; this just puts together everything required in the map
// write test map to render
GameMap.propTypes = {
    /** X-length of map, in tiles */
    mapDimX: PropTypes.number,
    /** Z-length of map, in tiles */
    mapDimZ: PropTypes.number,
    /** tiles on map that contain plants, i.e. have been changed */
    tiles: PropTypes.array.tile,
};
function MapLighting(props){
    return(
        <>
          <hemisphereLight intensity={0.7}/>
          <spotLight position={[25,15,20]} />
          <ambientLight intensity={0.1}/>
        </>
    )
}
function GameMap(props){
    const flowers = props.tiles.map((tile) => 
        <><fc.flowerModel key = {JSON.stringify(tile)} flowerData={tile.flower} position={[fc.tileSize*tile.x,tile.flower.stemHeight, fc.tileSize*tile.z]}/></>
    );
    return(
        <>
          <MapLighting/>
          <>
          {/* flower list goes here */}
          <fc.flowerModel flowerData={Examples.blueSixPetals} position={[10,10,10]}/>
          <fc.flowerModel flowerData={Examples.poppy} position={[10,10,0]} />
          </>
          <fc.ground/>
          <fc.tileGrid/>
        </>
    );
}

export default GameMap;