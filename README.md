# AVLT - Solution · Site institucional

Site institucional da **AVLT - Solution — Salesforce & AI Experts**, construído em Next.js com elemento 3D atmosférico baseado no símbolo da marca.

A identidade visual segue integralmente o *Manual de Identidade Visual AVLT - Solution*: paleta, tipografia, gradiente oficial e a regra de contraste 60‑30‑10.

---

## Rodar localmente

Pré-requisito: **Node.js 18.18 ou superior** (recomendado 20+).

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

### Gerar a versão de produção

```bash
npm run build
```

O build gera a pasta `out/` com HTML, CSS e JS estáticos — sem necessidade de servidor Node. Para conferir o resultado antes de publicar:

```bash
npm run serve
```

### Publicar

Como a saída é estática (`output: 'export'`), qualquer host serve:

| Host | Como |
|---|---|
| Vercel | conecte o repositório; detecta Next.js sozinho |
| Netlify | build `npm run build`, publish `out` |
| S3 / CloudFront | suba o conteúdo de `out/` |
| Nginx / Apache | aponte o *document root* para `out/` |

Antes de publicar em produção, ajuste `url` em `src/data/site.ts` para o domínio real — ele alimenta canonical, Open Graph, sitemap e robots.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 (tokens em `globals.css`) |
| 3D | Three.js + React Three Fiber + Drei |
| Animação | Framer Motion |
| Fontes | Poppins, Inter e Roboto Mono auto-hospedadas |

---

## Estrutura

```
src/
├── app/                  Rotas (App Router)
│   ├── layout.tsx        Layout raiz, metadata e dados estruturados
│   ├── page.tsx          Página principal
│   ├── globals.css       Design system: tokens, utilitários, animações
│   ├── fonts.css         Declarações @font-face das fontes da marca
│   ├── icon.svg          Favicon
│   ├── sitemap.ts        Sitemap gerado no build
│   ├── robots.ts         robots.txt gerado no build
│   ├── projetos/         Projetos de Sucesso
│   ├── materiais/        Material de Apoio
│   └── sobre/            Sobre nós
├── components/
│   ├── 3d/               Camada WebGL (ver "O elemento 3D")
│   ├── ui/               Blocos reutilizáveis
│   ├── layout/           Header e Footer
│   ├── sections/         Seções de página
│   └── cards/            Cards de cloud, projeto e material
├── data/                 ← TODO O CONTEÚDO VIVE AQUI
│   └── forms.ts          Config dos formulários e destino dos e-mails
├── hooks/                usePerfTier, useInView
└── lib/
    ├── seo.ts            schema.org
    └── validation.ts     Máscaras e validação dos formulários
public/
├── fonts/                .woff2 das três famílias
├── logo-avlt.jpg         Logo oficial (referência)
└── og-image.png          Imagem de compartilhamento
```

**Conteúdo e código são separados.** Nenhum texto institucional está escrito dentro de componente — tudo vem de `src/data`. Na prática: para mudar o site, quase sempre você edita apenas um arquivo dessa pasta.

---

## Como editar o conteúdo

### Trocar contato, telefone ou mensagens principais

`src/data/site.ts` — nome, e-mail, telefone, LinkedIn, headline do Hero, indicadores e CTA final.

### Adicionar um projeto

`src/data/projects.ts`. Copie um bloco existente, troque o `slug` e preencha:

```ts
{
  slug: 'nome-unico-do-case',
  client: 'Nome do Cliente',
  title: 'O que foi entregue',
  category: 'Sales Cloud · Integração',
  summary: 'Uma ou duas frases de capa.',
  context: 'Setor, porte e cenário da operação do cliente.',
  challenge: 'O problema real, antes da solução.',
  technologies: ['Salesforce Service Cloud', 'Apex'],
}
```

Duas regras que o projeto leva a sério:

- **Arquitetura, desenho de solução e resultados ficam fora do site**, por decisão de apresentação. O portfólio mostra contexto, desafio e domínio técnico; o detalhe pertence à conversa comercial. Por isso o tipo `Project` não tem esses campos.
- **Não invente número, cliente nem resultado.** E cliente sem autorização de divulgação usa `client: 'Projeto Enterprise — Confidencial'` com `confidential: true`.

O card na home e a página `/projetos` saem do mesmo objeto.

### Adicionar um material de apoio

`src/data/resources.ts`. Os filtros da página se atualizam sozinhos a partir dos dados.

