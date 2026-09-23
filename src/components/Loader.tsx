import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import styles from './Loader.module.css';

/**
 * Entrance: "PS." appears, unfolds into "PRIYANSHI SITLANI", the curtain
 * lifts. ~1s. Waits briefly for the web font; runs once per session;
 * skipped entirely for reduced motion.
 */
const KEY = 'ps-entered';

export function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [skip] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (reduced || skip) {
      onDone();
      return;
    }
    const timers: number[] = [];
    let cancelled = false;
    const fontsReady = 'fonts' in document ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 450))]).then(() => {
      if (cancelled) return;
      timers.push(
        window.setTimeout(() => setPhase(1), 40),    // PS. in
        window.setTimeout(() => setPhase(2), 420),   // unfold to full name
        window.setTimeout(() => setPhase(3), 800),   // curtain up
        window.setTimeout(() => {
          try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ }
          onDone();
        }, 1000),
      );
    });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduced, skip, onDone]);

  if (reduced || skip) return null;

  return (
    <div className={styles.curtain} data-phase={phase} aria-hidden="true">
      <div className={styles.mark}>
        <span className={styles.letter}>P</span>
        <span className={styles.fold}><span>RIYANSHI</span></span>
        <span className={`${styles.fold} ${styles.space}`}><span>&nbsp;</span></span>
        <span className={styles.letter}>S</span>
        <span className={styles.fold}><span>ITLANI</span></span>
        <span className={styles.dot}>.</span>
      </div>
    </div>
  );
}
