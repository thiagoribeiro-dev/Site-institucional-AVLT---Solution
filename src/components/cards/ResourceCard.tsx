import type { Resource } from '@/data/resources';

const typeAccent: Record<string, string> = {
  Artigo: 'var(--color-primary)',
  Guia: 'var(--color-secondary)',
  Whitepaper: 'var(--color-accent)',
  Documentação: 'var(--color-primary)',
  Vídeo: 'var(--color-accent)',
  'Material técnico': 'var(--color-secondary)',
};

/**
 * Card da biblioteca técnica.
 * Material com `href: null` vira um card inerte marcado "Em breve" —
 * sem link quebrado e sem prometer o que ainda não existe.
 */
export default function ResourceCard({ resource }: { resource: Resource }) {
  const isExternal = Boolean(resource.href?.startsWith('http'));
  const Tag = resource.href ? 'a' : 'div';

  return (
    <Tag
      {...(resource.href
        ? {
            href: resource.href,
            target: isExternal ? '_blank' : undefined,
            rel: isExternal ? 'noopener noreferrer' : undefined,
          }
        : {})}
      className={`group flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.028)] p-7 transition-all duration-500 ${
        resource.href
          ? 'hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.045)]'
          : 'opacity-70'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em]"
          style={{
            color: typeAccent[resource.type] ?? 'var(--color-secondary)',
            borderColor: 'var(--color-border)',
          }}
        >
          {resource.type}
        </span>
        <span className="font-mono text-[0.6875rem] text-[var(--color-text-muted)]">
          {resource.topic}
        </span>
      </div>

      <h3 className="mt-5 font-display text-[1.0625rem] font-semibold leading-snug text-[var(--color-text)]">
        {resource.title}
      </h3>
      <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
        {resource.excerpt}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
        <span className="font-mono text-[0.6875rem] text-[var(--color-text-muted)]">
          {resource.source ?? 'AVLT - Solution'}
        </span>
        {resource.href ? (
          <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--color-secondary-soft)]">
            {isExternal ? 'Fonte oficial' : 'Abrir'}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d={isExternal ? 'M7 17 17 7m0 0H8m9 0v9' : 'M5 12h14m-6-7 7 7-7 7'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--color-warning)]">
            Em breve
          </span>
        )}
      </div>
    </Tag>
  );
}
