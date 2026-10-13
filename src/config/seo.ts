/**
 * Configuração centralizada de SEO Técnico, Metadados por Rota e Dados Estruturados (JSON-LD)
 * Clarus Finance — Produção
 */

export interface RouteSeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  robots: 'index, follow' | 'noindex, nofollow';
  ogType?: 'website' | 'article';
}

export function getSiteBaseUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) {
    return String(import.meta.env.VITE_SITE_URL).replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }
  return 'https://clarus.finance';
}

/**
 * Títulos entre 50 e 60 caracteres e meta descriptions entre 140 e 160 caracteres
 * na landing page principal, conforme diretrizes de SEO técnico.
 */
export const ROUTE_SEO_CONFIG: Record<string, RouteSeoMetadata> = {
  '/': {
    // 57 caracteres
    title: 'Clarus Finance — Organização Financeira Pessoal com Clareza',
    // 155 caracteres
    description:
      'Organize sua vida financeira com clareza, simplicidade e leveza. Registre movimentações com captura rápida, acompanhe categorias e metas na Clarus Finance.',
    canonicalPath: '/',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/login': {
    title: 'Entrar na sua conta — Clarus Finance',
    description:
      'Acesse sua conta na Clarus Finance para registrar movimentações, visualizar categorias e acompanhar sua rotina financeira no lugar certo.',
    canonicalPath: '/login',
    robots: 'noindex, nofollow',
  },
  '/register': {
    title: 'Criar minha conta — Clarus Finance',
    description:
      'Crie sua conta na Clarus Finance e comece a registrar, organizar e compreender suas finanças pessoais com clareza e menos atrito.',
    canonicalPath: '/register',
    robots: 'noindex, nofollow',
  },
  '/forgot-password': {
    title: 'Recuperar acesso à conta — Clarus Finance',
    description:
      'Solicite a redefinição de senha da sua conta na Clarus Finance com segurança.',
    canonicalPath: '/forgot-password',
    robots: 'noindex, nofollow',
  },
  '/app': {
    title: 'Visão geral financeira — Clarus Finance',
    description: 'Ambiente autenticado da plataforma Clarus Finance.',
    canonicalPath: '/app',
    robots: 'noindex, nofollow',
  },
  '/privacidade': {
    title: 'Política de Privacidade — Clarus Finance',
    description:
      'Conheça as diretrizes de privacidade, proteção de dados pessoais e transparência no tratamento de informações da Clarus Finance.',
    canonicalPath: '/privacidade',
    robots: 'index, follow',
    ogType: 'article',
  },
  '/termos': {
    title: 'Termos de Uso — Clarus Finance',
    description:
      'Leia os Termos de Uso e condições gerais de utilização da plataforma de organização financeira pessoal Clarus Finance.',
    canonicalPath: '/termos',
    robots: 'index, follow',
    ogType: 'article',
  },
  '/acessibilidade': {
    title: 'Declaração de Acessibilidade — Clarus Finance',
    description:
      'Compromisso da Clarus Finance com acessibilidade digital, navegação por teclado, contraste WCAG 2.2 AA e leitura clara.',
    canonicalPath: '/acessibilidade',
    robots: 'index, follow',
    ogType: 'article',
  },
  '/404': {
    title: 'Página não encontrada (404) — Clarus Finance',
    description:
      'A página que você tentou acessar não foi encontrada. Volte ao início da Clarus Finance.',
    canonicalPath: '/404',
    robots: 'noindex, nofollow',
  },
};

export function getRouteSeo(pathname: string): RouteSeoMetadata {
  const normalized = pathname === '' ? '/' : pathname.replace(/\/+$/, '') || '/';
  if (ROUTE_SEO_CONFIG[normalized]) {
    return ROUTE_SEO_CONFIG[normalized];
  }
  if (
    normalized.startsWith('/app') ||
    normalized.startsWith('/dashboard') ||
    normalized.startsWith('/conta') ||
    normalized.startsWith('/configuracoes') ||
    normalized.startsWith('/onboarding')
  ) {
    return {
      title: 'Área da Conta — Clarus Finance',
      description: 'Ambiente autenticado da Clarus Finance.',
      canonicalPath: normalized,
      robots: 'noindex, nofollow',
    };
  }
  return ROUTE_SEO_CONFIG['/404'];
}

/**
 * Gera os dados estruturados JSON-LD consistentes exclusivamente com informações
 * reais e visíveis na página (Organization, WebSite, SoftwareApplication e FAQPage).
 * Não inclui avaliações, notas, preços ou dados de empresa fictícios.
 */
export function buildStructuredDataJsonLd(
  siteUrl: string,
  faqItems: Array<{ question: string; answer: string }>
) {
  const cleanUrl = siteUrl.replace(/\/+$/, '');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${cleanUrl}/#organization`,
        name: 'Clarus Finance',
        alternateName: 'Clarus',
        url: `${cleanUrl}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${cleanUrl}/brand/01-logos-svg/clarus-horizontal-color-fundo-claro.svg`,
          width: 1200,
          height: 360,
        },
        description:
          'Plataforma de organização financeira pessoal criada para tornar a relação com o dinheiro mais clara, simples e leve.',
        // TODO: validar com a Clarus — adicionar sameAs, contactPoint, razão social e CNPJ somente quando confirmados oficialmente
      },
      {
        '@type': 'WebSite',
        '@id': `${cleanUrl}/#website`,
        url: `${cleanUrl}/`,
        name: 'Clarus Finance',
        description:
          'Organize sua vida financeira com clareza, simplicidade e leveza. Clareza para cada escolha.',
        inLanguage: 'pt-BR',
        publisher: {
          '@id': `${cleanUrl}/#organization`,
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${cleanUrl}/#software`,
        name: 'Clarus Finance',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        url: `${cleanUrl}/`,
        inLanguage: 'pt-BR',
        description:
          'Plataforma web de organização financeira pessoal com captura rápida de movimentações, organização por categorias, resumo mensal e acompanhamento de metas.',
        featureList: [
          'Captura rápida de movimentações financeiras em linguagem natural',
          'Categorização de receitas e despesas (Alimentação, Transporte, Moradia, Lazer, Saúde, Educação)',
          'Resumo financeiro mensal de entradas, saídas e saldo',
          'Acompanhamento de metas financeiras pessoais',
        ],
        // TODO: validar com a Clarus — adicionar propriedade "offers" apenas após confirmação oficial da política comercial e de preços
      },
      {
        '@type': 'FAQPage',
        '@id': `${cleanUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}
