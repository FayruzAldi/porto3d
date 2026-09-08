import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraController } from './CameraController';
import { RetroModelRoom } from './RetroModelRoom';
import { DustParticles } from './DustParticles';

export const SceneCanvas = () => {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [2.0, 1.65, 1.1], fov: 52 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <CameraController />

        {/* Ambient Soft Room Lighting */}
        <ambientLight intensity={0.65} color="#fff1e6" />

        {/* Main Directional Warm Sun/Window Light */}
        <directionalLight
          position={[3.5, 4.5, 2.5]}
          intensity={1.1}
          color="#fff8f0"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />

        {/* Soft Cool Fill Light from opposite side */}
        <pointLight position={[-2.5, 2.0, -2.0]} intensity={0.4} color="#93c5fd" />

        <Suspense fallback={null}>
          {/* User GLB Model Workstation + Integrated Screen */}
          <RetroModelRoom />

          {/* Cozy Floor Plane Under Table */}
          <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial color="#0f1218" roughness={0.9} />
          </mesh>

          {/* Atmospheric Floating Dust Particles */}
          <DustParticles count={65} />
        </Suspense>
      </Canvas>
    </div>
  );
};
