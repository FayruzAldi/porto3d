import { useRef, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { sound } from '../../utils/sound';
import { VirtualOS } from '../os/VirtualOS';
import { ErrorBoundary } from '../ui/ErrorBoundary';

// Glowing Animated White Outer Ring over Monitor Screen
const MonitorHighlightRing = ({ onClick }: { onClick: (e: any) => void }) => {
  const ringRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ringRef.current) {
      // Gentle breathing pulsation
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 2.8) * 0.012;
      ringRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group 
      ref={ringRef} 
      position={[0.158, 0.269, 0]} 
      rotation={[0, Math.PI / 2, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHovered(false);
      }}
      onClick={onClick}
    >
      {/* Invisible broad click plane with pointer events */}
      <mesh>
        <planeGeometry args={[0.40, 0.30]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Primary Outer White Glowing Ring / Border around CRT Bezel */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(0.392, 0.292)]} />
        <lineBasicMaterial 
          color="#ffffff" 
          linewidth={2} 
          transparent 
          opacity={hovered ? 1.0 : 0.85} 
        />
      </lineSegments>

      {/* Second outer soft cyan glow ring */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(0.404, 0.304)]} />
        <lineBasicMaterial 
          color="#38bdf8" 
          linewidth={1} 
          transparent 
          opacity={hovered ? 0.95 : 0.45} 
        />
      </lineSegments>

      {/* Retro floating notification badge */}
      <Html
        transform
        distanceFactor={0.24}
        position={[0, -0.18, 0.01]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <div style={{
          background: 'rgba(7, 11, 20, 0.92)',
          border: '1.5px solid #ffffff',
          color: '#ffffff',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 700,
          fontFamily: 'monospace',
          letterSpacing: '0.6px',
          boxShadow: '0 0 14px rgba(255, 255, 255, 0.6), inset 0 0 8px rgba(56, 189, 248, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 8px #ffffff'
          }} />
          CLICK MONITOR OR KEYBOARD TO ENTER
        </div>
      </Html>
    </group>
  );
};

export const RetroModelRoom = () => {
  const { scene } = useGLTF('/models/retrokomputer.glb');
  const { cameraMode, setCameraMode } = usePortfolioStore();
  const groupRef = useRef<THREE.Group>(null);

  const isRoomView = cameraMode === 'room';

  const handleEnterScreen = (e: any) => {
    e.stopPropagation();
    if (isRoomView) {
      document.body.style.cursor = 'auto';
      sound.playClick();
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
              pointerEvents: 'auto',
              cursor: isRoomView ? 'pointer' : 'default',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.85)',
              backgroundColor: '#008080',
            }}
            onClick={isRoomView ? handleEnterScreen : undefined}
          >
            <ErrorBoundary>
              <VirtualOS isEmbedded={true} />
            </ErrorBoundary>
          </Html>
        </group>

        {/* Outer White Glowing Ring and Monitor Click Target in Room View */}
        {isRoomView && (
          <MonitorHighlightRing onClick={handleEnterScreen} />
        )}
      </group>

      {/* Interactive Hitbox Targets for Keyboard, Mouse, and Tower PC in Room View */}
      {isRoomView && (
        <group>
          {/* Keyboard Click Target (Keyboard_3) */}
          <mesh
            position={[0.487, 0.77, 0.925]}
            onClick={handleEnterScreen}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
            }}
          >
            <boxGeometry args={[0.48, 0.08, 0.24]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          {/* Mouse Click Target (Computer_Mouse_4) */}
          <mesh
            position={[0.533, 0.77, 0.530]}
            onClick={handleEnterScreen}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
            }}
          >
            <boxGeometry args={[0.16, 0.08, 0.20]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          {/* Computer Tower Click Target (Computer_5) */}
          <mesh
            position={[0.061, 0.95, 0.472]}
            onClick={handleEnterScreen}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
            }}
          >
            <boxGeometry args={[0.26, 0.45, 0.45]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      )}

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
