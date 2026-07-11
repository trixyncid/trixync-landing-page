"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { inertCanvasEvents } from "@/lib/r3f-inert-events";

type MouseOffset = { x: number; y: number };

const BRAND = "#3866F2";
const BRAND_DARK = "#2138B8";
const SURFACE = "#141a2e";

/** Orbiting workflow node with a pulse line back to the AI core. */
function WorkflowNode({
  phase,
  radius,
  y,
  label,
}: {
  phase: number;
  radius: number;
  y: number;
  label: number;
}) {
  const nodeRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const core = useMemo(() => new THREE.Vector3(0, 0.35, 0), []);

  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime;
    const angle = t * 0.55 + phase;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    nodeRef.current.position.set(x, y + Math.sin(t * 1.4 + phase) * 0.06, z);
    nodeRef.current.rotation.y = -angle + Math.PI / 2;

    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
      positions.setXYZ(0, core.x, core.y, core.z);
      positions.setXYZ(1, x, y, z);
      positions.needsUpdate = true;
    }
  });

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(6, 3));
    return geo;
  }, []);

  return (
    <group ref={nodeRef}>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color={BRAND} transparent opacity={0.22} />
      </lineSegments>
      <mesh>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial
          color={SURFACE}
          emissive={BRAND}
          emissiveIntensity={0.35 + label * 0.05}
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[0.1, 0.06]} />
        <meshBasicMaterial color={BRAND} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

/** Small cubes riding the automation ring — data moving through the pipeline. */
function DataPackets({ ringRadius }: { ringRadius: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 5;

  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const angle = t * 0.9 + offsets[i]!;
      child.position.set(
        Math.cos(angle) * ringRadius,
        Math.sin(angle * 2 + i) * 0.08,
        Math.sin(angle) * ringRadius,
      );
      child.rotation.y = angle;
    });
  });

  return (
    <group ref={groupRef}>
      {offsets.map((_, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#FCFDFF" transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
}

function RobotAssistant({ mouse }: { mouse: MouseOffset }) {
  const rootRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.12 + mouse.x * 0.35;
      rootRef.current.rotation.x = mouse.y * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.45;
    }
    if (eyesRef.current) {
      const blink = Math.sin(t * 2.2) > 0.96 ? 0.15 : 1;
      eyesRef.current.scale.y = THREE.MathUtils.lerp(eyesRef.current.scale.y, blink, 0.35);
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(t * 3) * 0.12;
    }
  });

  return (
    <group ref={rootRef} position={[0, -0.15, 0]}>
      <group rotation={[Math.PI / 2.2, 0, 0]}>
        <mesh ref={ringRef}>
          <torusGeometry args={[1.15, 0.025, 12, 80]} />
          <meshBasicMaterial color={BRAND} transparent opacity={0.55} />
        </mesh>
        <DataPackets ringRadius={1.15} />
      </group>

      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[0.72, 0.5, 0.48]} />
        <meshStandardMaterial color={SURFACE} metalness={0.55} roughness={0.38} />
      </mesh>

      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.12, 12]} />
        <meshStandardMaterial color="#1e2640" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.05, 0.78, 0.72]} />
        <meshStandardMaterial color={SURFACE} metalness={0.6} roughness={0.32} />
      </mesh>

      <mesh position={[0, 0.4, 0.37]}>
        <planeGeometry args={[0.72, 0.48]} />
        <meshBasicMaterial color={BRAND_DARK} transparent opacity={0.92} />
      </mesh>

      <group ref={eyesRef} position={[0, 0.48, 0.38]}>
        <mesh position={[-0.17, 0, 0]}>
          <circleGeometry args={[0.07, 16]} />
          <meshBasicMaterial color={BRAND} />
        </mesh>
        <mesh position={[0.17, 0, 0]}>
          <circleGeometry args={[0.07, 16]} />
          <meshBasicMaterial color={BRAND} />
        </mesh>
      </group>

      <group position={[0, 0.88, 0]}>
        <mesh ref={antennaRef}>
          <cylinderGeometry args={[0.02, 0.02, 0.28, 8]} />
          <meshStandardMaterial color="#8899bb" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={BRAND} />
        </mesh>
      </group>

      <mesh position={[-0.52, -0.08, 0]} rotation={[0, 0, 0.45]}>
        <boxGeometry args={[0.38, 0.1, 0.1]} />
        <meshStandardMaterial color="#1e2640" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.52, -0.08, 0]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.38, 0.1, 0.1]} />
        <meshStandardMaterial color="#1e2640" metalness={0.5} roughness={0.4} />
      </mesh>

      <WorkflowNode phase={0} radius={2.1} y={0.5} label={0} />
      <WorkflowNode phase={Math.PI * 0.5} radius={2.0} y={0.15} label={1} />
      <WorkflowNode phase={Math.PI} radius={2.15} y={0.45} label={2} />
      <WorkflowNode phase={Math.PI * 1.5} radius={1.95} y={0.2} label={3} />
    </group>
  );
}

type StrengthAiSceneProps = {
  mouse: MouseOffset;
};

export function StrengthAiScene({ mouse }: StrengthAiSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0.25, 5.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        events={inertCanvasEvents}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 4, 5]} intensity={1} color={BRAND} />
        <pointLight position={[-4, -1, 3]} intensity={0.35} color={BRAND_DARK} />
        <directionalLight position={[0, 2, 4]} intensity={0.25} color="#FCFDFF" />
        <RobotAssistant mouse={mouse} />
      </Canvas>
    </div>
  );
}
