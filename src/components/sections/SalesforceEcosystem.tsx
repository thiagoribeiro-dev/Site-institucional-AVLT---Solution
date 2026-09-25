'use client';

import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CloudCard from '@/components/cards/CloudCard';
import { clouds } from '@/data/clouds';

/**
 * Ecossistema Salesforce — a experiência interativa do briefing.
 *
 * Não é uma lista de produtos: é um diagrama vivo. O núcleo (Platform +
 * Customer 360 + Data 360) se conecta a três ramos, e passar o mouse por
 * um card acende a conexão correspondente e revela as capacidades.
 *
 * Nomenclatura conferida em salesforce.com (setembro/2026). Conteúdo
 * original da AVLT — nenhum texto oficial foi copiado.
 */

const groups = [
  { id: 'engagement', label: 'Engajamento', hint: 'onde o cliente é atendido' },
  { id: 'data', label: 'Dados & Insight', hint: 'onde a decisão se apoia' },
  { id: 'platform', label: 'Plataforma & Conexão', hint: 'onde tudo se sustenta' },
] as const;

export default function SalesforceEcosystem() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="salesforce" className="relative scroll-mt-24 overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(760px circle at 20% 10%, rgba(0,161,224,0.09), transparent 60%)',
        }}
      />

      <div className="shell relative">
        <SectionTitle
          eyebrow="Ecossistema Salesforce"
          title={
            <>
              Uma plataforma.
              <br />
              <span className="text-gradient">Todo o ecossistema do cliente.</span>
            </>
          }
          subtitle="Conhecemos o ecossistema de ponta a ponta — e, mais importante, sabemos onde cada peça se encaixa. Passe o cursor por uma área para ver o que ela cobre."
        />

        {/* Núcleo do diagrama */}
        <ScrollReveal delay={0.1} className="mt-16">
          <div className="relative mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[rgba(122,92,250,0.3)] bg-[rgba(122,92,250,0.06)] px-8 py-7 text-center backdrop-blur-xl">
              <span
                aria-hidden="true"
                className="bar-gradient absolute inset-x-0 top-0 h-[2px]"
              />
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--color-secondary-soft)]">
                Núcleo
              </p>
              <h3 className="mt-2 font-display text-[1.5rem] font-bold text-[var(--color-text)]">
                Salesforce Platform
              </h3>
              <p className="mt-1.5 font-mono text-[0.8125rem] text-[var(--color-text-secondary)]">
                Customer 360 · Data 360 · Metadado · Governança
              </p>
            </div>

            {/* Conectores para os três ramos */}
            <svg
              viewBox="0 0 600 80"
              className="mx-auto h-14 w-full"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <path
                d="M300 0 V26 M300 26 H90 V78 M300 26 H300 V78 M300 26 H510 V78"
                fill="none"
                stroke="rgba(122,92,250,0.45)"
                strokeWidth="1.5"
                className="animate-dash"
              />
            </svg>
          </div>
        </ScrollReveal>

        {/* Ramos */}
        <div className="mt-2 space-y-14">
          {groups.map((group, gi) => {
            const items = clouds.filter((c) => c.group === group.id);
            return (
              <div key={group.id}>
                <ScrollReveal delay={gi * 0.06} className="mb-6 flex items-baseline gap-3">
                  <h3 className="font-display text-[1.0625rem] font-semibold text-[var(--color-text)]">
                    {group.label}
                  </h3>
                  <span className="font-mono text-[0.75rem] text-[var(--color-text-muted)]">
                    — {group.hint}
                  </span>
                  <span className="ml-auto hidden h-px flex-1 bg-[var(--color-border)] sm:block" />
                </ScrollReveal>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((cloud, i) => (
                    <ScrollReveal key={cloud.id} delay={i * 0.04} y={18}>
                      <CloudCard
                        cloud={cloud}
                        active={active === cloud.id}
                        onFocus={() => setActive(cloud.id)}
                        onBlur={() => setActive((cur) => (cur === cloud.id ? null : cur))}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <ScrollReveal delay={0.1} className="mt-12">
          <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
            Nomenclatura conferida nas páginas oficiais da Salesforce em setembro de 2026.
            A camada de agentes hoje é nomeada por domínio (Agentforce Sales, Agentforce
            Service e assim por diante), enquanto as clouds de plataforma seguem existindo
            como a base transacional — os dois nomes aparecem lado a lado de propósito.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
