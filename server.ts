import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getRouteSeo } from './src/config/seo';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProd = process.env.NODE_ENV === 'production';

function getConfiguredSiteUrl(): string {
  const raw =
    process.env.VITE_SITE_URL ||
    process.env.APP_URL ||
    'https://clarus.finance';
  return raw.replace(/\/+$/, '');
}

async function startServer() {
  const app = express();
  app.disable('x-powered-by');

  // Cache-Control otimizado para ativos estáticos, imagens e fontes
  app.use((req, res, next) => {
    if (/\.(png|jpg|jpeg|svg|ico|webp|ttf|woff|woff2)$/i.test(req.path)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });

  // Cabeçalhos de segurança e privacidade (Seção 11)
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
    );
    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://app.clarusfinancas.com.br https://www.google-analytics.com https://region1.google-analytics.com",
        "frame-ancestors *",
        "base-uri 'self'",
        "form-action 'self' https://app.clarusfinancas.com.br",
      ].join('; ')
    );
    next();
  });

  // Gerador dinâmico de robots.txt com domínio oficial configurável
  app.get('/robots.txt', (_req, res) => {
    const siteUrl = getConfiguredSiteUrl();
    const content = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /dashboard/',
      'Disallow: /app/',
      'Disallow: /conta/',
      'Disallow: /configuracoes/',
      'Disallow: /onboarding/',
      '',
      `Sitemap: ${siteUrl}/sitemap.xml`,
      `Host: ${siteUrl}`,
      '',
    ].join('\n');

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(content);
  });

  // Gerador dinâmico de sitemap.xml (apenas URLs públicas, canônicas, indexáveis e status 200)
  app.get('/sitemap.xml', (_req, res) => {
    const siteUrl = getConfiguredSiteUrl();
    const indexablePaths = [
      { path: '/', changefreq: 'weekly', priority: '1.0' },
      { path: '/privacidade', changefreq: 'monthly', priority: '0.5' },
      { path: '/termos', changefreq: 'monthly', priority: '0.5' },
      { path: '/acessibilidade', changefreq: 'monthly', priority: '0.4' },
    ];

    const urlsXml = indexablePaths
      .map(
        (u) => `  <url>
    <loc>${siteUrl}${u.path}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
      )
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(xml);
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl.split('?')[0];
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);

        const seo = getRouteSeo(url);
        const siteUrl = getConfiguredSiteUrl();
        const canonicalUrl =
          seo.canonicalPath === '/' ? `${siteUrl}/` : `${siteUrl}${seo.canonicalPath}`;

        // Aplica X-Robots-Tag nas rotas de autenticação, áreas internas e 404
        res.setHeader('X-Robots-Tag', seo.robots);

        // Personaliza metadados diretamente no HTML servido pelo servidor
        const renderedHtml = template
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`)
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
            `<meta name="description" content="${seo.description}" />`
          )
          .replace(
            /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
            `<meta name="robots" content="${seo.robots}" />`
          )
          .replace(
            /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
            `<link rel="canonical" href="${canonicalUrl}" />`
          );

        const isKnownRoute = Boolean(
          ['/', '/login', '/register', '/forgot-password', '/app', '/privacidade', '/termos', '/acessibilidade'].includes(
            url.replace(/\/+$/, '') || '/'
          )
        );

        res
          .status(isKnownRoute ? 200 : 404)
          .set({ 'Content-Type': 'text/html; charset=utf-8' })
          .end(renderedHtml);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { index: false }));

    app.use('*', (req, res) => {
      const url = req.originalUrl.split('?')[0];
      const seo = getRouteSeo(url);
      const siteUrl = getConfiguredSiteUrl();
      const canonicalUrl =
        seo.canonicalPath === '/' ? `${siteUrl}/` : `${siteUrl}${seo.canonicalPath}`;

      res.setHeader('X-Robots-Tag', seo.robots);

      const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
      const renderedHtml = template
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`)
        .replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
          `<meta name="description" content="${seo.description}" />`
        )
        .replace(
          /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
          `<meta name="robots" content="${seo.robots}" />`
        )
        .replace(
          /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
          `<link rel="canonical" href="${canonicalUrl}" />`
        );

      const isKnownRoute = Boolean(
        ['/', '/login', '/register', '/forgot-password', '/app', '/privacidade', '/termos', '/acessibilidade'].includes(
          url.replace(/\/+$/, '') || '/'
        )
      );

      res
        .status(isKnownRoute ? 200 : 404)
        .set({ 'Content-Type': 'text/html; charset=utf-8' })
        .end(renderedHtml);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clarus Finance server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
