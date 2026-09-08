import * as THREE from 'three';

export const RetroRoom = () => {
  return (
    <group>
      {/* 1. Computer Desk */}
      <group position={[0, 0, 0]}>
        {/* Tabletop Wood */}
        <mesh position={[0, 0.85, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.06, 1.1]} />
          <meshStandardMaterial color="#4a3728" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Desk Metal Legs */}
        {/* Front Left */}
        <mesh position={[-1.0, 0.425, 0.4]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.85, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Front Right */}
        <mesh position={[1.0, 0.425, 0.4]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.85, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Back Left */}
        <mesh position={[-1.0, 0.425, -0.5]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.85, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Back Right */}
        <mesh position={[1.0, 0.425, -0.5]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.85, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* 2. Retro PC Tower (Beige Case) */}
      <group position={[0.78, 0.88 + 0.26, -0.1]}>
        {/* Main Tower Box */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.24, 0.52, 0.46]} />
          <meshStandardMaterial color="#d8cbba" roughness={0.5} />
        </mesh>

        {/* Front Bezel */}
        <mesh position={[0, 0, 0.235]} castShadow>
          <boxGeometry args={[0.245, 0.525, 0.02]} />
          <meshStandardMaterial color="#e5d9c8" roughness={0.4} />
        </mesh>

        {/* CD-ROM Drive (5.25") */}
        <mesh position={[0, 0.16, 0.246]}>
          <boxGeometry args={[0.18, 0.045, 0.005]} />
          <meshStandardMaterial color="#b5a794" />
        </mesh>
        {/* 3.5" Floppy Disk Drive */}
        <mesh position={[0, 0.08, 0.246]}>
          <boxGeometry args={[0.14, 0.03, 0.005]} />
          <meshStandardMaterial color="#a39582" />
        </mesh>
        {/* Floppy Slot */}
        <mesh position={[0, 0.08, 0.249]}>
          <boxGeometry args={[0.10, 0.004, 0.002]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        {/* Power / Turbo Buttons */}
        <mesh position={[-0.05, -0.05, 0.246]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.006, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        {/* Power LED (Green) */}
        <mesh position={[-0.02, -0.05, 0.248]}>
          <sphereGeometry args={[0.005, 12, 12]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        {/* HDD Activity LED (Orange) */}
        <mesh position={[0.01, -0.05, 0.248]}>
          <sphereGeometry args={[0.005, 12, 12]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>

        {/* Air vents */}
        <mesh position={[0, -0.16, 0.246]}>
          <boxGeometry args={[0.16, 0.08, 0.002]} />
          <meshStandardMaterial color="#948775" roughness={0.8} />
        </mesh>
      </group>

      {/* 3. Keyboard & Mouse */}
      <group position={[-0.05, 0.88, 0.28]}>
        {/* Keyboard Base */}
        <mesh position={[0, 0.01, 0]} rotation={[-0.06, 0, 0]} castShadow>
          <boxGeometry args={[0.54, 0.025, 0.18]} />
          <meshStandardMaterial color="#d4c6b0" roughness={0.5} />
        </mesh>
        {/* Key Caps Layer */}
        <mesh position={[0, 0.026, 0]} rotation={[-0.06, 0, 0]}>
          <boxGeometry args={[0.50, 0.012, 0.15]} />
          <meshStandardMaterial color="#c2b49e" roughness={0.6} />
        </mesh>

        {/* Mousepad */}
        <mesh position={[0.42, 0.002, 0.02]} receiveShadow>
          <boxGeometry args={[0.22, 0.004, 0.24]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>

        {/* Retro Mouse */}
        <mesh position={[0.42, 0.02, 0.02]} castShadow>
          <boxGeometry args={[0.07, 0.03, 0.11]} />
          <meshStandardMaterial color="#dbcebb" roughness={0.4} />
        </mesh>
        {/* Mouse Button Split */}
        <mesh position={[0.42, 0.036, -0.01]}>
          <boxGeometry args={[0.066, 0.002, 0.04]} />
          <meshStandardMaterial color="#c4b6a2" />
        </mesh>
      </group>

      {/* 4. Desk Lamp (Warm reading light) */}
      <group position={[-0.75, 0.88, -0.15]}>
        {/* Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.11, 0.03, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Lower Arm */}
        <mesh position={[0.04, 0.22, 0]} rotation={[0, 0, -0.25]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.42, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[0.12, 0.44, 0]} rotation={[0, 0, 0.4]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.36, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Lamp Shade (Cone) */}
        <mesh position={[0.22, 0.48, 0]} rotation={[0, 0, -0.7]} castShadow>
          <coneGeometry args={[0.09, 0.16, 24, 1, true]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
        {/* Lamp Light Bulb */}
        <mesh position={[0.25, 0.45, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#ffedd5" />
        </mesh>
        {/* Spot Light pointing at desk */}
        <spotLight
          position={[0.25, 0.45, 0]}
          target-position={[0, 0.88, 0.1]}
          intensity={3.5}
          angle={0.65}
          penumbra={0.5}
          color="#ffc078"
          castShadow
          shadow-bias={-0.0001}
        />
      </group>

      {/* 5. Coffee Mug & Books */}
      <group position={[-0.45, 0.88, 0.25]}>
        {/* Mug */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.09, 20]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        {/* Coffee Liquid */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.005, 20]} />
          <meshStandardMaterial color="#381d11" roughness={0.2} />
        </mesh>
      </group>

      {/* Books Stack */}
      <group position={[-0.72, 0.88, 0.22]}>
        <mesh position={[0, 0.02, 0]} rotation={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.22, 0.035, 0.16]} />
          <meshStandardMaterial color="#7f1d1d" roughness={0.7} />
        </mesh>
        <mesh position={[0.01, 0.055, 0.01]} rotation={[0, -0.05, 0]} castShadow>
          <boxGeometry args={[0.20, 0.035, 0.15]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
        </mesh>
      </group>

      {/* 6. Room Back Wall & Poster */}
      <group position={[0, 1.8, -0.6]}>
        {/* Wall */}
        <mesh receiveShadow>
          <planeGeometry args={[7, 4.5]} />
          <meshStandardMaterial color="#1e232d" roughness={0.8} />
        </mesh>

        {/* Retro Wall Poster (Aldi Fayruz / 3D Developer) */}
        <mesh position={[0, 0.15, 0.01]} receiveShadow>
          <planeGeometry args={[1.2, 0.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        {/* Poster Inner Art Border */}
        <mesh position={[0, 0.15, 0.02]}>
          <planeGeometry args={[1.14, 0.74]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.5} />
        </mesh>
      </group>

      {/* 7. Room Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.9} />
      </mesh>
    </group>
  );
};
