/**
 * Ecossistema Salesforce.
 *
 * Conteúdo original da AVLT, produzido a partir da nomenclatura oficial
 * publicada pela Salesforce em salesforce.com/br/products/, /br/agentforce/
 * e /platform/ (consulta: setembro de 2026). Nenhum texto da Salesforce foi
 * copiado integralmente.
 *
 * Nota de nomenclatura: a Salesforce hoje posiciona a camada de agentes como
 * "Agentforce <domínio>" (Agentforce Sales, Agentforce Service...), enquanto
 * as clouds de plataforma (Sales Cloud, Service Cloud, Revenue Cloud...)
 * seguem existindo como a base transacional. Mantemos os dois nomes.
 */

export type Cloud = {
  id: string;
  name: string;
  official: string;
  group: 'engagement' | 'data' | 'platform';
  summary: string;
  capabilities: string[];
  accent: 'primary' | 'secondary' | 'accent';
};

export const clouds: Cloud[] = [
  {
    id: 'sales',
    name: 'Sales',
    official: 'Sales Cloud · Agentforce Sales',
    group: 'engagement',
    accent: 'primary',
    summary:
      'Do primeiro contato ao pedido fechado num só lugar: funil com critérios de saída, catálogo, cotação e previsão que a diretoria consegue ler.',
    capabilities: [
      'Leads, roteamento e qualificação',
      'Oportunidades, fases e critérios de saída',
      'Catálogo, tabelas de preço e cotação',
      'Forecast e pipeline',
      'Aprovações e automação comercial',
    ],
  },
  {
    id: 'service',
    name: 'Service',
    official: 'Service Cloud · Agentforce Service',
    group: 'engagement',
    accent: 'primary',
    summary:
      'Todo chamado com dono, prazo e histórico. Roteamento por especialidade, SLA que pausa quando deve e console que o agente não precisa abandonar.',
    capabilities: [
      'Casos, filas e regras de atribuição',
      'Omni-Channel com capacidade por agente',
      'Entitlements, marcos e relógio de SLA',
      'E-mail-to-Case, Web-to-Case e canais digitais',
      'Knowledge com fluxo de aprovação',
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    official: 'Marketing Cloud · Agentforce Marketing',
    group: 'engagement',
    accent: 'secondary',
    summary:
      'Comunicação certa na hora certa, sem depender de alguém lembrar de disparar — e com o resultado voltando para a oportunidade.',
    capabilities: [
      'Journey Builder e Automation Studio',
      'Data Extensions e Contact Model',
      'Segmentação e personalização',
      'Entregabilidade: SPF, DKIM e domínio dedicado',
      'Consentimento e preference center (LGPD)',
    ],
  },
  {
    id: 'commerce',
    name: 'Commerce',
    official: 'Commerce Cloud · Agentforce Commerce',
    group: 'engagement',
    accent: 'accent',
    summary:
      'Vitrine, carrinho e pedido conectados ao mesmo cliente que vendas e atendimento enxergam — B2B e B2C sobre a mesma base.',
    capabilities: [
      'B2B e B2C Commerce',
      'Catálogo, merchandising e busca',
      'Checkout e meios de pagamento',
      'Order Management',
      'Experiência de compra conectada ao CRM',
    ],
  },
  {
    id: 'revenue',
    name: 'Revenue',
    official: 'Revenue Cloud · Agentforce Revenue Operations',
    group: 'engagement',
    accent: 'accent',
    summary:
      'O ciclo completo da receita: configurar, precificar, cotar, contratar e faturar sem que a informação se perca entre planilhas.',
    capabilities: [
      'CPQ — configuração, preço e cotação',
      'Contratos e renovações',
      'Billing e faturamento recorrente',
      'Revenue Lifecycle Management',
      'Aprovações de desconto e margem',
    ],
  },
  {
    id: 'field-service',
    name: 'Field Service',
    official: 'Field Service · Agentforce Field Service',
    group: 'engagement',
    accent: 'accent',
    summary:
      'Operação em campo com agenda que fecha: técnico certo, peça certa, janela certa — e o registro do que aconteceu no cliente.',
    capabilities: [
      'Ordens de serviço e work orders',
      'Agendamento e otimização de rota',
      'Dispatch Console',
      'App móvel para o técnico',
      'Estoque, peças e ativos',
    ],
  },
  {
    id: 'data',
    name: 'Data',
    official: 'Data 360',
    group: 'data',
    accent: 'primary',
    summary:
      'A base que decide se a IA funciona. Dado unificado, harmonizado e governado — sem isso, agente nenhum responde direito.',
    capabilities: [
      'Ingestão e harmonização de fontes',
      'Perfil unificado do cliente',
      'Segmentos e ativação',
      'Governança e linhagem de dado',
      'Grounding de agentes de IA',
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    official: 'Tableau',
    group: 'data',
    accent: 'secondary',
    summary:
      'A diferença entre ter dado e enxergar o negócio. Exploração visual, dashboards e insights assistidos por IA.',
    capabilities: [
      'Dashboards e visualização',
      'Exploração self-service',
      'Métricas e indicadores de negócio',
      'Insights assistidos por IA',
      'Distribuição e assinatura de relatórios',
    ],
  },
  {
    id: 'integration',
    name: 'Integration',
    official: 'MuleSoft',
    group: 'platform',
    accent: 'accent',
    summary:
      'O Salesforce raramente é a única peça. APIs, orquestração e eventos para que o ERP, o legado e a nuvem falem a mesma língua.',
    capabilities: [
      'APIs REST e SOAP',
      'Orquestração e middleware',
      'Platform Events e integração assíncrona',
      'Conectores para ERP e legado',
      'Governança e catálogo de APIs',
    ],
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    official: 'Slack',
    group: 'platform',
    accent: 'secondary',
    summary:
      'Onde a decisão acontece. A Salesforce posiciona o Slack como o lugar de coordenar pessoas e agentes no mesmo canal.',
    capabilities: [
      'Canais ligados a registros do CRM',
      'Workflows e automação',
      'Agentes disponíveis na conversa',
      'Aprovações e alertas',
      'Coordenação entre times e sistemas',
    ],
  },
  {
    id: 'experience',
    name: 'Experience',
    official: 'Experience Cloud',
    group: 'engagement',
    accent: 'primary',
    summary:
      'Portais, comunidades e áreas logadas construídas sobre o mesmo dado — sem duplicar cadastro nem criar um segundo sistema.',
    capabilities: [
      'Portais de cliente e parceiro',
      'Comunidades e autoatendimento',
      'LWR e componentes customizados',
      'Compartilhamento e visibilidade',
      'Identidade e login externo',
    ],
  },
  {
    id: 'platform',
    name: 'Platform',
    official: 'Salesforce Platform',
    group: 'platform',
    accent: 'secondary',
    summary:
      'A camada onde tudo se sustenta: metadado, segurança, automação e código. É aqui que a arquitetura decide se o segundo ano vai doer.',
    capabilities: [
      'Apex, LWC e Flow',
      'Modelo de dados e metadado',
      'Perfis, permission sets e sharing',
      'DevOps Center e versionamento',
      'Limites, performance e escalabilidade',
    ],
  },
];

/** Grafo usado na experiência interativa do ecossistema. */
export const ecosystemGraph = {
  core: { label: 'Salesforce Platform', sub: 'Customer 360 · Data 360' },
  branches: [
    { label: 'Engagement', ids: ['sales', 'service', 'marketing', 'commerce', 'revenue', 'field-service', 'experience'] },
    { label: 'Data & Insight', ids: ['data', 'analytics'] },
    { label: 'Connect', ids: ['integration', 'collaboration', 'platform'] },
  ],
} as const;