- `category`: `'salesforce'`, `'ia'` ou `'arquitetura'`
- `type`: Artigo, Guia, Whitepaper, Documentação, Vídeo ou Material técnico
- `href`: link externo, rota interna ou `null`. Com `null`, o card aparece como **Em breve** — sem link quebrado.
- `source`: crédito da fonte quando o material é de terceiro (ex.: `'Salesforce Developers'`)

### Editar clouds, equipe, metodologia

| Arquivo | Conteúdo |
|---|---|
| `src/data/clouds.ts` | Ecossistema Salesforce e o grafo do diagrama |
| `src/data/team.ts` | Liderança, narrativa, linha do tempo, diagnóstico |
| `src/data/method.ts` | Metodologia, serviços e competências |
| `src/data/forms.ts` | Textos e destino dos formulários de contato |
| `src/data/experience.ts` | Contas anteriores à AVLT (ver abaixo) |

### Experiência anterior à AVLT

`src/data/experience.ts` guarda contas conduzidas pelos sócios **antes** da consultoria existir — hoje Vibra Energia e Seguros Unimed, de atuação da Andressa. Elas aparecem em `/projetos` numa seção própria, "De onde vem nossa arquitetura".

A separação é deliberada e não deve ser desfeita: **estas empresas não são clientes da AVLT**. Listá-las junto dos cases da consultoria afirmaria que são. Por isso a seção tem fundo distinto, cada card traz o nome de quem conduziu a conta, e há nota de rodapé dizendo que a AVLT não presta serviço a elas como firma. Se alguma virar cliente da consultoria, aí sim migra para `src/data/projects.ts`.

---

## Formulários de contato

Dois canais, mesmos campos, na seção `#contato` da home:

| Canal | Aba | Recebe em |
|---|---|---|
| Comercial | Seja nosso cliente | `comercial@avlt-solution.com` |
| Atendimento | SAC | `contato@avlt-solution.com` |

Campos: **Nome completo\***, **Empresa\***, **E-mail\***, **Telefone de contato\*** e Descrição (opcional).

Trocar de aba limpa o formulário de propósito — ninguém envia ao SAC o texto que escreveu para o comercial.

### Como o envio funciona

O formulário faz `POST` em `/api/contato/`, uma função serverless do próprio projeto (`src/app/api/contato/route.ts`). Ela revalida tudo no servidor e envia pelo **Resend**.

Só o campo `canal` viaja do navegador. A caixa de destino e o assunto são decididos no servidor a partir da tabela acima — se o destino viesse do formulário, bastaria editá-lo no navegador para usar o site como relay para qualquer endereço.

Isso é a razão de o projeto **não** usar mais `output: 'export'`: export estático não comporta rota que executa a cada chamada. As páginas continuam todas pré-renderizadas no build (mesmo HTML, mesma performance), mas a hospedagem precisa rodar Node — Vercel, Netlify, Render, um container. Hospedagem de arquivo puro não serve mais enquanto o envio passar por aqui.

### Configurar (uma vez)

