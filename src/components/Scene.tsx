import { Sky } from '@react-three/drei';
import WaterPlane from './Water';

const Scene = () => {
  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <Sky
        distance={450000}
        sunPosition={[0, 0, 1]}
        inclination={75}
        azimuth={0.15}
        turbidity={8}
        rayleigh={6}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <WaterPlane speed={0.2} repeat={100} waveHeight={0.1} waveScalar={8} />
    </>
  );
};

export default Scene;
