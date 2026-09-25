/** Metodologia "Como trabalhamos" — 6 etapas, animadas no scroll. */

export const method = [
  {
    n: '01',
    title: 'Entender',
    detail: 'Entendemos o negócio e o problema. Entrevistas por área, acompanhamento da operação e leitura dos números — as dores ditas e as que só aparecem observando.',
  },
  {
    n: '02',
    title: 'Arquitetar',
    detail: 'Definimos a arquitetura adequada. Clouds, objetos, automações e o que fica nativo. Cada dor endereçada por uma decisão registrada.',
  },
  {
    n: '03',
    title: 'Construir',
    detail: 'Desenvolvemos a solução. Apex, LWC e Flow onde cada um faz sentido — com versionamento desde o primeiro dia.',
  },
  {
    n: '04',
    title: 'Integrar',
    detail: 'Conectamos sistemas, dados e processos. REST, SOAP, middleware e Platform Events, com tratamento de erro e mensagem legível para quem opera.',
  },
  {
    n: '05',
    title: 'Automatizar',
    detail: 'Eliminamos tarefas manuais. Aprovações, SLA, alertas e agentes de IA assumindo o que é repetitivo.',
  },
  {
    n: '06',
    title: 'Evoluir',
    detail: 'Monitoramos e evoluímos continuamente. Melhoria contínua depois que a poeira baixa, com dívida técnica sob controle.',
  },
] as const;

/** Serviços — seção de especialização. */
export const services = [
  { n: '01', title: 'Quick Starts', detail: 'Escopo fechado, prazo curto, preço conhecido. Para quem quer começar certo.' },
  { n: '02', title: 'Implementação', detail: 'Sales, Service, Marketing, Experience e CPQ — do discovery ao go-live.' },
  { n: '03', title: 'IA aplicada ao CRM', detail: 'Agentforce e Einstein em processos reais de vendas e atendimento.' },
  { n: '04', title: 'Integrações', detail: 'REST/SOAP, middleware, Platform Events, ERP e ecossistema.' },
  { n: '05', title: 'Governança & DevOps', detail: 'Handbook, padrões, versionamento e redução de dívida técnica.' },
  { n: '06', title: 'Evolução & sustentação', detail: 'Melhoria contínua depois que a poeira baixa.' },
] as const;

/** Competências detalhadas — seção "Nossa especialização". */
export const expertise = {
  salesforce: {
    title: 'Salesforce',
    detail: 'Do desenho da arquitetura ao código que sustenta a operação.',
    items: [
      'Arquitetura de solução',
      'Desenvolvimento',
      'Apex',
      'Lightning Web Components',
      'Flow',
      'Integrações',
      'APIs',
      'Modelo de dados',
      'Automação',
      'Experience Cloud',
      'Commerce',
      'Service',
      'Sales',
      'Marketing',
      'Revenue',
      'Field Service',
    ],
  },
  ai: {
    title: 'Inteligência Artificial',
    detail: 'IA como parte da arquitetura empresarial, não como um chat colado na tela.',
    items: [
      'LLMs',
      'Agentes de IA',
      'Agentic AI',
      'RAG',
      'AI Engineering',
      'Integração de modelos',
      'Grounding em dados',
      'Knowledge',
      'AI workflows',
      'Guardrails e governança',
      'Observabilidade',
      'Custo por interação',
    ],
  },
} as const;
