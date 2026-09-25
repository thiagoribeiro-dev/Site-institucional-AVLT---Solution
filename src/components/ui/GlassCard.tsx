'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

/**
 * Card premium com profundidade.
 *
 * O brilho segue o cursor via variáveis CSS atualizadas no mousemove —
 * sem re-render do React e sem animação em JS. O efeito é desligado
 * automaticamente em ponteiro grosso (toque), onde não faz sentido.
 */

type Props = {
  children: ReactNode;
  className?: string;
  /** Realce permanente — usado em cards em destaque. */
  featured?: boolean;
  /** Cor do glow: mapeia a paleta oficial. */
  accent?: 'primary' | 'secondary' | 'accent';
  as?: 'div' | 'article' | 'li';
};

const accentRgb: Record<NonNullable<Props['accent']>, string> = {
  primary: '0, 161, 224',
  secondary: '122, 92, 250',
  accent: '255, 122, 0',
};

export default function GlassCard({
  children,
  className = '',
  featured = false,
  accent = 'secondary',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    node.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group relative overflow-hidden rounded-[var(--radius-card)] border transition-all duration-500 ${
        featured
          ? 'border-[rgba(122,92,250,0.35)] bg-[rgba(122,92,250,0.07)]'
          : 'border-[var(--color-border)] bg-[rgba(255,255,255,0.035)]'
      } backdrop-blur-xl hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] ${className}`}
      style={
        {
          '--accent-rgb': accentRgb[accent],
        } as React.CSSProperties
      }
    >
      {/* Glow que acompanha o cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--accent-rgb), 0.14), transparent 62%)',
          opacity: active ? undefined : 0,
        }}
      />
      {/* Linha superior em gradiente — assinatura da marca */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.85), transparent)',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
}
