/**
 * Configuração dos formulários de contato.
 *
 * ┌─ CADA CANAL ENTREGA NUM LUGAR ───────────────────────────────────────┐
 * │ "Seja nosso cliente" → Web-to-Lead: o contato nasce como Lead na     │
 * │   org Salesforce da AVLT. Quem avisa a equipe por e-mail é a própria │
 * │   org (regra de resposta automática, alerta de fluxo ou regra de     │
 * │   atribuição) — o site não manda e-mail nenhum nesse canal.          │
 * │                                                                       │
 * │ "SAC" → a função própria do projeto (src/app/api/contato/route.ts),  │
 * │   que revalida no servidor e envia por e-mail pelo Resend.           │
 * │                                                                       │
 * │ Os dois formulários são o MESMO componente, com os mesmos campos,    │
 * │ máscaras, validação e tela de sucesso. Muda só o destino.            │
 * │                                                                       │
 * │ Ver src/lib/webToLead.ts para o que o envio ao Salesforce consegue e │
 * │ o que não consegue confirmar.                                        │
 * └───────────────────────────────────────────────────────────────────────┘
 */

import type { ConfigWebToLead } from '@/lib/webToLead';

export type FormKind = 'comercial' | 'sac';

/** Para onde vão os dados deste canal. */
export type Entrega =
  | { tipo: 'webToLead'; salesforce: ConfigWebToLead }
  | { tipo: 'email' };

export type FormConfig = {
  id: FormKind;
  /** Rótulo da aba. */
  tab: string;
  title: string;
  subtitle: string;
  /**
   * Caixa mostrada como alternativa ("prefere escrever direto?") e usada no
   * fallback de mailto. No canal de Web-to-Lead ela NÃO recebe o formulário.
   */
  destino: string;
  /** Assunto do e-mail gerado — só no canal de e-mail. */
  assunto: string;
  /** Texto de ajuda do campo de descrição. */
  descricaoLabel: string;
  descricaoHint: string;
  /** Texto do botão. */
  cta: string;
  /** Mensagem de sucesso. */
  sucesso: string;
  accent: 'secondary' | 'primary';
  entrega: Entrega;
};

/**
 * Endpoint de envio em segundo plano.
 * Vazio = abre o cliente de e-mail do visitante (ver bloco acima).
 *
 * O valor é fixado no build. Definir NEXT_PUBLIC_FORM_ENDPOINT como string
 * vazia desliga o envio e devolve o formulário ao fallback de mailto — é
 * assim que o build de preview do artifact funciona, e é a chave a virar
 * na Vercel se o envio precisar ser suspenso sem alterar código.
 */
// A barra final não é enfeite: o projeto usa `trailingSlash: true`, e sem
// ela o POST leva um 308 para a versão com barra antes de chegar na função.
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '/api/contato/';

export const forms: Record<FormKind, FormConfig> = {
  comercial: {
    id: 'comercial',
    tab: 'Seja nosso cliente',
    title: 'Seja nosso cliente',
    subtitle:
      'Conte o cenário da sua operação. Quem responde é quem entrega — e a primeira conversa já é técnica, não um roteiro comercial.',
    destino: 'comercial@avlt-solution.com',
    assunto: 'Seja nosso cliente — novo contato pelo site',
    descricaoLabel: 'Descrição',
    descricaoHint:
      'O que está acontecendo hoje, o que você gostaria que acontecesse e qual o prazo, se houver.',
    cta: 'Falar com um especialista',
    sucesso:
      'Recebemos seu contato. Um dos sócios responde em até um dia útil.',
    accent: 'secondary',
    entrega: {
      tipo: 'webToLead',
      salesforce: {
        // Org ID da AVLT. Não é credencial: todo formulário Web-to-Lead
        // publicado expõe o seu no HTML. O que protege a org é o Salesforce
        // só aceitar criação de Lead por este endpoint, nada mais.
        oid: '00Das00000GcncpEAB',
        leadSource: 'Site AVLT',
        status: 'Open',
        // Só tem efeito num POST nativo de <form>, que navegaria para cá.
        // O envio deste site é por fetch e não sai da página — deixado
        // preenchido para o caso de alguém trocar o método depois.
        retURL: 'https://www.avlt-solution.com/obrigado',
      },
    },
  },
  sac: {
    id: 'sac',
    tab: 'SAC',
    title: 'Atendimento ao cliente',
    subtitle:
      'Já é cliente ou precisa falar sobre um projeto em andamento? Este canal vai direto para o time de atendimento.',
    destino: 'contato@avlt-solution.com',
    assunto: 'SAC — novo contato pelo site',
    descricaoLabel: 'Descrição',
    descricaoHint:
      'Descreva o ocorrido com o máximo de detalhe possível — projeto, ambiente e o que você já tentou.',
    cta: 'Enviar para o atendimento',
    sucesso:
      'Recebemos sua mensagem. O time de atendimento responde em até um dia útil.',
    accent: 'primary',
    entrega: { tipo: 'email' },
  },
};

export const formOrder: FormKind[] = ['comercial', 'sac'];
