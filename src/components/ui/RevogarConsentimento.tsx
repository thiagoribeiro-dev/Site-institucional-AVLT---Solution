'use client';

import { useEffect, useState } from 'react';
import {
  EVENTO_CONSENTIMENTO,
  lerConsentimento,
  revogarConsentimento,
  type EstadoConsentimento,
} from '@/lib/consentimento';
import { GA_ID } from '@/lib/analytics';

/**
 * Botão de revogar consentimento, na seção de cookies da política.
 *
 * A LGPD exige que revogar seja tão fácil quanto consentir. Por isso o
 * botão fica na página que o banner aponta, e não escondido atrás de
 * um pedido por e-mail.
 *
 * Revogar apaga a escolha E os cookies do GA — ver `revogarConsentimento`.
 * Depois disso o banner volta a aparecer, porque o estado volta a ser
 * 'pendente'.
 */
export default function RevogarConsentimento() {
  const [estado, setEstado] = useState<EstadoConsentimento | null>(null);

  useEffect(() => {
    setEstado(lerConsentimento());
    const aoMudar = (e: Event) => setEstado((e as CustomEvent).detail as EstadoConsentimento);
    window.addEventListener(EVENTO_CONSENTIMENTO, aoMudar);
    return () => window.removeEventListener(EVENTO_CONSENTIMENTO, aoMudar);
  }, []);

  if (!GA_ID || estado === null) return null;

  const rotulo: Record<EstadoConsentimento, string> = {
    aceito: 'Você aceitou os cookies de medição.',
    recusado: 'Você recusou os cookies de medição. Nada está sendo gravado.',
    pendente: 'Você ainda não respondeu ao aviso de cookies. Nada está sendo gravado.',
  };

  return (
    <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] p-5">
      <p className="text-[0.875rem] text-[var(--color-text-secondary)]">{rotulo[estado]}</p>

      {estado !== 'pendente' && (
        <button
          type="button"
          onClick={revogarConsentimento}
          className="mt-4 rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] px-5 py-2.5 text-[0.8125rem] font-medium text-[var(--color-text)] transition-colors duration-300 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]"
        >
          Rever a minha escolha
        </button>
      )}
    </div>
  );
}
