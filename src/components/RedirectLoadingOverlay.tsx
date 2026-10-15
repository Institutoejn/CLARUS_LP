import React, { useEffect, useState } from 'react';
import { BRAND_TOKENS } from '../config/tokens';

interface RedirectLoadingOverlayProps {
  isOpen: boolean;
  targetUrl?: string;
  onRedirectStart?: () => void;
}

export const OFFICIAL_PLATFORM_URL = 'https://app.clarusfinancas.com.br/login';

// Pre-carregamento imediato na memória do navegador (0ms latência visual)
if (typeof window !== 'undefined') {
  const preloadSvg = new Image();
  preloadSvg.src = '/brand/02-reducoes-svg/clarus-reducao-colorida.svg';
  const preloadPng = new Image();
  preloadPng.src = BRAND_TOKENS.assets.appIcon1024;
}

export const RedirectLoadingOverlay: React.FC<RedirectLoadingOverlayProps> = ({
  isOpen,
  targetUrl = OFFICIAL_PLATFORM_URL,
  onRedirectStart,
}) => {
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    if (!isOpen) {
      setProgress(35);
      return;
    }

    onRedirectStart?.();

    // Início imediato com aceleração suave de progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 98;
        }
        return prev + 22;
      });
    }, 100);

    // Redirecionamento ágil e fluido (700ms para experiência instantânea)
    const timeout = setTimeout(() => {
      setProgress(100);
      if (typeof window !== 'undefined') {
        window.location.href = targetUrl;
      }
    }, 700);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isOpen, targetUrl, onRedirectStart]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Redirecionando para a plataforma Clarus Finance"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#14121C] px-6 text-center text-white animate-fade-in"
    >
      {/* Atmosfera de luz de fundo otimizada */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(circle_at_50%_35%,#7E3BED_0,transparent_45%),radial-gradient(circle_at_80%_80%,#2A1458_0,transparent_50%),radial-gradient(circle_at_20%_80%,#D7F744_0,transparent_20%)]"
      />

      {/* Cartão Centralizado de Transição */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
        {/* Ícone da Logo Otimizado (SVG de 1KB de alto desempenho) */}
        <div className="relative flex size-28 items-center justify-center sm:size-32">
          {/* Anel giratório externo de carregamento */}
          <div className="absolute inset-0 animate-spin rounded-full border-3 border-transparent border-t-[#D7F744] border-r-[#7E3BED]" />

          {/* Pulso de brilho interno */}
          <div className="absolute inset-2 animate-ping rounded-full bg-[#7E3BED]/25 duration-700" />

          {/* Ícone Vetorial Oficial da Clarus */}
          <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-[#2A1458] p-3.5 shadow-lg sm:size-24">
            <img
              src="/brand/02-reducoes-svg/clarus-reducao-colorida.svg"
              alt="Clarus Finance"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="size-full object-contain"
            />
          </div>
        </div>

        {/* Badge e Frase Principal Solicitada */}
        <div className="mt-7 flex flex-col items-center">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D7F744]">
            PLATAFORMA CLARUS FINANCE
          </span>

          <h2 className="mt-3 font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold leading-tight tracking-[-0.03em] text-white">
            Organize o seu dinheiro agora!
          </h2>

          <p className="mt-2 text-sm font-medium text-white/90 sm:text-base">
            Com toda a clareza e leveza que você merece.
          </p>
        </div>

        {/* Barra de Progresso Rápida do Redirecionamento */}
        <div className="mt-8 w-full">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[#D7F744] transition-all duration-150 ease-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>

          <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-white/80">
            <span className="inline-block size-2 animate-pulse rounded-full bg-[#D7F744]" />
            <span>Redirecionando para a plataforma oficial...</span>
          </p>
        </div>
      </div>
    </div>
  );
};
