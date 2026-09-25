/**
 * Dados institucionais da AVLT - Solution.
 * Fonte: "Institucional AVLT - Solution.pptx" e "Manual de Identidade Visual".
 * Edite aqui para atualizar contato, mensagens e indicadores em todo o site.
 */

export const site = {
  name: 'AVLT - Solution',
  shortName: 'AVLT',
  tagline: 'Salesforce & AI Experts',
  url: 'https://www.avltsolution.tech',
  email: 'administrador@avlt-solution.com',
  phone: '(11) 97125-3393',
  phoneHref: '+5511971253393',
  instagram: 'https://www.instagram.com/avltsolutions',
  instagramHandle: '@avltsolutions',
  description:
    'Consultoria especializada em Salesforce e Inteligência Artificial. Arquitetura, governança, engenharia e IA para implantar, evoluir e reorganizar a sua plataforma — do diagnóstico à sustentação.',
} as const;

export const hero = {
  eyebrow: 'Consultoria Salesforce & Inteligência Artificial',
  headline: 'Transformamos tecnologia em resultados.',
  subheadline:
    'Especialistas em Salesforce, Inteligência Artificial, dados, integração e automação para transformar operações complexas em experiências inteligentes.',
  primaryCta: { label: 'Conheça nossos projetos', href: '/projetos' },
  secondaryCta: { label: 'Fale com um especialista', href: '/#contato' },
} as const;

/**
 * Indicadores de experiência.
 * Todos os números vêm do deck institucional — não adicione valores
 * que não estejam documentado em material oficial da AVLT.
 */
export const stats = [
  {
    value: 25,
    prefix: '+',
    suffix: '',
    label: 'anos somados',
    detail: 'de ecossistema Salesforce entre os quatro sócios',
  },
  {
    value: 8,
    prefix: '',
    suffix: '',
    label: 'certificações Salesforce',
    detail: 'no time, entre arquitetura, administração e desenvolvimento',
  },
  {
    value: 4,
    prefix: '',
    suffix: '',
    label: 'frentes de especialidade',
    detail: 'arquitetura, governança, engenharia e IA aplicada a CRM',
  },
  {
    value: null,
    prefix: '',
    suffix: '',
    display: 'Agentforce',
    label: 'IA em produção',
    detail: 'agentes que atendem de verdade, não piloto de apresentação',
  },
] as const;

/** Menu principal — a ordem aqui é a ordem do header e do footer. */
export const navigation = [
  { label: 'Principal', href: '/' },
  { label: 'Projetos de Sucesso', href: '/projetos' },
  { label: 'Material de Apoio', href: '/materiais' },
  { label: 'Sobre', href: '/sobre' },
] as const;

export const finalCta = {
  headline:
    'Vamos transformar seu próximo desafio em uma solução inteligente?',
  body: 'A plataforma quase nunca é o problema. O jeito como ela foi construída, quase sempre. Vamos olhar a sua org.',
  cta: 'Falar com um especialista',
} as const;
