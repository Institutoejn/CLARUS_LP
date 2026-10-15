import React, { useState } from 'react';
import {
  ArrowRight,
  CircleDollarSign,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { HERO_CONTENT, QUICK_CAPTURE_PRESETS } from '../config/content';
import { parseQuickCaptureInput } from '../utils/quickCaptureParser';

interface HeroSectionProps {
  onNavigate: (href: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [captureInput, setCaptureInput] = useState(QUICK_CAPTURE_PRESETS[0].input);
  const parsed = parseQuickCaptureInput(captureInput);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) return;
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#F4F3FA] pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-12 lg:pb-28"
    >
      {/* Estruturação arquitetônica renovada da Fita "l" (elemento de fundo em laço contínuo e ecos paralelos) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 480"
        fill="none"
        className="pointer-events-none absolute -top-10 right-0 -z-10 h-[480px] w-full select-none"
      >
        <defs>
          {/* Gradiente de opacidade sobre a cor oficial #DEDCE8, mantendo a tonalidade exata sem introduzir novas cores */}
          <linearGradient id="fita-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DEDCE8" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#DEDCE8" stopOpacity="0.65" />
            <stop offset="80%" stopColor="#DEDCE8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#DEDCE8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="fita-accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DEDCE8" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#DEDCE8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#DEDCE8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Linhas guias horizontais sutis de ancoragem do grid */}
        <line x1="750" y1="120" x2="1440" y2="120" stroke="#DEDCE8" strokeWidth="1" strokeDasharray="4 8" opacity="0.35" />
        <line x1="750" y1="280" x2="1440" y2="280" stroke="#DEDCE8" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />

        {/* Múltipla fita em laço contínuo ascendente ("L" Fita com profundidade e ritmo) */}
        {/* Curva 1: Traço principal do laço ascendente da letra L */}
        <path
          d="M 780 430 C 920 420 1010 260 1060 110 C 1090 20 1165 15 1205 75 C 1245 140 1195 240 1130 285 C 1065 330 1020 375 1060 425 C 1095 470 1200 460 1340 390 C 1390 365 1430 335 1440 325"
          stroke="url(#fita-stroke-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Curva 2: Eco paralelo interno de profundidade (segunda perna do laço "L") */}
        <path
          d="M 795 442 C 935 432 1025 272 1075 122 C 1102 38 1172 32 1212 90 C 1250 152 1202 248 1140 292 C 1078 335 1035 382 1072 432 C 1108 475 1210 465 1350 398"
          stroke="url(#fita-accent-gradient)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />

        {/* Curva 3: Terceiro laço sutil estendido na base, trazendo fluidez adicional */}
        <path
          d="M 850 390 C 970 380 1045 290 1085 180 C 1115 95 1160 55 1190 95 C 1220 140 1180 215 1125 255 C 1070 295 1040 345 1075 390 C 1110 430 1220 420 1380 340"
          stroke="#DEDCE8"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />

        {/* Pontos de clareza e convergência visual ao longo da Fita */}
        <circle cx="1205" cy="75" r="4" fill="#DEDCE8" fillOpacity="0.5" />
        <circle cx="1130" cy="285" r="3" fill="#DEDCE8" fillOpacity="0.4" />
        <circle cx="1060" cy="425" r="3.5" fill="#DEDCE8" fillOpacity="0.45" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Coluna Esquerda: Narrativa Principal e Conversão */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2A1458]">
              {HERO_CONTENT.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className="mt-4 font-display text-[clamp(2.35rem,4.6vw,4.15rem)] font-bold leading-[0.98] tracking-[-0.045em] text-[#14121C] [text-wrap:balance]"
            >
              {HERO_CONTENT.headlinePart1}{' '}
              <span className="inline-block rounded-xl bg-[#2A1458] px-3 py-0.5 text-[#D7F744]">
                {HERO_CONTENT.headlineHighlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed text-[#625D70]">
              {HERO_CONTENT.subheadline}
            </p>

            {/* Ações de conversão primária e secundária */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href="https://app.clarusfinancas.com.br/login"
                onClick={(e) => handleCtaClick(e, '/register')}
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-[#2A1458] px-6 py-3.5 text-base font-medium text-white transition-colors duration-150 hover:bg-[#7E3BED] active:bg-[#14121C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
              >
                <span>{HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight className="size-4 shrink-0 text-[#D7F744]" aria-hidden="true" />
              </a>

              <a
                href={HERO_CONTENT.secondaryCta.href}
                onClick={(e) => handleCtaClick(e, HERO_CONTENT.secondaryCta.href)}
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-[#DEDCE8] bg-white px-6 py-3.5 text-base font-medium text-[#14121C] transition-colors duration-150 hover:bg-[#ECEAF3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
              >
                {HERO_CONTENT.secondaryCta.label}
              </a>
            </div>

            {/* Link rápido para quem já possui conta */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#625D70]">
              <span>{HERO_CONTENT.loginPrompt.text}</span>
              <a
                href="https://app.clarusfinancas.com.br/login"
                onClick={(e) => handleCtaClick(e, '/login')}
                className="inline-flex min-h-[36px] items-center font-medium text-[#2A1458] underline decoration-[#7E3BED] underline-offset-4 transition-colors hover:text-[#7E3BED]"
              >
                {HERO_CONTENT.loginPrompt.label}
              </a>
            </div>

            {/* Síntese de atributos reais (texto limpo com separador tipográfico, sem pílulas decorativas) */}
            <div className="mt-10 border-t border-[#DEDCE8] pt-6 text-xs text-[#625D70] sm:text-sm">
              <span>Captura rápida em texto natural</span>
              <span className="mx-2.5 text-[#DEDCE8]" aria-hidden="true">
                ·
              </span>
              <span>Categorias essenciais claras</span>
              <span className="mx-2.5 text-[#DEDCE8]" aria-hidden="true">
                ·
              </span>
              <span>Resumo e metas do mês</span>
            </div>
          </div>

          {/* Coluna Direita: Composição Visual Interativa do Produto (Fiel ao sistema da plataforma) */}
          <div className="relative flex flex-col justify-between rounded-[24px] bg-[#14121C] p-5 text-white shadow-xl sm:p-7 lg:p-8">
            {/* Atmosfera radial idêntica à AuthShell oficial da plataforma Clarus */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[24px] opacity-90 [background:radial-gradient(circle_at_18%_18%,#7E3BED_0,transparent_38%),radial-gradient(circle_at_84%_74%,#A982FF_0,transparent_30%),radial-gradient(circle_at_78%_14%,#D7F744_0,transparent_15%)]"
            />

            <div className="relative z-10 flex flex-col gap-5">
              {/* Cabeçalho do painel demonstrativo */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/65">
                    Experiência Clarus Finance
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-white">
                    Sua vida financeira, no lugar certo.
                  </p>
                </div>
                <span className="text-xs text-white/65">
                  Exemplo demonstrativo
                </span>
              </div>

              {/* Bloco 1: Captura Rápida Interativa (inspirada na tela de referência) */}
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="hero-quick-capture"
                    className="text-xs font-medium uppercase tracking-[0.14em] text-white/75"
                  >
                    Captura rápida — teste agora
                  </label>
                  <span className="text-xs text-[#D7F744]">Interativo</span>
                </div>

                <div className="mt-2.5 flex items-center gap-2.5 rounded-xl border border-white/20 bg-[#14121C]/80 px-3.5 py-2.5 focus-within:border-[#D7F744]">
                  <CircleDollarSign
                    className="size-5 shrink-0 text-[#D7F744]"
                    aria-hidden="true"
                  />
                  <input
                    id="hero-quick-capture"
                    type="text"
                    value={captureInput}
                    onChange={(e) => setCaptureInput(e.target.value)}
                    placeholder="Ex.: almoço 32 ifood"
                    aria-describedby="hero-capture-hint"
                    className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </div>

                {/* Sugestões clicáveis para testar a leitura imediata */}
                <div
                  id="hero-capture-hint"
                  className="mt-2.5 flex flex-wrap items-center gap-1.5"
                >
                  <span className="mr-1 text-xs text-white/60">Exemplos:</span>
                  {QUICK_CAPTURE_PRESETS.slice(0, 3).map((preset) => {
                    const isActive = captureInput.toLowerCase() === preset.input.toLowerCase();
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setCaptureInput(preset.input)}
                        className={`min-h-[32px] rounded-lg px-2.5 py-1 text-xs transition-colors ${
                          isActive
                            ? 'bg-[#D7F744] font-medium text-[#14121C]'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        {preset.input}
                      </button>
                    );
                  })}
                </div>

                {/* Resultado interpretado em tempo real */}
                <div
                  aria-live="polite"
                  className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3.5 py-3"
                >
                  {parsed.isValid ? (
                    <>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {parsed.description}
                        </p>
                        <p className="mt-0.5 text-xs text-white/70">
                          <span>{parsed.categoryLabel}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{parsed.dateLabel}</span>
                        </p>
                      </div>
                      <span
                        className={`shrink-0 font-mono text-sm font-semibold tabular-nums ${
                          parsed.type === 'income' ? 'text-[#D7F744]' : 'text-[#D7F744]'
                        }`}
                      >
                        {parsed.amountFormatted}
                      </span>
                    </>
                  ) : (
                    <p className="text-xs text-white/75">{parsed.errorMessage}</p>
                  )}
                </div>
              </div>

              {/* Bloco 2: Síntese Mensal Demonstrativa com Números Tabulares em Geist Mono */}
              <div className="rounded-2xl bg-white p-4 text-[#14121C] sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#2A1458]/10 text-[#2A1458]">
                      <Wallet className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#625D70]">Saldo do mês (exemplo)</p>
                      <p className="font-mono text-xl font-bold tracking-tight text-[#14121C] tabular-nums">
                        R$ 2.840,00
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#625D70]">Outubro</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#DEDCE8] pt-3.5">
                  <div className="rounded-xl bg-[#F4F3FA] p-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#625D70]">
                      <TrendingUp className="size-3.5 text-[#2A1458]" aria-hidden="true" />
                      <span>Entradas</span>
                    </div>
                    <p className="mt-1 font-mono text-sm font-semibold text-[#2A1458] tabular-nums">
                      + R$ 6.250,00
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F4F3FA] p-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#625D70]">
                      <TrendingDown className="size-3.5 text-[#14121C]" aria-hidden="true" />
                      <span>Saídas</span>
                    </div>
                    <p className="mt-1 font-mono text-sm font-semibold text-[#14121C] tabular-nums">
                      − R$ 3.410,00
                    </p>
                  </div>
                </div>

                {/* Leitura rápida por categoria */}
                <div className="mt-4 space-y-2.5 border-t border-[#DEDCE8] pt-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#14121C]">Moradia</span>
                    <span className="font-mono font-medium text-[#625D70] tabular-nums">
                      R$ 1.680,00 (49%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#ECEAF3]">
                    <div className="h-full w-[49%] rounded-full bg-[#2A1458]" />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-medium text-[#14121C]">Alimentação</span>
                    <span className="font-mono font-medium text-[#625D70] tabular-nums">
                      R$ 920,00 (27%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#ECEAF3]">
                    <div className="h-full w-[27%] rounded-full bg-[#7E3BED]" />
                  </div>
                </div>
              </div>
            </div>

            <p className="relative z-10 mt-4 text-center text-xs text-white/60">
              {HERO_CONTENT.demoDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
