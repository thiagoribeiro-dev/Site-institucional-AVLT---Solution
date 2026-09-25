/**
 * DE ONDE VEM NOSSA ARQUITETURA
 *
 * Contas conduzidas pelos sócios ANTES da AVLT - Solution existir.
 *
 * ┌─ POR QUE ISTO NÃO ESTÁ EM "PROJETOS DE SUCESSO" ────────────────────┐
 * │ Estas contas não são clientes da AVLT. São experiência individual   │
 * │ de quem hoje forma a sociedade, trazida de atuações anteriores.     │
 * │ O site precisa deixar isso explícito: listar estas empresas junto   │
 * │ dos cases da consultoria diria que são clientes dela.               │
 * │                                                                     │
 * │ Por isso a seção tem título próprio, os cards são agrupados por     │
 * │ sócio, cada um carrega o rótulo de atribuição e há nota de rodapé.  │
 * │ Se um dia alguma destas contas virar cliente da AVLT, aí sim ela    │
 * │ migra para src/data/projects.ts.                                    │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * ┌─ DE ONDE SAIU CADA TEXTO ───────────────────────────────────────────┐
 * │ Andressa · deck "AVLT_Experiencia_Andressa".                        │
 * │ Thiago   · material de projeto das pastas Clientes/Everymind e      │
 * │            Clientes/WeeHub (documentações técnicas e funcionais,    │
 * │            assessments, especificações de integração, planos de     │
 * │            cutover e notas de refinamento).                         │
 * │                                                                     │
 * │ Nada aqui é inferido. Não acrescente resultado, número, prazo ou    │
 * │ economia que não esteja escrito no material de origem — e mantenha  │
 * │ fora credencial, endpoint, volume de base e qualquer dado que       │
 * │ pertença ao cliente e não à descrição do trabalho.                  │
 * └─────────────────────────────────────────────────────────────────────┘
 */

export type Partner = {
  id: string;
  /** Nome do sócio, usado como cabeçalho do grupo. */
  name: string;
  /** Linha de atribuição repetida em cada card do grupo. */
  attribution: string;
  /** Onde estas contas foram conduzidas. */
  context: string;
};

