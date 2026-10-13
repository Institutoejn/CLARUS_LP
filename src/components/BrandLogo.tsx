import React from 'react';
import { BRAND_TOKENS } from '../config/tokens';

interface BrandLogoProps {
  /**
   * Define 'dark' quando o logotipo estiver posicionado sobre fundos escuros (Violet Deep ou Ink),
   * utilizando o arquivo vetorial oficial claro com ponto final Lime (#D7F744).
   */
  surface?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onNavigate?: (href: string) => void;
}

/**
 * Componente oficial do wordmark `clarus.` com a letra `l` exclusiva Fita.
 * Utiliza estritamente os arquivos vetoriais oficiais do Brand Kit v4.0,
 * preservando proporção (1200×360 → 10:3), geometria e área de proteção.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  surface = 'light',
  className = '',
  size = 'md',
  href = '/',
  onNavigate,
}) => {
  const src =
    surface === 'dark'
      ? BRAND_TOKENS.assets.logoDarkSurface
      : BRAND_TOKENS.assets.logoLightSurface;

  const dimensions =
    size === 'sm'
      ? { width: 112, height: 34, imgClass: 'h-8 w-auto' }
      : size === 'lg'
      ? { width: 156, height: 47, imgClass: 'h-11 w-auto' }
      : { width: 132, height: 40, imgClass: 'h-9 w-auto' };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label="Clarus Finance — Página inicial"
      className={`inline-flex items-center shrink-0 whitespace-nowrap rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7E3BED] ${className}`}
    >
      <img
        src={src}
        alt="Clarus Finance"
        width={dimensions.width}
        height={dimensions.height}
        decoding="async"
        fetchPriority="high"
        referrerPolicy="no-referrer"
        className={`${dimensions.imgClass} select-none object-contain`}
      />
    </a>
  );
};
