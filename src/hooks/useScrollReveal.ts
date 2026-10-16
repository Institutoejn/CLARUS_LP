import { useEffect, useRef } from 'react';

/** Animate once, using native scroll/anchors and leaving content readable without JS. */
export function useScrollReveal(enabled: boolean) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = root.current;
    if (!enabled || !container || !('IntersectionObserver' in window)) return;
    const elements = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'));
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const show = (element: HTMLElement) => {
      element.classList.add('reveal-visible');
      observer?.unobserve(element);
    };
    const setup = () => {
      observer?.disconnect();
      if (preference.matches) {
        elements.forEach((element) => element.classList.remove('reveal-ready', 'reveal-visible'));
        return;
      }
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) show(entry.target as HTMLElement); });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      elements.forEach((element) => {
        if (element.classList.contains('reveal-visible')) return;
        element.classList.add('reveal-ready');
        observer?.observe(element);
      });
    };
    // Keyboard navigation must never focus an invisible control.
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      elements.forEach((element) => { if (element.contains(event.target as Node)) show(element); });
    };
    setup();
    preference.addEventListener('change', setup);
    container.addEventListener('focusin', focus);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', setup);
      container.removeEventListener('focusin', focus);
      elements.forEach((element) => element.classList.remove('reveal-ready', 'reveal-visible'));
    };
  }, [enabled]);
  return root;
}
