import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onNavigate: (href: string) => void;
}

const NAV_ITEMS = [
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Dúvidas', href: '#duvidas' },
];

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Gerenciamento de foco, tecla Escape e bloqueio de rolagem do fundo no mobile
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      firstMenuLinkRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && mobileDialogRef.current) {
        const focusable = mobileDialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      setMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-150 ${
        isScrolled
          ? 'border-b border-[#DEDCE8] bg-[#F4F3FA]/95 backdrop-blur-md'
          : 'border-b border-transparent bg-[#F4F3FA]'
      }`}
    >
      {/* Link de salto para conteúdo principal (WCAG 2.2 AA) */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-xl focus:bg-[#2A1458] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Zona 1: Wordmark oficial */}
        <BrandLogo surface="light" size="md" href="/" onNavigate={onNavigate} />

        {/* Zona 2: Navegação por âncoras (Desktop) */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex md:items-center md:gap-7"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap text-sm font-medium text-[#625D70] decoration-[#7E3BED] decoration-2 underline-offset-8 transition-colors duration-150 hover:text-[#14121C] hover:underline focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7E3BED]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: Conversão secundária (Entrar) e primária (Criar minha conta) */}
        <div className="hidden md:flex md:items-center md:gap-3 md:shrink-0">
          <a
            href="https://app.clarusfinancas.com.br/login"
            onClick={(e) => handleLinkClick(e, '/login')}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium text-[#14121C] transition-colors duration-150 hover:bg-[#ECEAF3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
          >
            Entrar
          </a>
          <a
            href="https://app.clarusfinancas.com.br/login"
            onClick={(e) => handleLinkClick(e, '/register')}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#2A1458] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#7E3BED] active:bg-[#14121C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
          >
            <span>Criar minha conta</span>
            <ArrowRight className="size-4 shrink-0 text-[#D7F744]" aria-hidden="true" />
          </a>
        </div>

        {/* Botão de menu mobile com alvo mínimo de 44×44 px */}
        <div className="flex items-center md:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-navegacao-mobile"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-[#DEDCE8] bg-white text-[#14121C] transition-colors hover:bg-[#ECEAF3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E3BED]"
          >
            {mobileMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile Acessível com bloqueio de fundo e foco gerenciado */}
      {mobileMenuOpen && (
        <div
          ref={mobileDialogRef}
          id="menu-navegacao-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação móvel"
          className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col justify-between overflow-y-auto border-t border-[#DEDCE8] bg-[#F4F3FA] px-5 py-6 md:hidden"
        >
          <nav aria-label="Links da página" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.href}
                ref={idx === 0 ? firstMenuLinkRef : undefined}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="flex min-h-[48px] items-center justify-between rounded-xl border border-transparent px-4 py-3 text-base font-medium text-[#14121C] transition-colors hover:border-[#DEDCE8] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#7E3BED]"
              >
                <span>{item.label}</span>
                <ArrowRight className="size-4 text-[#625D70]" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#DEDCE8] pt-6">
            <a
              href="https://app.clarusfinancas.com.br/login"
              onClick={(e) => handleLinkClick(e, '/login')}
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl border border-[#DEDCE8] bg-white px-5 py-3 text-sm font-medium text-[#14121C] transition-colors hover:bg-[#ECEAF3] focus-visible:outline-2 focus-visible:outline-[#7E3BED]"
            >
              Já tenho conta — Entrar
            </a>
            <a
              href="https://app.clarusfinancas.com.br/login"
              onClick={(e) => handleLinkClick(e, '/register')}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#2A1458] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7E3BED] focus-visible:outline-2 focus-visible:outline-[#7E3BED]"
            >
              <span>Criar minha conta</span>
              <ArrowRight className="size-4 text-[#D7F744]" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
