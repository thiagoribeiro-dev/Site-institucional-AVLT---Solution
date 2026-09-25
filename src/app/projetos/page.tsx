import type { Metadata } from 'next';
import LazyScene from '@/components/3d/LazyScene';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import ProjectCard from '@/components/cards/ProjectCard';
import PriorExperience from '@/components/sections/PriorExperience';
import FinalCTA from '@/components/sections/FinalCTA';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Projetos de Sucesso',
  description:
    'Cases reais de Salesforce e Inteligência Artificial entregues pela AVLT - Solution: integrações Service Cloud, CRM comercial do zero e Agentforce em atendimento omnichannel.',
  alternates: { canonical: '/projetos' },
  openGraph: {
    title: 'Projetos de Sucesso | AVLT - Solution',
    description:
      'Cases reais de Salesforce e Inteligência Artificial: arquitetura, escopo, tecnologias e resultados.',
    url: '/projetos',
  },
};

export default function ProjetosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', path: '/' },
              { name: 'Projetos de Sucesso', path: '/projetos' },
            ]),
          ),
        }}
      />

      <section className="relative overflow-hidden pb-20 pt-[152px]">
        <div className="absolute inset-0">
          <LazyScene scale={0.7} opacity={0.3} withParticles={false} />
        </div>

        <div className="shell relative z-10">
          <ScrollReveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="bar-gradient h-[3px] w-10 rounded-full" />
              <span className="eyebrow">Portfólio</span>
            </div>
            <h1 className="max-w-3xl font-display text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.05]">
              Projetos de <span className="text-gradient">sucesso</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1rem,1.7vw,1.1875rem)] leading-relaxed text-[var(--color-text-secondary)]">
              Cada case abaixo traz o contexto do cliente, o problema que existia antes e as
              competências que entraram em campo. O desenho da solução e os números de cada
              projeto pertencem ao cliente — falamos deles na conversa, não na vitrine.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="shell space-y-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} index={i} />
            </ScrollReveal>
          ))}
        </div>

        <div className="shell mt-12">
          <ScrollReveal>
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.022)] p-8 text-center">
              <p className="font-display text-[1.0625rem] font-semibold text-[var(--color-text)]">
                Quer ver o desenho por trás de um destes projetos?
              </p>
              <p className="mx-auto mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
                Arquitetura, decisões técnicas e resultados nós apresentamos em conversa, com o
                nível de detalhe que o seu caso pedir.
              </p>
              <div className="mt-6 flex justify-center">
                <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                  Falar com um especialista
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <PriorExperience />

      <FinalCTA />
    </>
  );
}
