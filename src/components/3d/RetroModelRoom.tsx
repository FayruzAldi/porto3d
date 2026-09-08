import { useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import type * as THREE from 'three';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { VirtualOS } from '../os/VirtualOS';
import { ErrorBoundary } from '../ui/ErrorBoundary';

export const RetroModelRoom = () => {
  const { scene } = useGLTF('/models/retrokomputer.glb');
  const { cameraMode, setCameraMode } = usePortfolioStore();
  const groupRef = useRef<THREE.Group>(null);

  const isRoomView = cameraMode === 'room';

  const handleMonitorClick = (e: any) => {
    e.stopPropagation();
    if (isRoomView) {
      setCameraMode('screen');
    }
  };

  // Configure shadows
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group ref={groupRef} position={[-0.58, 0, -1.18]}>
      {/* 3D Model Scene from retrokomputer.glb */}
      <primitive object={scene} />

      {/* Screen Interactive Container (Anchored at Monitor_6) */}
      <group position={[0.1027, 0.9105, 0.5023]} rotation={[0, -0.2688, 0]}>
        {/* CRT Screen Glow Light */}
        <pointLight
          position={[0.22, 0.269, 0]}
          intensity={0.4}
          distance={1.2}
          color="#38bdf8"
        />

        {/* Embedded Virtual OS Screen on CRT Face, snugly fitted into monitor bezel */}
        <group position={[0.154, 0.269, 0]} rotation={[0, Math.PI / 2, 0]}>
          <Html
            transform
            wrapperClass="crt-embedded-screen"
            distanceFactor={0.203}
            position={[0, 0, 0]}
            style={{
              width: '760px',
              height: '570px',
              overflow: 'hidden',
              borderRadius: '10px',
              pointerEvents: isRoomView ? 'none' : 'auto',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.85)',
              backgroundColor: '#008080',
            }}
          >
            <ErrorBoundary>
              <VirtualOS isEmbedded={true} />
            </ErrorBoundary>
          </Html>
        </group>

        {/* Click Target Mesh over Monitor Screen in Room View */}
        {isRoomView && (
          <mesh
            position={[0.158, 0.269, 0]}
            rotation={[0, Math.PI / 2, 0]}
            onClick={handleMonitorClick}
            visible={false}
          >
            <planeGeometry args={[0.385, 0.288]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        )}
      </group>

      {/* Warm Lamp Light matching the desk lamp in retrokomputer.glb */}
      <spotLight
        position={[-0.04, 1.45, 1.45]}
        target-position={[0.45, 0.74, 0.85]}
        intensity={3.5}
        angle={0.7}
        penumbra={0.6}
        color="#ffc988"
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Soft Fill Lamp Glow */}
      <pointLight
        position={[-0.04, 1.35, 1.45]}
        intensity={0.7}
        distance={2.5}
        color="#ffe2b0"
      />
    </group>
  );
};

useGLTF.preload('/models/retrokomputer.glb');
