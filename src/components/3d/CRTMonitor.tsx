import { useRef } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { VirtualOS } from '../os/VirtualOS';

export const CRTMonitor = () => {
  const { cameraMode, setCameraMode } = usePortfolioStore();
  const monitorGroupRef = useRef<THREE.Group>(null);

  const isRoomView = cameraMode === 'room';

  const handleMonitorClick = (e: any) => {
    e.stopPropagation();
    if (isRoomView) {
      setCameraMode('screen');
    }
  };

  return (
    <group ref={monitorGroupRef} position={[0, 0.88, 0]}>
      {/* Monitor Base Stand */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.04, 32]} />
        <meshStandardMaterial color="#c8baa3" roughness={0.6} />
      </mesh>

      {/* Monitor Stand Neck */}
      <mesh position={[0, 0.12, -0.02]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.18, 20]} />
        <meshStandardMaterial color="#b3a58e" roughness={0.7} />
      </mesh>

      {/* CRT Monitor Main Housing (Deep bulbous back) */}
      <mesh position={[0, 0.38, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.96, 0.72, 0.55]} />
        <meshStandardMaterial color="#d4c7b0" roughness={0.5} />
      </mesh>

      {/* Back CRT Cone Taper */}
      <mesh position={[0, 0.38, -0.42]} castShadow>
        <boxGeometry args={[0.65, 0.5, 0.2]} />
        <meshStandardMaterial color="#b8ab95" roughness={0.6} />
      </mesh>

      {/* CRT Front Bezel Frame */}
      <mesh position={[0, 0.38, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.02, 0.78, 0.1]} />
        <meshStandardMaterial color="#dfd3be" roughness={0.4} />
      </mesh>

      {/* CRT Screen Bevel Cutout (Dark Inner Border) */}
      <mesh position={[0, 0.40, 0.145]}>
        <planeGeometry args={[0.88, 0.64]} />
        <meshBasicMaterial color="#1a1c23" />
      </mesh>

      {/* CRT Power Button & LED */}
      <group position={[0.36, 0.06, 0.155]}>
        {/* Power LED (Glowing green) */}
        <mesh position={[-0.05, 0, 0]}>
          <sphereGeometry args={[0.008, 16, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        {/* Power Button */}
        <mesh 
          position={[0, 0, 0]} 
          onClick={handleMonitorClick}
        >
          <boxGeometry args={[0.03, 0.015, 0.01]} />
          <meshStandardMaterial color="#887b67" />
        </mesh>
      </group>

      {/* Monitor Brand Logo */}
      <mesh position={[0, 0.06, 0.155]}>
        <boxGeometry args={[0.08, 0.015, 0.005]} />
        <meshStandardMaterial color="#554b3c" roughness={0.3} />
      </mesh>

      {/* CRT Screen Glass Surface & Glow Light */}
      <pointLight 
        position={[0, 0.4, 0.3]} 
        intensity={0.4} 
        distance={1.5} 
        color="#38bdf8" 
      />

      {/* Interactive HTML Screen */}
      <group position={[0, 0.40, 0.152]}>
        <Html
          transform
          wrapperClass="crt-embedded-screen"
          distanceFactor={0.74}
          position={[0, 0, 0]}
          style={{
            width: '980px',
            height: '710px',
            overflow: 'hidden',
            borderRadius: '16px',
            pointerEvents: isRoomView ? 'none' : 'auto',
            transform: 'scale(1)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)',
          }}
        >
          <VirtualOS isEmbedded={true} />
        </Html>
      </group>

      {/* Click Target Mesh for Room View (Smooth zoom trigger) */}
      {isRoomView && (
        <mesh
          position={[0, 0.4, 0.16]}
          onClick={handleMonitorClick}
          visible={false}
        >
          <planeGeometry args={[1.0, 0.8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  );
};
