import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Vector3 } from 'three';

interface GLBModleProps {
  url: string;
  scale?: number;
  rotation?: Vector3 | undefined | [number, number, number];
  position?: Vector3;
}

const GLBModel = (props: GLBModleProps) => {
  const gltf = useLoader(GLTFLoader, props.url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);
  });

  gltf.scene.traverse((child: any) => {
    if (child.isMesh === true) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <mesh position={props.position ? props.position : new Vector3(0, 0, 0)}>
      <primitive
        object={gltf.scene}
        rotation={props.rotation || [0, 0, 0]}
        scale={props.scale || 1}
      />
    </mesh>
  );
};

export default GLBModel;
