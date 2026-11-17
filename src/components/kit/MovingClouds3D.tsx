"use client";

import { useMemo, useRef, useEffect } from "react";
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
    grad.addColorStop(0.3, "rgba(255, 255, 255, 0.95)");
    grad.addColorStop(0.55, "rgba(255, 255, 255, 0.85)");
    grad.addColorStop(0.75, "rgba(255, 255, 255, 0.5)");
    grad.addColorStop(0.92, "rgba(255, 255, 255, 0.2)");
    grad.addColorStop(1.0, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 40; i++) {
      const rx = 128 + (Math.random() - 0.5) * 110;
      const ry = 128 + (Math.random() - 0.5) * 110;
      const rad = 30 + Math.random() * 40;
      const pGrad = ctx.createRadialGradient(rx, ry, 0, rx, ry, rad);
      pGrad.addColorStop(0, `rgba(255, 255, 255, ${0.25 + Math.random() * 0.2})`);
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
    // 1. Soft shaded lower cloud body (clean white / off-white)
    for (let i = 0; i < 7; i++) {
      const x = (i - 3) * 0.75 * scale + (Math.random() - 0.5) * 0.3 * scale;
      const y = -0.45 * scale + (Math.random() - 0.5) * 0.2 * scale;
      const z = (Math.random() - 0.5) * 0.4 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(2.2 + Math.random() * 0.6) * scale, (1.2 + Math.random() * 0.3) * scale],
        color: i % 2 === 0 ? "#f1f5f9" : "#e2e8f0",
        baseOpacity: 0.9,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }

    // 2. Main volumetric cloud body (pure white)
    for (let i = 0; i < 14; i++) {
      const x = (Math.random() - 0.5) * 3.2 * scale;
      const y = (Math.random() - 0.2) * 0.9 * scale;
      const z = (Math.random() - 0.5) * 0.6 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(2.4 + Math.random() * 0.9) * scale, (1.8 + Math.random() * 0.6) * scale],
        color: "#ffffff",
        baseOpacity: 0.96,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }

    // 3. Illuminated top crests (pure white)
    for (let i = 0; i < 9; i++) {
      const x = (Math.random() - 0.5) * 2.5 * scale;
      const y = (0.55 + Math.random() * 0.7) * scale;
      const z = (Math.random() - 0.5) * 0.5 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(1.8 + Math.random() * 0.7) * scale, (1.5 + Math.random() * 0.6) * scale],
        color: "#ffffff",
        baseOpacity: 0.98,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }

    // 4. White lower ambient fill (all white)
    for (let i = 0; i < 5; i++) {
      const x = (Math.random() - 0.5) * 2.6 * scale;
      const y = -0.65 * scale;
      const z = 0.2 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(1.8 + Math.random() * 0.5) * scale, (1.0 + Math.random() * 0.3) * scale],
        color: "#f8fafc",
        baseOpacity: 0.85,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }

    // 5. Outer wispy side flanks (pure white)
    for (let i = 0; i < 6; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (2.0 + Math.random() * 1.0) * scale;
      const y = (Math.random() - 0.3) * 0.6 * scale;
      const z = (Math.random() - 0.5) * 0.5 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(1.6 + Math.random() * 0.5) * scale, (1.1 + Math.random() * 0.4) * scale],
        color: "#ffffff",
        baseOpacity: 0.8,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }
  } else if (variant === "stratus") {
    // Wide horizontal misty cloud banks (pure white)
    for (let i = 0; i < 16; i++) {
      const x = (i - 7.5) * 0.95 * scale + (Math.random() - 0.5) * 0.4 * scale;
      const y = (Math.random() - 0.5) * 0.4 * scale;
      const z = (Math.random() - 0.5) * 0.5 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(3.0 + Math.random() * 1.2) * scale, (1.4 + Math.random() * 0.4) * scale],
        color: "#ffffff",
        baseOpacity: 0.85,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        initialRotation: Math.random() * Math.PI * 2,
      });
    }
  } else {
    // Fast translucent foreground wisps (pure white)
    for (let i = 0; i < 10; i++) {
      const x = (Math.random() - 0.5) * 4.0 * scale;
      const y = (Math.random() - 0.5) * 1.4 * scale;
      const z = (Math.random() - 0.5) * 0.8 * scale;
      puffs.push({
        offset: [x, y, z],
        scale: [(2.6 + Math.random() * 1.4) * scale, (1.4 + Math.random() * 0.6) * scale],
        color: "#ffffff",
        baseOpacity: 0.7,
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
  opacityMultiplier = 1,
  pointerRef,
}: {
  basePosition: [number, number, number];
  speed: number;
  scale?: number;
  phase?: number;
  variant?: "cumulus" | "wispy" | "stratus";
  opacityMultiplier?: number;
  pointerRef: React.RefObject<{ x: number; y: number; active: boolean }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const spritesGroupRef = useRef<THREE.Group>(null);
  const basePositionXRef = useRef(basePosition[0]);
  const offsetRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  const texture = useMemo(() => getCloudTexture(), []);
  const puffs = useMemo(() => generateCloudPuffs(scale, variant), [scale, variant]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Base Drifting motion
    basePositionXRef.current += speed * delta;
    const boundsX = 28;
    if (basePositionXRef.current > boundsX) {
      basePositionXRef.current = -boundsX;
    }

    // Touch / Pointer Repulsion & Sway Interaction
    const pointer = pointerRef.current;
    if (pointer && pointer.active) {
      const targetWorldX = pointer.x * 14;
      const targetWorldY = pointer.y * 8;

      const currentX = basePositionXRef.current + offsetRef.current.x;
      const currentY = basePosition[1] + offsetRef.current.y;

      const dx = currentX - targetWorldX;
      const dy = currentY - targetWorldY;
      const distSq = dx * dx + dy * dy;
      const radius = 7.5 * scale;

      if (distSq < radius * radius && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const factor = (1 - dist / radius) * 8;
        offsetRef.current.vx += (dx / dist) * factor * delta * 18;
        offsetRef.current.vy += (dy / dist) * factor * delta * 18;
      }
    }

    // Spring restoration back to origin
    offsetRef.current.vx += -offsetRef.current.x * 3.5 * delta;
    offsetRef.current.vy += -offsetRef.current.y * 3.5 * delta;
    offsetRef.current.vx *= 0.90;
    offsetRef.current.vy *= 0.90;

    offsetRef.current.x += offsetRef.current.vx * delta;
    offsetRef.current.y += offsetRef.current.vy * delta;

    // Apply position
    groupRef.current.position.x = basePositionXRef.current + offsetRef.current.x;
    groupRef.current.position.y = basePosition[1] + Math.sin(time * 0.35 + phase) * 0.35 + offsetRef.current.y;

    // Smooth edge fade factor
    const normX = Math.max(-1, Math.min(1, groupRef.current.position.x / (boundsX - 2)));
    const fadeFactor = Math.pow(Math.cos(normX * (Math.PI / 2)), 0.7);

    // Touch interaction swirl velocity on puffs
    const interactionSpeed = Math.sqrt(offsetRef.current.vx * offsetRef.current.vx + offsetRef.current.vy * offsetRef.current.vy);

    if (spritesGroupRef.current) {
      spritesGroupRef.current.children.forEach((child, idx) => {
        if (child instanceof THREE.Sprite && puffs[idx]) {
          const puff = puffs[idx];
          const mat = child.material as THREE.SpriteMaterial;
          mat.opacity = puff.baseOpacity * fadeFactor * opacityMultiplier;
          const rotDelta = (puff.rotSpeed + (puff.rotSpeed > 0 ? 0.02 : -0.02) * interactionSpeed) * delta;
          mat.rotation += rotDelta;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[basePosition[0], basePosition[1], basePosition[2]]}>
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

function CloudsScene({ pointerRef }: { pointerRef: React.RefObject<{ x: number; y: number; active: boolean }> }) {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!sceneGroupRef.current) return;
    const pointer = pointerRef.current;
    if (pointer) {
      const targetRotY = pointer.x * 0.12;
      const targetRotX = -pointer.y * 0.08;
      sceneGroupRef.current.rotation.y += (targetRotY - sceneGroupRef.current.rotation.y) * 4 * delta;
      sceneGroupRef.current.rotation.x += (targetRotX - sceneGroupRef.current.rotation.x) * 4 * delta;
    }
  });

  const cloudsData = useMemo(() => {
    return [
      // Background layer (slow, misty, high up)
      { basePosition: [-18, 5.5, -12] as [number, number, number], speed: 0.2, scale: 2.8, phase: 0, variant: "stratus" as const, opacityMultiplier: 0.8 },
      { basePosition: [2, 6.0, -14] as [number, number, number], speed: 0.18, scale: 3.0, phase: 1.8, variant: "stratus" as const, opacityMultiplier: 0.75 },
      { basePosition: [20, 4.8, -10] as [number, number, number], speed: 0.25, scale: 2.5, phase: 3.2, variant: "cumulus" as const, opacityMultiplier: 0.85 },

      // Midground layer (volumetric pure white cumulus clouds)
      { basePosition: [-24, 2.5, -4] as [number, number, number], speed: 0.45, scale: 1.8, phase: 0.5, variant: "cumulus" as const, opacityMultiplier: 0.95 },
      { basePosition: [-9, 4.2, -6] as [number, number, number], speed: 0.38, scale: 2.2, phase: 2.1, variant: "cumulus" as const, opacityMultiplier: 1.0 },
      { basePosition: [5, 3.2, -3] as [number, number, number], speed: 0.52, scale: 1.8, phase: 4.0, variant: "cumulus" as const, opacityMultiplier: 0.95 },
      { basePosition: [18, 1.8, -5] as [number, number, number], speed: 0.42, scale: 2.0, phase: 5.5, variant: "cumulus" as const, opacityMultiplier: 0.9 },

      // Foreground layer (faster, wispy translucent pure white clouds)
      { basePosition: [-14, -0.8, 3] as [number, number, number], speed: 0.75, scale: 1.6, phase: 1.2, variant: "wispy" as const, opacityMultiplier: 0.65 },
      { basePosition: [12, -1.5, 4] as [number, number, number], speed: 0.85, scale: 1.5, phase: 4.8, variant: "wispy" as const, opacityMultiplier: 0.6 }
    ];
  }, []);

  return (
    <group ref={sceneGroupRef}>
      <ambientLight intensity={2.5} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#ffffff" />

      {cloudsData.map((cloud, idx) => (
        <CloudCluster key={idx} {...cloud} pointerRef={pointerRef} />
      ))}
    </group>
  );
}

export default function MovingClouds3D({ className }: { className?: string }) {
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      pointerRef.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(clientY / window.innerHeight) * 2 + 1;
      pointerRef.current.active = true;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchstart", handleMove, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchstart", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className || ""}`}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <CloudsScene pointerRef={pointerRef} />
      </Canvas>
    </div>
  );
}
