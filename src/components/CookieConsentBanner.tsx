import React, { useEffect, useState } from 'react';
import {
  getAnalyticsEnvConfig,
  getStoredConsent,
  initGoogleConsentModeDefault,
  saveConsentPreferences,
} from '../utils/analyticsConsent';

interface CookieConsentBannerProps {
  forceOpen?: boolean;
  onCloseForce?: () => void;
  onNavigate?: (href: string) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  forceOpen = false,
  onCloseForce,
  onNavigate,
}) => {
  const [visible, setVisible] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    initGoogleConsentModeDefault();
    const stored = getStoredConsent();
    const { shouldShowCookieBannerByDefault } = getAnalyticsEnvConfig();

    if (stored) {
      setAnalyticsEnabled(stored.analytics);
      setMarketingEnabled(stored.marketing);
    } else if (shouldShowCookieBannerByDefault) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (forceOpen) {
      const stored = getStoredConsent();
      if (stored) {
        setAnalyticsEnabled(stored.analytics);
        setMarketingEnabled(stored.marketing);
      }
      setVisible(true);
    }
  }, [forceOpen]);

  if (!visible) return null;

  const handleAcceptAll = () => {
    saveConsentPreferences({ analytics: true, marketing: true });
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    setVisible(false);
    onCloseForce?.();
  };

  const handleRejectOptional = () => {
    saveConsentPreferences({ analytics: false, marketing: false });
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setVisible(false);
    onCloseForce?.();
  };

  const handleSaveCustom = () => {
    saveConsentPreferences({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    });
    setVisible(false);
    onCloseForce?.();
  };

  return (
    <aside
      aria-label="Preferências de privacidade e cookies"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border border-[#DEDCE8] bg-white p-5 shadow-xl sm:p-6"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-display text-lg font-semibold text-[#14121C]">
            Respeitamos sua privacidade (LGPD)
          </h2>
          <p className="text-sm leading-relaxed text-[#625D70]">
            Utilizamos apenas o armazenamento essencial para o funcionamento da plataforma. Cookies de
            análise (Google Consent Mode v2) só são ativados se você autorizar explicitamente. Valores
            financeiros e registros pessoais nunca são enviados para ferramentas de tráfego. Consulte
            nossa{' '}
            <a
              href="/privacidade"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/privacidade');
                }
              }}
              className="font-medium text-[#2A1458] underline underline-offset-4 hover:text-[#7E3BED]"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </div>

        {showDetails && (
          <div className="grid gap-3 rounded-xl bg-[#F4F3FA] p-4 text-sm sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#14121C]">Essenciais</span>
                <span className="text-xs font-medium text-[#625D70]">Sempre ativos</span>
              </div>
              <p className="text-xs text-[#625D70]">
                Necessários para sessão, segurança e preferências de acessibilidade.
              </p>
            </div>

            <label className="flex cursor-pointer flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#14121C]">Análise (GA4)</span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="size-4 accent-[#2A1458]"
                />
              </div>
              <p className="text-xs text-[#625D70]">
                Métricas agregadas de navegação nas páginas públicas, sem dados financeiros.
              </p>
            </label>

            <label className="flex cursor-pointer flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#14121C]">Marketing</span>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="size-4 accent-[#2A1458]"
                />
              </div>
              <p className="text-xs text-[#625D70]">
                Mensuração de campanhas institucionais sob Consent Mode v2.
              </p>
            </label>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="min-h-[44px] px-2 text-xs font-medium text-[#625D70] underline underline-offset-4 hover:text-[#14121C]"
          >
            {showDetails ? 'Ocultar detalhes' : 'Personalizar preferências'}
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleRejectOptional}
              className="min-h-[44px] rounded-xl border border-[#DEDCE8] bg-white px-4 py-2 text-xs font-medium text-[#14121C] transition-colors hover:bg-[#F4F3FA]"
            >
              Apenas essenciais
            </button>
            {showDetails ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="min-h-[44px] rounded-xl bg-[#2A1458] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#7E3BED]"
              >
                Salvar escolhas
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAcceptAll}
                className="min-h-[44px] rounded-xl bg-[#2A1458] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#7E3BED]"
              >
                Aceitar opcionais
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
