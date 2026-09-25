/**
 * CONSENTIMENTO DE COOKIES
 *
 * Fonte única da verdade sobre "esta pessoa aceitou?". Tudo que depende
 * de consentimento — hoje só o GA4 — pergunta aqui.
 *
 * ┌─ A REGRA QUE NÃO PODE SER QUEBRADA ─────────────────────────────────┐
 * │ Nada de terceiro carrega antes de `estado === 'aceito'`.            │
 * │                                                                      │
 * │ Não é preferência de implementação: sob a LGPD, carregar o GA4 e     │
 * │ depois "respeitar" a recusa não vale, porque o cookie já foi         │
 * │ gravado e o IP já foi enviado. O consentimento precisa ser prévio.   │
 * │                                                                      │
 * │ Por isso o script do Google não está no HTML: ele é injetado em      │
 * │ runtime, e só no ramo do aceite. Ver GoogleAnalytics.tsx.            │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Onde fica guardado: localStorage do visitante. Não vai para servidor
 * nenhum — a escolha é dele e morre no navegador dele. Consequência
 * aceita: quem limpa o navegador vê o aviso de novo.
 */

export type EstadoConsentimento = 'pendente' | 'aceito' | 'recusado';

export const CHAVE_CONSENTIMENTO = 'avlt.consentimento.v1';

/** Disparado quando a escolha muda, para quem estiver ouvindo na mesma aba. */
export const EVENTO_CONSENTIMENTO = 'avlt:consentimento';

/**
 * Lê a escolha guardada.
 *
 * Sempre 'pendente' no servidor e sempre que o armazenamento falhar —
 * navegação anônima, cookies de site bloqueados, storage cheio. O padrão
 * seguro é NÃO ter consentimento, nunca o contrário.
 */
export function lerConsentimento(): EstadoConsentimento {
  if (typeof window === 'undefined') return 'pendente';
  try {
    const valor = window.localStorage.getItem(CHAVE_CONSENTIMENTO);
    return valor === 'aceito' || valor === 'recusado' ? valor : 'pendente';
  } catch {
    return 'pendente';
  }
}

/** Grava a escolha e avisa quem estiver ouvindo. */
export function gravarConsentimento(estado: Exclude<EstadoConsentimento, 'pendente'>): void {
  try {
    window.localStorage.setItem(CHAVE_CONSENTIMENTO, estado);
  } catch {
    // Sem armazenamento a escolha vale só para esta navegação. Melhor
    // isso do que quebrar a página por causa de um setItem.
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMENTO, { detail: estado }));
}

/**
 * Apaga a escolha e os cookies que o GA4 gravou.
 *
 * O `_ga` e os `_ga_<ID>` são gravados no domínio raiz. Para a revogação
 * ser real e não cosmética, eles precisam sair de verdade — senão o
 * identificador do visitante sobrevive e volta a ser usado no próximo
 * aceite, o que não é o que a pessoa pediu.
 */
export function revogarConsentimento(): void {
  try {
    window.localStorage.removeItem(CHAVE_CONSENTIMENTO);
  } catch {
    /* idem */
  }

  const host = window.location.hostname;
  // Tenta o host exato e o domínio raiz: o GA grava no raiz, mas o
  // host exato cobre o caso de ambiente de preview.
  const dominios = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];

  for (const cookie of document.cookie.split(';')) {
    const nome = cookie.split('=')[0]?.trim();
    if (!nome || !(nome === '_ga' || nome.startsWith('_ga_') || nome === '_gid')) continue;
    for (const dominio of dominios) {
      document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${dominio}`;
    }
    document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMENTO, { detail: 'pendente' }));
}
