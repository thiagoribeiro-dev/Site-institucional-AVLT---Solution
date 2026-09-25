/**
 * POST /api/contato — recebe os dois formulários do site e envia o e-mail.
 *
 * Roda como função serverless na Vercel. É a única parte do site que não
 * é estática; todas as páginas continuam pré-renderizadas no build.
 *
 * ┌─ VARIÁVEIS DE AMBIENTE ──────────────────────────────────────────────┐
 * │ RESEND_API_KEY            obrigatória. Painel do Resend → API Keys.  │
 * │ CONTATO_REMETENTE         opcional. Padrão: o valor de REMETENTE_PADRAO│
 * │                           abaixo. Precisa estar num domínio já        │
 * │                           verificado no Resend, senão o envio falha.  │
 * │ CONTATO_DESTINO_COMERCIAL opcional. Sobrepõe o destino de forms.ts.   │
 * │ CONTATO_DESTINO_SAC       opcional. Idem.                             │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Sem RESEND_API_KEY em desenvolvimento o envio entra em MODO SIMULADO:
 * valida tudo, imprime o e-mail no terminal e responde sucesso. Em
 * produção a chave ausente é erro — nunca fingir que enviou.
 */

import { NextResponse } from 'next/server';
import { lerPayload, montarEmail, validarPayload } from '@/lib/contato-email';

// A rota precisa executar a cada chamada; nada aqui pode ser pré-renderizado.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REMETENTE_PADRAO = 'Site AVLT <site@avlt-solution.com>';
/** Sobreponível só para teste (apontar para um servidor falso local). */
const RESEND_URL = process.env.RESEND_API_URL?.trim() || 'https://api.resend.com/emails';

/**
 * Freio simples por IP: 5 envios a cada 10 minutos.
 *
 * É melhor-esforço e não substitui proteção de borda — cada instância
 * serverless tem o seu próprio mapa, e instância nova começa zerada. Serve
 * para cortar repetição boba e envio acidental em duplicidade, que é o que
 * de fato acontece num formulário de site.
 */
const JANELA_MS = 10 * 60 * 1000;
const LIMITE = 5;
const recentes = new Map<string, number[]>();

function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const anteriores = (recentes.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  anteriores.push(agora);
  recentes.set(ip, anteriores);

  // Não deixar o mapa crescer sem fim numa instância de vida longa.
  if (recentes.size > 500) {
    for (const [chave, marcas] of recentes) {
      if (marcas.every((t) => agora - t >= JANELA_MS)) recentes.delete(chave);
    }
  }

  return anteriores.length > LIMITE;
}

async function corpoDaRequisicao(req: Request): Promise<Record<string, unknown>> {
  const tipo = req.headers.get('content-type') ?? '';
  if (tipo.includes('application/json')) {
    return (await req.json()) as Record<string, unknown>;
  }
  // form-urlencoded e multipart caem aqui — é o que o formulário manda.
  const form = await req.formData();
  return Object.fromEntries(form.entries());
}

export async function POST(req: Request) {
  let bruto: Record<string, unknown>;
  try {
    bruto = await corpoDaRequisicao(req);
  } catch {
    return NextResponse.json({ ok: false, erro: 'Corpo inválido.' }, { status: 400 });
  }

  // Honeypot: bot preenche o campo escondido. Responder sucesso de propósito,
  // para não ensinar ao script qual sinal derrubou o envio.
  if (typeof bruto.website === 'string' && bruto.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'desconhecido';

  if (excedeuLimite(ip)) {
    return NextResponse.json(
      { ok: false, erro: 'Muitos envios seguidos. Tente de novo em alguns minutos.' },
      { status: 429 },
    );
  }

  const dados = lerPayload(bruto);
  const erros = validarPayload(dados);
  if (Object.keys(erros).length > 0) {
    return NextResponse.json({ ok: false, erros }, { status: 422 });
  }

  const email = montarEmail(dados);
  const chave = process.env.RESEND_API_KEY?.trim();
  const remetente = process.env.CONTATO_REMETENTE?.trim() || REMETENTE_PADRAO;

  if (!chave) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[contato] RESEND_API_KEY ausente em produção — envio abortado.');
      return NextResponse.json(
        { ok: false, erro: 'Envio indisponível no momento.' },
        { status: 500 },
      );
    }
    console.info(
      `[contato] MODO SIMULADO (sem RESEND_API_KEY)\nDe: ${remetente}\nPara: ${email.para}\nResponder para: ${email.responderPara}\nAssunto: ${email.assunto}\n\n${email.texto}\n`,
    );
    return NextResponse.json({ ok: true, simulado: true });
  }

  try {
    const resposta = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${chave}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: remetente,
        to: [email.para],
        reply_to: email.responderPara,
        subject: email.assunto,
        text: email.texto,
        html: email.html,
      }),
    });

    if (!resposta.ok) {
      // O detalhe fica no log, não na resposta: mensagem de erro de
      // provedor às vezes devolve endereço e configuração interna.
      console.error('[contato] Resend recusou:', resposta.status, await resposta.text());
      return NextResponse.json(
        { ok: false, erro: 'Não foi possível enviar agora.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contato] falha de rede ao chamar o Resend:', e);
    return NextResponse.json({ ok: false, erro: 'Não foi possível enviar agora.' }, { status: 502 });
  }
}

/** Qualquer outro método: deixa explícito em vez de devolver 404. */
export async function GET() {
  return NextResponse.json({ ok: false, erro: 'Use POST.' }, { status: 405 });
}
