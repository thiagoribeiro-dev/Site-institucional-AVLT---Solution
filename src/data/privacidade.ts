/**
 * POLÍTICA DE PRIVACIDADE
 *
 * Texto separado do código, no mesmo padrão do resto de src/data/.
 * Editar aqui atualiza a página /privacidade.
 *
 * ┌─ ANTES DE MEXER ────────────────────────────────────────────────────┐
 * │ Este texto descreve o que o site FAZ de verdade. Se o comportamento │
 * │ mudar — outro destino de formulário, outra ferramenta, outro        │
 * │ operador —, o texto precisa mudar junto, no mesmo commit.           │
 * │                                                                      │
 * │ A revisão semestral da rotina existe exatamente para conferir isso. │
 * │                                                                      │
 * │ NÃO passou por revisão jurídica. Foi redigido a partir do           │
 * │ comportamento técnico do site.                                       │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Decisões registradas no documento de aprovação de 25/09/2026:
 *  · retenção dos dados de contato: 2 meses
 *  · encarregado de dados: Thiago Ribeiro Silva, contato@avlt-solution.com
 *  · analytics: Google Analytics 4, carregado só após consentimento
 */

export const privacidade = {
  atualizadoEm: '25 de setembro de 2026',
  encarregado: {
    nome: 'Thiago Ribeiro Silva',
    email: 'contato@avlt-solution.com',
  },
  /** Em meses. Aparece no texto e governa a rotina de descarte. */
  retencaoMeses: 2,
} as const;

export type SecaoPolitica = {
  id: string;
  titulo: string;
  /** Parágrafos. */
  paragrafos?: string[];
  /** Itens de lista, quando a informação é uma enumeração. */
  itens?: string[];
  /** Tabela rotulada, para dado x finalidade. */
  tabela?: { cabecalho: string[]; linhas: string[][] };
};

export const secoesPolitica: SecaoPolitica[] = [
  {
    id: 'quem-somos',
    titulo: 'Quem trata os seus dados',
    paragrafos: [
      'A AVLT - Solution é a controladora dos dados pessoais coletados neste site. Somos uma consultoria de Salesforce e inteligência artificial, e o site existe para apresentar o nosso trabalho e receber contato de quem quer falar conosco.',
      `Encarregado de dados: ${privacidade.encarregado.nome} — ${privacidade.encarregado.email}. É para este endereço que você escreve para exercer qualquer um dos direitos descritos abaixo.`,
    ],
  },
  {
    id: 'o-que-coletamos',
    titulo: 'O que coletamos, e por quê',
    paragrafos: [
      'O site tem dois formulários. Os dois pedem os mesmos campos, e nenhum deles pede dado além do necessário para responder você.',
    ],
    tabela: {
      cabecalho: ['Dado', 'Obrigatório', 'Para quê'],
      linhas: [
        ['Nome completo', 'sim', 'saber com quem estamos falando'],
        ['Empresa', 'sim', 'entender o contexto antes da primeira conversa'],
        ['E-mail', 'sim', 'responder o seu contato'],
        ['Telefone', 'sim', 'canal alternativo de resposta'],
        ['Descrição', 'não', 'entender o que você precisa antes de responder'],
      ],
    },
  },
  {
    id: 'para-onde-vai',
    titulo: 'Para onde os dados vão',
    paragrafos: [
      'Depende do formulário que você usou, e vale saber a diferença.',
      'O formulário "Seja nosso cliente" cria um registro de contato comercial na nossa própria instância de Salesforce. Nenhum e-mail sai do site nesse caminho.',
      'O formulário "SAC" gera um e-mail para a nossa caixa de atendimento. O e-mail é transmitido pelo Resend, serviço de envio que usamos para isso.',
      'Em nenhum dos dois casos os seus dados são vendidos, cedidos ou usados para publicidade.',
    ],
  },
  {
    id: 'operadores',
    titulo: 'Quem mais tem acesso',
    paragrafos: [
      'Para o site funcionar, alguns serviços processam dados em nosso nome. Cada um trata apenas o necessário para a sua função:',
    ],
    itens: [
      'Vercel — hospedagem do site. Registra dados técnicos de acesso, como endereço IP e navegador, para operar e proteger o serviço.',
      'Salesforce — sistema onde o contato comercial fica registrado.',
      'Resend — transmissão do e-mail do formulário de SAC.',
      'Google Analytics 4 — medição de audiência, e somente se você aceitar os cookies. Sem o seu aceite, ele não é carregado.',
    ],
  },
  {
    id: 'quanto-tempo',
    titulo: 'Por quanto tempo guardamos',
    paragrafos: [
      `Os dados enviados pelos formulários são mantidos por ${privacidade.retencaoMeses} meses a partir do recebimento, e depois descartados — salvo se, nesse período, a conversa evoluir para uma relação comercial, caso em que passam a seguir o prazo do contrato e as obrigações legais que dele decorrem.`,
      'Se você pedir a exclusão antes desse prazo, apagamos assim que recebermos o pedido.',
    ],
  },
  {
    id: 'cookies',
    titulo: 'Cookies',
    paragrafos: [
      'O site não usa nenhum cookie para funcionar. Navegar, ler e enviar os formulários não depende de cookie algum.',
      'Cookies só entram se você aceitar o aviso que aparece na primeira visita, e servem exclusivamente para medição de audiência pelo Google Analytics 4 — quantas pessoas chegam, por quais páginas passam e de onde vieram.',
      'Se você recusar, nada é carregado e nenhum cookie é gravado. Se aceitar e mudar de ideia, pode revogar a qualquer momento pelo link no rodapé do site, e os cookies deixam de ser usados.',
    ],
  },
  {
    id: 'seus-direitos',
    titulo: 'Os seus direitos',
    paragrafos: [
      'A Lei Geral de Proteção de Dados garante que você possa, a qualquer momento:',
    ],
    itens: [
      'confirmar se tratamos dados seus, e acessá-los',
      'corrigir dado incompleto, inexato ou desatualizado',
      'pedir anonimização, bloqueio ou eliminação de dado desnecessário ou excessivo',
      'pedir a portabilidade dos dados a outro fornecedor',
      'pedir a eliminação dos dados tratados com base no seu consentimento',
      'saber com quem compartilhamos os seus dados',
      'revogar o consentimento',
    ],
  },
  {
    id: 'como-exercer',
    titulo: 'Como exercer',
    paragrafos: [
      `Escreva para ${privacidade.encarregado.email} dizendo o que você quer. Respondemos em até 15 dias.`,
      'Não cobramos nada por isso, e você não precisa justificar o pedido.',
    ],
  },
  {
    id: 'mudancas',
    titulo: 'Mudanças nesta política',
    paragrafos: [
      `Esta versão é de ${privacidade.atualizadoEm}. Quando o site mudar o que faz com dados pessoais, esta página muda junto, e a data acima é atualizada.`,
    ],
  },
];
