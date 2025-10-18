"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface GeometricShapeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  opacity: number;
  morphing?: boolean;
}

function GeometricShape({ 
  position, 
  rotation, 
  scale, 
  color, 
  opacity, 
  morphing = false 
}: GeometricShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Create organic geometric shapes
  const geometry = useMemo(() => {
    const shapes = [
      // Organic torus
      new THREE.TorusGeometry(1, 0.3, 8, 16),
      // Organic sphere
      new THREE.SphereGeometry(1, 16, 16),
      // Organic box with rounded edges
      new THREE.BoxGeometry(1, 1, 1, 4, 4, 4),
      // Organic cylinder
      new THREE.CylinderGeometry(0.5, 0.5, 1, 8),
    ];
    
    return shapes[Math.floor(Math.random() * shapes.length)];
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Morphing animation
      if (morphing) {
        meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        meshRef.current.rotation.y = rotation[1] + Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
        meshRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      }
    }

    if (materialRef.current) {
      // Subtle opacity pulsing
      materialRef.current.opacity = opacity + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={opacity}
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

interface GeometricAbstractionProps {
  className?: string;
  intensity?: number;
  ambient?: boolean;
  interactive?: boolean;
}

export default function GeometricAbstraction({ 
  className = "",
  intensity = 0.5,
  ambient = true,
  interactive = false
}: GeometricAbstractionProps) {
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
      color: `hsl(${200 + Math.random() * 40}, 20%, ${60 + Math.random() * 20}%)`,
      opacity: 0.1 + Math.random() * 0.3,
      morphing: Math.random() > 0.5,
    }));
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={intensity} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        {ambient && (
          <Environment preset="city" />
        )}

        {shapes.map((shape, index) => (
          <GeometricShape
            key={index}
            position={shape.position}
            rotation={shape.rotation}
            scale={shape.scale}
            color={shape.color}
            opacity={shape.opacity}
            morphing={shape.morphing}
          />
        ))}

        {interactive && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
}