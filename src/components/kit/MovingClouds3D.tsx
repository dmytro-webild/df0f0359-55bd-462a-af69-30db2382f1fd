"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PuffData {
  offset: [number, number, number];
  scale: [number, number];
  color: string;
  baseOpacity: number;
  rotSpeed: number;
  initialRotation: number;
}

let cachedCloudTexture: THREE.CanvasTexture | null = null;

function getCloudTexture(): THREE.CanvasTexture {
  if (cachedCloudTexture) return cachedCloudTexture;
  if (typeof window === "undefined") {
    return new THREE.CanvasTexture(document.createElement("canvas"));
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    grad.addColorStop(0.2, "rgba(255, 255, 255, 0.9)");
    grad.addColorStop(0.45, "rgba(240, 244, 252, 0.6)");
    grad.addColorStop(0.7, "rgba(215, 225, 240, 0.2)");
    grad.addColorStop(0.9, "rgba(190, 205, 225, 0.05)");
    grad.addColorStop(1.0, "rgba(160, 180, 210, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 35; i++) {
      const rx = 128 + (Math.random() - 0.5) * 110;
      const ry = 128 + (Math.random() - 0.5) * 110;
      const rad = 25 + Math.random() * 35;
      const pGrad = ctx.createRadialGradient(rx, ry, 0, rx, ry, rad);
      pGrad.addColorStop(0, `rgba(255, 255, 255, ${0.12 + Math.random() * 0.12})`);
      pGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.arc(rx, ry, rad, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  cachedCloudTexture = new THREE.CanvasTexture(canvas);
  cachedCloudTexture.needsUpdate = true;
  return cachedCloudTexture;
}

function generateCloudPuffs(scale: number, variant: "cumulus" | "wispy" | "stratus"): PuffData[] {
  const puffs: PuffData[] = [];

  if (variant === "cumulus") {
    // 1. Dark self-shadowed base (underbelly)
    for (let i = 0; i < 6; i++) {
      const x = (i - 2.5) * 0.75 * scale + (Math.random() - 0.5) * 0.3 * scale;
      const y = -0.45 * scale + (Math.random() - 0.5) * 0.2 * scale;
      const z = (Math.random() - 0.5) * 0.4 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(1.8 + Math.random() * 0.6) * scale, (1.0 + Math.random() * 0.3) * scale],
        color: i % 2 === 0 ? "#334155" : "#475569",
        baseOpacity: 0.75,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }

    // 2. Main volumetric core body
    for (let i = 0; i < 11; i++) {
      const x = (Math.random() - 0.5) * 2.8 * scale;
      const y = (Math.random() - 0.2) * 0.8 * scale;
      const z = (Math.random() - 0.5) * 0.6 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(2.0 + Math.random() * 0.8) * scale, (1.5 + Math.random() * 0.6) * scale],
        color: "#cbd5e1",
        baseOpacity: 0.82,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }

    // 3. Illuminated top crests (silver/white sunlight)
    for (let i = 0; i < 7; i++) {
      const x = (Math.random() - 0.5) * 2.2 * scale;
      const y = (0.55 + Math.random() * 0.6) * scale;
      const z = (Math.random() - 0.5) * 0.5 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(1.5 + Math.random() * 0.6) * scale, (1.3 + Math.random() * 0.5) * scale],
        color: "#f8fafc",
        baseOpacity: 0.88,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }

    // 4. Subtle crimson ambient bounce on lower edge
    for (let i = 0; i < 3; i++) {
      const x = (Math.random() - 0.5) * 2.4 * scale;
      const y = -0.65 * scale;
      const z = 0.2 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(1.6 + Math.random() * 0.5) * scale, (0.8 + Math.random() * 0.3) * scale],
        color: "#991b1b",
        baseOpacity: 0.3,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }

    // 5. Outer wispy side flanks
    for (let i = 0; i < 5; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (1.8 + Math.random() * 1.0) * scale;
      const y = (Math.random() - 0.3) * 0.6 * scale;
      const z = (Math.random() - 0.5) * 0.5 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(1.3 + Math.random() * 0.5) * scale, (0.9 + Math.random() * 0.4) * scale],
        color: "#e2e8f0",
        baseOpacity: 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }
  } else if (variant === "stratus") {
    // Wide horizontal misty cloud banks
    for (let i = 0; i < 14; i++) {
      const x = (i - 6.5) * 0.9 * scale + (Math.random() - 0.5) * 0.4 * scale;
      const y = (Math.random() - 0.5) * 0.4 * scale;
      const z = (Math.random() - 0.5) * 0.5 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(2.6 + Math.random() * 1.0) * scale, (1.1 + Math.random() * 0.4) * scale],
        color: i % 3 === 0 ? "#94a3b8" : "#e2e8f0",
        baseOpacity: 0.55,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }
  } else {
    // Fast translucent foreground wisps
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 3.5 * scale;
      const y = (Math.random() - 0.5) * 1.2 * scale;
      const z = (Math.random() - 0.5) * 0.8 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(2.2 + Math.random() * 1.2) * scale, (1.1 + Math.random() * 0.5) * scale],
        color: "#f1f5f9",
        baseOpacity: 0.38,
        rotSpeed: (Math.random() - 0.5) * 0.035,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }
  }

  return puffs;
}

