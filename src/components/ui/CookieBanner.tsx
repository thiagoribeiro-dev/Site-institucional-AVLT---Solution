'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  EVENTO_CONSENTIMENTO,
  gravarConsentimento,
  lerConsentimento,
  type EstadoConsentimento,
} from '@/lib/consentimento';
import { GA_ID } from '@/lib/analytics';

/**
 * Aviso de cookies.
 *
 * ┌─ POR QUE OS DOIS BOTÕES TÊM O MESMO PESO ───────────────────────────┐
 * │ "Recusar" não é link discreto nem "x" no canto: é botão do mesmo    │
 * │ tamanho e legibilidade do "Aceitar". Banner em que recusar custa    │
 * │ mais esforço do que aceitar não é consentimento livre, e a LGPD     │
 * │ pede consentimento livre. Não "melhorar a conversão" mexendo nisso. │
 * │                                                                      │
 * │ Também não há opção pré-marcada e não há fechar sem escolher: sair  │
 * │ sem decidir mantém o estado 'pendente', e pendente não carrega nada.│
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Só aparece quando há GA configurado. Sem `NEXT_PUBLIC_GA_ID`, o site
 * não usa cookie nenhum e pedir consentimento seria mentira.
 */
export default function CookieBanner() {
  const [estado, setEstado] = useState<EstadoConsentimento | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setEstado(lerConsentimento());
    const aoMudar = (e: Event) => setEstado((e as CustomEvent).detail as EstadoConsentimento);
    window.addEventListener(EVENTO_CONSENTIMENTO, aoMudar);
    return () => window.removeEventListener(EVENTO_CONSENTIMENTO, aoMudar);
  }, []);

  // `null` = ainda não lemos o armazenamento. Não renderizar nada nesse
  // intervalo evita o banner piscar para quem já respondeu.
  const visivel = Boolean(GA_ID) && estado === 'pendente';

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6"
        >
          <div className="shell">
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-strong)] bg-[rgba(15,23,42,0.92)] p-6 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] md:p-7">
              <span aria-hidden="true" className="bar-gradient absolute inset-x-0 top-0 h-[2px]" />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
                <div className="lg:flex-1">
                  <p className="font-display text-[1rem] font-semibold text-[var(--color-text)]">
                    Podemos usar cookies de medição?
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                    Servem só para entender quantas pessoas visitam o site e por onde passam. O site
                    funciona igual se você recusar — nada é gravado nesse caso. Detalhes na{' '}
                    <Link
                      href="/privacidade"
                      className="text-[var(--color-primary-soft)] underline underline-offset-4 transition-colors hover:text-[var(--color-text)]"
                    >
                      política de privacidade
                    </Link>
                    .
                  </p>
                </div>

                {/* Mesmo tamanho, mesma legibilidade — ver o bloco no topo. */}
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => gravarConsentimento('recusado')}
                    className="rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] px-6 py-3 text-[0.875rem] font-medium text-[var(--color-text)] transition-colors duration-300 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]"
                  >
                    Recusar
                  </button>
                  <button
                    type="button"
                    onClick={() => gravarConsentimento('aceito')}
                    className="relative overflow-hidden rounded-[var(--radius-pill)] px-6 py-3 text-[0.875rem] font-semibold text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ background: 'var(--gradient-brand-diag)' }}
                    />
                    <span className="relative z-10">Aceitar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
