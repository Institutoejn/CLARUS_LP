# Clarus Finance — Landing Page e Fluxos Públicos de Produção

Landing page institucional, fluxos de acesso (`/login`, `/register`, `/forgot-password`), páginas de transparência jurídica (`/privacidade`, `/termos`, `/acessibilidade`), página `404` e ambiente demonstrativo (`/app`) da **Clarus Finance**, construídos rigorosamente a partir do **Clarus Finance Brand Kit v4.0** e da plataforma de referência (`https://v0-clarus.vercel.app/login`).

---

## 1. Identidade Visual e Fonte de Verdade (Brand Kit v4.0)

Todos os tokens visuais, fontes e ativos vetoriais estão centralizados em:
- `src/config/tokens.ts` e `src/index.css`
- `public/brand/01-logos-svg/` (Wordmarks horizontais oficiais com a letra `l` exclusiva **Fita** e ponto final Lime `#D7F744`)
- `public/brand/02-reducoes-svg/` (Reduções oficiais `cl.`)
- `public/brand/05-favicons-e-app-icons/` (Favicons PNG/SVG/ICO, Apple Touch Icon e ícones do Web App Manifest)
- `public/brand/06-redes-sociais/clarus-open-graph-1200x630.png` e `public/og-image.png`
- `public/brand/07-arquivos-para-codigo/` (`clarus-brand-tokens.css`, `clarus-brand-tokens.json`, `clarus-font-face.css`, `site.webmanifest`)
- `public/fonts/` (`BricolageGrotesque-Variable.ttf`, `Geist-Variable.ttf`, `GeistMono-Variable.ttf`)

### Paleta Oficial
| Token | Hex | Aplicação |
| :--- | :--- | :--- |
| **Violet** | `#7E3BED` | Destaques interativos, foco visível (`focus-visible`), indicadores secundários |
| **Violet Deep** | `#2A1458` | CTAs primários, superfícies de autoridade, `theme-color` |
| **Violet Soft** | `#A982FF` | Atmosfera luminosa nos painéis editoriais escuros |
| **Lime** | `#D7F744` | Acento de energia, ponto final do wordmark `clarus.` e destaques pontuais |
| **Ink** | `#14121C` | Tipografia principal, rodapé e cartões escuros de alto contraste |
| **Paper** | `#F4F3FA` | Fundo principal leve e acolhedor |
| **White** | `#FFFFFF` | Cartões, superfícies elevadas e campos de formulário |

### Tipografia
- **Display e Títulos:** `Bricolage Grotesque` (`font-display: swap`)
- **Interface e Conteúdo:** `Geist` (`font-display: swap`)
- **Valores Financeiros e Números Tabulares:** `Geist Mono` com `font-variant-numeric: tabular-nums`

---

## 2. Arquitetura Técnica e Adaptação ao Ambiente

O ambiente de execução utiliza **React 19 + TypeScript + Tailwind CSS v4 + Vite + Express (`server.ts`)**, estruturado para entregar paridade funcional com Next.js App Router:

1. **HTML Semântico Pré-renderizado + Hidratação Cliente:** `index.html` contém a estrutura semântica principal (`<header>`, `<main>`, `<h1>Seu dinheiro, finalmente claro.</h1>`, seções e JSON-LD) imediatamente legível sem depender exclusivamente de JavaScript, além de injeção de metadados por rota no servidor Express (`server.ts`).
2. **Controle de Indexação (`X-Robots-Tag` e `<meta name="robots">`):**
   - Rotas públicas indexáveis (`/`, `/privacidade`, `/termos`, `/acessibilidade`): `index, follow`
   - Rotas de autenticação, áreas internas e erro (`/login`, `/register`, `/forgot-password`, `/app`, `/404`): `noindex, nofollow` tanto via `<meta name="robots">` quanto via cabeçalho HTTP `X-Robots-Tag: noindex, nofollow`.
3. **Cabeçalhos de Segurança:** `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy`.

---

## 3. Instalação, Execução, Build e Testes de QA

```bash
# 1. Instalar dependências
npm install

# 2. Executar em ambiente de desenvolvimento (porta 3000)
npm run dev

# 3. Checagem estrita de tipos TypeScript
npm run lint

# 4. Executar suíte automatizada de QA (Brand Kit, SEO, JSON-LD, Parser)
npx tsx scripts/verify-qa.ts

# 5. Gerar build de produção
npm run build

# 6. Iniciar servidor de produção
npm start
```

---

## 4. Configuração de Variáveis de Ambiente (`.env`)

Copie `.env.example` para `.env` e ajuste conforme o ambiente de publicação:

```dotenv
VITE_SITE_URL=https://clarus.finance
APP_URL=https://clarus.finance
VITE_GOOGLE_SITE_VERIFICATION=
VITE_GA_ID=
VITE_GTM_ID=
VITE_ENABLE_COOKIE_BANNER=false
```

---