**1. Verificar o domínio no Resend.** Em [resend.com](https://resend.com) → *Domains* → adicionar `avlt-solution.com`. Eles devolvem três registros de DNS (um TXT de SPF, um CNAME/TXT de DKIM e um de DMARC). Publique-os no DNS do domínio e espere a verificação virar *Verified*. Sem isso o envio é recusado — e a mensagem de erro fica no log da função, não na tela do visitante.

**2. Criar a API key.** Resend → *API Keys* → permissão de envio basta.

**3. Definir as variáveis na Vercel** (*Settings → Environment Variables*, nos três ambientes):

| Variável | Obrigatória | Para quê |
|---|---|---|
| `RESEND_API_KEY` | sim | A chave do passo 2. |
| `CONTATO_REMETENTE` | não | Remetente. Padrão: `Site AVLT <site@avlt-solution.com>`. Tem que estar no domínio verificado. |
| `CONTATO_DESTINO_COMERCIAL` | não | Sobrepõe o destino comercial sem mexer no código — útil para apontar a uma caixa de teste antes de virar a chave. |
| `CONTATO_DESTINO_SAC` | não | Idem, para o SAC. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | não | Definir como string **vazia** desliga o envio e devolve o formulário ao comportamento de abrir o cliente de e-mail. É a chave a virar se o envio precisar ser suspenso às pressas. |

**4. Conferir depois do deploy.** Envie um teste pelos dois canais e veja se chega em `comercial@` e em `contato@`. Se não chegar, o *Logs* da função na Vercel diz o motivo — quase sempre domínio ainda não verificado ou remetente fora dele.

### Desenvolver localmente

`npm run dev` sem `RESEND_API_KEY` entra em **modo simulado**: valida tudo, imprime o e-mail no terminal e responde sucesso, sem enviar nada. Em produção a chave ausente é erro (HTTP 500) — o código nunca finge que enviou.

Para exercitar o envio de verdade contra um servidor falso, `RESEND_API_URL` aponta o cliente para outra URL.

### Proteções da função

Honeypot (responde sucesso e não envia, para não ensinar ao robô qual sinal o derrubou), revalidação completa no servidor, limpeza de caracteres de controle nos campos de uma linha — quebra de linha em assunto e cabeçalho é por onde se injeta um `Bcc` — e um freio de 5 envios por IP a cada 10 minutos.

O freio é melhor-esforço: cada instância serverless tem o próprio contador e instância nova começa zerada. Serve para cortar repetição boba e envio duplicado acidental, que é o que de fato acontece num formulário de site. Se algum dia aparecer abuso real, o lugar de resolver é a borda (Vercel WAF), não este contador.

### O que a validação faz — e o que não faz

Em `src/lib/validation.ts`. Ela **barra** o que é comprovadamente inválido: formato quebrado, DDD inexistente, celular sem o 9 inicial, fixo com prefixo impossível, dígitos todos iguais, sequência corrida de ponta a ponta, domínio sem ponto, domínio descartável conhecido (mailinator e companhia), domínio reservado por norma (`example.com`) e erro de digitação clássico (`gmial.com` → sugere `gmail.com` num link clicável).

Ela **não prova** que o e-mail existe nem que o telefone atende — só um código de confirmação enviado ao contato prova isso. Se um dia a taxa de lead falso incomodar, o passo certo é double opt-in, não uma regex mais dura: apertar mais a regra começa a barrar cliente de verdade.

As máscaras rodam enquanto se digita: telefone vira `(11) 98472-1536`, e-mail perde espaço, acento e maiúscula — que é de onde vem a maior parte do e-mail inválido, o autocorretor do celular.

Há um honeypot escondido contra robô: campo invisível que gente não preenche.

---

## Trocar o logo e as imagens

### Logo do header e do rodapé

O logo é **SVG inline** em `src/components/ui/Logo.tsx`, para herdar o gradiente da marca e ficar nítido em qualquer densidade de tela.

Para usar um arquivo de imagem no lugar:

```tsx
import Image from 'next/image';

// dentro de Logo(), substituindo <LogoMark />
<Image src="/logo-avlt.png" alt="AVLT - Solution" width={140} height={34} priority />
```

Coloque o arquivo em `public/`. Mantenha a altura próxima de 34px para não quebrar o header.

### Imagem de compartilhamento (Open Graph)

Substitua `public/og-image.png` por uma imagem **1200×630**. É o que aparece ao colar o link no LinkedIn, WhatsApp ou Slack.

### Favicon

`src/app/icon.svg`. O Next gera as variações automaticamente.

---

## O elemento 3D

O símbolo da marca vira um objeto 3D flutuante no fundo do Hero, do CTA final e do topo das páginas internas.

### Como funciona

`src/components/3d/logoShapes.ts` guarda o símbolo como **paths SVG num viewBox 0 0 100 100**. Cada path vira uma peça extrudada, com profundidade, posição em Z e cor próprias — o "A", a seta ascendente, o arco da nuvem e os nós de IA.

Para trocar pelo SVG oficial da marca: substitua o `d` de cada peça. Nada mais precisa mudar.

### Degradação por dispositivo

`src/hooks/usePerfTier.ts` classifica o aparelho e o site se adapta:

| Tier | Quando | O que roda |
|---|---|---|
| **high** | desktop com 4+ núcleos e ponteiro fino | geometria completa, material de transmissão, bisel, ~110 partículas, DPR até 2 |
| **medium** | notebook modesto ou tablet | material standard, sem bisel, ~45 partículas, DPR 1.5 |
| **low** | mobile, sem WebGL ou `prefers-reduced-motion` | **nenhum WebGL** — só o fallback CSS (gradiente cônico animado) |

O tier inicial é sempre `low`, então nenhum aparelho carrega WebGL antes de ser avaliado.

### Por que o site não fica lento

- O canvas entra por `next/dynamic` com `ssr: false` — three.js nem aparece no bundle do primeiro paint.
- Um `IntersectionObserver` **desmonta o canvas** quando a seção sai da tela, liberando contexto de GPU.
- A geometria é construída uma única vez, no mount; o loop de animação não aloca nada por frame.
- Sem sombras, sem pós-processamento pesado, DPR limitado por tier.
- `prefers-reduced-motion` desliga o 3D e congela as animações CSS.

### Ajustes rápidos

| Quero | Onde |
|---|---|
| O logo compete com o texto | reduza `opacity` no `<LazyScene>` da seção |
| Objeto muito grande ou pequeno | `LOGO_SCALE` em `logoShapes.ts` |
| Rotação mais lenta ou mais rápida | `inner.current.rotation.y += dt * 0.055` em `LogoMark3D.tsx` |
| Menos partículas | `tierSettings()` em `usePerfTier.ts` |
| Desligar o 3D numa seção | remova o `<LazyScene>` daquela seção |

> `LOGO_SCALE` está calibrado contra a câmera de `SceneCanvas.tsx` (z = 16, fov = 42°). Se mudar a câmera, recalibre a escala.

---

## Design system

Os tokens ficam em `@theme`, no topo de `src/app/globals.css`.

| Token | Valor | Nome oficial |
|---|---|---|
| `--color-primary` | `#00A1E0` | Salesforce Blue |
| `--color-secondary` | `#7A5CFA` | AI Violet |
| `--color-accent` | `#FF7A00` | Energy Orange |
| `--color-background` | `#0F172A` | Slate Navy |
| `--color-border` | `#E2E8F0` a 10% | — |

Gradiente oficial em `--gradient-brand`: **Cyan → Violeta → Laranja**.

Tipografia, conforme o manual: **Poppins** nos títulos, **Inter** no corpo, **Roboto Mono** em dados e labels técnicos.

Utilitários próprios: `shell` (container), `text-gradient`, `bar-gradient`, `glass`, `glass-strong`, `eyebrow`.

---

## Fontes

As três famílias são **auto-hospedadas** em `public/fonts` (arquivos `.woff2`, ~350 KB no total), declaradas em `src/app/fonts.css`.

Três consequências práticas: o build roda offline, o visitante não faz requisição ao Google (melhor para LGPD) e há uma conexão a menos no caminho crítico.

Para trocar uma fonte: coloque o `.woff2` em `public/fonts`, ajuste o `src` em `fonts.css` e o token correspondente em `globals.css`.

---

## SEO

Já implementado: title e description por página, Open Graph e Twitter Card, canonical, `sitemap.xml`, `robots.txt`, HTML semântico com hierarquia correta de headings, e dados estruturados schema.org (`ProfessionalService` no layout, `BreadcrumbList` nas internas).

**Antes de ir ao ar:** atualize `site.url` em `src/data/site.ts` com o domínio real.

Os dados estruturados em `src/lib/seo.ts` declaram apenas o que é verificável. Não adicione `aggregateRating`, `review` ou `award` sem material que comprove — rich snippet inventado é penalizado pelo Google.

---

## Acessibilidade

Link "pular para o conteúdo" no primeiro tab, foco sempre visível, navegação por teclado nos cards interativos, `aria-expanded` nos elementos que abrem e fecham, contraste conferido contra o fundo Slate Navy, e `prefers-reduced-motion` respeitado em toda a interface.

---

## Notas de conteúdo

O texto institucional, os indicadores e os três cases vêm de material documentado da AVLT (deck institucional, review de desenvolvimento Droz/Reclame Aqui e documentação técnica Nucleus).

A nomenclatura de produtos Salesforce foi conferida nas páginas oficiais em **setembro de 2026**. A Salesforce hoje nomeia a camada de agentes por domínio (*Agentforce Sales*, *Agentforce Service*, e assim por diante), enquanto as clouds de plataforma seguem existindo como base transacional — o site mostra os dois nomes lado a lado de propósito.

Salesforce, Agentforce, Data 360, Tableau, MuleSoft e Slack são marcas da Salesforce, Inc. Nenhum texto oficial da Salesforce foi reproduzido: as descrições são originais, produzidas a partir das fontes oficiais.

---

## Checklist antes de publicar

- [ ] `site.url` atualizado com o domínio real
- [ ] E-mail e telefone conferidos em `src/data/site.ts`
- [ ] Placeholders `[INSERIR ...]` resolvidos ou removidos em `projects.ts`
- [ ] Autorização dos clientes citados nos cases
- [ ] `og-image.png` revisado
- [ ] `npm run build` sem erros
- [ ] Caixas `comercial@` e `contato@` existindo de fato
- [ ] Domínio verificado no Resend (os três registros de DNS publicados)
- [ ] `RESEND_API_KEY` definida na Vercel
- [ ] Teste de envio feito pelos dois canais, com o e-mail chegando
"# Site-institucional-AVLT---Solution" 
