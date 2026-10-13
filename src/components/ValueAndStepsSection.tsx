import React from 'react';
import { ArrowRight, CheckCircle2, Layers, Zap } from 'lucide-react';
import { HOW_IT_WORKS_CONTENT, VALUE_PROPOSITION_CONTENT } from '../config/content';

interface ValueAndStepsSectionProps {
  onNavigate: (href: string) => void;
}

export const ValueAndStepsSection: React.FC<ValueAndStepsSectionProps> = ({ onNavigate }) => {
  return (
    <>
      {/* SEÇÃO: PROPOSTA DE VALOR (#beneficios) */}
      <section
        id="beneficios"
        aria-labelledby="proposta-valor-heading"
        className="scroll-mt-20 border-t border-[#DEDCE8] bg-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Problema vs. Clareza */}
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7E3BED]">
                {VALUE_PROPOSITION_CONTENT.eyebrow}
              </p>
              <h2
                id="proposta-valor-heading"
                className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.85rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#14121C] [text-wrap:balance]"
              >
                {VALUE_PROPOSITION_CONTENT.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-base leading-relaxed text-[#625D70]">
              <p>{VALUE_PROPOSITION_CONTENT.problemStatement}</p>
              <p className="font-medium text-[#14121C]">
                {VALUE_PROPOSITION_CONTENT.solutionStatement}
              </p>
            </div>
          </div>

          {/* Três Benefícios Objetivos */}
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
            {VALUE_PROPOSITION_CONTENT.pillars.map((pillar, index) => {
              const IconComponent =
                index === 0 ? Zap : index === 1 ? Layers : CheckCircle2;
              return (
                <article
                  key={pillar.index}
                  className="flex flex-col justify-between rounded-[24px] border border-[#DEDCE8] bg-[#F4F3FA] p-6 sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs font-semibold text-[#7E3BED] tabular-nums">
                        {pillar.index}. Benefício essencial
                      </span>
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[#2A1458] text-[#D7F744]">
                        <IconComponent className="size-5" aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.025em] text-[#14121C]">
                      {pillar.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#625D70] sm:text-base">
                      {pillar.description}
                    </p>
                  </div>

                  <p className="mt-6 border-t border-[#DEDCE8] pt-4 text-xs font-medium text-[#2A1458]">
                    {pillar.highlight}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO: COMO FUNCIONA (#como-funciona) */}
      <section
        id="como-funciona"
        aria-labelledby="como-funciona-heading"
        className="relative scroll-mt-20 border-t border-[#DEDCE8] bg-[#F4F3FA] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2A1458]">
              {HOW_IT_WORKS_CONTENT.eyebrow}
            </p>
            <h2
              id="como-funciona-heading"
              className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#14121C] [text-wrap:balance]"
            >
              {HOW_IT_WORKS_CONTENT.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#625D70]">
              {HOW_IT_WORKS_CONTENT.subtitle}
            </p>
          </div>

          {/* Fluxo horizontal no desktop e vertical no mobile */}
          <div className="relative mt-12 lg:mt-16">
            {/* Linha conectora horizontal sutil visível no desktop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-12 left-12 right-12 hidden h-px bg-[#DEDCE8] lg:block"
            />

            <ol className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              {HOW_IT_WORKS_CONTENT.steps.map((step) => (
                <li
                  key={step.stepNumber}
                  className="relative flex flex-col justify-between rounded-[24px] border border-[#DEDCE8] bg-white p-6 sm:p-8"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2A1458] font-mono text-sm font-bold text-[#D7F744] tabular-nums">
                        {step.stepNumber}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#625D70]">
                        Etapa {step.stepNumber}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.02em] text-[#14121C] sm:text-2xl">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#625D70] sm:text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Mini-exemplo ilustrativo da etapa */}
                  <div className="mt-6 rounded-2xl border border-[#DEDCE8] bg-[#F4F3FA] p-4">
                    <p className="font-mono text-xs font-semibold text-[#14121C] tabular-nums">
                      {step.exampleInput}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[#625D70] tabular-nums">
                      {step.exampleOutput}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#DEDCE8] bg-white px-6 py-5">
            <p className="text-sm font-medium text-[#14121C]">
              Quer sentir como essa rotina funciona na prática? Crie sua conta em menos de um minuto.
            </p>
            <a
              href="/register"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/register');
              }}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-[#2A1458] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7E3BED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
            >
              <span>Criar minha conta</span>
              <ArrowRight className="size-4 text-[#D7F744]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
