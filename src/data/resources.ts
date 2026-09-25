/**
 * MATERIAL DE APOIO — biblioteca técnica.
 *
 * COMO ADICIONAR UM MATERIAL
 * 1. Copie um bloco e ajuste `id`, `title`, `excerpt`, `category` e `type`.
 * 2. `href` aceita link externo (documentação oficial) ou uma rota interna.
 *    Material ainda não publicado fica com `href: null` e aparece como
 *    "Em breve" — sem link quebrado e sem prometer o que não existe.
 * 3. As categorias abaixo alimentam os filtros da página automaticamente.
 */

export type ResourceCategory = 'salesforce' | 'ia' | 'arquitetura';
export type ResourceType = 'Artigo' | 'Guia' | 'Whitepaper' | 'Documentação' | 'Vídeo' | 'Material técnico';

export type Resource = {
  id: string;
  title: string;
  excerpt: string;
  category: ResourceCategory;
  topic: string;
  type: ResourceType;
  href: string | null;
  source?: string;
};

export const resourceCategories: { id: ResourceCategory | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'salesforce', label: 'Salesforce' },
  { id: 'ia', label: 'Inteligência Artificial' },
  { id: 'arquitetura', label: 'Arquitetura' },
];

export const resources: Resource[] = [
  // ---------- SALESFORCE ----------
  {
    id: 'sf-well-architected',
    title: 'Salesforce Well-Architected',
    excerpt:
      'O framework oficial de referência para decidir entre configuração e customização, e para justificar arquitetura na frente do negócio.',
    category: 'salesforce',
    topic: 'Arquitetura',
    type: 'Documentação',
    href: 'https://architect.salesforce.com/well-architected/overview',
    source: 'Salesforce Architects',
  },
  {
    id: 'sf-developers',
    title: 'Apex Developer Guide',
    excerpt:
      'Referência de linguagem, limites de governador, testes e padrões assíncronos. A base para não escrever Apex onde o nativo resolvia.',
    category: 'salesforce',
    topic: 'Development',
    type: 'Documentação',
    href: 'https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/',
    source: 'Salesforce Developers',
  },
  {
    id: 'sf-lwc',
    title: 'Lightning Web Components',
    excerpt:
      'Guia de componentes modernos na plataforma: ciclo de vida, wire adapters, eventos e integração com Apex.',
    category: 'salesforce',
    topic: 'Development',
    type: 'Documentação',
    href: 'https://developer.salesforce.com/docs/platform/lwc/guide',
    source: 'Salesforce Developers',
  },
  {
    id: 'sf-release-notes',
    title: 'Release Notes da plataforma',
    excerpt:
      'Três releases por ano mudam comportamento de produção. Ler antes, não depois, é parte de governança.',
    category: 'salesforce',
    topic: 'Admin',
    type: 'Documentação',
    href: 'https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&type=5',
    source: 'Salesforce Help',
  },
  {
    id: 'avlt-diagnostico',
    title: 'Checklist de diagnóstico de org',
    excerpt:
      'Os seis sinais de que a org precisa de reorganização: automação empilhada, metadado sem rastro, limites em produção e o resto.',
    category: 'salesforce',
    topic: 'Governança',
    type: 'Guia',
    href: null,
  },
  {
    id: 'avlt-governanca',
    title: 'Governance Handbook — estrutura mínima',
    excerpt:
      'Padrão de nomenclatura, versionamento de metadado, política de API e quem responde por cada domínio da plataforma.',
    category: 'salesforce',
    topic: 'Governança',
    type: 'Whitepaper',
    href: null,
  },
  {
    id: 'sf-data-360',
    title: 'Data 360',
    excerpt:
      'Como a Salesforce organiza ingestão, harmonização e ativação de dado — e por que agente de IA sem isso não sustenta produção.',
    category: 'salesforce',
    topic: 'Data',
    type: 'Documentação',
    href: 'https://www.salesforce.com/br/products/',
    source: 'Salesforce',
  },

  // ---------- INTELIGÊNCIA ARTIFICIAL ----------
  {
    id: 'agentforce-oficial',
    title: 'Agentforce — plataforma de agentes',
    excerpt:
      'Agent Builder, Agent Script, Agentforce Voice, Observability, suporte a MCP, orquestração multiagente e o Atlas Reasoning Engine.',
    category: 'ia',
    topic: 'Agents',
    type: 'Documentação',
    href: 'https://www.salesforce.com/br/agentforce/',
    source: 'Salesforce',
  },
  {
    id: 'agentforce-testing',
    title: 'Testar um agente antes de produção',
    excerpt:
      'Roteiro de testes com casos reais, validação no Testing Center e o que medir: contenção, escalonamento e custo por interação.',
    category: 'ia',
    topic: 'Agents',
    type: 'Guia',
    href: null,
  },
  {
    id: 'rag-crm',
    title: 'RAG aplicado a CRM',
    excerpt:
      'Grounding em base de conhecimento, registros e Data 360. Quando recuperar contexto resolve e quando o problema é o dado, não o modelo.',
    category: 'ia',
    topic: 'RAG',
    type: 'Artigo',
    href: null,
  },
  {
    id: 'guardrails',
    title: 'Guardrails e dado sensível',
    excerpt:
      'Política de uso, mascaramento antes do envio ao modelo, limite de consumo e medição de custo por chamada e por usuário.',
    category: 'ia',
    topic: 'Engenharia de IA',
    type: 'Whitepaper',
    href: null,
  },
  {
    id: 'prompt-metadado',
    title: 'Prompts versionados em metadado',
    excerpt:
      'Por que prompt espalhado no código vira dívida: versionamento, auditoria e troca de texto sem deploy de classe.',
    category: 'ia',
    topic: 'Engenharia de IA',
    type: 'Artigo',
    href: null,
  },
  {
    id: 'ia-aberta-crm',
    title: 'IA aberta dentro do CRM',
    excerpt:
      'Integrar o modelo que você escolher via Named Credentials, External Services e Apex REST — com custo visível e chamada assíncrona.',
    category: 'ia',
    topic: 'Automação',
    type: 'Material técnico',
    href: null,
  },

  // ---------- ARQUITETURA ----------
  {
    id: 'api-first',
    title: 'Padrões de integração Salesforce',
    excerpt:
      'REST, SOAP, Platform Events, Change Data Capture e middleware: qual padrão para qual latência e qual volume.',
    category: 'arquitetura',
    topic: 'APIs',
    type: 'Guia',
    href: null,
  },
  {
    id: 'mulesoft',
    title: 'MuleSoft — orquestração e APIs',
    excerpt:
      'Catálogo de APIs, governança e conectores para ERP e legado. O que fica no middleware e o que fica na plataforma.',
    category: 'arquitetura',
    topic: 'Integration',
    type: 'Documentação',
    href: 'https://www.salesforce.com/br/products/',
    source: 'Salesforce',
  },
  {
    id: 'limites',
    title: 'Limites de plataforma e performance',
    excerpt:
      'SOQL, CPU time, DML, storage e chamadas de API. Onde a org encosta no teto e o que fazer antes de encostar.',
    category: 'arquitetura',
    topic: 'Cloud',
    type: 'Guia',
    href: null,
  },
  {
    id: 'sharing',
    title: 'Sharing & Visibility na prática',
    excerpt:
      'OWD, perfis, permission sets, sharing rules e exposição de campo sensível — o desenho que evita reescrita no segundo ano.',
    category: 'arquitetura',
    topic: 'Data',
    type: 'Whitepaper',
    href: null,
  },
  {
    id: 'devops',
    title: 'Versionamento de metadado e DevOps',
    excerpt:
      'Git desde o primeiro dia, DevOps Center, ambientes e o caminho de volta quando a entrega dá errado.',
    category: 'arquitetura',
    topic: 'Cloud',
    type: 'Guia',
    href: null,
  },
];
