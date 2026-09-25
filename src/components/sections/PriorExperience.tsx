import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { priorAccounts, priorExperience } from '@/data/experience';

/**
 * De onde vem nossa arquitetura.
 *
 * Contas anteriores à AVLT, conduzidas por quem hoje forma a sociedade.
 * A separação visual é intencional: fundo mais escuro, rótulo de
 * atribuição em cada card e nota ao final. O leitor precisa entender
 * de imediato que isto é bagagem dos sócios, não carteira da consultoria.
 */

const accentRgb: Record<(typeof priorAccounts)[number]['accent'], string> = {
  primary: '0,161,224',
  secondary: '122,92,250',
  accent: '255,122,0',
};

export default function PriorExperience() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-background-deep)] py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(720px circle at 15% 15%, rgba(0,161,224,0.09), transparent 60%), radial-gradient(640px circle at 88% 85%, rgba(122,92,250,0.08), transparent 60%)',
        }}
      />

      <div className="shell relative">
        <SectionTitle
          eyebrow={priorExperience.eyebrow}
          title={
            <>
              De onde vem nossa <span className="text-gradient">arquitetura</span>.
            </>
          }
          subtitle={priorExperience.subtitle}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {priorAccounts.map((conta, i) => (
            <ScrollReveal key={conta.id} delay={i * 0.08}>
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border p-8 transition-all duration-500 md:p-9"
                style={{
                  borderColor: `rgba(${accentRgb[conta.accent]},0.22)`,
                  background: `linear-gradient(160deg, rgba(${accentRgb[conta.accent]},0.06), rgba(255,255,255,0.02))`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(${accentRgb[conta.accent]},0.9), transparent)`,
                  }}
                />

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em]"
                    style={{
                      borderColor: `rgba(${accentRgb[conta.accent]},0.35)`,
                      color: `rgba(${accentRgb[conta.accent]},1)`,
                    }}
                  >
                    {conta.role}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[clamp(1.5rem,2.6vw,1.875rem)] font-bold leading-tight text-[var(--color-text)]">
                  {conta.client}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {conta.about}
                </p>

                <dl className="mt-7 space-y-6 border-t border-[var(--color-border)] pt-7">
                  <div>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      Cenário
                    </dt>
                    <dd className="mt-2.5 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                      {conta.scenario}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-primary-soft)]">
                      Entrega
                    </dt>
                    <dd className="mt-2.5 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                      {conta.delivery}
                    </dd>
                  </div>
                </dl>

                <p className="mt-auto pt-7 font-mono text-[0.75rem] leading-snug text-[var(--color-text-muted)]">
                  {conta.attribution}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12} className="mt-8">
          <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
            {priorExperience.note}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
