import Counter from '@/components/ui/Counter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { stats } from '@/data/site';

/**
 * Indicadores de experiência.
 * Todos os valores vêm do material institucional da AVLT — ver src/data/site.ts.
 */
export default function Stats() {
  return (
    <section className="relative border-y border-[var(--color-border)] bg-[var(--color-surface)]/40 py-20">
      <div className="shell">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              delay={i * 0.08}
              className="bg-[var(--color-background)] p-8 transition-colors duration-500 hover:bg-[var(--color-surface)]"
            >
              {/* Indicador por palavra ("Agentforce") não cabe no corpo pensado
                  para números curtos ("+25", "8"): a última letra ficava fora
                  da coluna. Palavra ganha escala própria, menor. */}
              <div
                className={`font-display font-bold leading-none text-gradient ${
                  'display' in stat && stat.display
                    ? 'text-[clamp(1.5rem,2.3vw,1.9rem)]'
                    : 'text-[clamp(2.1rem,3.6vw,2.9rem)]'
                }`}
              >
                {'display' in stat && stat.display ? (
                  stat.display
                ) : (
                  <Counter
                    value={stat.value as number}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <p className="mt-4 font-display text-[0.9375rem] font-semibold text-[var(--color-text)]">
                {stat.label}
              </p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
                {stat.detail}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
