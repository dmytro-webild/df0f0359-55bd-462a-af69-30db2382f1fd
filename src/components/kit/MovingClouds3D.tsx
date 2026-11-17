"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CloudPuffProps {
  position: [number, number, number];
  scale: [number, number, number];
}

function CloudCluster({
  basePosition,
  speed,
  scale = 1,
  phase = 0
}: {
  basePosition: [number, number, number];
  speed: number;
  scale?: number;
  phase?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate a procedural cloud shape with 7 overlapping puffs
  const puffs = useMemo<CloudPuffProps[]>(() => {
    return [
      { position: [0, 0, 0], scale: [1.8 * scale, 1.2 * scale, 1.4 * scale] },
      { position: [1.1 * scale, 0.2 * scale, 0.2 * scale], scale: [1.4 * scale, 1.0 * scale, 1.1 * scale] },
      { position: [-1.2 * scale, -0.1 * scale, -0.1 * scale], scale: [1.3 * scale, 0.9 * scale, 1.0 * scale] },
      { position: [0.6 * scale, 0.6 * scale, -0.3 * scale], scale: [1.2 * scale, 1.1 * scale, 1.1 * scale] },
      { position: [-0.6 * scale, 0.5 * scale, 0.3 * scale], scale: [1.1 * scale, 1.0 * scale, 1.0 * scale] },
      { position: [2.0 * scale, -0.2 * scale, 0.1 * scale], scale: [0.9 * scale, 0.7 * scale, 0.8 * scale] },
      { position: [-2.1 * scale, -0.2 * scale, -0.2 * scale], scale: [0.8 * scale, 0.6 * scale, 0.7 * scale] }
    ];
  }, [scale]);

  const geometry = useMemo(() => new THREE.DodecahedronGeometry(1, 1), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f1f5f9"),
        emissive: new THREE.Color("#1e1b4b"),
        emissiveIntensity: 0.05,
        roughness: 0.9,
        metalness: 0.1,
        transparent: true,
        opacity: 0.75,
        flatShading: true
      }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.position.x += speed * delta;
    groupRef.current.position.y = basePosition[1] + Math.sin(time * 0.4 + phase) * 0.25;

    // Wrap around screen bounds
    if (groupRef.current.position.x > 22) {
      groupRef.current.position.x = -22;
    }
  });

  return (
    <group ref={groupRef} position={basePosition}>
      {puffs.map((puff, idx) => (
        <mesh
          key={idx}
          geometry={geometry}
          material={material}
          position={puff.position}
          scale={puff.scale}
        />
      ))}
    </group>
  );
}

function CloudsScene() {
  const cloudsData = useMemo(() => {
    return [
      { basePosition: [-16, 3, -4] as [number, number, number], speed: 0.45, scale: 1.3, phase: 0 },
      { basePosition: [-6, 4.5, -8] as [number, number, number], speed: 0.3, scale: 1.8, phase: 1.5 },
      { basePosition: [4, 2.5, -3] as [number, number, number], speed: 0.55, scale: 1.1, phase: 3.0 },
      { basePosition: [14, 5, -10] as [number, number, number], speed: 0.25, scale: 2.2, phase: 4.5 },
      { basePosition: [-10, -1, -6] as [number, number, number], speed: 0.4, scale: 1.4, phase: 2.1 },
      { basePosition: [8, 1, -5] as [number, number, number], speed: 0.5, scale: 1.2, phase: 5.2 }
    ];
  }, []);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[12, 15, 10]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#dc2626" />
      <pointLight position={[0, -2, 4]} intensity={2.0} color="#ef4444" distance={25} />

      {cloudsData.map((cloud, idx) => (
        <CloudCluster key={idx} {...cloud} />
      ))}
    </>
  );
}

export default function MovingClouds3D({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className || ""}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <CloudsScene />
      </Canvas>
    </div>
  );
}
