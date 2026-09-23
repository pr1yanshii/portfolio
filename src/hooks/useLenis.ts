import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';

/**
 * Smooth scrolling via Lenis. Keeps native scroll (so position: sticky and
 * IntersectionObserver keep working). Disabled for reduced-motion users.
 * Returns a ref to the instance so links can call scrollTo().
 */
export function useLenis(enabled = true) {
  const ref = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.4 });
    ref.current = lenis;
    let frame = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ref.current = null;
    };
  }, [enabled, reduced]);

  return ref;
}

/** Scroll to an element id, through Lenis when available. */
export function scrollToId(lenis: Lenis | null, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.3 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
