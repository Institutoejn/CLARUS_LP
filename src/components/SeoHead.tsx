import React, { useEffect } from 'react';
import {
  buildStructuredDataJsonLd,
  getRouteSeo,
  getSiteBaseUrl,
} from '../config/seo';
import { FAQ_ITEMS } from '../config/content';
import { getAnalyticsEnvConfig } from '../utils/analyticsConsent';

interface SeoHeadProps {
  pathname: string;
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const SeoHead: React.FC<SeoHeadProps> = ({ pathname }) => {
  useEffect(() => {
    const seo = getRouteSeo(pathname);
    const baseUrl = getSiteBaseUrl();
    const canonicalUrl =
      seo.canonicalPath === '/' ? `${baseUrl}/` : `${baseUrl}${seo.canonicalPath}`;
    const ogImageUrl = `${baseUrl}/og-image.png`;

    document.documentElement.lang = 'pt-BR';
    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', seo.robots);
    upsertMeta('name', 'theme-color', '#2A1458');
    upsertLink('canonical', canonicalUrl);

    // Open Graph
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', 'Clarus Finance');
    upsertMeta('property', 'og:locale', 'pt_BR');
    upsertMeta('property', 'og:type', seo.ogType || 'website');
    upsertMeta('property', 'og:image', ogImageUrl);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', 'Clarus Finance — Seu dinheiro, finalmente claro.');

    // Twitter Card
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', ogImageUrl);

    // Google Site Verification (somente se configurada)
    const { siteVerification } = getAnalyticsEnvConfig();
    if (siteVerification) {
      upsertMeta('name', 'google-site-verification', siteVerification);
    }

    // JSON-LD Structured Data (apenas na landing page pública e rotas indexáveis)
    const existingScript = document.getElementById('clarus-json-ld');
    if (seo.robots === 'index, follow') {
      const jsonLd = buildStructuredDataJsonLd(
        baseUrl,
        FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
      );
      if (existingScript) {
        existingScript.textContent = JSON.stringify(jsonLd);
      } else {
        const script = document.createElement('script');
        script.id = 'clarus-json-ld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
      }
    } else if (existingScript) {
      existingScript.remove();
    }
  }, [pathname]);

  return null;
};
