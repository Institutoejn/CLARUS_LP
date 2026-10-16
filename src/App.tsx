/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { FeaturesTrustFaqSection } from './components/FeaturesTrustFaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { useScrollReveal } from './hooks/useScrollReveal';
import { ProductDemoSection } from './components/ProductDemoSection';
import {
  OFFICIAL_PLATFORM_URL,
  RedirectLoadingOverlay,
} from './components/RedirectLoadingOverlay';
import { SeoHead } from './components/SeoHead';
import { ValueAndStepsSection } from './components/ValueAndStepsSection';
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
} from './pages/AuthPages';
import { DemoAppWorkspace } from './pages/DemoAppWorkspace';
import {
  AccessibilityPage,
  NotFoundPage,
  PrivacyPolicyPage,
  TermsOfUsePage,
} from './pages/LegalAnd404Pages';

const motionIntroEnabled = import.meta.env.VITE_ENABLE_MOTION_INTRO !== 'false';
const MotionIntro = lazy(() => import('./components/MotionIntro'));

function normalizePathname(path: string): string {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '') || '/';
}

const AUTH_PATHS = ['/login', '/register', '/forgot-password', '/app'];

export default function App() {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePathname(window.location.pathname) : '/'
  );
  const revealRoot = useScrollReveal(pathname === '/');
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const initialPath = normalizePathname(window.location.pathname);
    if (AUTH_PATHS.includes(initialPath)) {
      setIsRedirecting(true);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const current = normalizePathname(window.location.pathname);
      if (AUTH_PATHS.includes(current)) {
        setIsRedirecting(true);
      } else {
        setPathname(current);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((href: string) => {
    if (typeof window === 'undefined') return;

    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const cleanPath = normalizePathname(href);

    // Redirecionamento para a plataforma oficial Clarus Finance para todos os links de login ou cadastro
    if (AUTH_PATHS.includes(cleanPath) || href.includes('clarusfinancas.com.br')) {
      setIsRedirecting(true);
      return;
    }

    window.history.pushState({}, '', cleanPath);
    setPathname(cleanPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const renderRouteContent = () => {
    switch (pathname) {
      case '/':
        return (
          <div className="flex min-h-screen flex-col bg-[#F4F3FA] text-[#14121C]">
            {motionIntroEnabled && <Suspense fallback={<div className="motion-loading" aria-hidden="true" />}>
              <MotionIntro />
            </Suspense>}
            <div id="landing-content" tabIndex={-1} className={motionIntroEnabled ? 'landing-content' : undefined}>
              <Header onNavigate={navigate} />
              <main ref={revealRoot} id="conteudo-principal" className="flex-1">
                <HeroSection onNavigate={navigate} />
                <ValueAndStepsSection onNavigate={navigate} />
                <ProductDemoSection />
                <FeaturesTrustFaqSection onNavigate={navigate} />
              </main>
              <Footer
                onNavigate={navigate}
                onOpenCookiePreferences={() => setCookieModalOpen(true)}
              />
            </div>
          </div>
        );
      case '/login':
        return <LoginPage onNavigate={navigate} />;
      case '/register':
        return <RegisterPage onNavigate={navigate} />;
      case '/forgot-password':
        return <ForgotPasswordPage onNavigate={navigate} />;
      case '/app':
        return <DemoAppWorkspace onNavigate={navigate} />;
      case '/privacidade':
        return <PrivacyPolicyPage onNavigate={navigate} />;
      case '/termos':
        return <TermsOfUsePage onNavigate={navigate} />;
      case '/acessibilidade':
        return <AccessibilityPage onNavigate={navigate} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <>
      <SeoHead pathname={pathname} />
      {renderRouteContent()}
      <CookieConsentBanner
        forceOpen={cookieModalOpen}
        onCloseForce={() => setCookieModalOpen(false)}
        onNavigate={navigate}
      />
      <RedirectLoadingOverlay
        isOpen={isRedirecting}
        targetUrl={OFFICIAL_PLATFORM_URL}
      />
    </>
  );
}
