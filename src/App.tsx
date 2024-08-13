import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import { CameraControls } from '@react-three/drei';

function App() {
  return (
    <>
      <Canvas
        style={{ width: '100vw', height: '100vh', border: 'solid white', boxSizing: 'border-box' }}
      >
        <CameraControls />
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
