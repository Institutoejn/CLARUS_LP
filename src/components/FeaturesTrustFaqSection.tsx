import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import {
  FAQ_ITEMS,
  FEATURES_CONTENT,
  TRUST_CONTENT,
} from '../config/content';

interface FeaturesTrustFaqSectionProps {
  onNavigate: (href: string) => void;
}

export const FeaturesTrustFaqSection: React.FC<FeaturesTrustFaqSectionProps> = ({
  onNavigate,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);
  const faqButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) return;
    e.preventDefault();
    onNavigate(href);
  };

  const handleFaqKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    const total = FAQ_ITEMS.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (currentIndex + 1) % total;
      faqButtonRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (currentIndex - 1 + total) % total;
      faqButtonRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      faqButtonRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      faqButtonRefs.current[total - 1]?.focus();
    }
  };

  return (
    <>
      {/* SEÇÃO: BENEFÍCIOS E RECURSOS (#recursos) — Bento Grid Assimétrico */}
      <section
        id="recursos"
        aria-labelledby="recursos-heading"
        className="scroll-mt-20 border-t border-[#DEDCE8] bg-[#F4F3FA] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2A1458]">
              {FEATURES_CONTENT.eyebrow}
            </p>
            <h2
              id="recursos-heading"
              className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.85rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#14121C] [text-wrap:balance]"
            >
              {FEATURES_CONTENT.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#625D70]">
              {FEATURES_CONTENT.subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FEATURES_CONTENT.items.map((item, idx) => {
              const isWide = item.span === 'wide';
              const isDarkCard = idx === 0;
              return (
                <article
                  key={item.id}
                  className={`flex flex-col justify-between rounded-[24px] p-6 sm:p-8 ${
                    isWide ? 'md:col-span-2' : 'md:col-span-1'
                  } ${
                    isDarkCard
                      ? 'bg-[#2A1458] text-white'
                      : 'border border-[#DEDCE8] bg-white text-[#14121C]'
                  }`}
                >
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                        isDarkCard ? 'text-[#D7F744]' : 'text-[#7E3BED]'
                      }`}
                    >
                      {item.kicker}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.025em]">
                      {item.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed sm:text-base ${
                        isDarkCard ? 'text-white/80' : 'text-[#625D70]'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`mt-8 flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs ${
                      isDarkCard
                        ? 'border-white/15 text-white/75'
                        : 'border-[#DEDCE8] text-[#625D70]'
                    }`}
                  >
                    <span>{item.metricLabel}</span>
                    <span
                      className={`font-mono font-semibold tabular-nums ${
                        isDarkCard ? 'text-[#D7F744]' : 'text-[#2A1458]'
                      }`}
                    >
                      {item.metricValue}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO: CONFIANÇA, PRIVACIDADE E SEGURANÇA (#confianca) */}
      <section
        id="confianca"
        aria-labelledby="confianca-heading"
        className="scroll-mt-20 border-t border-[#DEDCE8] bg-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7E3BED]">
                {TRUST_CONTENT.eyebrow}
              </p>
              <h2
                id="confianca-heading"
                className="mt-3 font-display text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#14121C] [text-wrap:balance]"
              >
                {TRUST_CONTENT.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#625D70]">
                {TRUST_CONTENT.description}
              </p>

              {/* Links diretos para páginas legais e institucionais */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/privacidade"
                  onClick={(e) => handleLinkClick(e, '/privacidade')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#DEDCE8] bg-[#F4F3FA] px-4 py-2.5 text-sm font-medium text-[#14121C] transition-colors hover:bg-[#ECEAF3] focus-visible:outline-2 focus-visible:outline-[#7E3BED]"
                >
                  <Lock className="size-4 text-[#2A1458]" aria-hidden="true" />
                  <span>Política de Privacidade</span>
                </a>

                <a
                  href="/termos"
                  onClick={(e) => handleLinkClick(e, '/termos')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#DEDCE8] bg-[#F4F3FA] px-4 py-2.5 text-sm font-medium text-[#14121C] transition-colors hover:bg-[#ECEAF3] focus-visible:outline-2 focus-visible:outline-[#7E3BED]"
                >
                  <FileText className="size-4 text-[#2A1458]" aria-hidden="true" />
                  <span>Termos de Uso</span>
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              {TRUST_CONTENT.principles.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-[#DEDCE8] bg-[#F4F3FA] p-6"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#2A1458] text-[#D7F744]">
                      <ShieldCheck className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#14121C]">
                        {principle.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#625D70]">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}

              {/* Nota transparente de validação jurídica/técnica (sem inventar certificações) */}
              <div className="rounded-xl border border-[#DEDCE8] bg-white p-4 text-xs leading-relaxed text-[#625D70]">
                {TRUST_CONTENT.validationNotice}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: DÚVIDAS FREQUENTES / FAQ (#duvidas) */}
      <section
        id="duvidas"
        aria-labelledby="faq-heading"
        className="scroll-mt-20 border-t border-[#DEDCE8] bg-[#F4F3FA] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2A1458]">
              PERGUNTAS E RESPOSTAS
            </p>
            <h2
              id="faq-heading"
              className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#14121C] [text-wrap:balance]"
            >
              Dúvidas frequentes sobre a Clarus Finance
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-[#625D70]">
              Respostas diretas e transparentes para ajudar você a começar com segurança. Use as
              setas do teclado para navegar entre as perguntas.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#DEDCE8] rounded-[24px] border border-[#DEDCE8] bg-white">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqId === item.id;
              const buttonId = `${item.id}-button`;
              const panelId = `${item.id}-panel`;

              return (
                <div key={item.id} className="p-2 sm:p-3">
                  <h3>
                    <button
                      ref={(el) => {
                        faqButtonRefs.current[idx] = el;
                      }}
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      onKeyDown={(e) => handleFaqKeyDown(e, idx)}
                      className="flex min-h-[52px] w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left font-display text-base font-semibold text-[#14121C] transition-colors hover:bg-[#F4F3FA] focus-visible:outline-2 focus-visible:outline-[#7E3BED] sm:text-lg"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-[#2A1458] transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="px-4 pt-1 pb-4 text-sm leading-relaxed text-[#625D70] sm:text-base"
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO: CTA FINAL */}
      <section
        aria-labelledby="cta-final-heading"
        className="border-t border-[#DEDCE8] bg-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-[24px] bg-[#14121C] px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
            {/* Atmosfera oficial Clarus */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(circle_at_15%_20%,#7E3BED_0,transparent_38%),radial-gradient(circle_at_85%_75%,#2A1458_0,transparent_40%),radial-gradient(circle_at_80%_15%,#D7F744_0,transparent_14%)]"
            />

            {/* Linha curva sutil inspirada no movimento Fita */}
            <svg
              aria-hidden="true"
              viewBox="0 0 800 320"
              fill="none"
              className="pointer-events-none absolute right-0 bottom-0 h-64 w-auto opacity-20"
            >
              <path
                d="M120 290 C240 270 230 90 340 40 C410 8 470 50 430 130 C390 210 310 245 350 285 C385 320 490 325 620 270"
                stroke="#D7F744"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D7F744]">
                CLAREZA PARA CADA ESCOLHA
              </p>
              <h2
                id="cta-final-heading"
                className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white [text-wrap:balance]"
              >
                Seu dinheiro, finalmente claro.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Comece a registrar suas movimentações e acompanhar seu mês em um lugar pensado para
                ser simples, leve e sob o seu controle.
              </p>

              <div className="mt-8 flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row sm:items-center">
                <a
                  href="/register"
                  onClick={(e) => handleLinkClick(e, '/register')}
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-[#D7F744] px-7 py-3.5 text-base font-semibold text-[#14121C] transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7F744]"
                >
                  <span>Criar minha conta</span>
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href="/login"
                  onClick={(e) => handleLinkClick(e, '/login')}
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-base font-medium text-white backdrop-blur-xs transition-colors duration-150 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Já tenho conta
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