export type PriorAccount = {
  id: string;
  client: string;
  /** Natureza da atuação — vira o chip de categoria. */
  role: string;
  /** A qual sócio esta conta pertence. */
  partnerId: Partner['id'];
  /**
   * Quem é o cliente. OPCIONAL de propósito: os cards do Thiago exibem
   * apenas Cenário e Entrega, por decisão do cliente deste site.
   */
  about?: string;
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

export const partners: Partner[] = [
  {
    id: 'andressa',
    name: 'Andressa Chaves',
    attribution: 'Andressa Chaves · Arquitetura & Negócio',
    context: 'Arquitetura e negócio',
  },
  {
    id: 'thiago',
    name: 'Thiago Ribeiro Silva',
    attribution: 'Thiago Ribeiro Silva · Arquitetura e Liderança técnica',
    context: 'Arquitetura e liderança técnica',
  },
];

export const priorAccounts: PriorAccount[] = [
  /* ── Andressa Chaves ─────────────────────────────────────────────── */
  {
    id: 'vibra-energia',
    client: 'Vibra Energia',
    role: 'Liderança multicloud',
    partnerId: 'andressa',
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
    partnerId: 'andressa',
    about:
      'Seguradora do sistema Unimed, com operação sujeita às exigências regulatórias da ANS e da SUSEP.',
    scenario:
      'Iniciativas de Salesforce conduzidas dentro de casa, com obrigação regulatória de ANS e SUSEP e pouca ponte entre os times de TI e de negócio.',
    delivery:
      'Liderança técnica das iniciativas internas: levantamento de requisitos, documentação de solução e coordenação entre TI e negócio, com dashboards sustentando a decisão executiva.',
    accent: 'secondary',
  },

  /* ── Thiago Ribeiro Silva ────────────────────────────────────────── */
  {
    id: 'unisanta',
    client: 'Unisanta',
    role: 'Implantação em educação',
    partnerId: 'thiago',
    scenario:
      'Instituição de ensino com o cadastro acadêmico no TOTVS RM e a captação chegando pelo site, sem visão única do aluno: o mesmo aluno aparecia mais de uma vez e o atendimento não tinha um lugar só para olhar.',
    delivery:
      'Implantação do Salesforce integrada ao TOTVS RM, com API REST de captação de leads do site autenticada por OAuth 2.0 client credentials, mensageria de WhatsApp por Omni-Channel com redistribuição round-robin das sessões em espera, e a condução das cargas de contas, documentos e pagamentos até a homologação.',
    accent: 'primary',
  },
  {
    id: 'francal',
    client: 'Francal',
    role: 'Portal Experience Cloud',
    partnerId: 'thiago',
    scenario:
      'Grupo de feiras e eventos atendendo expositores por canais dispersos, com contrato, financeiro, entregáveis e base de conhecimento cada um em um lugar diferente.',
    delivery:
      'Portal do Expositor em Experience Cloud: componentes LWC de contrato, financeiro, entregáveis, chamados e marketplace; central de conhecimento organizada em trilhas sobre Knowledge; integração REST com o TOTVS RM para financeiro e estoque; captação por Web-to-Lead; e o cutover de onboarding e conhecimento.',
    accent: 'secondary',
  },
  {
    id: 'jamef',
    client: 'Jamef',
    role: 'Revitalização de org',
    partnerId: 'thiago',
    scenario:
      'Transportadora com o Salesforce já em uso, mas com o funil de prospecção desgovernado: status de conta avançando fora de ordem e regras que não seguravam o processo.',
    delivery:
      'Revitalização da org: redesenho do fluxo de status da conta, da prospecção ao fechamento, com triggers, batches, flows e regras de validação; correção das oportunidades; cobertura de classes em pré-produção; e plano de cutover conduzido até o go-live.',
    accent: 'accent',
  },
  {
    id: 'real-grandeza',
    client: 'Real Grandeza',
    role: 'Sales + Service',
    partnerId: 'thiago',
    scenario:
      'Fundação de previdência atendendo B2B e B2C no mesmo time, sem separação de carteira nem papéis definidos — todo mundo enxergando tudo.',
    delivery:
      'Implantação de Sales Cloud e Service Cloud com conceito de carteira por vendedor, papéis e permissões separados entre vendas e back office, abertura de atendimento por Web-to-Case e pacote de deploy validado em UAT.',
    accent: 'primary',
  },
  {
    id: 'rodonaves',
    client: 'Rodonaves',
    role: 'Homologação',
    partnerId: 'thiago',
    scenario:
      'Transportadora com a implantação em curso e um ciclo de homologação a fechar antes de liberar o ambiente para o uso do time.',
    delivery:
      'Condução da homologação e dos ajustes apontados pelo cliente, acompanhando o retorno de cada ponto até o aceite.',
    accent: 'secondary',
  },
  {
    id: 'vtal',
    client: 'V.tal',
    role: 'Field Service em release',
    partnerId: 'thiago',
    scenario:
      'Operadora de infraestrutura de fibra com o Field Service em evolução contínua, várias squads entregando no mesmo trem de release e cada subida sujeita a janela e aprovação formal.',
    delivery:
      'Condução das frentes de Field Service por sprint — abertura de user stories, pacotes de deploy, work items e CRQ de release —, com MOP escrito por oferta, plano de suporte e defesa de bugs junto ao time de qualidade.',
    accent: 'accent',
  },
  {
    id: 'iob',
    client: 'IOB',
    role: 'Arquitetura de dados',
    partnerId: 'thiago',
    scenario:
      'Editora de conteúdo fiscal e tributário levando a venda para o Salesforce, com produtos contratados, credenciais de acesso e vigências controlados fora da plataforma e uma base legada cheia de duplicidade.',
    delivery:
      'Desenho da arquitetura de dados do prospect ao pedido no padrão da plataforma, com dois objetos customizados — Produtos Cliente e Credenciais — carregando status de ativação, quantidade contratada e vigência, mais a integração com o SAP Business One e o modelo de comissionamento.',
    accent: 'primary',
  },
  {
    id: 'db-diagnosticos',
    client: 'DB Diagnósticos',
    role: 'Integração e pricing',
    partnerId: 'thiago',
    scenario:
      'Rede de medicina diagnóstica com a tabela de preços contratados vivendo fora do Salesforce: o que era negociado com o cliente não chegava à cotação.',
    delivery:
      'Integração Salesforce ↔ Heroku replicando preço contratado e vigência por cliente e por exame direto na cotação, com alçadas de aprovação desenhadas e acompanhamento de analytics a cada sprint review.',
    accent: 'secondary',
  },
  {
    id: 'copa',
    client: 'COPA',
    role: 'Pricing e aprovações',
    partnerId: 'thiago',
    scenario:
      'Área comercial negociando sem margem-alvo calculada por estado, produto e tipo de negócio, com aprovação de limite de crédito decidida caso a caso e nenhum aviso quando a margem ficava negativa.',
    delivery:
      'Motor de pricing no Salesforce buscando a margem-alvo por UF, tipo de produto e tipo de negócio no produto negociado, alerta de margem negativa, fluxos distintos de aprovação para oportunidade e renegociação, aprovação de pricing em massa e histórico de preço filtrável — evoluído em sprints e sustentado em AMS.',
    accent: 'accent',
  },
  {
    id: 'voke',
    client: 'Voke',
    role: 'B2B e pós-venda',
    partnerId: 'thiago',
    scenario:
      'Contestação de nota fiscal circulando entre gestão de clientes, cobrança e comercial por fora do sistema, sem SLA visível e sem registro de onde cada tratativa parou.',
    delivery:
      'Processo de contestação dentro do Salesforce — categorização, tratativas por área com SLA, resposta ao cliente, validação dos itens contestados, desconto retroativo, pesquisa de satisfação e acompanhamento por alertas e dashboards —, além das etapas do funil B2B, consulta e reserva de estoque e integração com o DocuSign.',
    accent: 'primary',
  },
  {
    id: 'wellhub',
    client: 'Wellhub (Gympass)',
    role: 'Sales Engagement',
    partnerId: 'thiago',
    scenario:
      'Time comercial fazendo prospecção e follow-up na mão, com o discador de um lado e o CRM do outro, sem rastro das interações por conta.',
    delivery:
      'Prova de conceito de Sales Engagement com cadências de inbound e outbound, distribuição de trabalho por Omni-Channel, orquestração em Flow e integração com o Talkdesk para discagem e retorno da chamada — com os critérios de sucesso do piloto validados junto ao cliente.',
    accent: 'secondary',
  },
  {
    id: 'elea',
    client: 'Elea',
    role: 'CPQ e pedidos',
    partnerId: 'thiago',
    scenario:
      'Venda de serviço recorrente com a proposta montada fora do CRM: quantidade, preço e imposto recalculados na mão, e o pedido digitado de novo no sistema de gestão.',
    delivery:
      'Salesforce CPQ customizado para o modelo de cobrança do cliente, com carga de produtos e livro de preços, simulação de impostos na quote line, tratamento de churn, upgrade e downgrade, modelos de proposta para aprovação comercial e barramento de integração dos pedidos.',
    accent: 'accent',
  },
  {
    id: 'unimed-serra-gaucha',
    client: 'Unimed Serra Gaúcha',
    role: 'Assessment de atendimento',
    partnerId: 'thiago',
    scenario:
      'Operadora de saúde atendendo o beneficiário por telefone, presencial, e-mail, chat, WhatsApp, portal e aplicativo, em ferramentas distintas e sem SLA nem indicador comum entre os canais.',
    delivery:
      'Assessment do atendimento ao beneficiário: mapeamento dos canais e dos tipos de atendimento, jornada por persona, governança e indicadores, desenho de arquitetura em Service Cloud e Health Cloud com dados e integrações, e roadmap de implantação sob as exigências de ANS e LGPD.',
    accent: 'primary',
  },
  {
    id: 'jem-systems',
    client: 'Jem Systems',
    role: 'IA em atendimento de voz',
    partnerId: 'thiago',
    scenario:
      'Time de vendas usando telefonia por fora do CRM, sem gravação acessível no registro nem leitura do que de fato acontecia nas ligações.',
    delivery:
      'Integração do CTI 8x8 ao Salesforce com Einstein Conversation Insights: chamada gravada e player dentro do próprio registro, transcrição da conversa e as automações de tarefa e oportunidade em volta dela.',
    accent: 'secondary',
  },
  {
    id: 'cpfl',
    client: 'CPFL',
    role: 'Bot da agência virtual',
    partnerId: 'thiago',
    scenario:
      'Agência virtual atendendo por bot com serviços que precisavam sair do ar e uma validação de CPF que não fazia sentido para o público atendido, travando o fluxo de conversa.',
    delivery:
      'Especificação da API consumida pelo bot — autenticação, token de sessão com validade e lista de serviços disponíveis — e a limpeza do bot e das classes: remoção das chamadas de serviço descontinuadas e da validação de CPF, com as classes de teste ajustadas para não quebrar o ambiente.',
    accent: 'accent',
  },
];

/** Contas de um sócio, na ordem em que foram declaradas acima. */
export function accountsOf(partnerId: Partner['id']): PriorAccount[] {
  return priorAccounts.filter((conta) => conta.partnerId === partnerId);
}
