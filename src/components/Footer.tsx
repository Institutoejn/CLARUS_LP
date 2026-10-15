import React from 'react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (href: string) => void;
  onOpenCookiePreferences: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookiePreferences }) => {
  const currentYear = new Date().getFullYear();

  const handleInternalLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) return;
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <footer
      aria-label="Rodapé institucional"
      className="border-t border-white/10 bg-[#14121C] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Coluna 1: Wordmark e resumo */}
          <div className="flex flex-col items-start gap-4">
            <BrandLogo surface="dark" size="md" href="/" onNavigate={onNavigate} />
            <p className="max-w-sm text-sm leading-relaxed text-white/75">
              Plataforma de organização financeira pessoal pensada para tornar a leitura do seu
              dinheiro mais clara, simples e leve. Clareza para cada escolha.
            </p>
          </div>

          {/* Coluna 2: Navegação da página */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              Navegação
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href="#beneficios"
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Benefícios
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Como funciona
                </a>
              </li>
              <li>
                <a
                  href="#demonstracao"
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Demonstração
                </a>
              </li>
              <li>
                <a
                  href="#recursos"
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  href="#duvidas"
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Dúvidas frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Acesso e Conta */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              Plataforma
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href="https://app.clarusfinancas.com.br/login"
                  onClick={(e) => handleInternalLink(e, '/register')}
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Criar minha conta
                </a>
              </li>
              <li>
                <a
                  href="https://app.clarusfinancas.com.br/login"
                  onClick={(e) => handleInternalLink(e, '/login')}
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Entrar na conta
                </a>
              </li>
              <li>
                <a
                  href="https://app.clarusfinancas.com.br/login"
                  onClick={(e) => handleInternalLink(e, '/forgot-password')}
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Recuperar senha
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Legal, Acessibilidade e Contato */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              Transparência e Legal
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href="/termos"
                  onClick={(e) => handleInternalLink(e, '/termos')}
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  onClick={(e) => handleInternalLink(e, '/privacidade')}
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="/acessibilidade"
                  onClick={(e) => handleInternalLink(e, '/acessibilidade')}
                  className="inline-flex min-h-[36px] items-center text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Declaração de Acessibilidade
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCookiePreferences}
                  className="inline-flex min-h-[36px] items-center text-left text-white/80 transition-colors hover:text-[#D7F744]"
                >
                  Preferências de privacidade (LGPD)
                </button>
              </li>
            </ul>

            {/* TODO: validar com a Clarus — inserir e-mail institucional de atendimento/suporte oficial quando confirmado. Não exibir CNPJ, endereço físico ou redes sociais não fornecidos. */}
            <p className="mt-4 text-xs leading-relaxed text-white/50">
              Canal de atendimento institucional em validação pela equipe Clarus Finance.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© {currentYear} Clarus Finance. Todos os direitos reservados.</p>
          <p className="text-white/50">
            Sua vida financeira, no lugar certo.
          </p>
        </div>
      </div>
    </footer>
  );
};
