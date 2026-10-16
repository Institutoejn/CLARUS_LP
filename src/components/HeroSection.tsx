import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_CONTENT } from '../config/content';
import { OFFICIAL_PLATFORM_URL } from '../config/platform';

interface HeroSectionProps {
  onNavigate: (href: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const handleCtaClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) return;
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <section aria-labelledby="hero-heading" className="hero-centered">
      <div className="hero-centered-content">
        <p className="hero-eyebrow" data-reveal="up">{HERO_CONTENT.eyebrow}</p>
        <h1 id="hero-heading" className="hero-title" data-reveal="up">
          <span className="block">{HERO_CONTENT.headlinePart1}</span>{' '}
          <span className="hero-title-highlight">{HERO_CONTENT.headlineHighlight}</span>
        </h1>
        <p className="hero-description" data-reveal="up">{HERO_CONTENT.subheadline}</p>
        <div className="hero-actions" data-reveal="up">
          <a href={OFFICIAL_PLATFORM_URL} onClick={(event) => handleCtaClick(event, '/register')}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#2A1458] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#7E3BED] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7E3BED] sm:text-lg">
            {HERO_CONTENT.primaryCta.label}<ArrowRight className="size-5 text-[#D7F744]" aria-hidden="true" />
          </a>
          <a href={HERO_CONTENT.secondaryCta.href} onClick={(event) => handleCtaClick(event, HERO_CONTENT.secondaryCta.href)}
            className="inline-flex min-h-14 items-center justify-center rounded-xl border border-[#DEDCE8] bg-white px-8 py-4 text-base font-medium text-[#14121C] transition-colors hover:bg-[#ECEAF3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7E3BED] sm:text-lg">
            {HERO_CONTENT.secondaryCta.label}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-[#625D70] sm:text-base" data-reveal="up">
          <span>{HERO_CONTENT.loginPrompt.text}</span>
          <a href={OFFICIAL_PLATFORM_URL} onClick={(event) => handleCtaClick(event, '/login')}
            className="inline-flex min-h-11 items-center font-medium text-[#2A1458] underline decoration-[#7E3BED] underline-offset-4 hover:text-[#7E3BED] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7E3BED]">
            {HERO_CONTENT.loginPrompt.label}
          </a>
        </div>
        <ul className="hero-attributes" data-reveal="up" aria-label="Destaques da Clarus">
          <li>Captura rápida em texto natural</li>
          <li>Categorias essenciais claras</li>
          <li>Resumo e metas do mês</li>
        </ul>
      </div>
    </section>
  );
};
