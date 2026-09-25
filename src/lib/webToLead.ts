/**
 * Web-to-Lead do Salesforce.
 *
 * Converte os campos do formulário do site nos nomes que o endpoint
 * `webto.salesforce.com` espera, e faz o POST.
 *
 * ┌─ POR QUE O ENVIO É "CEGO" ───────────────────────────────────────────┐
 * │ O endpoint do Web-to-Lead não devolve cabeçalho CORS. Um fetch       │
 * │ comum do navegador é bloqueado na leitura da resposta — o pedido     │
 * │ chega ao Salesforce, mas o JavaScript não consegue ler o status.     │
 * │                                                                       │
 * │ As três saídas possíveis:                                            │
 * │  1. POST nativo do <form>  → a página navega para o retURL e sai     │
 * │     do site. Descarta a tela de sucesso e a animação.                │
 * │  2. <iframe> escondido     → não navega, também não lê a resposta.   │
 * │  3. fetch com mode:'no-cors' → não navega, também não lê a resposta. │
 * │                                                                       │
 * │ Escolhemos a 3 porque o pedido deste site foi trocar a entrega sem   │
 * │ mexer na experiência. O custo é real e está declarado aqui: quando   │
 * │ o formulário diz "recebemos seu contato", ele está afirmando que o   │
 * │ pedido SAIU, não que o Salesforce aceitou.                           │
 * │                                                                       │
 * │ O que fecha esse buraco é olhar os leads na org. Se um dia isso      │
 * │ incomodar, o caminho honesto é mandar para a nossa própria função    │
 * │ (src/app/api/contato/route.ts) e ela falar com o Salesforce pelo     │
 * │ servidor, onde CORS não existe e a resposta é legível.               │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const WEB_TO_LEAD_URL =
  'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

export type ConfigWebToLead = {
  /** Org ID. Não é segredo: aparece em qualquer formulário Web-to-Lead público. */
  oid: string;
  /** Campo LeadSource. */
  leadSource?: string;
  /** Status inicial do lead. */
  status?: string;
  /** Para onde o Salesforce redireciona no POST nativo. Sem efeito no envio via fetch. */
  retURL?: string;
};

/**
 * O site pede "Nome completo"; o Salesforce quer nome e sobrenome separados,
 * e `last_name` é obrigatório lá.
 *
 * Primeira palavra vira `first_name`, o resto vira `last_name`. Quem digitar
 * só uma palavra tem ela como sobrenome e `first_name` vazio — melhor um lead
 * com o nome no campo errado do que um lead recusado.
 */
export function separarNome(nomeCompleto: string): { first_name: string; last_name: string } {
  const partes = nomeCompleto.trim().replace(/\s+/g, ' ').split(' ');
  if (partes.length === 1) return { first_name: '', last_name: partes[0] ?? '' };
  return { first_name: partes[0], last_name: partes.slice(1).join(' ') };
}

export type CamposDoSite = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  descricao: string;
};

/**
 * Monta o corpo do POST.
 *
 * Os limites vêm do próprio Salesforce (Lead.FirstName 40, LastName 80,
 * Company 40, Email 80, Phone 40). Cortar aqui evita que o lead seja
 * recusado inteiro por causa de um campo longo.
 */
export function montarCorpo(campos: CamposDoSite, config: ConfigWebToLead): URLSearchParams {
  const { first_name, last_name } = separarNome(campos.nome);

  const corpo = new URLSearchParams({
    oid: config.oid,
    first_name: first_name.slice(0, 40),
    last_name: last_name.slice(0, 80),
    company: campos.empresa.trim().slice(0, 40),
    email: campos.email.trim().slice(0, 80),
    phone: campos.telefone.trim().slice(0, 40),
    description: campos.descricao.trim(),
  });

  if (config.leadSource) corpo.set('lead_source', config.leadSource);
  if (config.status) corpo.set('status', config.status);
  if (config.retURL) corpo.set('retURL', config.retURL);

  return corpo;
}

/**
 * Envia. Resolve quando o pedido saiu; rejeita só quando nem sair ele saiu
 * (sem rede, DNS fora, navegador bloqueando). Ver o bloco no topo do arquivo
 * para o que "saiu" significa e o que não significa.
 */
export async function enviarWebToLead(
  campos: CamposDoSite,
  config: ConfigWebToLead,
): Promise<void> {
  await fetch(WEB_TO_LEAD_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: montarCorpo(campos, config),
  });
}
