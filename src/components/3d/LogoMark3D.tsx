'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { logoPieces, LOGO_SCALE, LOGO_CENTER } from './logoShapes';
import type { PerfTier } from '@/hooks/usePerfTier';

/**
 * Logo 3D flutuante.
 *
 * Comportamento exigido pelo briefing:
 *  · rotação lenta e contínua no próprio eixo (~0.055 rad/s → uma volta
 *    a cada ~114 s — hipnótico, nunca chamativo);
 *  · flutuação orbital senoidal de amplitude pequena;
 *  · reação suave ao mouse, com interpolação — o objeto acompanha o
 *    cursor com atraso, nunca gruda nele;
 *  · opacidade baixa: é atmosfera, não conteúdo.
 *
 * A leitura do texto é prioridade absoluta. Se alguma vez o objeto
 * competir com a tipografia, reduza `baseOpacity` — não o contrário.
 */

type Props = {
  tier: PerfTier;
  /** Opacidade base do conjunto. Mantenha entre 0.25 e 0.55. */
  baseOpacity?: number;
  /** Escala geral do objeto na cena. */
  scale?: number;
};

export default function LogoMark3D({ tier, baseOpacity = 0.46, scale = 1 }: Props) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const useTransmission = tier === 'high';
  const curveSegments = tier === 'high' ? 24 : 8;
  const bevelEnabled = tier === 'high';

  /**
   * Converte cada path SVG em geometria extrudada uma única vez.
   * O custo fica todo no mount; o loop de animação não aloca nada.
   */
  const pieces = useMemo(() => {
    const loader = new SVGLoader();

    return logoPieces.map((piece) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${piece.d}"/></svg>`;
      const parsed = loader.parse(svg);
      const shapes = parsed.paths.flatMap((p) => SVGLoader.createShapes(p));

      const geometry = new THREE.ExtrudeGeometry(shapes, {
        depth: piece.depth,
        bevelEnabled,
        bevelThickness: 0.6,
        bevelSize: 0.5,
        bevelSegments: 2,
        curveSegments,
      });

      // Centraliza no pivô do símbolo e corrige o eixo Y da convenção SVG.
      geometry.translate(-LOGO_CENTER[0], -LOGO_CENTER[1], -piece.depth / 2);
      geometry.scale(1, -1, 1);
      geometry.computeVertexNormals();

      return { ...piece, geometry };
    });
  }, [bevelEnabled, curveSegments]);

  useFrame((state, delta) => {
    if (!group.current || !inner.current) return;

    // Delta limitado: uma aba em segundo plano não devolve um salto.
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // Rotação contínua e lenta no próprio eixo.
    inner.current.rotation.y += dt * 0.055;

    // Flutuação orbital: dois senos de período diferente, sem repetição óbvia.
    group.current.position.y = Math.sin(t * 0.32) * 0.42;
    group.current.position.x = Math.cos(t * 0.21) * 0.24;
    group.current.rotation.z = Math.sin(t * 0.17) * 0.06;

    // Reação ao mouse, amortecida (só nos tiers com 3D interativo).
    // A inclinação base em X mantém o objeto lido como volume, não como plano.
    if (tier !== 'low') {
      const target = state.pointer;
      pointer.current.x += (target.x - pointer.current.x) * 0.035;
      pointer.current.y += (target.y - pointer.current.y) * 0.035;
      group.current.rotation.x = 0.16 - pointer.current.y * 0.18 + Math.sin(t * 0.25) * 0.05;
      inner.current.rotation.z = pointer.current.x * 0.08;
    } else {
      group.current.rotation.x = 0.16;
    }
  });

  return (
    <group ref={group} scale={LOGO_SCALE * scale} dispose={null}>
      <group ref={inner}>
        {pieces.map((piece) => (
          <mesh key={piece.id} geometry={piece.geometry} position={[0, 0, piece.z]}>
            {piece.glow ? (
              // Nós de IA: cor pura, sem depender da iluminação da cena.
              <meshBasicMaterial
                color={piece.color}
                transparent
                opacity={Math.min(baseOpacity * 1.9, 0.92)}
                toneMapped={false}
                depthWrite={false}
              />
            ) : useTransmission ? (
              <meshPhysicalMaterial
                color={piece.color}
                emissive={piece.color}
                emissiveIntensity={piece.emissive}
                transmission={0.55}
                thickness={1.4}
                roughness={0.18}
                metalness={0.12}
                clearcoat={1}
                clearcoatRoughness={0.25}
                ior={1.35}
                transparent
                opacity={baseOpacity}
                depthWrite={false}
              />
            ) : (
              <meshStandardMaterial
                color={piece.color}
                emissive={piece.color}
                emissiveIntensity={piece.emissive * 0.8}
                roughness={0.3}
                metalness={0.2}
                transparent
                opacity={baseOpacity * 0.92}
                depthWrite={false}
              />
            )}
          </mesh>
        ))}
      </group>
    </group>
  );
}
