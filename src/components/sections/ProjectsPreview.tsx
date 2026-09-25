import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { projects } from '@/data/projects';

/**
 * Preview do portfólio na home.
 *
 * Mostra domínio, cliente e o problema resolvido — sem números de
 * resultado, alinhado à página /projetos.
 */
export default function ProjectsPreview() {
  return (
    <section className="relative py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle
            eyebrow="Projetos de sucesso"
            title={
              <>
                O que já <span className="text-gradient">entregamos</span>.
              </>
            }
            subtitle="Cases reais: o contexto do cliente, o problema que existia antes e as competências que entraram em campo."
            className="!mb-0"
          />
          <ScrollReveal delay={0.1}>
            <MagneticButton href="/projetos" variant="ghost">
              Ver todos os cases
            </MagneticButton>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.08}>
              <Link
                href="/projetos"
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.028)] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(122,92,250,0.4)] hover:bg-[rgba(122,92,250,0.05)]"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--color-secondary-soft)]">
                  {project.category}
                </span>

                <h3 className="mt-6 font-display text-[1.25rem] font-semibold leading-snug text-[var(--color-text)]">
                  {project.title}
                </h3>
                <p className="mt-2 font-mono text-[0.75rem] text-[var(--color-primary-soft)]">
                  {project.client}
                </p>
                <p className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {project.summary}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--color-secondary-soft)]">
                  Ver o case
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14m-6-7 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
