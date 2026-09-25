import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';

/**
 * Agentforce.
 *
 * Conteúdo produzido pela AVLT a partir da documentação oficial da
 * Salesforce (salesforce.com/br/agentforce/ e /platform/, consulta em
 * setembro de 2026). Nomes de componentes preservados como a Salesforce
 * os publica; descrições são originais.
 */

const capabilities = [
  {
    name: 'Agent Builder',
    detail: 'Configuração de subagentes, ações e instruções sem sair da plataforma.',
  },
  {
    name: 'Agent Script',
    detail: 'Controle fino do comportamento, para agentes prontos para uso comercial.',
  },
  {
    name: 'Atlas Reasoning Engine',
    detail: 'Decompõe o pedido em tarefas menores e decide o caminho de execução.',
  },
  {
    name: 'Multi-Agent Orchestration',
    detail: 'Vários agentes colaborando como time, cada um com seu escopo.',
  },
  {
    name: 'Agentforce Voice',
    detail: 'A mesma camada de IA estendida para os canais de voz.',
  },
  {
    name: 'Agentforce Observability',
    detail: 'Desempenho, custo e qualidade dos agentes quase em tempo real.',
  },
  {
    name: 'Suporte a MCP',
    detail: 'Interoperabilidade com ferramentas externas por protocolo aberto.',
  },
  {
    name: 'Grounding em Data 360',
    detail: 'O agente responde a partir do dado da empresa, não de suposição.',
  },
];

const pillars = [
  {
    title: 'Contexto empresarial',
    detail:
      'O agente enxerga o mesmo cliente que vendas, atendimento e marketing enxergam — Customer 360 e Data 360 como fonte, não um índice paralelo.',
  },
  {
    title: 'Ação dentro do processo',
    detail:
      'Consultar e alterar registro, abrir caso, atualizar oportunidade, disparar fluxo. A ação acontece no processo real, com o rastro que auditoria exige.',
  },
  {
    title: 'Segurança e governança',
    detail:
      'Perfis, permission sets e sharing valem para o agente como valem para uma pessoa. Dado sensível é mascarado antes de sair da plataforma.',
  },
  {
    title: 'Handoff que preserva contexto',
    detail:
      'Quando o caso exige gente, a transferência leva o histórico completo. O cliente não repete nada — esse é o teste real de um agente bem desenhado.',
  },
];

export default function Agentforce() {
  return (
    <section
      id="agentforce"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-background-deep)] py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(700px circle at 50% 0%, rgba(0,161,224,0.14), transparent 62%), radial-gradient(600px circle at 85% 95%, rgba(255,122,0,0.07), transparent 60%)',
        }}
      />

      <div className="shell relative">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <SectionTitle
              eyebrow="Salesforce + IA"
              title={
                <>
                  Agentforce não é{' '}
                  <span className="text-[var(--color-text-muted)] line-through decoration-[var(--color-accent)]/60">
                    um chatbot
                  </span>
                  .
                </>
              }
              subtitle="É a camada de agentes da plataforma: conecta agentes, dados, aplicações e workflows dentro do mesmo ambiente onde o processo já acontece. A diferença prática está em quatro pontos."
            />

            <div className="mt-12 space-y-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-border)]">
              {pillars.map((pillar, i) => (
                <ScrollReveal
                  key={pillar.title}
                  delay={i * 0.07}
                  className="bg-[var(--color-background-deep)] p-7 transition-colors duration-500 hover:bg-[rgba(255,255,255,0.028)]"
                >
                  <h3 className="font-display text-[1.0625rem] font-semibold text-[var(--color-text)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                    {pillar.detail}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal delay={0.16} className="lg:sticky lg:top-28">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.035)] p-8 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="bar-gradient h-[3px] w-8 rounded-full" />
                <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-secondary-soft)]">
                  Componentes da plataforma
                </h3>
              </div>

              <ul className="mt-7 space-y-5">
                {capabilities.map((cap) => (
                  <li key={cap.name} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-secondary)]"
                    />
                    <div>
                      <p className="font-display text-[0.9375rem] font-semibold text-[var(--color-text)]">
                        {cap.name}
                      </p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
                        {cap.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-[var(--color-border)] pt-5 text-[0.75rem] leading-relaxed text-[var(--color-text-muted)]">
                Nomes de componentes conforme publicados pela Salesforce (setembro/2026).
                Descrições produzidas pela AVLT - Solution.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
