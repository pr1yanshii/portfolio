import { useEffect } from 'react';

/**
 * Watches every [data-theme] section and sets html[data-theme] to whichever
 * one is crossing a line 40% down the viewport. The CSS transition on <html>
 * does the actual cross-fade between warm light and charcoal.
 */
export function useSectionTheme(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-theme]'));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            document.documentElement.dataset.theme = e.target.getAttribute('data-theme') ?? 'light';
          }
        }
      },
      { rootMargin: '-40% 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ready]);
}
