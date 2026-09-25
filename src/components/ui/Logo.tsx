import Link from 'next/link';

/**
 * Assinatura da marca em SVG — o mesmo símbolo do logo oficial,
 * vetorizado para nitidez em qualquer densidade de tela e para poder
 * herdar o gradiente da marca.
 *
 * PARA TROCAR PELO ARQUIVO OFICIAL: substitua o bloco <svg> por
 * <Image src="/logo-avlt.png" ... /> mantendo as mesmas alturas.
 */

type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: number;
};

export function LogoMark({ size = 34, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Símbolo AVLT - Solution"
    >
      <defs>
        <linearGradient id="avlt-grad" x1="0" y1="100%" x2="100%" y2="0">
          <stop offset="0%" stopColor="#00A1E0" />
          <stop offset="55%" stopColor="#7A5CFA" />
          <stop offset="100%" stopColor="#FF7A00" />
        </linearGradient>
      </defs>
      <g fill="url(#avlt-grad)">
        <path d="M 8 88 L 34 12 L 47 12 L 21 88 Z" />
        <path d="M 34 12 L 47 12 L 73 88 L 60 88 Z" opacity="0.85" />
        <path
          d="M 16 74 C 34 66, 50 56, 64 38 L 56 33 L 82 26 L 78 52 L 70 46 C 54 66, 38 76, 22 84 Z"
          opacity="0.9"
        />
        <path
          d="M 44 40 C 42 28, 54 20, 62 26 C 70 17, 84 23, 84 35 C 91 37, 91 47, 83 47 L 52 47 C 44 47, 41 44, 44 40 Z"
          opacity="0.45"
        />
        <circle cx="86" cy="14" r="7" />
        <circle cx="72" cy="8" r="3" opacity="0.8" />
        <circle cx="95" cy="27" r="2.4" opacity="0.8" />
      </g>
    </svg>
  );
}

export default function Logo({ className = '', showWordmark = true, size = 34 }: Props) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="AVLT - Solution, página inicial"
    >
      <LogoMark size={size} className="transition-transform duration-500 group-hover:rotate-[8deg]" />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.0625rem] font-bold tracking-tight text-[var(--color-text)]">
            AVLT
            <span className="text-gradient">/</span>
            <span className="font-medium text-[var(--color-text-secondary)]">Solution</span>
          </span>
          <span className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Salesforce &amp; AI Experts
          </span>
        </span>
      )}
    </Link>
  );
}
