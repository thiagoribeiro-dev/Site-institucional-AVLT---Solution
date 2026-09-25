/** @type {import('next').NextConfig} */
const nextConfig = {
  // NÃO existe `output: 'export'` aqui, e isso é intencional.
  //
  // O site ganhou uma função serverless — src/app/api/contato/route.ts, que
  // envia o e-mail dos formulários. Export estático não comporta rota que
  // executa a cada chamada, então o build passou a ser o padrão do Next.
  //
  // O que isso muda na prática: as páginas continuam todas pré-renderizadas
  // no build (mesma performance, mesmo HTML), mas a hospedagem precisa saber
  // rodar Node — Vercel, Netlify, Render, um container. Hospedagem de arquivo
  // puro (S3, Nginx estático) deixou de servir enquanto o formulário enviar
  // por aqui. Zerar FORM_ENDPOINT em src/data/forms.ts e reativar o export
  // desfaz isso, ao custo de o formulário voltar a abrir o cliente de e-mail.
  //
  // O build de preview para o artifact continua estático: scripts/build-preview.sh
  // escreve seu próprio config com `output: 'export'` e guarda a rota de API
  // durante aquele build.
  images: {
    // next/image otimizado exige servidor; mantido desligado para o HTML
    // ser idêntico nos dois builds e para não depender do otimizador.
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ['three'],

  // Cabeçalhos de segurança. Não são fator de ranqueamento, mas entram em
  // auditoria de qualidade e em due diligence de cliente enterprise — que
  // é exatamente o público deste site.
  //
  // Deliberadamente SEM Content-Security-Policy: o site carrega o GA4 e
  // usa estilo inline do Tailwind e do Framer Motion, então uma CSP mal
  // calibrada quebraria a página em produção sem aviso. Fazer CSP direito
  // é frente própria, com nonce e teste — não linha solta aqui.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Só HTTPS por dois anos, incluindo subdomínios.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Impede o navegador de adivinhar o tipo de um arquivo.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Não vaza a URL completa ao sair do site.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Ninguém embute o site em iframe (clickjacking).
          { key: 'X-Frame-Options', value: 'DENY' },
          // Nenhuma API sensível é usada; negar por padrão.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
