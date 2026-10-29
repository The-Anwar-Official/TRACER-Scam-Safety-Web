'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 p = position;
    float wave = sin(p.y * 5.0 + uTime * 0.7) * 0.045 + cos(p.x * 4.0 - uTime * 0.45) * 0.035;
    p += normal * wave;
    vPosition = p;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  void main() {
    vec3 lime = vec3(0.72, 1.0, 0.20);
    vec3 mint = vec3(0.18, 0.88, 0.53);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
    float bands = smoothstep(0.42, 0.48, sin(vUv.y * 34.0 + uTime * 0.8) * 0.5 + 0.5);
    float pulse = 0.5 + 0.5 * sin(uTime * 0.75 + vPosition.y * 3.0);
    vec3 color = mix(vec3(0.025, 0.07, 0.035), mix(mint, lime, pulse), fresnel * 0.95 + bands * 0.13);
    color += lime * fresnel * 0.28;
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function SignalCore() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader, fragmentShader,
    uniforms: { uTime: { value: 0 } },
  }), []);
  useFrame((state, delta) => {
    material.uniforms.uTime.value += delta;
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.14;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.14;
    }
  });
  return <mesh ref={mesh} material={material}>
    <icosahedronGeometry args={[1.23, 5]} />
  </mesh>;
}

function Orbit({ radius, speed, tilt = 0 }: { radius: number; speed: number; tilt?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.z += delta * speed; });
  return <group ref={group} rotation={[tilt, 0.2, 0]}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 180]} />
      <meshBasicMaterial color="#b8ff46" transparent opacity={0.42} />
    </mesh>
    <mesh position={[radius, 0, 0]}>
      <sphereGeometry args={[0.055, 16, 16]} />
      <meshBasicMaterial color="#d9ff9b" />
    </mesh>
  </group>;
}

export default function SignalScene() {
  return <div className="signal-canvas" aria-label="Animated 3D signal orb">
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 4.6], fov: 38 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 4]} intensity={12} color="#b8ff46" />
      <pointLight position={[-3, -2, -1]} intensity={5} color="#2eea91" />
      <Float speed={1.1} rotationIntensity={0.14} floatIntensity={0.2}>
        <SignalCore />
        <Orbit radius={1.55} speed={0.22} tilt={0.5} />
        <Orbit radius={1.78} speed={-0.15} tilt={1.05} />
      </Float>
      <Environment preset="city" />
    </Canvas>
  </div>;
}
