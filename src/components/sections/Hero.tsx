'use client';

import { motion, useReducedMotion } from 'framer-motion';
import LazyScene from '@/components/3d/LazyScene';
import MagneticButton from '@/components/ui/MagneticButton';
import { hero } from '@/data/site';

/**
 * Hero — primeira impressão do site.
 *
 * Camadas, de trás para frente:
 *   z-0   malha de gradientes + grid sutil (CSS puro, custo zero)
 *   z-0   LazyScene: logo 3D + partículas (só monta se o device aguenta)
 *   z-10  conteúdo textual — sempre o elemento de maior contraste
 */
export default function Hero() {
  const reduced = useReducedMotion();

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]">
      {/* Malha de fundo: profundidade sem custo de GPU */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(900px circle at 78% 22%, rgba(122,92,250,0.16), transparent 58%), radial-gradient(760px circle at 12% 78%, rgba(0,161,224,0.13), transparent 58%), radial-gradient(520px circle at 62% 88%, rgba(255,122,0,0.07), transparent 60%)',
          }}
        />
        {/* Grid técnica, quase imperceptível — referência de arquitetura */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 78%)',
          }}
        />
      </div>

      {/* Elemento 3D — ocupa a metade direita no desktop, o fundo inteiro no mobile */}
      <div className="absolute inset-0 lg:left-[42%]">
        <LazyScene scale={1} opacity={0.42} withParticles />
      </div>

      <div className="shell relative z-10 grid w-full items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <motion.div {...fade(0)} className="mb-7 inline-flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-secondary)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
            </span>
            <span className="eyebrow">{hero.eyebrow}</span>
          </motion.div>

          <motion.h1
            {...fade(0.08)}
            className="font-display text-[clamp(2.45rem,6.4vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.03em]"
          >
            Transformamos <span className="text-gradient">tecnologia</span>
            <br />
            em resultados.
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mt-7 max-w-xl text-[clamp(1.0125rem,1.7vw,1.1875rem)] leading-relaxed text-[var(--color-text-secondary)]"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m-6-7 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
            <MagneticButton href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>

          {/* Indicadores rápidos, ainda dentro do primeiro scroll */}
          <motion.dl
            {...fade(0.34)}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-7"
          >
            {[
              { k: '+25', v: 'anos somados de Salesforce' },
              { k: '8', v: 'certificações no time' },
              { k: '4', v: 'frentes de especialidade' },
            ].map((item) => (
              <div key={item.k}>
                <dt className="font-display text-[1.75rem] font-bold leading-none text-gradient">
                  {item.k}
                </dt>
                <dd className="mt-2 text-[0.8125rem] leading-snug text-[var(--color-text-muted)]">
                  {item.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Coluna direita: espaço respiratório para o 3D no desktop */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>

      {/* Indicador de scroll */}
      <motion.div
        {...(reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.2 } })}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-9 w-[22px] items-start justify-center rounded-full border border-[var(--color-border-strong)] p-1.5">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-[var(--color-secondary)]" />
        </div>
      </motion.div>
    </section>
  );
}
