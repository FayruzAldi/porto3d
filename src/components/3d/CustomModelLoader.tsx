import React from 'react';
import { useGLTF } from '@react-three/drei';

interface CustomModelLoaderProps {
  modelPath?: string;
}

export const CustomModelLoader: React.FC<CustomModelLoaderProps> = ({ 
  modelPath = '/models/scene.glb' 
}) => {
  try {
    const gltf = useGLTF(modelPath);
    return <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} />;
  } catch (error) {
    console.warn(`Could not load custom model from ${modelPath}. Using procedural retro room instead.`, error);
    return null;
  }
};
