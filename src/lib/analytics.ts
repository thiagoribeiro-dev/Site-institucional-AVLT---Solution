/**
 * EVENTOS DO GOOGLE ANALYTICS 4
 *
 * Camada fina sobre o `gtag`. O resto do site chama daqui e não precisa
 * saber se o GA existe, se carregou ou se a pessoa recusou — tudo isso
 * é tratado aqui, e `registrar` simplesmente não faz nada quando não há
 * consentimento.
 *
 * ┌─ O QUE NUNCA VAI NESTES EVENTOS ────────────────────────────────────┐
 * │ Nada que o visitante digitou: nome, e-mail, telefone, empresa, o    │
 * │ texto da descrição. Eventos registram QUE algo aconteceu, nunca o   │
 * │ conteúdo. Mandar dado pessoal para o GA4 é violação de contrato com │
 * │ o Google e de LGPD ao mesmo tempo.                                  │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

/** Os quatro eventos aprovados. Nome fixo: mudar quebra o histórico. */
export type EventoAnalytics =
  | { nome: 'formulario_enviado'; canal: 'comercial' | 'sac' }
  | { nome: 'formulario_erro'; canal: 'comercial' | 'sac'; campo: string }
  | { nome: 'contato_direto'; meio: 'email' | 'telefone' | 'instagram' }
  | { nome: 'material_aberto'; material: string };

type Gtag = (comando: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/**
 * Registra um evento, se houver GA carregado.
 *
 * Silencioso de propósito: analytics é acessório. Se não houver
 * consentimento, ID configurado ou rede, o site segue igual.
 */
export function registrar(evento: EventoAnalytics): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const { nome, ...parametros } = evento;
  try {
    window.gtag('event', nome, parametros);
  } catch {
    // Nunca deixar o analytics derrubar uma interação do usuário.
  }
}
