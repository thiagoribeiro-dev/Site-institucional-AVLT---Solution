'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ContactForm from './ContactForm';
import LazyScene from '@/components/3d/LazyScene';
import { forms, formOrder, type FormKind } from '@/data/forms';
import { site } from '@/data/site';

/**
 * Área de contato: dois canais no mesmo lugar.
 *
 *  · Seja nosso cliente → comercial@
 *  · SAC                → contato@
 *
 * Um seletor troca entre eles sem recarregar, e o logo 3D fica ao fundo
 * na mesma opacidade baixa do resto do site — presente, nunca disputando
 * atenção com o formulário.
 */
export default function ContactSection() {
  const [ativo, setAtivo] = useState<FormKind>('comercial');
  const reduced = useReducedMotion();
  const config = forms[ativo];

  return (
    <section id="contato" className="relative scroll-mt-24 overflow-hidden py-24">
      <div className="absolute inset-0">
        <LazyScene scale={0.7} opacity={0.24} withParticles />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(760px circle at 25% 20%, rgba(122,92,250,0.13), transparent 60%), radial-gradient(640px circle at 82% 80%, rgba(0,161,224,0.1), transparent 60%)',
        }}
      />

      <div className="shell relative z-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Coluna de contexto */}
        <div className="lg:sticky lg:top-28">
          <div className="mb-5 flex items-center gap-3">
            <span className="bar-gradient h-[3px] w-10 rounded-full" />
            <span className="eyebrow">Contato</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={config.id}
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-[clamp(1.85rem,4.2vw,3rem)] font-bold leading-[1.08]">
                {config.id === 'comercial' ? (
                  <>
                    Seja nosso <span className="text-gradient">cliente</span>.
                  </>
                ) : (
                  <>
                    Atendimento ao <span className="text-gradient">cliente</span>.
                  </>
                )}
              </h2>
              <p className="mt-5 max-w-md text-[1.0125rem] leading-relaxed text-[var(--color-text-secondary)]">
                {config.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <dl className="mt-10 space-y-5 border-t border-[var(--color-border)] pt-8">
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                Este canal responde em
              </dt>
              <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-text)]">até um dia útil</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                Prefere escrever direto?
              </dt>
              <dd className="mt-1.5">
                <a
                  href={`mailto:${config.destino}`}
                  className="text-[0.9375rem] text-[var(--color-primary-soft)] underline underline-offset-4 transition-colors hover:text-[var(--color-text)]"
                >
                  {config.destino}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                Telefone
              </dt>
              <dd className="mt-1.5">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="font-mono text-[0.9375rem] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                Instagram
              </dt>
              <dd className="mt-1.5">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.9375rem] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
                  </svg>
                  {site.instagramHandle}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Coluna do formulário */}
        <div>
          {/* Seletor de canal */}
          <div
            role="tablist"
            aria-label="Escolha o canal de contato"
            className="mb-6 inline-flex rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-1.5 backdrop-blur-xl"
          >
            {formOrder.map((key) => {
              const ativo_ = ativo === key;
              return (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={ativo_}
                  aria-controls={`painel-${key}`}
                  id={`aba-${key}`}
                  onClick={() => setAtivo(key)}
                  className={`relative rounded-[var(--radius-pill)] px-5 py-2.5 text-[0.875rem] font-medium transition-colors duration-300 ${
                    ativo_ ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {ativo_ && (
                    <motion.span
                      layoutId="aba-contato-ativa"
                      className="absolute inset-0 rounded-[var(--radius-pill)]"
                      style={{ background: 'var(--gradient-brand-diag)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{forms[key].tab}</span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" id={`painel-${ativo}`} aria-labelledby={`aba-${ativo}`}>
            {/* key força remontagem: trocar de canal limpa o formulário,
                para ninguém enviar ao SAC o texto escrito para o comercial. */}
            <ContactForm key={ativo} config={config} />
          </div>
        </div>
      </div>
    </section>
  );
}
