'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Nuvem de pontos discreta — a sensação de "sistema inteligente em
 * funcionamento" atrás do Hero.
 *
 * Um único `Points` com BufferGeometry: uma draw call, sem instâncias,
 * sem alocação por frame. A contagem vem do tier de performance, então
 * um notebook modesto recebe menos da metade dos pontos.
 */

type Props = {
  count: number;
  radius?: number;
};

export default function FloatingParticles({ count, radius = 9 }: Props) {
  const points = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // Paleta oficial: azul, violeta e laranja em proporção 60/30/10,
    // espelhando a regra de contraste do manual da marca.
    const palette = [
      new THREE.Color('#00A1E0'),
      new THREE.Color('#00A1E0'),
      new THREE.Color('#00A1E0'),
      new THREE.Color('#7A5CFA'),
      new THREE.Color('#7A5CFA'),
      new THREE.Color('#FF7A00'),
    ];

    for (let i = 0; i < count; i++) {
      // Distribuição em casca esférica: nada se acumula no centro,
      // onde ficam o logo 3D e o texto.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.55 + Math.random() * 0.45);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.035 + Math.random() * 0.055;
    }

    return { positions, colors, sizes };
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const dt = Math.min(delta, 0.05);
    // Deriva lentíssima do conjunto — percebida, não notada.
    points.current.rotation.y += dt * 0.018;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
  });

  if (count === 0) return null;

  return (
    <points ref={points} dispose={null}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
