import type { Project } from '@/data/projects';

/**
 * Card de case.
 *
 * Sem expandir e sem painel de números: o card mostra tudo que a página
 * publica — contexto, desafio e stack. Arquitetura, desenho de solução e
 * resultados ficam fora do site por decisão de apresentação; esse detalhe
 * pertence à conversa comercial, não à vitrine.
 */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.028)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--color-border-strong)] hover:bg-[rgba(255,255,255,0.042)]">
      {/* Linha de gradiente no topo, revelada no hover */}
      <span
        aria-hidden="true"
        className="bar-gradient pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[1.25fr_1fr]">
        {/* Coluna principal */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[0.75rem] tracking-[0.15em] text-[var(--color-text-muted)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--color-secondary-soft)]">
              {project.category}
            </span>
            {project.confidential && (
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                Confidencial
              </span>
            )}
          </div>

          <p className="mt-6 font-mono text-[0.8125rem] text-[var(--color-primary-soft)]">
            {project.client}
          </p>
          <h3 className="mt-2 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-bold leading-tight text-[var(--color-text)]">
            {project.title}
          </h3>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
            {project.summary}
          </p>

          <div className="mt-8">
            <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              O desafio
            </h4>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
              {project.challenge}
            </p>
          </div>
        </div>

        {/* Coluna lateral: contexto e stack */}
        <div className="flex flex-col gap-8 lg:border-l lg:border-[var(--color-border)] lg:pl-10">
          <div>
            <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-primary-soft)]">
              Contexto
            </h4>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
              {project.context}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-secondary-soft)]">
              Tecnologias
            </h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 font-mono text-[0.75rem] text-[var(--color-text-secondary)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
