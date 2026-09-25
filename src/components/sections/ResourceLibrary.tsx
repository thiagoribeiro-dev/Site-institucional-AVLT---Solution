'use client';

import { useMemo, useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ResourceCard from '@/components/cards/ResourceCard';
import { resources, resourceCategories, type ResourceCategory } from '@/data/resources';

/**
 * Biblioteca técnica com filtros.
 *
 * Dois eixos de filtro — categoria e tipo — derivados dos próprios dados:
 * adicionar um material novo em src/data/resources.ts atualiza os filtros
 * sozinho, sem tocar neste componente.
 */
export default function ResourceLibrary() {
  const [category, setCategory] = useState<ResourceCategory | 'todos'>('todos');
  const [type, setType] = useState<string>('todos');

  const types = useMemo(
    () => ['todos', ...Array.from(new Set(resources.map((r) => r.type)))],
    [],
  );

  const filtered = useMemo(
    () =>
      resources.filter(
        (r) =>
          (category === 'todos' || r.category === category) &&
          (type === 'todos' || r.type === type),
      ),
    [category, type],
  );

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-[0.8125rem] transition-all duration-300 ${
      active
        ? 'border-[rgba(122,92,250,0.6)] bg-[rgba(122,92,250,0.12)] text-[var(--color-text)]'
        : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]'
    }`;

  return (
    <section className="pb-24">
      <div className="shell">
        {/* Filtros */}
        <ScrollReveal className="space-y-5 border-y border-[var(--color-border)] py-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mr-1 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
              Categoria
            </span>
            {resourceCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={chip(category === cat.id)}
                aria-pressed={category === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="mr-1 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
              Formato
            </span>
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={chip(type === t)}
                aria-pressed={type === t}
              >
                {t === 'todos' ? 'Todos' : t}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <p className="mt-6 font-mono text-[0.75rem] text-[var(--color-text-muted)]">
          {filtered.length} {filtered.length === 1 ? 'material' : 'materiais'}
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource, i) => (
            <ScrollReveal key={resource.id} delay={Math.min(i, 6) * 0.04} y={18}>
              <ResourceCard resource={resource} />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-[var(--color-text-muted)]">
            Nenhum material com essa combinação de filtros.
          </p>
        )}
      </div>
    </section>
  );
}
