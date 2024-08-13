import { useFrame } from '@react-three/fiber';
import GLBModel from './GLBModel';
import { Raycaster, Vector3 } from 'three';
import { useState } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';
import * as THREE from 'three';

interface BoatProps {
  waterRef: React.MutableRefObject<THREE.Mesh | null>;
  shipLength: number;
  shipWidth: number;
  helpers: boolean;
}

const Boat = (props: BoatProps) => {
  const direction = new Vector3(0, degToRad(-180), 0);
  const frontRayOrigin = new Vector3(0, 10, -props.shipLength / 2);
  const rearRayOrigin = new Vector3(0, 10, props.shipLength / 2);
  const leftRayOrigin = new Vector3(-props.shipWidth, 10, 0);
  const rightRayOrigin = new Vector3(props.shipWidth, 10, 0);
  const centralRayOrigin = new Vector3(0, 10, 0);
  const [yPos, setYPos] = useState(0);
  const frontRaycaster = new Raycaster();
  const rearRaycaster = new Raycaster();
  const leftRaycaster = new Raycaster();
  const rightRaycaster = new Raycaster();
  const centralRaycaster = new Raycaster();
  const [boatRotation, setBoatRotation] = useState(new Vector3(0, 0, 0));

  useFrame((_state) => {
    if (props.waterRef.current) {
      frontRaycaster.set(frontRayOrigin, direction);
      rearRaycaster.set(rearRayOrigin, direction);
      leftRaycaster.set(leftRayOrigin, direction);
      rightRaycaster.set(rightRayOrigin, direction);
      centralRaycaster.set(centralRayOrigin, direction);
      const centralIntersects = centralRaycaster.intersectObjects([props.waterRef.current]);
      const frontIntersects = frontRaycaster.intersectObjects([props.waterRef.current]);
      const rearIntersects = rearRaycaster.intersectObjects([props.waterRef.current]);
      const leftIntersects = leftRaycaster.intersectObjects([props.waterRef.current]);
      const rightIntersects = rightRaycaster.intersectObjects([props.waterRef.current]);

      if (
        frontIntersects.length > 0 &&
        rearIntersects.length > 0 &&
        leftIntersects.length > 0 &&
        rightIntersects.length > 0 &&
        centralIntersects.length > 0
      ) {
        const FRheightDiff = frontIntersects[0].point.y - rearIntersects[0].point.y;
        const FRangle = Math.atan(FRheightDiff / props.shipLength);

        const LRheightDiff = rightIntersects[0].point.y - leftIntersects[0].point.y;
        const LRangle = Math.atan(LRheightDiff / props.shipWidth);

        setBoatRotation(new Vector3(FRangle, 0, LRangle));
        setYPos(centralIntersects[0].point.y - 0.4);
      }
    }
  });

  return (
    <>
      <GLBModel
        url="/traders_tallship.glb"
        scale={0.005}
        position={new Vector3(0, yPos || 0, 0)}
        rotation={[boatRotation.x, 0, boatRotation.z]}
      />
      {props.helpers ? (
        <>
          <arrowHelper args={[direction, frontRayOrigin, 10, 'red']} />
          <arrowHelper args={[direction, rearRayOrigin, 10, 'red']} />
          <arrowHelper args={[direction, leftRayOrigin, 10, 'green']} />
          <arrowHelper args={[direction, rightRayOrigin, 10, 'blue']} />
        </>
      ) : null}
    </>
  );
};

export default Boat;

//https://hofk.de/main/discourse.threejs/2021/NoiseQuadTerrain/NoiseQuadTerrain.html
