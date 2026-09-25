import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import CookieBanner from '@/components/ui/CookieBanner';
import { site } from '@/data/site';
import { organizationJsonLd } from '@/lib/seo';



export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'AVLT - Solution | Consultoria Salesforce e Inteligência Artificial',
    template: '%s | AVLT - Solution',
  },
  description: site.description,
  keywords: [
    'consultoria Salesforce',
    'Salesforce Brasil',
    'Salesforce Developer',
    'Salesforce Architecture',
    'Salesforce AI',
    'Agentforce',
    'Inteligência Artificial',
    'automação',
    'integração Salesforce',
    'Data 360',
    'MuleSoft',
    'Salesforce Commerce',
    'Salesforce Service',
    'Salesforce Sales',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  // Verificação do Google Search Console. O código vem do painel, em
  // Adicionar propriedade → Prefixo de URL → tag HTML, e entra como
  // variável na Vercel. Sem ela a meta simplesmente não é emitida.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.name,
    title: 'AVLT - Solution | Salesforce & AI Experts',
    description: site.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AVLT - Solution — Transformamos tecnologia em resultados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVLT - Solution | Salesforce & AI Experts',
    description: site.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Pré-carrega as duas fontes do caminho crítico (título e corpo).
            As demais variações entram sob demanda, por unicode-range. */}
        <link
          rel="preload"
          href="/fonts/poppins-latin-700-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Dados estruturados: Organization + serviços oferecidos */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        {/* Acessibilidade: primeiro tab pula direto para o conteúdo */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--color-secondary)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        {/* Só renderiza o GA depois do aceite — ver GoogleAnalytics.tsx */}
        <GoogleAnalytics />
        <CookieBanner />
      </body>
    </html>
  );
}
