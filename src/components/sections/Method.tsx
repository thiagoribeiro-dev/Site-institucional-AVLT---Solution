'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { method } from '@/data/method';

/**
 * Como trabalhamos — 6 etapas com progresso no scroll.
 *
 * A linha vertical se preenche conforme a seção atravessa a viewport,
 * usando useScroll + useSpring: a animação roda no compositor, sem
 * disparar layout a cada frame. Com prefers-reduced-motion a linha
 * aparece cheia e estática.
 */
export default function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 72%', 'end 55%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="metodo" className="relative scroll-mt-24 py-28">
      <div className="shell">
        <SectionTitle
          eyebrow="Como trabalhamos"
          title={
            <>
              Desenho antes de <span className="text-gradient">configuração</span>.
            </>
          }
          subtitle="Seis etapas, sempre nesta ordem. O que entra na plataforma foi decidido, não improvisado — e fica registrado para quem vier depois."
        />

        <div ref={ref} className="relative mt-16">
          {/* Trilho */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--color-border)] md:left-[27px]"
          />
          {/* Progresso */}
          <motion.div
            aria-hidden="true"
            className="bar-gradient absolute left-[19px] top-2 w-[2px] origin-top rounded-full md:left-[27px]"
            style={{
              height: 'calc(100% - 16px)',
              scaleY: reduced ? 1 : progress,
            }}
          />

          <ol className="space-y-10">
            {method.map((step, i) => (
              <ScrollReveal as="li" key={step.n} delay={i * 0.05} className="relative flex gap-6 md:gap-8">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-background)] md:h-14 md:w-14">
                  <span className="font-mono text-[0.75rem] font-medium text-[var(--color-secondary-soft)] md:text-[0.875rem]">
                    {step.n}
                  </span>
                </div>
                <div className="pt-1.5 md:pt-3">
                  <h3 className="font-display text-[1.25rem] font-semibold text-[var(--color-text)] md:text-[1.5rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
                    {step.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
