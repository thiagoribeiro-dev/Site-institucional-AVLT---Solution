'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import {
  EVENTO_CONSENTIMENTO,
  lerConsentimento,
  type EstadoConsentimento,
} from '@/lib/consentimento';
import { GA_ID } from '@/lib/analytics';

/**
 * Carrega o Google Analytics 4 — e SÓ depois do aceite.
 *
 * O `<Script>` não é renderizado enquanto o estado não for 'aceito'.
 * Isso é o que garante que nenhum cookie, nenhuma requisição ao Google
 * e nenhum IP saiam antes do consentimento. É a regra descrita em
 * src/lib/consentimento.ts, e é aqui que ela é cumprida.
 *
 * Não trocar por "carregar e desativar depois": nesse desenho o cookie
 * já teria sido gravado.
 *
 * Sem `NEXT_PUBLIC_GA_ID` o componente não faz nada — é assim que o
 * ambiente de desenvolvimento e o preview do artifact ficam limpos.
 */
export default function GoogleAnalytics() {
  const [estado, setEstado] = useState<EstadoConsentimento>('pendente');
  const pathname = usePathname();

  useEffect(() => {
    setEstado(lerConsentimento());
    const aoMudar = (e: Event) => setEstado((e as CustomEvent).detail as EstadoConsentimento);
    window.addEventListener(EVENTO_CONSENTIMENTO, aoMudar);
    return () => window.removeEventListener(EVENTO_CONSENTIMENTO, aoMudar);
  }, []);

  // Navegação entre páginas no App Router não recarrega o documento,
  // então a visualização de página precisa ser enviada na mão.
  useEffect(() => {
    if (estado !== 'aceito' || !GA_ID || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname, estado]);

  if (!GA_ID || estado !== 'aceito') return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}
