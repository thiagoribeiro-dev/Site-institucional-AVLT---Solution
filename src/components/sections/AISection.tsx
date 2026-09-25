import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GlassCard from '@/components/ui/GlassCard';

/**
 * Inteligência Artificial.
 *
 * A tese da seção: IA não é chatbot. É uma camada da arquitetura
 * empresarial, que só funciona quando o dado, a permissão e o processo
 * já estão no lugar.
 */

const layers = [
  {
    n: '01',
    title: 'Dados',
    detail:
      'Ingestão, harmonização e governança. Sem base estruturada não existe agente que funcione — é aqui que a maioria dos pilotos morre.',
    tags: ['Data 360', 'Harmonização', 'Linhagem', 'Perfil unificado'],
    accent: 'primary' as const,
  },
  {
    n: '02',
    title: 'Conhecimento',
    detail:
      'Grounding em base de conhecimento, registros e dado operacional. RAG onde recuperar contexto resolve, e revisão do dado onde o problema não é o modelo.',
    tags: ['RAG', 'Knowledge', 'Grounding', 'Embeddings'],
    accent: 'secondary' as const,
  },
  {
    n: '03',
    title: 'Raciocínio',
    detail:
      'LLMs e agentes que decompõem o pedido em tarefas, decidem o que executar e sabem o que fazer quando não sabem a resposta.',
    tags: ['LLMs', 'Agentic AI', 'Orquestração', 'Tool use'],
    accent: 'secondary' as const,
  },
  {
    n: '04',
    title: 'Ação',
    detail:
      'O agente consulta e altera registros por ações em Flow e Apex — com a mesma permissão, o mesmo sharing e o mesmo rastro de um usuário.',
    tags: ['Flow', 'Apex', 'APIs', 'Workflows'],
    accent: 'accent' as const,
  },
  {
    n: '05',
    title: 'Guardrails',
    detail:
      'Política de uso, mascaramento de dado sensível antes do envio, limite de consumo e escopo explícito do que o agente pode e não pode fazer.',
    tags: ['Segurança', 'LGPD', 'Escopo', 'Auditoria'],
    accent: 'accent' as const,
  },
  {
    n: '06',
    title: 'Observabilidade',
    detail:
      'Contenção, escalonamento, custo por interação e qualidade de resposta. IA sem medição é aposta, não engenharia.',
    tags: ['Métricas', 'Custo', 'Qualidade', 'Dashboards'],
    accent: 'primary' as const,
  },
];

export default function AISection() {
  return (
    <section id="ia" className="relative scroll-mt-24 overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(820px circle at 82% 30%, rgba(122,92,250,0.13), transparent 60%)',
        }}
      />

      <div className="shell relative">
        <SectionTitle
          eyebrow="Inteligência Artificial"
          title={
            <>
              Da automação tradicional à{' '}
              <span className="text-gradient">inteligência artificial aplicada ao negócio.</span>
            </>
          }
          subtitle="IA não é um chat colado na tela. É uma camada da arquitetura empresarial — e ela só entra em produção quando as seis camadas abaixo estão resolvidas."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer, i) => (
            <ScrollReveal key={layer.n} delay={i * 0.06}>
              <GlassCard accent={layer.accent} className="h-full p-7">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.75rem] tracking-[0.15em] text-[var(--color-text-muted)]">
                    {layer.n}
                  </span>
                  <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-[1.25rem] font-semibold text-[var(--color-text)]">
                  {layer.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {layer.detail}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {layer.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[0.6875rem] text-[var(--color-text-muted)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12} className="mt-14">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-8 md:p-10">
            <span aria-hidden="true" className="bar-gradient absolute inset-y-0 left-0 w-[3px]" />
            <p className="max-w-3xl font-display text-[clamp(1.125rem,2.2vw,1.5rem)] font-medium leading-snug text-[var(--color-text)]">
              &ldquo;Não é piloto de IA para apresentação. É atendimento respondendo de verdade,
              com permissão, rastro e custo medido.&rdquo;
            </p>
            <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
              AVLT - Solution
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
