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
};

export default nextConfig;
