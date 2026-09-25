'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Field from '@/components/ui/Field';
import { registrar } from '@/lib/analytics';
import { FORM_ENDPOINT, type FormConfig } from '@/data/forms';
import { enviarWebToLead } from '@/lib/webToLead';
import {
  mascaraEmail,
  mascaraTelefone,
  validarDescricao,
  validarEmail,
  validarEmpresa,
  validarNomeCompleto,
  validarTelefone,
} from '@/lib/validation';

/**
 * Formulário de contato.
 *
 * O mesmo componente atende os dois canais — muda só a configuração
 * (título, destino, textos). Campos e validação são idênticos, como pedido.
 *
 * ENVIO: ver o bloco de instruções em src/data/forms.ts. Com `FORM_ENDPOINT`
 * vazio, o formulário monta o e-mail e abre o cliente do visitante já
 * endereçado à caixa correta — funciona hoje, sem serviço externo. Com um
 * endpoint configurado, envia em segundo plano e nada abre.
 */

type Campos = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  descricao: string;
};

type Estado = 'editando' | 'enviando' | 'enviado' | 'erro';

const VAZIO: Campos = { nome: '', empresa: '', email: '', telefone: '', descricao: '' };

export default function ContactForm({ config }: { config: FormConfig }) {
  const [campos, setCampos] = useState<Campos>(VAZIO);
  const [tocado, setTocado] = useState<Record<keyof Campos, boolean>>({
    nome: false,
    empresa: false,
    email: false,
    telefone: false,
    descricao: false,
  });
  const [tentouEnviar, setTentouEnviar] = useState(false);
  /** Aceite da LGPD. Começa falso e nunca é pré-marcado. */
  const [aceite, setAceite] = useState(false);
  const [estado, setEstado] = useState<Estado>('editando');
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const reduced = useReducedMotion();

  /** Honeypot: bot preenche, gente não vê. */
  const honeypot = useRef<HTMLInputElement>(null);

  const emailCheck = useMemo(() => validarEmail(campos.email), [campos.email]);

  const erros = useMemo(
    () => ({
      nome: validarNomeCompleto(campos.nome),
      empresa: validarEmpresa(campos.empresa),
      email: emailCheck.erro,
      telefone: validarTelefone(campos.telefone),
      descricao: validarDescricao(campos.descricao),
    }),
    [campos, emailCheck],
  );

  const temErro = Object.values(erros).some(Boolean);

  /** Erro só aparece depois do blur, ou depois de uma tentativa de envio. */
  const mostrar = (campo: keyof Campos) =>
    tocado[campo] || tentouEnviar ? erros[campo] : null;

  const set = (campo: keyof Campos) => (valor: string) => {
    setCampos((c) => ({ ...c, [campo]: valor }));
    if (estado === 'erro') setEstado('editando');
  };

  const corpoDoEmail = () =>
    [
      `Nome completo: ${campos.nome.trim().replace(/\s+/g, ' ')}`,
      `Empresa: ${campos.empresa.trim()}`,
      `E-mail: ${campos.email}`,
      `Telefone de contato: ${campos.telefone}`,
      '',
      'Descrição:',
      campos.descricao.trim() || '(não informada)',
      '',
      '---',
      `Enviado pelo formulário "${config.title}" do site avltsolution.tech`,
    ].join('\n');

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setTentouEnviar(true);

    // Bot preencheu o campo escondido: finge sucesso e não envia nada.
    if (honeypot.current?.value) {
      setEstado('enviado');
      return;
    }

    if (!aceite) {
      registrar({ nome: 'formulario_erro', canal: config.id, campo: 'aceite' });
      document.getElementById(`${config.id}-aceite`)?.focus();
      return;
    }

    if (temErro) {
      // Leva o foco ao primeiro campo com problema.
      const primeiro = (Object.keys(erros) as (keyof Campos)[]).find((k) => erros[k]);
      if (primeiro) {
        registrar({ nome: 'formulario_erro', canal: config.id, campo: primeiro });
        document.getElementById(`${config.id}-${primeiro}`)?.focus();
      }
      return;
    }

    setEstado('enviando');
    setErroEnvio(null);

    // Canal de Web-to-Lead: o contato vira Lead direto na org Salesforce.
    // O envio é cego por limitação de CORS do endpoint da Salesforce — o
    // porquê e o que isso custa estão no topo de src/lib/webToLead.ts.
    if (config.entrega.tipo === 'webToLead') {
      try {
        await enviarWebToLead(
          {
            nome: campos.nome,
            empresa: campos.empresa,
            email: campos.email,
            telefone: campos.telefone,
            descricao: campos.descricao,
          },
          config.entrega.salesforce,
        );
        registrar({ nome: 'formulario_enviado', canal: config.id });
        setEstado('enviado');
      } catch {
        setEstado('erro');
        setErroEnvio(
          'Não conseguimos enviar agora. Tente de novo em instantes ou escreva direto para ' +
            config.destino +
            '.',
        );
      }
      return;
    }

    // Sem endpoint: abre o cliente de e-mail do visitante já preenchido.
    if (!FORM_ENDPOINT) {
      const url =
        `mailto:${config.destino}` +
        `?subject=${encodeURIComponent(`${config.assunto} — ${campos.empresa.trim()}`)}` +
        `&body=${encodeURIComponent(corpoDoEmail())}`;
      window.location.href = url;
      registrar({ nome: 'formulario_enviado', canal: config.id });
      setEstado('enviado');
      return;
    }

    try {
      const resposta = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        // Só `canal` viaja: a caixa de destino e o assunto são decididos no
        // servidor, a partir de src/data/forms.ts. Se o destino viesse daqui,
        // bastaria alterar o campo no navegador para usar o formulário como
        // relay para qualquer endereço.
        body: new URLSearchParams({
          canal: config.id,
          nome: campos.nome.trim().replace(/\s+/g, ' '),
          empresa: campos.empresa.trim(),
          email: campos.email,
          telefone: campos.telefone,
          descricao: campos.descricao.trim(),
          website: honeypot.current?.value ?? '',
        }),
      });

      if (resposta.ok) {
        registrar({ nome: 'formulario_enviado', canal: config.id });
        setEstado('enviado');
        return;
      }

      if (resposta.status === 429) {
        setEstado('erro');
        setErroEnvio('Muitos envios seguidos deste dispositivo. Tente de novo em alguns minutos.');
        return;
      }

      // 422: o servidor revalidou e discordou do cliente. Não deveria
      // acontecer — se acontecer, mostrar o motivo real vale mais do que
      // um "erro ao enviar" genérico.
      if (resposta.status === 422) {
        const corpo = (await resposta.json().catch(() => null)) as {
          erros?: Record<string, string>;
        } | null;
        const primeiro = corpo?.erros && Object.values(corpo.erros)[0];
        if (primeiro) {
          setEstado('erro');
          setErroEnvio(primeiro);
          return;
        }
      }

      throw new Error(`HTTP ${resposta.status}`);
    } catch {
      setEstado('erro');
      setErroEnvio(
        'Não conseguimos enviar agora. Tente de novo em instantes ou escreva direto para ' +
          config.destino +
          '.',
      );
    }
  }

  function recomeçar() {
    setCampos(VAZIO);
    setTocado({ nome: false, empresa: false, email: false, telefone: false, descricao: false });
    setTentouEnviar(false);
    setAceite(false);
    setEstado('editando');
  }

  // ---------------------------------------------------------------- sucesso
  if (estado === 'enviado') {
    return (
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex min-h-[420px] flex-col items-center justify-center rounded-[var(--radius-card)] border border-[rgba(122,92,250,0.3)] bg-[rgba(122,92,250,0.06)] p-10 text-center"
        role="status"
      >
        <span className="bar-gradient mb-7 flex h-14 w-14 items-center justify-center rounded-full">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 13 4 4L19 7"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-display text-[1.5rem] font-bold text-[var(--color-text)]">
          Mensagem a caminho
        </h3>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
          {config.sucesso}
        </p>
        {!FORM_ENDPOINT && (
          <p className="mt-4 max-w-md text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">
            Abrimos seu programa de e-mail com tudo preenchido. Se ele não abriu, escreva para{' '}
            <a
              href={`mailto:${config.destino}`}
              className="text-[var(--color-primary-soft)] underline underline-offset-2"
            >
              {config.destino}
            </a>
            .
          </p>
        )}
        <button
          type="button"
          onClick={recomeçar}
          className="mt-8 rounded-full border border-[var(--color-border-strong)] px-6 py-2.5 text-[0.875rem] font-medium text-[var(--color-text)] transition-all duration-300 hover:border-[rgba(122,92,250,0.6)] hover:bg-[rgba(122,92,250,0.08)]"
        >
          Enviar outra mensagem
        </button>
      </motion.div>
    );
  }

  // ------------------------------------------------------------------ form
  return (
    <form
      onSubmit={enviar}
      noValidate
      className="relative rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.028)] p-7 backdrop-blur-xl sm:p-9"
    >
      {/* Honeypot — fora da vista e fora da ordem de tabulação. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={`${config.id}-website`}>Não preencha este campo</label>
        <input
          ref={honeypot}
          id={`${config.id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field
            id={`${config.id}-nome`}
            label="Nome completo"
            required
            value={campos.nome}
            onChange={set('nome')}
            onBlur={() => setTocado((t) => ({ ...t, nome: true }))}
            error={mostrar('nome')}
            autoComplete="name"
            placeholder="Como devemos chamar você"
            maxLength={120}
          />
        </div>

        <Field
          id={`${config.id}-empresa`}
          label="Empresa"
          required
          value={campos.empresa}
          onChange={set('empresa')}
          onBlur={() => setTocado((t) => ({ ...t, empresa: true }))}
          error={mostrar('empresa')}
          autoComplete="organization"
          placeholder="Razão social ou nome fantasia"
          maxLength={120}
        />

        <Field
          id={`${config.id}-telefone`}
          label="Telefone de contato"
          required
          type="tel"
          inputMode="tel"
          value={campos.telefone}
          onChange={(v) => set('telefone')(mascaraTelefone(v))}
          onBlur={() => setTocado((t) => ({ ...t, telefone: true }))}
          error={mostrar('telefone')}
          autoComplete="tel"
          placeholder="(11) 98472-1536"
          maxLength={16}
        />

        <div className="sm:col-span-2">
          <Field
            id={`${config.id}-email`}
            label="E-mail"
            required
            type="email"
            inputMode="email"
            value={campos.email}
            onChange={(v) => set('email')(mascaraEmail(v))}
            onBlur={() => setTocado((t) => ({ ...t, email: true }))}
            error={mostrar('email')}
            suggestion={mostrar('email') ? emailCheck.sugestao : undefined}
            onAcceptSuggestion={
              emailCheck.sugestao ? () => set('email')(emailCheck.sugestao!) : undefined
            }
            autoComplete="email"
            placeholder="voce@suaempresa.com.br"
            maxLength={254}
          />
        </div>

        <div className="sm:col-span-2">
          <Field
            as="textarea"
            id={`${config.id}-descricao`}
            label={config.descricaoLabel}
            value={campos.descricao}
            onChange={set('descricao')}
            onBlur={() => setTocado((t) => ({ ...t, descricao: true }))}
            error={mostrar('descricao')}
            hint={config.descricaoHint}
            placeholder="Escreva com suas palavras — quanto mais contexto, melhor a primeira resposta."
            rows={5}
            maxLength={2000}
          />
        </div>
      </div>

      <AnimatePresence>
        {estado === 'erro' && erroEnvio && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-6 overflow-hidden rounded-xl border border-[#f87171]/40 bg-[#f87171]/10 p-4 text-[0.875rem] leading-relaxed text-[#fca5a5]"
          >
            {erroEnvio}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Aceite da LGPD. Obrigatório, sem pré-marcação: consentimento
          precisa ser ato do visitante. O envio fica bloqueado sem ele. */}
      <div className="mt-8 border-t border-[var(--color-border)] pt-7">
        <label
          htmlFor={`${config.id}-aceite`}
          className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-[var(--color-text-secondary)]"
        >
          <input
            id={`${config.id}-aceite`}
            type="checkbox"
            checked={aceite}
            onChange={(e) => setAceite(e.target.checked)}
            aria-describedby={tentouEnviar && !aceite ? `${config.id}-aceite-erro` : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-secondary)]"
          />
          <span>
            Concordo que a AVLT - Solution use estes dados para responder este contato, conforme a{' '}
            <Link
              href="/privacidade"
              target="_blank"
              className="text-[var(--color-primary-soft)] underline underline-offset-4"
            >
              política de privacidade
            </Link>
            . <span className="text-[var(--color-accent)]">*</span>
          </span>
        </label>

        {tentouEnviar && !aceite && (
          <p
            id={`${config.id}-aceite-erro`}
            role="alert"
            className="mt-2.5 pl-7 text-[0.8125rem] text-[var(--color-accent)]"
          >
            Precisamos do seu aceite para poder responder.
          </p>
        )}
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.75rem] leading-relaxed text-[var(--color-text-muted)]">
          Campos com <span className="text-[var(--color-accent)]">*</span> são obrigatórios. Usamos
          seus dados só para responder este contato.
        </p>

        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="group/btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-pill)] px-7 py-3.5 text-[0.9375rem] font-semibold text-white shadow-[0_12px_38px_-12px_rgba(122,92,250,0.85)] transition-all duration-300 hover:shadow-[0_18px_46px_-12px_rgba(122,92,250,0.95)] disabled:cursor-wait disabled:opacity-70"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'var(--gradient-brand-diag)' }}
          />
          <span className="relative z-10 inline-flex items-center gap-2">
            {estado === 'enviando' ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="animate-spin"
                >
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                Enviando…
              </>
            ) : (
              <>
                {config.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14m-6-7 7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
