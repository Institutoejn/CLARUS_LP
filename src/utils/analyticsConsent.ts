/**
 * Integração com o Ecossistema Google (Search Console, GA4, GTM e Consent Mode v2)
 * Regra estrita de privacidade (Seção 10 e 11):
 * - Não carrega scripts de analytics se VITE_GA_ID / VITE_GTM_ID não estiverem configurados.
 * - Não dispara tags antes do consentimento do titular (LGPD / Consent Mode v2).
 * - Nunca envia dados pessoais, valores financeiros ou conteúdo da área autenticada.
 */

export type ConsentStatus = 'granted' | 'denied' | 'unset';

export interface ConsentPreferences {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const CONSENT_STORAGE_KEY = 'clarus-lgpd-consent-v2';

declare global {
  interface Window {
    dataLayer?: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function getAnalyticsEnvConfig() {
  const gaId = (import.meta.env.VITE_GA_ID || '').trim();
  const gtmId = (import.meta.env.VITE_GTM_ID || '').trim();
  const siteVerification = (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '').trim();
  const forceBanner = import.meta.env.VITE_ENABLE_COOKIE_BANNER === 'true';

  return {
    gaId,
    gtmId,
    siteVerification,
    hasAnalyticsConfigured: Boolean(gaId || gtmId),
    shouldShowCookieBannerByDefault: Boolean(gaId || gtmId || forceBanner),
  };
}

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function initGoogleConsentModeDefault() {
  if (typeof window === 'undefined') return;
  const { hasAnalyticsConfigured } = getAnalyticsEnvConfig();
  if (!hasAnalyticsConfigured) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = window.gtag || gtag;

  const stored = getStoredConsent();
  window.gtag('consent', 'default', {
    ad_storage: stored?.marketing ? 'granted' : 'denied',
    ad_user_data: stored?.marketing ? 'granted' : 'denied',
    ad_personalization: stored?.marketing ? 'granted' : 'denied',
    analytics_storage: stored?.analytics ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });

  if (stored?.analytics || stored?.marketing) {
    loadConfiguredGoogleScripts();
  }
}

export function saveConsentPreferences(prefs: { analytics: boolean; marketing: boolean }): ConsentPreferences {
  const record: ConsentPreferences = {
    essential: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Fallback silencioso caso o navegador bloqueie localStorage
    }

    const { hasAnalyticsConfigured } = getAnalyticsEnvConfig();
    if (hasAnalyticsConfigured && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: record.marketing ? 'granted' : 'denied',
        ad_user_data: record.marketing ? 'granted' : 'denied',
        ad_personalization: record.marketing ? 'granted' : 'denied',
        analytics_storage: record.analytics ? 'granted' : 'denied',
      });
    }

    if (hasAnalyticsConfigured && (record.analytics || record.marketing)) {
      loadConfiguredGoogleScripts();
    }
  }

  return record;
}

let scriptsLoaded = false;

function loadConfiguredGoogleScripts() {
  if (typeof document === 'undefined' || scriptsLoaded) return;
  const { gaId, gtmId } = getAnalyticsEnvConfig();
  if (!gaId && !gtmId) return;

  scriptsLoaded = true;

  if (gaId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);

    window.gtag?.('js', new Date());
    window.gtag?.('config', gaId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  if (gtmId) {
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(gtmScript);
  }
}
