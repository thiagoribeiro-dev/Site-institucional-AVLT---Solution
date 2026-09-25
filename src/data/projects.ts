/**
 * PROJETOS DE SUCESSO
 *
 * Regra de ouro: nada aqui é inventado. Todo dado vem de material
 * documentado da AVLT (deck institucional, review de desenvolvimento
 * Droz/Reclame Aqui, documentação técnica Nucleus).
 *
 * O que NÃO entra nesta página, por decisão de apresentação:
 *  · arquitetura detalhada e desenho de solução do cliente;
 *  · números de resultado, esforço e métricas de operação.
 * O portfólio mostra o contexto, o desafio e o domínio técnico —
 * o detalhe fica para a conversa comercial.
 *
 * COMO ADICIONAR UM PROJETO
 * 1. Copie o bloco abaixo e troque o `slug` por um identificador único.
 * 2. Preencha somente o que estiver documentado.
 * 3. Se o cliente não autorizou divulgação, use
 *    `client: 'Projeto Enterprise — Confidencial'` e `confidential: true`.
 */

export type Project = {
  slug: string;
  client: string;
  confidential?: boolean;
  title: string;
  /** Domínio do projeto — vira o chip de categoria no card. */
  category: string;
  /** Uma ou duas frases de capa. */
  summary: string;
  /** Contexto do cliente: setor, porte, cenário de operação. */
  context: string;
  /** O problema real, antes da solução. */
  challenge: string;
  /** Stack e competências envolvidas. */
  technologies: string[];
};

export const projects: Project[] = [
  {
    slug: 'droz-reclame-aqui',
    client: 'Syntrika · Plataforma Droz',
    title: 'Reclame Aqui dentro do Service Cloud',
    category: 'Integração · Service Cloud',
    summary:
      'Conector que traz a reclamação para dentro do Salesforce como Caso. Todo o atendimento — conversa pública, privada, moderação e avaliação — acontece na tela do Caso, sem troca de sistema.',
    context:
      'Operação de atendimento que responde reclamações públicas do Reclame Aqui, com exigência de rastreabilidade por registro e governança sobre quem fala em nome da empresa.',
    challenge:
      'A operação atendia reclamações fora do CRM. O agente copiava dado de um sistema para outro, a conversa não ficava registrada no Caso e não havia como provar quem publicou o quê em nome da empresa. Reclamação não virava dado de CRM: nota, comentário e histórico ficavam de fora dos relatórios do Service Cloud.',
    technologies: [
      'Salesforce Service Cloud',
      'Apex',
      'Lightning Web Components',
      'REST API',
      'GraphQL',
      'Platform Events',
      'OAuth2 Client Credentials',
      'Named Credentials',
      'Chatter',
    ],
  },
  {
    slug: 'agentforce-zendesk',
    client: 'Agentforce × Zendesk',
    title: 'IA no atendimento omnichannel',
    category: 'Agentforce · Integração',
    summary:
      'Agente de IA resolvendo o que é simples e passando para o humano o que exige gente, sem tirar a operação da ferramenta que ela já usa.',
    context:
      'Operação de atendimento com chat, telefone e WhatsApp concentrados no Zendesk, sem nenhuma automação por IA.',
    challenge:
      'Atendimento inteiramente manual e o cliente perdendo contexto ao mudar de canal no meio da jornada. A operação já vivia no Zendesk — trocar de ferramenta não era opção, então a IA precisava entrar sem quebrar o que já funcionava.',
    technologies: [
      'Agentforce',
      'Digital Engagement',
      'WhatsApp',
      'Apex',
      'Middleware de integração',
      'Zendesk',
    ],
  },
];
