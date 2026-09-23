import { useEffect } from 'react';

/**
 * One observer for every [data-reveal] / [data-reveal-mask] element.
 * Flips the attribute to "in" once; CSS does the animation. Cheap and 60fps.
 */
export function useReveal(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const els = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-mask]');
    if (!els.length) return;

    const show = (el: HTMLElement) => {
      if (el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'in');
      if (el.hasAttribute('data-reveal-mask')) el.setAttribute('data-reveal-mask', 'in');
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          show(el);
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    // Anything already on screen at load reveals now (with its own delay);
    // the observer handles everything below the fold.
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh) show(el);
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [ready]);
}
