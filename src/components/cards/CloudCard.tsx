'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Cloud } from '@/data/clouds';

/**
 * Card de cloud do ecossistema.
 *
 * Fechado, mostra nome, nomenclatura oficial e resumo. Em foco (hover ou
 * teclado) revela as capacidades e acende a linha de conexão com o núcleo.
 * O estado é controlado pelo pai, para que só um card fique ativo por vez
 * e o diagrama inteiro reaja junto — a "arquitetura viva" do briefing.
 */

type Props = {
  cloud: Cloud;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

const accentVar: Record<Cloud['accent'], string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
};

const accentRgb: Record<Cloud['accent'], string> = {
  primary: '0,161,224',
  secondary: '122,92,250',
  accent: '255,122,0',
};

export default function CloudCard({ cloud, active, onFocus, onBlur }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-expanded={active}
      className="relative cursor-default overflow-hidden rounded-[var(--radius-card)] border p-6 transition-all duration-500"
      style={{
        borderColor: active ? `rgba(${accentRgb[cloud.accent]},0.45)` : 'var(--color-border)',
        background: active
          ? `linear-gradient(160deg, rgba(${accentRgb[cloud.accent]},0.1), rgba(255,255,255,0.02))`
          : 'rgba(255,255,255,0.028)',
        transform: active ? 'translateY(-4px)' : 'none',
        boxShadow: active ? `0 24px 60px -30px rgba(${accentRgb[cloud.accent]},0.75)` : 'none',
      }}
    >
      {/* Barra de acento no topo */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentVar[cloud.accent]}, transparent)`,
          opacity: active ? 1 : 0,
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[1.0625rem] font-semibold text-[var(--color-text)]">
            {cloud.name}
          </h3>
          <p className="mt-1 font-mono text-[0.6875rem] leading-snug text-[var(--color-text-muted)]">
            {cloud.official}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 h-2 w-2 shrink-0 rounded-full transition-all duration-500"
          style={{
            background: accentVar[cloud.accent],
            boxShadow: active ? `0 0 14px 2px rgba(${accentRgb[cloud.accent]},0.85)` : 'none',
            opacity: active ? 1 : 0.5,
          }}
        />
      </div>

      <p className="mt-4 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
        {cloud.summary}
      </p>

      <AnimatePresence initial={false}>
        {active && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <li className="mt-5 mb-3 h-px bg-[var(--color-border)]" aria-hidden="true" />
            {cloud.capabilities.map((cap) => (
              <li
                key={cap}
                className="flex items-start gap-2.5 py-1 text-[0.8125rem] text-[var(--color-text-secondary)]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                  style={{ background: accentVar[cloud.accent] }}
                />
                {cap}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
