import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LabEntry } from './LabEntry';
import { Workspace } from './Workspace';
import './lab.css';

/**
 * The Lab takes over the viewport while active. It never unmounts the
 * portfolio's styles — its palette is scoped to the .lab root.
 */
export function Lab({ onExit }: { onExit: () => void }) {
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();

  // lock the page behind it and park the portfolio's theme
  useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevTheme = document.documentElement.dataset.theme;
    body.style.overflow = 'hidden';
    document.documentElement.dataset.theme = 'light';
    return () => {
      body.style.overflow = prevOverflow;
      if (prevTheme) document.documentElement.dataset.theme = prevTheme;
    };
  }, []);

  return (
    <motion.div
      className="lab"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="entry"
            style={{ height: '100%' }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <LabEntry onStart={() => setStarted(true)} onExit={onExit} />
          </motion.div>
        ) : (
          <motion.div
            key="work"
            style={{ height: '100%' }}
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Workspace onExit={onExit} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
