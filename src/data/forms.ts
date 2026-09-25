/**
 * Configuração dos formulários de contato.
 *
 * ┌─ COMO O ENVIO FUNCIONA ──────────────────────────────────────────────┐
 * │ O formulário faz POST em `FORM_ENDPOINT`. Hoje isso aponta para a    │
 * │ função própria do projeto, em src/app/api/contato/route.ts, que      │
 * │ revalida tudo no servidor e envia pelo Resend.                       │
 * │                                                                       │
 * │ O que precisa estar configurado na Vercel está documentado no        │
 * │ cabeçalho daquele arquivo e no README (seção "Formulários").         │
 * │                                                                       │
 * │ Deixar `FORM_ENDPOINT` VAZIO volta ao comportamento anterior: o      │
 * │ formulário valida e abre o cliente de e-mail do visitante já         │
 * │ preenchido. Serve como plano B se o envio precisar ser desligado     │
 * │ às pressas, sem derrubar o formulário.                               │
 * └───────────────────────────────────────────────────────────────────────┘
 */

export type FormKind = 'comercial' | 'sac';

export type FormConfig = {
  id: FormKind;
  /** Rótulo da aba. */
  tab: string;
  title: string;
  subtitle: string;
  /** Caixa que recebe os dados. */
  destino: string;
  /** Assunto do e-mail gerado. */
  assunto: string;
  /** Texto de ajuda do campo de descrição. */
  descricaoLabel: string;
  descricaoHint: string;
  /** Texto do botão. */
  cta: string;
  /** Mensagem de sucesso. */
  sucesso: string;
  accent: 'secondary' | 'primary';
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
  },
};

export const formOrder: FormKind[] = ['comercial', 'sac'];
