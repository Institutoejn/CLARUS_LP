/**
 * Fonte central de verdade visual — Clarus Finance Brand Kit v4.0
 * Nenhuma cor ou token deve ser espalhado de forma arbitrária pelo código.
 */

export const BRAND_TOKENS = {
  brandName: 'Clarus Finance',
  shortName: 'Clarus',
  wordmark: 'clarus.',
  colors: {
    violet: '#7E3BED',
    violetDeep: '#2A1458',
    violetSoft: '#A982FF',
    lime: '#D7F744',
    ink: '#14121C',
    paper: '#F4F3FA',
    white: '#FFFFFF',
    muted: '#ECEAF3',
    mutedForeground: '#625D70',
    border: '#DEDCE8',
    destructive: '#C94343',
  },
  typography: {
    display: "'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, sans-serif",
    sans: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'Geist Mono', ui-monospace, SFMono-Regular, monospace",
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  spacingBasePx: 4,
  assets: {
    logoLightSurface: '/brand/01-logos-svg/clarus-horizontal-color-transparent.svg',
    logoDarkSurface: '/brand/01-logos-svg/clarus-horizontal-color-dark-transparent.svg',
    logoCardClaro: '/brand/01-logos-svg/clarus-horizontal-color-fundo-claro.svg',
    logoCardEscuro: '/brand/01-logos-svg/clarus-horizontal-color-fundo-escuro.svg',
    reducaoColorida: '/brand/02-reducoes-svg/clarus-reducao-colorida.svg',
    reducaoClara: '/brand/02-reducoes-svg/clarus-reducao-clara.svg',
    appIcon1024: '/clarus-app-icon.png',
    openGraphImage: '/og-image.png',
  },
} as const;
