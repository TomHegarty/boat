import { SimplexNoise } from 'three-stdlib';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils.js';
import Boat from './Boat';
import { MeshReflectorMaterial } from '@react-three/drei';

interface WaterProps {
  speed: number;
  repeat: number;
  waveHeight: number;
  waveScalar: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      colorShiftMaterial: any;
    }
  }
}

import terrainFragmentShader from './shaders/terrainFragmentShader.glsl?raw';
import terrainVertexShader from './shaders/terrainVertexShader.glsl?raw';

const WaterPlane = (props: WaterProps) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const simplex = new SimplexNoise();

  // Update the time uniform in every frame
  useFrame((_state, _delta) => {
    const mesh = waterRef.current;
    if (!mesh) return;

    const geometry = mesh.geometry as THREE.PlaneGeometry;
    const positions = geometry.attributes.position as THREE.BufferAttribute;
    const uv = geometry.attributes.uv as THREE.BufferAttribute;
    const vUv = new THREE.Vector2();

    // Update position attributes based on noise
    for (let index = 0; index < positions.count; index++) {
      vUv.fromBufferAttribute(uv, index).multiplyScalar(props.waveScalar);
      const y = simplex.noise(
        vUv.x + _state.clock.getElapsedTime() * props.speed,
        vUv.y + _state.clock.getElapsedTime() * props.speed,
      );
      positions.setZ(index, y * props.waveHeight);
    }
    positions.needsUpdate = true;
  });

  return (
    <>
      <mesh ref={waterRef} rotation-x={degToRad(-90)}>
        <planeGeometry args={[16, 16, 64, 64]} />
        {/* <meshStandardMaterial
          color={'#56cfda'}
          wireframe={false}
          metalness={0.8}
          transparent
          opacity={0.7}
        /> */}
        {/* <colorShiftMaterial time={1.0} color={[0.2, 0.0, 0.1]} /> */}
        <MeshReflectorMaterial
          color="rgba(69, 176, 222, 0.9)"
          mirror={0.2}
          roughness={0.2}
          metalness={0.2}
        />
        <shaderMaterial fragmentShader={terrainFragmentShader} vertexShader={terrainVertexShader} />
      </mesh>
      <Boat waterRef={waterRef} shipLength={3} shipWidth={0.5} helpers={false} />
    </>
  );
};

export default WaterPlane;
