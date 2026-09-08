import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../stores/portfolioStore';

export const CameraController: React.FC = () => {
  const { cameraMode, useCustomModel } = usePortfolioStore();
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Exact coordinates matched to retrokomputer.glb model
  // Room View: Wider cinematic diagonal view of the full desk workstation setup
  const roomCamPos = new THREE.Vector3(2.0, 1.72, 1.10);
  const roomCamTarget = new THREE.Vector3(-0.15, 0.78, -0.25);

  // Screen View: Positioned squarely in front of CRT monitor face
  const screenCamPos = useCustomModel 
    ? new THREE.Vector3(0, 1.28, 1.05)
    : new THREE.Vector3(0.125, 1.180, -0.512);
  const screenCamTarget = useCustomModel
    ? new THREE.Vector3(0, 1.28, 0)
    : new THREE.Vector3(-0.329, 1.180, -0.637);

  const currentTarget = useRef(new THREE.Vector3(-0.05, 0.85, -0.20));

  useEffect(() => {
    if (controlsRef.current) {
      if (cameraMode === 'screen') {
        controlsRef.current.enabled = false;
      } else {
        controlsRef.current.enabled = true;
      }
    }
  }, [cameraMode]);

  useFrame((_, delta) => {
    const isScreen = cameraMode === 'screen';
    const desiredPos = isScreen ? screenCamPos : roomCamPos;
    const desiredTarget = isScreen ? screenCamTarget : roomCamTarget;

    const smoothSpeed = isScreen ? 5.0 : 3.8;

    // Smooth camera position lerp
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredPos.x, smoothSpeed, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredPos.y, smoothSpeed, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredPos.z, smoothSpeed, delta);

    // Smooth target lookAt lerp
    currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, desiredTarget.x, smoothSpeed, delta);
    currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, desiredTarget.y, smoothSpeed, delta);
    currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, desiredTarget.z, smoothSpeed, delta);

    if (controlsRef.current && cameraMode === 'room') {
      controlsRef.current.target.copy(currentTarget.current);
      controlsRef.current.update();
    } else {
      camera.lookAt(currentTarget.current);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={cameraMode === 'room'}
      minDistance={0.8}
      maxDistance={3.8}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 2.0}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.05}
      dampingFactor={0.06}
      enableDamping
    />
  );
};
