import React from 'react';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface LegalPageProps {
  onNavigate: (href: string) => void;
}

const InstitutionalLayout: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onNavigate: (href: string) => void;
}> = ({ eyebrow, title, subtitle, children, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F4F3FA] text-[#14121C]">
      <header className="border-b border-[#DEDCE8] bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo surface="light" size="md" href="/" onNavigate={onNavigate} />
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#DEDCE8] bg-[#F4F3FA] px-4 py-2 text-xs font-medium text-[#14121C] transition-colors hover:bg-[#ECEAF3]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>Voltar para a página inicial</span>
          </a>
        </div>
      </header>

      <main id="conteudo-principal" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-[24px] border border-[#DEDCE8] bg-white p-6 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7E3BED]">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-[-0.035em] text-[#14121C]">
            {title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#625D70]">{subtitle}</p>

          <div className="mt-8 space-y-6 border-t border-[#DEDCE8] pt-8 text-sm leading-relaxed text-[#14121C] sm:text-base">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <InstitutionalLayout
      eyebrow="DOCUMENTAÇÃO DE PRIVACIDADE"
      title="Política de Privacidade"
      subtitle="Estrutura transparente sobre coleta, finalidade e proteção de dados pessoais na plataforma Clarus Finance."
      onNavigate={onNavigate}
    >
      {/* TODO: validar com a Clarus — revisar integralmente com o jurídico antes da publicação final em produção (razão social, CNPJ, canal do DPO e operadores de nuvem). */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#7E3BED]/25 bg-[#F4F3FA] p-4 text-xs text-[#625D70]">
        <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#7E3BED]" aria-hidden="true" />
        <p>
          <strong className="font-semibold text-[#14121C]">
            Aviso de validação jurídica (TODO: validar com a Clarus):
          </strong>{' '}
          Esta estrutura reflete as práticas técnicas de privacidade implementadas na interface e
          encontra-se reservada para homologação jurídica formal pela equipe da Clarus Finance.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          1. Princípios gerais e escopo
        </h2>
        <p className="text-[#625D70]">
          A Clarus Finance respeita a sua privacidade e atua em conformidade com os princípios da
          Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD), coletando apenas as
          informações estritamente necessárias para oferecer a experiência de organização
          financeira pessoal.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          2. Dados tratados na plataforma
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-[#625D70]">
          <li>
            <strong className="text-[#14121C]">Dados de identificação de conta:</strong> nome e
            endereço de e-mail informados voluntariamente no momento do cadastro.
          </li>
          <li>
            <strong className="text-[#14121C]">Registros financeiros pessoais:</strong> descrições
            de lançamentos, valores, datas, categorias e metas inseridas pelo próprio titular.
          </li>
          <li>
            <strong className="text-[#14121C]">Preferências técnicas:</strong> escolha de
            consentimento de cookies e preferências de interface.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          3. Proteção contra envio de dados sensíveis a analytics
        </h2>
        <p className="text-[#625D70]">
          Por determinação arquitetural, valores financeiros, nomes de lançamentos, metas pessoais
          e dados da área autenticada nunca são enviados como parâmetros para ferramentas de
          análise de tráfego (como Google Analytics 4 ou Google Tag Manager).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          4. Direitos do titular de dados (LGPD)
        </h2>
        <p className="text-[#625D70]">
          Você pode consultar, corrigir, exportar ou excluir seus lançamentos e solicitar o
          encerramento da sua conta a qualquer momento.
          {/* TODO: validar com a Clarus — inserir e-mail oficial do Encarregado pelo Tratamento de Dados Pessoais (DPO). */}
        </p>
      </section>
    </InstitutionalLayout>
  );
};

export const TermsOfUsePage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <InstitutionalLayout
      eyebrow="CONDIÇÕES DE USO"
      title="Termos de Uso"
      subtitle="Regras gerais de acesso, responsabilidades e utilização da plataforma Clarus Finance."
      onNavigate={onNavigate}
    >
      {/* TODO: validar com a Clarus — homologar texto definitivo de Termos de Uso, foro competente e condições comerciais com assessoria jurídica. */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#7E3BED]/25 bg-[#F4F3FA] p-4 text-xs text-[#625D70]">
        <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#7E3BED]" aria-hidden="true" />
        <p>
          <strong className="font-semibold text-[#14121C]">
            Estrutura em validação jurídica (TODO: validar com a Clarus):
          </strong>{' '}
          As disposições abaixo compõem a estrutura contratual base da plataforma e devem ser
          validadas juridicamente antes da publicação comercial definitiva.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          1. Objeto da plataforma
        </h2>
        <p className="text-[#625D70]">
          A Clarus Finance é uma ferramenta digital destinada à organização financeira pessoal por
          meio do registro manual e rápido de movimentações, categorização de receitas e despesas e
          acompanhamento de metas.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          2. Natureza informativa e ausência de consultoria financeira
        </h2>
        <p className="text-[#625D70]">
          A plataforma tem caráter exclusivamente organizacional. A Clarus Finance não presta
          consultoria de investimentos, assessoria jurídica ou recomendação de produtos bancários.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          3. Cadastro e segurança da conta
        </h2>
        <p className="text-[#625D70]">
          O usuário compromete-se a fornecer informações verdadeiras no cadastro e a manter a
          confidencialidade de suas credenciais de acesso.
        </p>
      </section>
    </InstitutionalLayout>
  );
};

export const AccessibilityPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <InstitutionalLayout
      eyebrow="ACESSIBILIDADE DIGITAL"
      title="Declaração de Acessibilidade"
      subtitle="Nosso compromisso em tornar a organização financeira clara e acessível para todas as pessoas."
      onNavigate={onNavigate}
    >
      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          Conformidade com WCAG 2.2 Nível AA
        </h2>
        <p className="text-[#625D70]">
          A interface pública e os fluxos de acesso da Clarus Finance foram projetados seguindo as
          Diretrizes de Acessibilidade para Conteúdo Web (WCAG 2.2 nível AA).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-xl font-bold text-[#14121C]">
          Recursos implementados
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-[#625D70]">
          <li>Atalho de teclado no topo para pular diretamente ao conteúdo principal.</li>
          <li>Navegação completa por teclado (Tab, Shift+Tab, Enter, Espaço, Escape e setas no FAQ).</li>
          <li>Alvos de toque e clique com dimensões mínimas de 44 × 44 pixels.</li>
          <li>Alto contraste cromático entre textos e superfícies (Ink #14121C, Paper #F4F3FA e Violet Deep #2A1458).</li>
          <li>Suporte a ampliação de até 200% sem perda de conteúdo ou sobreposição horizontal.</li>
          <li>Respeito automático à preferência de sistema para redução de movimento (prefers-reduced-motion).</li>
        </ul>
      </section>
    </InstitutionalLayout>
  );
};

export const NotFoundPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <main
      id="conteudo-principal"
      className="flex min-h-screen flex-col items-center justify-center bg-[#F4F3FA] px-4 py-16 text-center text-[#14121C]"
    >
      <BrandLogo surface="light" size="md" href="/" onNavigate={onNavigate} />

      <div className="mt-10 max-w-md rounded-[24px] border border-[#DEDCE8] bg-white p-8 shadow-xs sm:p-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#7E3BED]">
          ERRO 404
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-[#14121C]">
          Página não encontrada
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#625D70]">
          O endereço que você tentou acessar não existe ou foi movido. Volte para a página inicial
          da Clarus Finance para continuar.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#2A1458] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7E3BED]"
          >
            <span>Ir para o início</span>
            <ArrowRight className="size-4 text-[#D7F744]" aria-hidden="true" />
          </a>

          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/login');
            }}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#DEDCE8] bg-[#F4F3FA] px-5 py-2.5 text-sm font-medium text-[#14121C] transition-colors hover:bg-[#ECEAF3]"
          >
            Entrar na conta
          </a>
        </div>
      </div>
    </main>
  );
};
