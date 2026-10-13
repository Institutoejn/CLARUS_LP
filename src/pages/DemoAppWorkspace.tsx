import React from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { ProductDemoSection } from '../components/ProductDemoSection';

interface DemoAppWorkspaceProps {
  onNavigate: (href: string) => void;
}

export const DemoAppWorkspace: React.FC<DemoAppWorkspaceProps> = ({ onNavigate }) => {
  let userName = 'Visitante';
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem('clarus-demo-user');
      if (raw) {
        const parsed = JSON.parse(raw) as { name?: string };
        if (parsed.name) userName = parsed.name;
      }
    } catch {
      // Fallback silencioso
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F3FA] text-[#14121C]">
      <header className="sticky top-0 z-40 border-b border-[#DEDCE8] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <BrandLogo surface="light" size="sm" href="/" onNavigate={onNavigate} />
            <span className="hidden text-xs text-[#625D70] sm:inline">
              Olá, <strong className="font-medium text-[#14121C]">{userName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-[#DEDCE8] bg-[#F4F3FA] px-3.5 py-2 text-xs font-medium text-[#14121C] transition-colors hover:bg-[#ECEAF3]"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              <span>Página inicial</span>
            </a>

            <button
              type="button"
              onClick={() => {
                try {
                  window.localStorage.removeItem('clarus-demo-user');
                } catch {
                  // Ignore
                }
                onNavigate('/login');
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-[#625D70] transition-colors hover:bg-[#ECEAF3] hover:text-[#14121C]"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main id="conteudo-principal">
        <ProductDemoSection />
      </main>
    </div>
  );
};