function CloudCluster({
  basePosition,
  speed,
  scale = 1,
  phase = 0,
  variant = "cumulus",
  opacityMultiplier = 1
}: {
  basePosition: [number, number, number];
  speed: number;
  scale?: number;
  phase?: number;
  variant?: "cumulus" | "wispy" | "stratus";
  opacityMultiplier?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const spritesGroupRef = useRef<THREE.Group>(null);

  const texture = useMemo(() => getCloudTexture(), []);
  const puffs = useMemo(() => generateCloudPuffs(scale, variant), [scale, variant]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Drifting animation
    groupRef.current.position.x += speed * delta;
    groupRef.current.position.y = basePosition[1] + Math.sin(time * 0.35 + phase) * 0.35;

    const boundsX = 28;
    if (groupRef.current.position.x > boundsX) {
      groupRef.current.position.x = -boundsX;
    }

    // Smooth edge fade factor (1 near center, 0 near boundaries)
    const normX = Math.max(-1, Math.min(1, groupRef.current.position.x / (boundsX - 2)));
    const fadeFactor = Math.pow(Math.cos(normX * (Math.PI / 2)), 0.7);

    if (spritesGroupRef.current) {
      spritesGroupRef.current.children.forEach((child, idx) => {
        if (child instanceof THREE.Sprite && puffs[idx]) {
          const puff = puffs[idx];
          const mat = child.material as THREE.SpriteMaterial;
          mat.opacity = puff.baseOpacity * fadeFactor * opacityMultiplier;
          mat.rotation += puff.rotSpeed * delta;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={basePosition}>
      <group ref={spritesGroupRef}>
        {puffs.map((puff, idx) => (
          <sprite
            key={idx}
            position={puff.offset}
            scale={[puff.scale[0], puff.scale[1], 1]}
          >
            <spriteMaterial
              attach="material"
              map={texture}
              color={puff.color}
              transparent
              opacity={puff.baseOpacity * opacityMultiplier}
              depthWrite={false}
              blending={THREE.NormalBlending}
              rotation={puff.initialRotation}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}

function CloudsScene() {
  const cloudsData = useMemo(() => {
    return [
      // Background layer (slow, misty, high up)
      { basePosition: [-18, 5.5, -12] as [number, number, number], speed: 0.18, scale: 2.5, phase: 0, variant: "stratus" as const, opacityMultiplier: 0.55 },
      { basePosition: [2, 6.0, -14] as [number, number, number], speed: 0.15, scale: 2.8, phase: 1.8, variant: "stratus" as const, opacityMultiplier: 0.5 },
      { basePosition: [20, 4.8, -10] as [number, number, number], speed: 0.22, scale: 2.2, phase: 3.2, variant: "cumulus" as const, opacityMultiplier: 0.65 },

      // Midground layer (realistic voluminous cumulus clouds with silver linings & self-shadows)
      { basePosition: [-24, 2.5, -4] as [number, number, number], speed: 0.42, scale: 1.6, phase: 0.5, variant: "cumulus" as const, opacityMultiplier: 0.85 },
      { basePosition: [-9, 4.2, -6] as [number, number, number], speed: 0.35, scale: 1.9, phase: 2.1, variant: "cumulus" as const, opacityMultiplier: 0.9 },
      { basePosition: [5, 3.2, -3] as [number, number, number], speed: 0.48, scale: 1.5, phase: 4.0, variant: "cumulus" as const, opacityMultiplier: 0.85 },
      { basePosition: [18, 1.8, -5] as [number, number, number], speed: 0.38, scale: 1.7, phase: 5.5, variant: "cumulus" as const, opacityMultiplier: 0.8 },

      // Foreground layer (faster, wispy translucent atmospheric clouds)
      { basePosition: [-14, -0.8, 3] as [number, number, number], speed: 0.72, scale: 1.4, phase: 1.2, variant: "wispy" as const, opacityMultiplier: 0.4 },
      { basePosition: [12, -1.5, 4] as [number, number, number], speed: 0.82, scale: 1.3, phase: 4.8, variant: "wispy" as const, opacityMultiplier: 0.35 }
    ];
  }, []);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#dc2626" />

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
        camera={{ position: [0, 0, 14], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <CloudsScene />
      </Canvas>
    </div>
  );
}
