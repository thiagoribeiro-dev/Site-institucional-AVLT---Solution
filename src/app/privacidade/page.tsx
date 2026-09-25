import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';
import RevogarConsentimento from '@/components/ui/RevogarConsentimento';
import { privacidade, secoesPolitica } from '@/data/privacidade';
import { breadcrumbJsonLd } from '@/lib/seo';

/**
 * Política de privacidade.
 *
 * Sem 3D e sem animação de entrada pesada: é página de leitura, e quem
 * chega aqui quer achar uma informação específica rápido. O índice no
 * topo existe por isso.
 *
 * O conteúdo vem de src/data/privacidade.ts — ver o cabeçalho daquele
 * arquivo antes de alterar qualquer texto.
 */
export const metadata: Metadata = {
  title: 'Política de privacidade',
  description:
    'Como a AVLT - Solution trata os dados pessoais coletados no site: o que é coletado, para onde vai, por quanto tempo fica e como exercer os seus direitos.',
  alternates: { canonical: '/privacidade' },
  openGraph: {
    title: 'Política de privacidade | AVLT - Solution',
    description: 'O que coletamos, para quê, por quanto tempo e como pedir exclusão.',
    url: '/privacidade',
  },
};

export default function PrivacidadePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Início', path: '/' },
              { name: 'Política de privacidade', path: '/privacidade' },
            ]),
          ),
        }}
      />

      <section className="relative pb-24 pt-[152px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              'radial-gradient(760px circle at 30% 0%, rgba(0,161,224,0.10), transparent 62%)',
          }}
        />

        <div className="shell relative z-10 max-w-3xl">
          <ScrollReveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="bar-gradient h-[3px] w-10 rounded-full" />
              <span className="eyebrow">Privacidade</span>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.05]">
              Política de <span className="text-gradient">privacidade</span>
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
              Esta página descreve o que o site faz com dados pessoais — em português comum, sem
              parágrafo decorativo. Se algo aqui não estiver claro, escreva para{' '}
              <a
                href={`mailto:${privacidade.encarregado.email}`}
                className="text-[var(--color-primary-soft)] underline underline-offset-4"
              >
                {privacidade.encarregado.email}
              </a>
              .
            </p>
            <p className="mt-3 font-mono text-[0.8125rem] text-[var(--color-text-muted)]">
              Atualizada em {privacidade.atualizadoEm}
            </p>
          </ScrollReveal>

          {/* Índice */}
          <ScrollReveal delay={0.06}>
            <nav
              aria-label="Seções desta página"
              className="mt-12 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-6"
            >
              <ol className="grid gap-2 sm:grid-cols-2">
                {secoesPolitica.map((secao, i) => (
                  <li key={secao.id} className="flex gap-2.5 text-[0.9375rem]">
                    <span className="font-mono text-[0.75rem] text-[var(--color-text-muted)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <a
                      href={`#${secao.id}`}
                      className="text-[var(--color-text-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-text)] hover:underline"
                    >
                      {secao.titulo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </ScrollReveal>

          {/* Seções */}
          <div className="mt-16 space-y-14">
            {secoesPolitica.map((secao) => (
              <ScrollReveal key={secao.id}>
                <section id={secao.id} className="scroll-mt-28">
                  <h2 className="font-display text-[1.375rem] font-bold text-[var(--color-text)]">
                    {secao.titulo}
                  </h2>

                  {secao.paragrafos?.map((texto, i) => (
                    <p
                      key={i}
                      className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]"
                    >
                      {texto}
                    </p>
                  ))}

                  {secao.itens && (
                    <ul className="mt-5 space-y-2.5">
                      {secao.itens.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {secao.tabela && (
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full min-w-[30rem] border-collapse text-left text-[0.875rem]">
                        <thead>
                          <tr>
                            {secao.tabela.cabecalho.map((titulo) => (
                              <th
                                key={titulo}
                                scope="col"
                                className="border-b border-[var(--color-border-strong)] pb-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-text-muted)]"
                              >
                                {titulo}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {secao.tabela.linhas.map((linha) => (
                            <tr key={linha[0]}>
                              {linha.map((celula, i) => (
                                <td
                                  key={i}
                                  className={`border-b border-[var(--color-border)] py-3 pr-5 align-top ${
                                    i === 0
                                      ? 'font-medium text-[var(--color-text)]'
                                      : 'text-[var(--color-text-secondary)]'
                                  }`}
                                >
                                  {celula}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* A seção de cookies ganha o botão de revogar: é onde a
                      pessoa está quando decide mudar de ideia. */}
                  {secao.id === 'cookies' && <RevogarConsentimento />}
                </section>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
