'use client';

import { useEffect, useState } from 'react';

/**
 * Classificação de capacidade do dispositivo.
 *
 *  high   → 3D completo: geometria detalhada, material de transmissão,
 *           partículas, DPR até 2.
 *  medium → 3D simplificado: material standard, menos partículas, DPR 1.5.
 *  low    → sem WebGL. Fallback puramente CSS (gradiente cônico + logo raster).
 *
 * A decisão combina quatro sinais, todos baratos e síncronos:
 *   1. prefers-reduced-motion  → força `low` (acessibilidade vence performance)
 *   2. suporte real a WebGL    → sem contexto, força `low`
 *   3. largura de viewport     → mobile nunca sobe além de `low`
 *   4. hardwareConcurrency + deviceMemory → separa `high` de `medium`
 *
 * Renderiza `low` no primeiro frame (SSR-safe) e reavalia no cliente,
 * então nenhum dispositivo começa carregando um canvas que não aguenta.
 */

export type PerfTier = 'high' | 'medium' | 'low';

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) return false;
    // Descarta contexto imediatamente: era só um teste.
    const lose = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function classify(): PerfTier {
  if (typeof window === 'undefined') return 'low';

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return 'low';

  if (!detectWebGL()) return 'low';

  const width = window.innerWidth;
  if (width < 768) return 'low';

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches;

  // Tablet ou notebook modesto: 3D simplificado.
  if (coarsePointer || width < 1280) return 'medium';
  if (cores <= 4 || memory <= 4) return 'medium';

  return 'high';
}

export function usePerfTier(): PerfTier {
  // Começa em 'low': o primeiro paint nunca carrega WebGL à toa.
  const [tier, setTier] = useState<PerfTier>('low');

  useEffect(() => {
    const update = () => setTier(classify());
    update();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener?.('change', update);

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      motionQuery.removeEventListener?.('change', update);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return tier;
}

/** Parâmetros de render derivados do tier, num único lugar. */
export function tierSettings(tier: PerfTier) {
  return {
    high: {
      dpr: [1, 2] as [number, number],
      particles: 110,
      segments: 64,
      transmission: true,
      shadows: false,
    },
    medium: {
      dpr: [1, 1.5] as [number, number],
      particles: 45,
      segments: 24,
      transmission: false,
      shadows: false,
    },
    low: {
      dpr: [1, 1] as [number, number],
      particles: 0,
      segments: 8,
      transmission: false,
      shadows: false,
    },
  }[tier];
}
