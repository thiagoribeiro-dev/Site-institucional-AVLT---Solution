import type { Metadata } from 'next';
import LazyScene from '@/components/3d/LazyScene';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import FinalCTA from '@/components/sections/FinalCTA';
import { about, team, teamNote, timeline, diagnosticSignals } from '@/data/team';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sobre nós',
  description:
    'Consultoria boutique formada por quatro especialistas com mais de 25 anos somados de ecossistema Salesforce: arquitetura, governança, engenharia e IA aplicada a CRM.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre nós | AVLT - Solution',
    description:
      'Quatro especialistas, quatro frentes, zero sobreposição. Quem vende é quem entrega.',
    url: '/sobre',
  },
};

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', path: '/' },
              { name: 'Sobre nós', path: '/sobre' },
            ]),
          ),
        }}
      />

      {/* Abertura */}
      <section className="relative overflow-hidden pb-20 pt-[152px]">
        <div className="absolute inset-0">
          <LazyScene scale={0.75} opacity={0.32} withParticles />
        </div>

        <div className="shell relative z-10">
          <ScrollReveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="bar-gradient h-[3px] w-10 rounded-full" />
              <span className="eyebrow">Sobre nós</span>
            </div>
            <h1 className="max-w-3xl font-display text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.05]">
              {about.origin.title}
            </h1>
            <div className="mt-8 max-w-2xl space-y-5">
              {about.origin.paragraphs.map((p) => (
                <p key={p} className="text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Especialidade */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-background-deep)] py-24">
        <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionTitle
            eyebrow="Nossa especialidade"
            title={
              <>
                O projeto que já existe
                <br />
                <span className="text-gradient">e não vai bem.</span>
              </>
            }
          />
          <ScrollReveal delay={0.1} className="space-y-5">
            {about.specialty.paragraphs.map((p) => (
              <p key={p} className="text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
                {p}
              </p>
            ))}
          </ScrollReveal>
        </div>

        {/* Sinais de diagnóstico */}
        <div className="shell mt-20">
          <ScrollReveal className="mb-8 flex items-baseline gap-3">
            <h3 className="font-display text-[1.375rem] font-semibold text-[var(--color-text)]">
              Sinais de que sua org precisa de nós
            </h3>
            <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {diagnosticSignals.map((signal, i) => (
              <ScrollReveal key={signal.title} delay={i * 0.05}>
                <GlassCard accent="accent" className="h-full p-6">
                  <h4 className="font-display text-[0.9375rem] font-semibold leading-snug text-[var(--color-text)]">
                    {signal.title}
                  </h4>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
                    {signal.detail}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="py-24">
        <div className="shell">
          <SectionTitle
            eyebrow="Trajetória"
            title={
              <>
                De entrega enterprise a{' '}
                <span className="text-gradient">próxima geração de soluções</span>.
              </>
            }
          />

          <ol className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, i) => (
              <ScrollReveal
                as="li"
                key={item.label}
                delay={i * 0.05}
                className="relative bg-[var(--color-background)] p-7 transition-colors duration-500 hover:bg-[var(--color-surface)]"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.15em] text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[1.0625rem] font-semibold text-[var(--color-text)]">
                  {item.label}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
                  {item.detail}
                </p>
                <span
                  aria-hidden="true"
                  className="bar-gradient absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 hover:opacity-100"
                />
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Liderança */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-background-deep)] py-24">
        <div className="shell">
          <SectionTitle
            eyebrow="Nossa liderança"
            title={
              <>
                Quem conduz <span className="text-gradient">seu projeto</span>.
              </>
            }
            subtitle="Quatro pessoas, quatro especialidades, zero sobreposição. Time pequeno, sênior e acessível: quem vende é quem entrega."
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.07}>
                <GlassCard accent={i % 2 === 0 ? 'primary' : 'secondary'} className="h-full p-8">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-secondary-soft)]">
                    {member.role}
                  </span>
                  <h3 className="mt-3 font-display text-[1.375rem] font-bold text-[var(--color-text)]">
                    {member.name}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
                    {member.bio}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {member.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-lg border border-[var(--color-border)] px-2.5 py-1 font-mono text-[0.6875rem] text-[var(--color-text-muted)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.12} className="mt-10">
            <div className="rounded-[var(--radius-card)] border-l-2 border-[var(--color-secondary)] bg-[rgba(122,92,250,0.06)] p-7">
              <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
                {teamNote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
