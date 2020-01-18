import React, {useRef } from "react";
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
    tileSize: PropTypes.number,
    groundHeight: PropTypes.number,
    /** tiles on map that contain plants, i.e. have been changed */
    tiles: PropTypes.array,
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
    return(
        <>
          <MapLighting/>
          <fc.flowerModel flowerData={Examples.blueSixPetals} position={[10,0,0]}/>
          <fc.flowerModel flowerData={Examples.poppy} position={[10,10,0]} />
          <fc.tile/>
        </>
    );
}

export default GameMap;