## 5. Guia do Ecossistema Google (Search Console, Sitemap, GA4/GTM e LGPD)

### 5.1 Google Search Console e Sitemap
1. Acesse o [Google Search Console](https://search.google.com/search-console) e adicione a propriedade do domínio oficial.
2. Caso opte por verificação via meta tag HTML, copie o código fornecido pelo Google e preencha `VITE_GOOGLE_SITE_VERIFICATION` no ambiente de produção. A tag `<meta name="google-site-verification" content="...">` será renderizada automaticamente.
3. No menu **Sitemaps** do Search Console, envie a URL `https://SEU-DOMINIO/sitemap.xml`.
4. Utilize a ferramenta **Inspeção de URL** para validar a indexação de `/` e confirmar que `/login` e `/register` retornam `noindex, nofollow`.

### 5.2 Google Analytics 4 / Tag Manager e Consent Mode v2
1. Defina `VITE_GA_ID` (ex.: `G-XXXXXXXXXX`) e/ou `VITE_GTM_ID` (ex.: `GTM-XXXXXXX`) nas variáveis de ambiente.
2. **Nenhum script é carregado se os IDs estiverem vazios.**
3. Quando configurados, o módulo `src/utils/analyticsConsent.ts` inicializa o **Google Consent Mode v2** com `analytics_storage: 'denied'` e `ad_storage: 'denied'` por padrão até que o visitante manifeste consentimento no banner LGPD (`CookieConsentBanner.tsx`).
4. **Garantia de Privacidade Financeira:** Nenhuma rota autenticada (`/app`), descrição de despesa ou valor financeiro é enviado como parâmetro de evento para o Google Analytics.

---

## 6. Pendências Marcadas para Validação (`TODO: validar com a Clarus`)

Seguindo a diretriz de não inventar dados comerciais, societários ou jurídicos não confirmados:

1. **Política Comercial / Preços (`src/config/content.ts` e `src/config/seo.ts`):** Confirmar se haverá planos pagos futuros ou gratuidade permanente antes de adicionar a propriedade `offers` no schema `SoftwareApplication` e na resposta de custo do FAQ.
2. **Dados Societários e Contato Institucional (`src/components/Footer.tsx` e `src/pages/LegalAnd404Pages.tsx`):** Inserir razão social, CNPJ, endereço (se aplicável), e-mail oficial de suporte e contato do Encarregado de Dados (DPO).
3. **Homologação Jurídica (`src/pages/LegalAnd404Pages.tsx` e `src/config/content.ts`):** Validar o texto final dos Termos de Uso, da Política de Privacidade e as especificações técnicas de armazenamento/criptografia.

---

## 7. Checklist de Publicação e QA

- [x] Wordmark oficial `clarus.` com letra `l` **Fita** preservado em SVG vetorial sem distorção.
- [x] Fontes locais `Bricolage Grotesque`, `Geist` e `Geist Mono` (`tabular-nums`) configuradas com `font-display: swap`.
- [x] Responsividade testada para `320px`, `360px`, `390px`, `768px`, `1024px`, `1280px`, `1440px` e `1920px` sem scroll horizontal.
- [x] Acessibilidade WCAG 2.2 AA: link de salto, apenas um `H1` por página, alvos `>= 44×44 px`, acordeão com `aria-expanded` / `aria-controls` e suporte a teclado, menu mobile com bloqueio de fundo e fechamento por `Escape`.
- [x] SEO técnico completo: `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `og-image.png` (`1200×630`), favicons oficiais e JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`).

## 8. Abertura motion da LP

A home começa com a composição Remotion de 30 segundos fornecida em `Clarus-Motion-Remotion.zip`, integrada como React em `src/motion/`. Não exige exportação de MP4. O player e as cenas são carregados separadamente da LP; a marca reutiliza o SVG local.

- Reprodução automática, sem áudio e sem loop; pausa e link para pular sempre disponíveis na abertura.
- O motion permanece fixo enquanto a hero e o restante do site sobem por cima, com rolagem nativa e sem bloquear mouse, toque ou teclado.
- Ao terminar, avança até a hero somente se não houve interação, a página está visível e a pessoa continua no topo. Rolagem manual, foco por teclado e uso dos controles cancelam esse avanço.
- Fora da abertura ou com a aba oculta, pausa a reprodução. Voltar ao topo permite retomá-la pelo controle.
- Celular/tablet em formato retrato usam composição vertical de 720×1280 com as mesmas cenas reorganizadas; desktop usa 1920×1080.
- `prefers-reduced-motion` inicia em um quadro estático, sem avanço automático ou efeito fixo. A reprodução pode ser iniciada pelo visitante.
- `VITE_ENABLE_MOTION_INTRO=false` desativa a abertura no build/dev e retorna à home direta. Por padrão está habilitada. Nenhuma outra rota recebe a introdução.

A implementação não publica alterações no site de produção. Validar também em dispositivos reais, principalmente Safari/iOS, antes de publicar.
