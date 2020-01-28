import React, { useRef } from "react";
import { useGesture } from "react-use-gesture";
import { useSpring, a } from 'react-spring/three';
import { PlantMesh } from './Flower';
import { post } from "../../utilities";
import { soilHeight, growthIncrement, tileSize, toGridUnits, soilColor } from "./Map";

function Tile(props) {
    console.log("tile props received: ", props);
    const height = soilHeight;
    const x = props.hasOwnProperty("x") ? props.x : 0;
    const z = props.hasOwnProperty("z") ? props.z : 0;
    const y = 0;
    // animation and input stuff
    const [spring, setSpring] = useSpring(() => ({
        scale: [1, 1, 1],
        position: [x, y, z],
        rotation: [0, 0, 0],
        config: { mass: 3, friction: 30, tension: 700 }
    }));
    // set up ref to be able to access plant model animations
    let growthState = props.growthState;
    const plantSpringRef = useRef();
    let plantMesh = (<PlantMesh name="plantMesh" {...props.flower} x={0} y={props.flower.stemHeight} z={0} growthState={growthState} springRef={plantSpringRef} alwaysShowFlower={false} growthIncrement={growthIncrement} />);

    const mouseRef = props.mouseRef;
    const [colorSpringProps, setColorSpring] = useSpring(() => ({
        emissiveIntensity: 0,
        config: { mass: 1, friction: 26, tension: 170 }
    }));
    // set color overlay when changing input modes
    if (props.inputMode == "pick") {
        setColorSpring({ emissiveIntensity: 0.3 });
    } else {
        setColorSpring({ emissiveIntensity: 0 });
    }
    const scaleOnHover = (hovering)=>setSpring({ scale: hovering ? [1, 1.2, 1] : [1, 1, 1] });
    const bindGestureMove = useGesture({
        onDrag: (dragEvent) => {
            dragEvent.event.stopPropagation();
            setSpring({ position: [mouseRef.current.x, mouseRef.current.y, mouseRef.current.z] });
        },
        onDragEnd: (dragEndEvent) => {
            dragEndEvent.event.stopPropagation();
            setSpring({ position: [mouseRef.current.x, mouseRef.current.y, mouseRef.current.z] });
            post('/api/updateTile', { id: props._id, updateObj: { xGrid: toGridUnits(mouseRef.current.x), zGrid: toGridUnits(mouseRef.current.z) } });
        },
        onHover:({hovering})=>scaleOnHover(hovering)
    }, { pointerEvents: true });

    const bindGestureView = useGesture({
        onHover:({hovering})=>scaleOnHover(hovering)
    }, {pointerEvents:true});

    const bindGestureDelete = useGesture({
        onHover:({hovering})=>scaleOnHover(hovering),
        onClick: (event) => {
            post('/api/deleteTile', { id: props._id });
            setSpring({ position: [x, -100, z] });
        },
    }, {pointerEvents:true});

    const bindGestureWater = useGesture({
        onHover:({hovering})=>scaleOnHover(hovering),
        onClick: (event) => {
            console.log("growth triggered");
            event.stopPropagation();
            growthState += growthIncrement;
            post('/api/updateTile', { id: props._id, updateObj: { growthState: growthState } }).then(res => console.log("updated tile: ", res));
            const setPlantSpring = plantSpringRef.current;
            setPlantSpring({
                growthIncrement: growthIncrement,
                newGrowthState: growthState
            });
            // reassign state only after animation
            plantMesh = <PlantMesh name="plantMesh" {...props.flower} x={0} y={props.flower.stemHeight} z={0} growthState={growthState} springRef={plantSpringRef} alwaysShowFlower={false} growthIncrement={growthIncrement} />;
            props.handleFinishWater();
        },
    }, {pointerEvents:true});
    const bindGesturePick = useGesture({
        onHover:({hovering})=>scaleOnHover(hovering),
        onClick: (event) => {
            setColorSpring({ emissiveIntensity: 1 });
            setSpring({ position: [x, tileSize, z] });
            props.handleClickPickMode({ flower: props.flower });
        },
    }, {pointerEvents:true});
    const gestureHandlers = {
        "move":bindGestureMove,
        "view": bindGestureView,
        "delete": bindGestureDelete,
        "water":bindGestureWater,
        "pick":bindGesturePick,
        "add":()=>{}
    }
    const bindGesture = gestureHandlers[props.inputMode];

    return <a.group position={[x, y, z]} {...spring} {...bindGesture()}>
        <mesh name="soilMesh" visible={true}>
            <boxGeometry args={[tileSize, height, tileSize]} attach="geometry" />
            <a.meshStandardMaterial {...colorSpringProps} color={soilColor} attach="material" roughness={1} emissive={soilColor} />
            {plantMesh}
        </mesh>
    </a.group>;
}
export default Tile;