import type { Metadata } from 'next';
import LazyScene from '@/components/3d/LazyScene';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ResourceLibrary from '@/components/sections/ResourceLibrary';
import FinalCTA from '@/components/sections/FinalCTA';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Material de Apoio',
  description:
    'Biblioteca técnica da AVLT - Solution: guias, whitepapers e documentação oficial sobre Salesforce, arquitetura, integração, Agentforce, RAG e engenharia de IA.',
  alternates: { canonical: '/materiais' },
  openGraph: {
    title: 'Material de Apoio | AVLT - Solution',
    description:
      'Guias, whitepapers e documentação sobre Salesforce, arquitetura e Inteligência Artificial.',
    url: '/materiais',
  },
};

export default function MateriaisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', path: '/' },
              { name: 'Material de Apoio', path: '/materiais' },
            ]),
          ),
        }}
      />

      <section className="relative overflow-hidden pb-14 pt-[152px]">
        <div className="absolute inset-0">
          <LazyScene scale={0.7} opacity={0.28} withParticles={false} />
        </div>

        <div className="shell relative z-10">
          <ScrollReveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="bar-gradient h-[3px] w-10 rounded-full" />
              <span className="eyebrow">Biblioteca técnica</span>
            </div>
            <h1 className="max-w-3xl font-display text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.05]">
              Material de <span className="text-gradient">apoio</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1rem,1.7vw,1.1875rem)] leading-relaxed text-[var(--color-text-secondary)]">
              O que consultamos, o que produzimos e o que indicamos para quem trabalha com
              Salesforce, arquitetura e IA. Links para fontes oficiais quando a referência
              é da Salesforce; conteúdo nosso quando a análise é nossa.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ResourceLibrary />
      <FinalCTA />
    </>
  );
}
