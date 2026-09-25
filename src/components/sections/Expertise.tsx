import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';
import { expertise, services } from '@/data/method';
import { differentials } from '@/data/team';

/**
 * Nossa especialização: a tese ("não somos apenas desenvolvedores
 * Salesforce"), as duas frentes de competência e os serviços.
 */
export default function Expertise() {
  return (
    <section
      id="especializacao"
      className="relative scroll-mt-24 border-y border-[var(--color-border)] bg-[var(--color-background-deep)] py-28"
    >
      <div className="shell">
        <SectionTitle
          eyebrow="Nossa especialização"
          title={
            <>
              Especialistas que entendem{' '}
              <span className="text-gradient">tecnologia e negócio</span>.
            </>
          }
          subtitle="Não somos apenas desenvolvedores Salesforce. Somos profissionais especializados em compreender processos, arquitetura, integração, dados, automação e tecnologia para transformar necessidades de negócio em soluções escaláveis."
        />

        {/* Duas frentes de competência */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[expertise.salesforce, expertise.ai].map((block, i) => (
            <ScrollReveal key={block.title} delay={i * 0.08}>
              <GlassCard
                accent={i === 0 ? 'primary' : 'secondary'}
                className="h-full p-8 md:p-10"
                featured
              >
                <h3 className="font-display text-[1.625rem] font-bold text-[var(--color-text)]">
                  {block.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {block.detail}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 font-mono text-[0.75rem] text-[var(--color-text-secondary)] transition-colors duration-300 hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Serviços */}
        <div className="mt-20">
          <ScrollReveal className="mb-8 flex items-baseline gap-3">
            <h3 className="font-display text-[1.375rem] font-semibold text-[var(--color-text)]">
              O que fazemos
            </h3>
            <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
          </ScrollReveal>

          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ScrollReveal
                key={service.n}
                delay={i * 0.05}
                className="group bg-[var(--color-background-deep)] p-7 transition-colors duration-500 hover:bg-[rgba(255,255,255,0.03)]"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.15em] text-[var(--color-text-muted)]">
                  {service.n}
                </span>
                <h4 className="mt-3 font-display text-[1.125rem] font-semibold text-[var(--color-text)]">
                  {service.title}
                </h4>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {service.detail}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Diferenciais */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {differentials.map((item, i) => (
            <ScrollReveal key={item.n} delay={i * 0.06}>
              <div className="h-full border-t-2 border-[var(--color-secondary)]/40 pt-6">
                <span className="font-mono text-[0.75rem] tracking-[0.15em] text-[var(--color-secondary-soft)]">
                  {item.n}
                </span>
                <h4 className="mt-3 font-display text-[1.0625rem] font-semibold text-[var(--color-text)]">
                  {item.title}
                </h4>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--color-text-muted)]">
                  {item.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
