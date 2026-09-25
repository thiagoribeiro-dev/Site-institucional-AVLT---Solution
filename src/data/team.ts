/**
 * Liderança e narrativa institucional.
 * Fonte: deck "Institucional AVLT - Solution.pptx".
 */

export const about = {
  origin: {
    title: 'Nascemos de um encontro em projeto',
    paragraphs: [
      'Quatro especialistas que passaram por grandes consultorias e entregas enterprise — Everymind, everis/NTT DATA, OSF Digital, WeeNow — e que, depois de anos construindo para os outros, decidiram construir juntos.',
      'São mais de 25 anos somados de ecossistema Salesforce, distribuídos em quatro frentes que raramente moram na mesma casa: arquitetura de solução, governança de plataforma, engenharia de software e inteligência artificial aplicada a CRM.',
      'Trabalhamos como consultoria boutique por escolha. Time pequeno, sênior e acessível: quem vende é quem entrega.',
    ],
  },
  specialty: {
    title: 'O projeto que já existe e não vai bem.',
    paragraphs: [
      'Org que cresceu sem governança. Automação empilhada sobre automação, até ninguém saber mais o que dispara o quê. Customização onde bastava configuração. Metadado sem rastro e sem quem responda por ele.',
      'Nada disso é acidente: é o resultado previsível de entregar rápido sem ninguém cuidando do conjunto.',
      'Entramos nesses projetos com duas coisas: a experiência de quem já desfez esse nó antes e análise avançada com IA sobre o metadado da org — que varre em horas o que levaria semanas à mão.',
      'Separamos o que sustenta do que atrapalha e reorganizamos a plataforma sobre boas práticas, com governança que sobrevive à próxima equipe.',
    ],
  },
} as const;

export const team = [
  {
    name: 'Andressa Chaves',
    role: 'Arquitetura & Negócio',
    bio: 'Arquiteta Salesforce, 4x certificada e Trailhead Ranger. Sales, Service, Community, CPQ e Agentforce. Liderou squads em projetos enterprise.',
    tags: ['Sales', 'Service', 'CPQ', 'Agentforce'],
  },
  {
    name: 'Leandro Palma',
    role: 'Governança & DevOps',
    bio: 'Solution Architect com 9+ anos de plataforma. Escreveu o primeiro Governance Handbook da WeeNow: padrão de API, metadado e Git.',
    tags: ['Governança', 'DevOps', 'APIs', 'Metadado'],
  },
  {
    name: 'Thiago Ribeiro Silva',
    role: 'IA aplicada a CRM',
    bio: 'Fundador da TRS Tech Solutions. Einstein e Agentforce em vendas e atendimento. Apex, LWC e integrações. Pós em IA no IBMEC.',
    tags: ['Agentforce', 'Einstein', 'Apex', 'LWC'],
  },
  {
    name: 'Victor Cavalcante',
    role: 'Arquitetura Técnica',
    bio: 'Salesforce Architect & Senior Developer. Sharing & Visibility Architect. REST APIs, Platform Events e AWS. 4 anos de OSF Digital.',
    tags: ['Sharing & Visibility', 'REST', 'Platform Events', 'AWS'],
  },
] as const;

export const teamNote =
  'Quatro pessoas, quatro especialidades, zero sobreposição. Somos as cabeças da operação. Por trás, um time de consultores dedicados e a parceria com a Corporação Salesforce, empresa do grupo do Victor Cavalcante.';

/** Linha do tempo da página Sobre. */
export const timeline = [
  { label: 'Experiência', detail: 'Everymind, everis/NTT DATA, OSF Digital, WeeNow — entregas enterprise antes da AVLT.' },
  { label: 'Salesforce', detail: 'Sales, Service, Marketing, Experience, CPQ e Field Service em produção.' },
  { label: 'Arquitetura', detail: 'Desenho antes de configuração. Decisão registrada, não improvisada.' },
  { label: 'Integração', detail: 'REST, SOAP, middleware, Platform Events e ecossistema ERP.' },
  { label: 'Dados', detail: 'Modelo de dados, harmonização e Data 360 como base do que vem depois.' },
  { label: 'Inteligência Artificial', detail: 'Agentforce e Einstein em processos reais de vendas e atendimento.' },
  { label: 'Próxima geração', detail: 'Agentes, RAG e IA aberta dentro do CRM, com custo e governança à vista.' },
] as const;

/** Sinais de diagnóstico — seção "sua org precisa de nós". */
export const diagnosticSignals = [
  { title: 'Ninguém sabe o que dispara o quê', detail: 'Salvar um registro virou caixa-preta.' },
  { title: 'Toda entrega demora mais que a anterior', detail: 'A dívida técnica cobra juros.' },
  { title: 'Três automações fazem quase a mesma coisa', detail: 'E ninguém desliga nenhuma, com medo.' },
  { title: 'Metadado sem versionamento', detail: 'Voltar atrás significa refazer à mão.' },
  { title: 'A org bate em limite em produção', detail: 'O desenho nunca previu o segundo ano.' },
  { title: 'Apex onde o nativo já resolvia', detail: 'Custo de manutenção sem contrapartida.' },
] as const;

/** Diferenciais — seção "por que nós". */
export const differentials = [
  { n: '01', title: 'Menos retrabalho', detail: 'Desenho antes de configuração. O que entra na plataforma foi decidido, não improvisado.' },
  { n: '02', title: 'Rastro', detail: 'Metadado versionado e nomenclatura padronizada. Você sabe quem mudou o quê — e consegue voltar atrás.' },
  { n: '03', title: 'Escala sem dívida', detail: 'Arquitetura pensada para o segundo ano, não só para o go-live.' },
  { n: '04', title: 'IA que entra em produção', detail: 'Não é piloto de Agentforce para apresentação. É atendimento respondendo de verdade.' },
] as const;
