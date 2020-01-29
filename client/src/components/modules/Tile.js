import React, { useRef, useEffect,useState } from "react";
import { useGesture } from "react-use-gesture";
import { useSpring, a } from 'react-spring/three';
import { PlantMesh } from './Flower';
import { post } from "../../utilities";
import { soilHeight, growthIncrement, tileSize, toGridUnits, soilColor } from "./Map";

function Tile(props) {
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
        emissive:soilColor,
        config: { mass: 1, friction: 26, tension: 170 }
    }));


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
        onHover:({hovering})=>setColorSpring({emissiveIntensity: hovering? 0.3 : 0}),
        onClick: (event) => {
            event.stopPropagation();
            props.handleDelete({id:props._id});
            post('/api/deleteTile', { id: props._id });
            setSpring({scale:[1,0.3,1]});
        },
    }, {pointerEvents:true});

    const bindGestureWater = useGesture({
        onHover:({hovering})=>scaleOnHover(hovering),
        onClick: (event) => {
            event.stopPropagation();
            if (growthState<1){
                console.log("growth triggered");
                setColorSpring({ emissiveIntensity: 1.5 });
                growthState += growthIncrement;
                post('/api/updateTile', { id: props._id, updateObj: { growthState: growthState } }).then(res => console.log("updated tile: ", res));
                const setPlantSpring = plantSpringRef.current;
                setPlantSpring({
                    growthIncrement: growthIncrement,
                    newGrowthState: growthState
                });
                props.handleFinishWater();
            }
            else {
                console.log(props.sendCaptionMessage);
                props.sendCaptionMessage({message:"this plant is already fully grown"})
            }
        },
    }, {pointerEvents:true});
    const yref = useRef(y);
    const bindGesturePick = useGesture({
        onHover:({hovering})=>scaleOnHover(hovering),
        onClick: (event) => {
            event.stopPropagation();
            if (props.growthState>=1){
                setColorSpring({ emissiveIntensity: 2 });
                setSpring({position:[x,tileSize,z]});
                yref.current=tileSize;
                props.handleClickPickMode({ flower: props.flower });
            }
            else{
                props.sendCaptionMessage({message:"you cannot hybridize plants until they are mature"})
            }
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
    // set color/light overlay when changing input modes
    const doNothing = () =>{ };
    const inputModeEffects = {
        "pick":() => {
            if (props.growthState>= 1){
            setColorSpring({ emissiveIntensity: 0.3 }); }
        },
        "move":doNothing,
        "delete":doNothing,
        "add": doNothing ,
        "water": () =>{
            if (props.growthState <= 1){
                setColorSpring({emissiveIntensity:0.3})
            }
        },
        "view":()=>{ 
            if (yref.current> y) {
                setSpring({position:[x,y,z]});
                yref.current=y;
            }
            setColorSpring({emissiveIntensity:0});
        }
    };
    useEffect(()=>{
        inputModeEffects[props.inputMode]();
    }, [props.inputMode]);
    return <a.group visible = {props.isDeleted ? false : true}position={[x, y, z]} {...spring} {...bindGesture()}>
        <mesh name="soilMesh">
            <boxGeometry args={[tileSize, height, tileSize]} attach="geometry" />
            <a.meshStandardMaterial {...colorSpringProps}  attach="material" roughness={1} color={soilColor} />
            {plantMesh}
        </mesh>
    </a.group>;
}
export default Tile;