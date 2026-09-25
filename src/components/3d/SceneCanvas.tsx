'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import LogoMark3D from './LogoMark3D';
import FloatingParticles from './FloatingParticles';
import { usePerfTier, tierSettings } from '@/hooks/usePerfTier';
import { useInView } from '@/hooks/useInView';

/**
 * Container do elemento 3D atmosférico.
 *
 * Três garantias de performance, nesta ordem:
 *  1. Nada de WebGL no tier `low` — devolve o fallback CSS e encerra.
 *  2. O Canvas só existe enquanto a seção está visível: o
 *     IntersectionObserver desmonta a árvore ao sair da viewport,
 *     liberando contexto e memória de GPU.
 *  3. `frameloop` em "always" apenas quando visível; DPR limitado pelo tier.
 *
 * O objeto vive em z-index 0, sob uma vinheta radial. O conteúdo
 * textual fica em z-index 10 e nunca disputa legibilidade com ele.
 */

type Props = {
  /** Escala do logo na cena. */
  scale?: number;
  /** Opacidade base do objeto 3D. */
  opacity?: number;
  /** Renderiza a nuvem de partículas junto do logo. */
  withParticles?: boolean;
  className?: string;
};

export default function SceneCanvas({
  scale = 1,
  opacity = 0.46,
  withParticles = true,
  className = '',
}: Props) {
  const tier = usePerfTier();
  const settings = tierSettings(tier);
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '220px' });

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* Fallback: sempre presente sob o canvas. É o que aparece em
          mobile, sem WebGL ou com prefers-reduced-motion. */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="logo-fallback h-[62%] w-[62%] max-w-[520px] rounded-full opacity-70"
          style={tier === 'low' ? undefined : { opacity: 0.25 }}
        />
      </div>

      {tier !== 'low' && inView && (
        <Canvas
          className="!absolute inset-0"
          dpr={settings.dpr}
          frameloop="always"
          gl={{
            antialias: tier === 'high',
            alpha: true,
            powerPreference: 'high-performance',
            // Sem buffer de stencil: nada na cena usa.
            stencil: false,
            depth: true,
          }}
          camera={{ position: [0, 0, 16], fov: 42, near: 0.1, far: 60 }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          {/* Iluminação suave e controlada: sem sombras, sem custo extra. */}
          <ambientLight intensity={0.85} />
          <directionalLight position={[6, 8, 10]} intensity={1.15} color="#ffffff" />
          <pointLight position={[-9, -4, 6]} intensity={2.2} color="#7A5CFA" distance={30} />
          <pointLight position={[9, 5, -4]} intensity={1.6} color="#00A1E0" distance={30} />
          <pointLight position={[3, -7, 5]} intensity={1.1} color="#FF7A00" distance={26} />

          <Suspense fallback={null}>
            <LogoMark3D tier={tier} baseOpacity={opacity} scale={scale} />
            {withParticles && <FloatingParticles count={settings.particles} />}
          </Suspense>
        </Canvas>
      )}

      {/* Vinheta: garante que o texto por cima sempre ganhe em contraste. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(15,23,42,0.35) 55%, rgba(15,23,42,0.85) 100%)',
        }}
      />
    </div>
  );
}
