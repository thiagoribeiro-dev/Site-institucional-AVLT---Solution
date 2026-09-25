/**
 * Montagem e validação do e-mail dos formulários de contato.
 *
 * Fica separado do handler HTTP de propósito: a lógica aqui não conhece
 * Next.js nem Vercel. Se um dia o envio mudar de lugar (Worker, Netlify,
 * outro provedor), só o handler é reescrito — este arquivo vai junto
 * sem alteração.
 *
 * REGRA: o que o navegador manda é sugestão, não verdade. `validarPayload`
 * refaz aqui toda a validação que o formulário já faz no cliente, com as
 * MESMAS funções de src/lib/validation.ts. Validação de cliente existe para
 * dar retorno rápido a quem digita; ela não protege nada, porque qualquer
 * um chama o endpoint direto.
 */

import { forms, type FormKind } from '@/data/forms';
import {
  validarDescricao,
  validarEmail,
  validarEmpresa,
  validarNomeCompleto,
  validarTelefone,
} from '@/lib/validation';

export type PayloadContato = {
  canal: FormKind;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  descricao: string;
};

export type Erros = Partial<Record<keyof PayloadContato, string>>;

/** Limites generosos, só para impedir corpo absurdo vindo de script. */
const LIMITES: Record<keyof PayloadContato, number> = {
  canal: 20,
  nome: 120,
  empresa: 140,
  email: 254,
  telefone: 20,
  descricao: 5000,
};

/**
 * Limpa um campo recebido.
 *
 * `multilinha` decide o que acontece com quebra de linha. Só a descrição
 * pode ter: nos demais campos a quebra vira espaço, porque eles acabam em
 * assunto e em cabeçalho de e-mail, onde quebra de linha é malformada —
 * e, num provedor que monte a mensagem por SMTP cru em vez de JSON, é por
 * onde se injeta um Bcc. Barato de remover, caro de descobrir depois.
 */
function texto(valor: unknown, limite: number, multilinha = false): string {
  if (typeof valor !== 'string') return '';
  const controles = multilinha
    ? /[\u0000-\u0008\u000B-\u001F\u007F]/g // preserva \t e \n
    : /[\u0000-\u001F\u007F]/g; // remove tudo, inclusive \t, \n e \r
  return valor.replace(controles, ' ').slice(0, limite).trim();
}

/** Normaliza o corpo recebido, venha ele como form-urlencoded ou JSON. */
export function lerPayload(bruto: Record<string, unknown>): PayloadContato {
  return {
    canal: (texto(bruto.canal, LIMITES.canal) as FormKind) || 'comercial',
    nome: texto(bruto.nome, LIMITES.nome).replace(/\s+/g, ' '),
    empresa: texto(bruto.empresa, LIMITES.empresa).replace(/\s+/g, ' '),
    email: texto(bruto.email, LIMITES.email).toLowerCase(),
    telefone: texto(bruto.telefone, LIMITES.telefone),
    descricao: texto(bruto.descricao, LIMITES.descricao, true),
  };
}

export function validarPayload(dados: PayloadContato): Erros {
  const erros: Erros = {};

  if (!(dados.canal in forms)) erros.canal = 'Canal desconhecido.';

  const nome = validarNomeCompleto(dados.nome);
  if (nome) erros.nome = nome;

  const empresa = validarEmpresa(dados.empresa);
  if (empresa) erros.empresa = empresa;

  const email = validarEmail(dados.email);
  if (email.erro) erros.email = email.erro;

  const telefone = validarTelefone(dados.telefone);
  if (telefone) erros.telefone = telefone;

  // Descrição é opcional; validarDescricao só reclama do que foi digitado.
  const descricao = validarDescricao(dados.descricao);
  if (descricao) erros.descricao = descricao;

  return erros;
}

function escapar(valor: string): string {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export type EmailMontado = {
  para: string;
  assunto: string;
  /** E-mail de quem preencheu: responder no cliente de e-mail já vai para ele. */
  responderPara: string;
  texto: string;
  html: string;
};

export function montarEmail(dados: PayloadContato, quando = new Date()): EmailMontado {
  const config = forms[dados.canal];
  const destino = destinoDoCanal(dados.canal);

  const carimbo = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(quando);

  const linhas: [string, string][] = [
    ['Canal', config.tab],
    ['Nome', dados.nome],
    ['Empresa', dados.empresa],
    ['E-mail', dados.email],
    ['Telefone', dados.telefone],
    ['Recebido em', `${carimbo} (horário de Brasília)`],
  ];

  const descricao = dados.descricao || '(não preenchida)';

  const texto = [
    ...linhas.map(([r, v]) => `${r}: ${v}`),
    '',
    'Descrição',
    descricao,
    '',
    '— enviado pelo formulário do site avlt-solution.com',
  ].join('\n');

  // HTML simples e sem dependência de imagem: alguns clientes bloqueiam
  // imagem externa por padrão e o e-mail precisa ser legível assim mesmo.
  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
  <p style="margin:0 0 16px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#64748b">${escapar(config.tab)}</p>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
    ${linhas
      .map(
        ([rotulo, valor]) =>
          `<tr><td style="padding:4px 20px 4px 0;color:#64748b;white-space:nowrap;vertical-align:top">${escapar(rotulo)}</td><td style="padding:4px 0;vertical-align:top"><strong>${escapar(valor)}</strong></td></tr>`,
      )
      .join('\n    ')}
  </table>
  <p style="margin:0 0 6px;color:#64748b">Descrição</p>
  <div style="white-space:pre-wrap;border-left:3px solid #00A1E0;padding:2px 0 2px 14px">${escapar(descricao)}</div>
  <p style="margin:24px 0 0;font-size:12px;color:#94a3b8">Enviado pelo formulário do site avlt-solution.com. Responder este e-mail responde direto para ${escapar(dados.email)}.</p>
</div>`;

  return {
    para: destino,
    assunto: `${config.assunto} — ${dados.empresa}`,
    responderPara: dados.email,
    texto,
    html,
  };
}

/**
 * Caixa de destino do canal.
 *
 * Vem de src/data/forms.ts, que é versionado. As variáveis de ambiente
 * CONTATO_DESTINO_COMERCIAL e CONTATO_DESTINO_SAC existem só para trocar
 * o destino sem novo deploy — útil para apontar tudo para uma caixa de
 * teste antes de virar a chave.
 */
export function destinoDoCanal(canal: FormKind): string {
  const override =
    canal === 'comercial'
      ? process.env.CONTATO_DESTINO_COMERCIAL
      : process.env.CONTATO_DESTINO_SAC;
  return override?.trim() || forms[canal].destino;
}
