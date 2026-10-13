/**
 * Script automatizado de QA e verificação técnica — Clarus Finance
 * Executa validações de Brand Kit, SEO, JSON-LD, Parser de Captura Rápida e arquivos públicos.
 */

import fs from 'fs';
import path from 'path';
import {
  buildStructuredDataJsonLd,
  getRouteSeo,
  ROUTE_SEO_CONFIG,
} from '../src/config/seo';
import { FAQ_ITEMS } from '../src/config/content';
import { parseQuickCaptureInput } from '../src/utils/quickCaptureParser';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FALHA DE QA: ${message}`);
  }
}

function runQaVerification() {
  console.log('Iniciando verificação de QA da Clarus Finance...');

  // 1. Verificar integridade do logotipo vetorial oficial e curva Fita
  const logoLightPath = path.resolve(
    process.cwd(),
    'public/brand/01-logos-svg/clarus-horizontal-color-transparent.svg'
  );
  assert(fs.existsSync(logoLightPath), 'Logo horizontal transparente deve existir.');
  const logoSvgContent = fs.readFileSync(logoLightPath, 'utf-8');
  assert(
    logoSvgContent.includes('M260.00 258.00 C292.00 250.00 286.00 105.00 330.00 55.00'),
    'O desenho vetorial exclusivo da letra l (Fita) deve estar intacto no SVG.'
  );
  assert(
    logoSvgContent.includes('#D7F744'),
    'O ponto final em Lime (#D7F744) deve estar presente no wordmark.'
  );

  // 2. Verificar arquivos obrigatórios de SEO, ícones e fontes
  const requiredPublicFiles = [
    'public/robots.txt',
    'public/sitemap.xml',
    'public/manifest.webmanifest',
    'public/og-image.png',
    'public/favicon.svg',
    'public/favicon.ico',
    'public/apple-touch-icon.png',
    'public/fonts/BricolageGrotesque-Variable.ttf',
    'public/fonts/Geist-Variable.ttf',
    'public/fonts/GeistMono-Variable.ttf',
  ];

  for (const relPath of requiredPublicFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    assert(fs.existsSync(fullPath), `Arquivo público obrigatório ausente: ${relPath}`);
  }

  // Verificar dimensões 1200x630 da imagem Open Graph
  const ogBuf = fs.readFileSync(path.resolve(process.cwd(), 'public/og-image.png'));
  const ogWidth = ogBuf.readUInt32BE(16);
  const ogHeight = ogBuf.readUInt32BE(20);
  assert(
    ogWidth === 1200 && ogHeight === 630,
    `Imagem Open Graph deve ter 1200x630px (encontrado ${ogWidth}x${ogHeight}).`
  );

  // 3. Verificar regras de SEO (Title 50-60 chars, Description 140-160 chars, Indexação)
  const homeSeo = ROUTE_SEO_CONFIG['/'];
  assert(
    homeSeo.title.length >= 50 && homeSeo.title.length <= 60,
    `Title da home deve ter entre 50 e 60 caracteres (atual: ${homeSeo.title.length}).`
  );
  assert(
    homeSeo.description.length >= 140 && homeSeo.description.length <= 160,
    `Description da home deve ter entre 140 e 160 caracteres (atual: ${homeSeo.description.length}).`
  );
  assert(homeSeo.robots === 'index, follow', 'Home deve ser indexável (index, follow).');
  assert(
    getRouteSeo('/login').robots === 'noindex, nofollow',
    'Rota /login deve ter noindex, nofollow.'
  );
  assert(
    getRouteSeo('/register').robots === 'noindex, nofollow',
    'Rota /register deve ter noindex, nofollow.'
  );
  assert(
    getRouteSeo('/forgot-password').robots === 'noindex, nofollow',
    'Rota /forgot-password deve ter noindex, nofollow.'
  );
  assert(
    getRouteSeo('/app').robots === 'noindex, nofollow',
    'Rota /app deve ter noindex, nofollow.'
  );

  // Confirmar que robots.txt não bloqueia /login ou /register (para permitir leitura do noindex)
  const robotsTxt = fs.readFileSync(path.resolve(process.cwd(), 'public/robots.txt'), 'utf-8');
  assert(
    !robotsTxt.includes('Disallow: /login') && !robotsTxt.includes('Disallow: /register'),
    'robots.txt não deve bloquear /login ou /register para permitir leitura da diretiva noindex.'
  );

  // Confirmar que sitemap.xml contém apenas URLs públicas e não inclui /login, /register ou /app
  const sitemapXml = fs.readFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), 'utf-8');
  assert(
    !sitemapXml.includes('/login') &&
      !sitemapXml.includes('/register') &&
      !sitemapXml.includes('/app'),
    'sitemap.xml não deve conter rotas de autenticação ou áreas privadas.'
  );

  // 4. Verificar JSON-LD
  const jsonLd = buildStructuredDataJsonLd(
    'https://clarus.finance',
    FAQ_ITEMS.map((i) => ({ question: i.question, answer: i.answer }))
  );
  const jsonLdStr = JSON.stringify(jsonLd);
  assert(jsonLdStr.includes('"Organization"'), 'JSON-LD deve conter Organization.');
  assert(jsonLdStr.includes('"WebSite"'), 'JSON-LD deve conter WebSite.');
  assert(jsonLdStr.includes('"SoftwareApplication"'), 'JSON-LD deve conter SoftwareApplication.');
  assert(jsonLdStr.includes('"FAQPage"'), 'JSON-LD deve conter FAQPage.');
  assert(!jsonLdStr.includes('aggregateRating'), 'JSON-LD não deve conter avaliações inventadas.');

  // 5. Verificar Parser de Captura Rápida
  const parsedFood = parseQuickCaptureInput('almoço 32 ifood');
  assert(parsedFood.isValid, 'Parser deve validar "almoço 32 ifood".');
  assert(parsedFood.categoryLabel === 'Alimentação', 'Categoria esperada: Alimentação.');
  assert(parsedFood.amountCents === -3200, 'Valor em centavos esperado: -3200.');

  const parsedTransport = parseQuickCaptureInput('uber 24,90 ontem');
  assert(parsedTransport.isValid, 'Parser deve validar "uber 24,90 ontem".');
  assert(parsedTransport.categoryLabel === 'Transporte', 'Categoria esperada: Transporte.');
  assert(parsedTransport.dateLabel === 'ontem', 'Data relativa esperada: ontem.');

  const parsedIncome = parseQuickCaptureInput('recebi freelance 1.450,00');
  assert(parsedIncome.isValid && parsedIncome.type === 'income', 'Deve identificar receita.');
  assert(parsedIncome.amountCents === 145000, 'Valor esperado: +145000 centavos.');

  console.log('✓ Todas as verificações de QA passaram com sucesso!');
}

runQaVerification();
