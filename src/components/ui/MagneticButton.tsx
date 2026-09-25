'use client';

import Link from 'next/link';
import { useRef, type ReactNode, type MouseEvent } from 'react';

/**
 * Botão com atração magnética discreta.
 *
 * O deslocamento é limitado a 6px e escrito direto no transform do nó —
 * nenhum state, nenhum re-render. Em ponteiro grosso o efeito não dispara,
 * porque `mousemove` não ocorre em toque.
 */

type Props = {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'ghost' | 'light';
  className?: string;
  external?: boolean;
};

export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  className = '',
  external = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    node.style.transform = `translate(${Math.max(-6, Math.min(6, x))}px, ${Math.max(-6, Math.min(6, y))}px)`;
  };

  const onLeave = () => {
    const node = ref.current;
    if (node) node.style.transform = 'translate(0, 0)';
  };

  const base =
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-pill)] px-7 py-3.5 text-[0.9375rem] font-semibold transition-all duration-300 will-change-transform';

  const variants = {
    primary:
      'text-white shadow-[0_12px_38px_-12px_rgba(122,92,250,0.85)] hover:shadow-[0_18px_46px_-12px_rgba(122,92,250,0.95)]',
    ghost:
      'border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[rgba(122,92,250,0.55)] hover:bg-[rgba(122,92,250,0.08)]',
    light:
      'bg-white text-[var(--color-text-dark)] hover:bg-slate-100 shadow-[0_12px_32px_-14px_rgba(0,0,0,0.5)]',
  } as const;

  const content = (
    <span ref={ref} className="inline-flex items-center gap-2 transition-transform duration-300 ease-out">
      {children}
    </span>
  );

  const inner = (
    <>
      {variant === 'primary' && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'var(--gradient-brand-diag)' }}
          />
          {/* Brilho que atravessa o botão no hover */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/25 transition-none group-hover/btn:animate-[avlt-sheen_0.9s_ease-out]"
          />
        </>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{content}</span>
    </>
  );

  const classes = `group/btn ${base} ${variants[variant]} ${className}`;

  if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} onMouseMove={onMove} onMouseLeave={onLeave} className={classes}>
      {inner}
    </Link>
  );
}
