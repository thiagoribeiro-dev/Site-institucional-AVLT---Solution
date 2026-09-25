/**
 * DE ONDE VEM NOSSA ARQUITETURA
 *
 * Contas conduzidas pelos sócios ANTES da AVLT - Solution existir.
 *
 * ┌─ POR QUE ISTO NÃO ESTÁ EM "PROJETOS DE SUCESSO" ────────────────────┐
 * │ Estas contas não são clientes da AVLT. São experiência individual   │
 * │ de quem hoje forma a sociedade, trazida de atuações anteriores.     │
 * │ O material de origem (deck "AVLT_Experiencia_Andressa") é explícito │
 * │ nisso, e o site precisa ser também: listar Vibra e Seguros Unimed   │
 * │ junto dos cases da consultoria diria que são clientes dela.         │
 * │                                                                     │
 * │ Por isso a seção tem título próprio, rótulo de atribuição em cada   │
 * │ card e uma nota de rodapé. Se um dia alguma destas contas virar     │
 * │ cliente da AVLT, aí sim ela migra para src/data/projects.ts.        │
 * └─────────────────────────────────────────────────────────────────────┘
 */

export type PriorAccount = {
  id: string;
  client: string;
  /** Natureza da atuação — vira o chip de categoria. */
  role: string;
  /** Quem conduziu a conta e em que contexto. */
  attribution: string;
  /** Quem é o cliente. */
  about: string;
  /** O cenário encontrado. */
  scenario: string;
  /** O que foi conduzido. */
  delivery: string;
  accent: 'primary' | 'secondary' | 'accent';
};

export const priorExperience = {
  eyebrow: 'Experiência',
  title: 'De onde vem nossa arquitetura',
  subtitle:
    'Antes da AVLT existir, os sócios conduziram contas que moldaram o jeito como trabalhamos hoje. Não são clientes da consultoria — é a bagagem que ela herdou.',
  note: 'Contas conduzidas por sócios da AVLT - Solution em atuações anteriores à fundação da consultoria. A AVLT não presta, nem prestou, serviço a estas empresas como firma.',
} as const;

export const priorAccounts: PriorAccount[] = [
  {
    id: 'vibra-energia',
    client: 'Vibra Energia',
    role: 'Liderança multicloud',
    attribution: 'Andressa Chaves · Arquitetura & Negócio',
    about:
      'Distribuidora de combustíveis e energia com operação nacional e várias frentes de Salesforce em paralelo.',
    scenario:
      'Times e nuvens Salesforce avançando ao mesmo tempo, cada frente no seu ritmo e com decisões próprias, sem uma arquitetura que amarrasse o conjunto.',
    delivery:
      'Gestão da conta de ponta a ponta: liderança de múltiplos times e das diferentes nuvens Salesforce, com desenho de arquitetura mantendo todas as frentes sob um mesmo padrão técnico.',
    accent: 'primary',
  },
  {
    id: 'seguros-unimed',
    client: 'Seguros Unimed',
    role: 'CRM sob regulação',
    attribution: 'Andressa Chaves · Arquitetura & Negócio',
    about:
      'Seguradora do sistema Unimed, com operação sujeita às exigências regulatórias da ANS e da SUSEP.',
    scenario:
      'Iniciativas de Salesforce conduzidas dentro de casa, com obrigação regulatória de ANS e SUSEP e pouca ponte entre os times de TI e de negócio.',
    delivery:
      'Liderança técnica das iniciativas internas: levantamento de requisitos, documentação de solução e coordenação entre TI e negócio, com dashboards sustentando a decisão executiva.',
    accent: 'secondary',
  },
];
