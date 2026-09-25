#!/usr/bin/env bash
#
# Build descartável para publicar o site como artifact (preview online).
#
# O código versionado é de PRODUÇÃO. Este script NÃO o altera de forma
# permanente: ele troca next.config.mjs, builda, e restaura o original
# mesmo se algo falhar (trap EXIT).
#
# Por que cada passo existe está em claude/site-avlt-contexto.md, seção
# "Como republicar o preview no artifact". Resumo: o artifact serve a
# página em .../_f/<versão>/, então (1) só caminho relativo resolve,
# (2) caminho publicado não pode começar com "_", (3) o payload RSC
# embutido também carrega os caminhos e precisa da mesma substituição.
#
# Uso:  bash scripts/build-preview.sh
# Saída: out/  pronto para publicar (index.html + demais arquivos).

set -euo pipefail
cd "$(dirname "$0")/.."

ORIG=$(mktemp)
cp next.config.mjs "$ORIG"

# A rota de API (envio dos formulários) não sobrevive a `output: 'export'` —
# ela executa a cada chamada. Sai de cena durante este build e volta no trap.
# Junto com NEXT_PUBLIC_FORM_ENDPOINT vazio (definido mais abaixo), isso faz
# o formulário do preview cair no fallback de mailto — o comportamento certo,
# já que o artifact não roda função nenhuma.
API_DIR="src/app/api"
API_STASH=""
if [ -d "$API_DIR" ]; then
  API_STASH=$(mktemp -d)
  mv "$API_DIR" "$API_STASH/api"
fi

restaurar() {
  cp "$ORIG" next.config.mjs
  rm -f "$ORIG"
  if [ -n "$API_STASH" ] && [ -d "$API_STASH/api" ]; then
    rm -rf "$API_DIR"
    mv "$API_STASH/api" "$API_DIR"
    rmdir "$API_STASH" 2>/dev/null || true
  fi
}
trap restaurar EXIT

cat > next.config.mjs <<'CONF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Páginas planas: projetos.html na raiz, mesma profundidade de
  // index.html — dispensa <base> e mantém os relativos válidos.
  trailingSlash: false,
  // "_next" começa com "_", prefixo reservado pelo host do artifact.
  assetPrefix: '/assets',
  reactStrictMode: true,
  transpilePackages: ['three'],
};
export default nextConfig;
CONF

rm -rf out .next
# Vazio: sem função no artifact, o formulário volta a abrir o cliente de e-mail.
NEXT_PUBLIC_FORM_ENDPOINT='' npx next build

mkdir -p out/assets
mv out/_next out/assets/_next

python3 - <<'PY'
import pathlib, re

raiz = pathlib.Path('out')

# HTML: substituição GLOBAL (não só dentro de aspas) — o payload RSC
# embutido em self.__next_f.push também carrega os caminhos, e deixá-lo
# absoluto causa mismatch de hidratação.
for f in raiz.rglob('*.html'):
    t = f.read_text(encoding='utf8')
    t = t.replace('/assets/_next/', 'assets/_next/').replace('/fonts/', 'fonts/')
    # favicon gerado pelo App Router — também sai absoluto.
    t = t.replace('/icon.svg', 'icon.svg')
    # polyfills tem caracteres que o serviço rejeita; não é publicado.
    t = re.sub(r'<script[^>]+polyfills-[^>]*></script>', '', t)
    # Navegação dura: o roteador do App Router não acha as rotas planas.
    # Vai no fim do <body> — no <head> o App Router hidrata e apaga.
    t = t.replace('</body>', '''<script>
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href]');
  if (!a) return;
  var href = a.getAttribute('href') || '';
  if (!href.startsWith('/') || href.startsWith('//')) return;
  e.preventDefault();
  var p = href.slice(1).replace(/\\/$/, '');
  var hash = '';
  var i = p.indexOf('#');
  if (i >= 0) { hash = p.slice(i); p = p.slice(0, i); }
  location.href = (p ? p + '.html' : 'index.html') + hash;
});
</script></body>''')
    f.write_text(t, encoding='utf8')

# CSS mora em assets/_next/static/css/ — quatro níveis abaixo da raiz.
for f in raiz.rglob('*.css'):
    t = f.read_text(encoding='utf8')
    f.write_text(t.replace('/fonts/', '../../../../fonts/'), encoding='utf8')

for f in raiz.glob('assets/_next/static/chunks/webpack-*.js'):
    t = f.read_text(encoding='utf8')
    f.write_text(t.replace('"/assets/_next/"', '"assets/_next/"'), encoding='utf8')

print('pós-processamento concluído')
PY

# .txt são payloads RSC que o export gera e o preview não usa.
# -type f é obrigatório: existe um DIRETÓRIO chamado robots.txt no bundle.
find out -type f -name '*.txt' -delete
find out -type f -name 'polyfills-*.js' -delete

echo
echo "out/ pronto. Arquivos:"
find out -type f | wc -l
