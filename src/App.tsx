/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { FeaturesTrustFaqSection } from './components/FeaturesTrustFaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductDemoSection } from './components/ProductDemoSection';
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

function normalizePathname(path: string): string {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '') || '/';
}

export default function App() {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePathname(window.location.pathname) : '/'
  );
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePathname(window.location.pathname));
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
    window.history.pushState({}, '', cleanPath);
    setPathname(cleanPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const renderRouteContent = () => {
    switch (pathname) {
      case '/':
        return (
          <div className="min-h-screen flex flex-col bg-[#F4F3FA] text-[#14121C]">
            <Header onNavigate={navigate} />
            <main id="conteudo-principal" className="flex-1">
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
    </>
  );
}

