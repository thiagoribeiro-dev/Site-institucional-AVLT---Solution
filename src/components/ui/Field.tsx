'use client';

import type { ReactNode } from 'react';

/**
 * Campo de formulário no padrão visual do site.
 *
 * O erro só aparece depois que o campo perde o foco pela primeira vez
 * (`touched`): validar enquanto a pessoa ainda está digitando o e-mail
 * marca tudo de vermelho antes do @ e passa a sensação de que o site
 * está errado, não a digitação.
 */

type BaseProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string | null;
  hint?: string;
  required?: boolean;
  /** Sugestão de correção clicável (ex.: domínio de e-mail digitado errado). */
  suggestion?: string;
  onAcceptSuggestion?: () => void;
};

type InputProps = BaseProps & {
  as?: 'input';
  type?: 'text' | 'email' | 'tel';
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
};

type TextareaProps = BaseProps & {
  as: 'textarea';
  rows?: number;
  placeholder?: string;
  maxLength?: number;
};

type Props = InputProps | TextareaProps;

function Wrapper({
  id,
  label,
  required,
  error,
  hint,
  suggestion,
  onAcceptSuggestion,
  children,
}: Pick<BaseProps, 'id' | 'label' | 'required' | 'error' | 'hint' | 'suggestion' | 'onAcceptSuggestion'> & {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]"
      >
        {label}
        {required ? (
          <span className="ml-1 text-[var(--color-accent)]" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 normal-case tracking-normal text-[var(--color-text-muted)]">
            (opcional)
          </span>
        )}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-[#fca5a5]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="mt-[2px] shrink-0"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v6m0 3.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>
            {error}
            {suggestion && onAcceptSuggestion && (
              <>
                {' '}
                <button
                  type="button"
                  onClick={onAcceptSuggestion}
                  className="font-medium text-[var(--color-primary-soft)] underline underline-offset-2 hover:text-[var(--color-text)]"
                >
                  Usar {suggestion}
                </button>
              </>
            )}
          </span>
        </p>
      )}

      {!error && hint && (
        <p id={`${id}-hint`} className="mt-2 text-[0.75rem] leading-snug text-[var(--color-text-muted)]">
          {hint}
        </p>
      )}
    </div>
  );
}

const fieldClass = (error?: string | null) =>
  `w-full rounded-xl border bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[0.9375rem] text-[var(--color-text)] outline-none transition-all duration-300 placeholder:text-[var(--color-text-muted)] ${
    error
      ? 'border-[#f87171]/60 focus:border-[#f87171] focus:ring-2 focus:ring-[#f87171]/25'
      : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-[rgba(122,92,250,0.7)] focus:ring-2 focus:ring-[rgba(122,92,250,0.25)]'
  }`;

export default function Field(props: Props) {
  const { id, label, value, onChange, onBlur, error, hint, required, suggestion, onAcceptSuggestion } = props;

  return (
    <Wrapper
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      suggestion={suggestion}
      onAcceptSuggestion={onAcceptSuggestion}
    >
      {props.as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={props.rows ?? 5}
          value={value}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`${fieldClass(error)} resize-y leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={props.type ?? 'text'}
          inputMode={props.inputMode}
          autoComplete={props.autoComplete}
          value={value}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={fieldClass(error)}
        />
      )}
    </Wrapper>
  );
}
