import type { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

/**
 * Cabeçalho padrão de seção: eyebrow em mono, título em Poppins e
 * subtítulo opcional. A barra de gradiente acima do eyebrow é o
 * elemento de assinatura da marca (mesma linha de 4px do manual).
 */

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'dark',
  className = '',
}: Props) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  const titleColor = tone === 'dark' ? 'text-[var(--color-text)]' : 'text-[var(--color-text-dark)]';
  const subColor =
    tone === 'dark' ? 'text-[var(--color-text-secondary)]' : 'text-slate-600';

  return (
    <ScrollReveal className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <div className={`mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="bar-gradient h-[3px] w-10 rounded-full" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2
        className={`font-display text-[clamp(1.85rem,4.2vw,3.1rem)] font-bold leading-[1.08] ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-[clamp(1rem,1.6vw,1.135rem)] leading-relaxed ${subColor}`}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
