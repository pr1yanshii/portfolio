import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { simulator, type Choice } from '../content/lab';
import s from './Simulator.module.css';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "You're the PM." — a 30-second decision. No option is scored as correct;
 * the point is the tradeoff, and then what actually happened in Show Up.
 */
export function Simulator({ onClose }: { onClose: () => void }) {
  const [picked, setPicked] = useState<Choice | null>(null);
  const [undoing, setUndoing] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => { panel.current?.focus(); }, []);

  // Confetti trajectories are rolled once per celebration, not per render.
  const [seed, setSeed] = useState(0);
  const bits = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        y: -60 - Math.random() * 90,
        x: (Math.random() - 0.5) * 220,
        rot: (Math.random() - 0.5) * 180,
        dur: 1.1 + Math.random() * 0.4,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed],
  );

  const choose = (c: Choice) => {
    setPicked(c);
    setSeed((n) => n + 1);
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 1600);
  };

  const again = () => {
    setUndoing(true);
    window.setTimeout(() => { setPicked(null); setUndoing(false); }, reduced ? 0 : 420);
  };

  return (
    <motion.div
      className={s.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.3 }}
      onClick={onClose}
    >
      <motion.div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Product decision simulator"
        className={s.panel}
        initial={{ y: reduced ? 0 : 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduced ? 0 : 28, opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={s.head}>
          <span className={`lab-micro ${s.kicker}`}><span className={s.dot} />You&rsquo;re the PM</span>
          <button className={s.close} onClick={onClose} aria-label="Close">✕</button>
        </header>

        <p className={s.prompt}>{simulator.prompt}</p>
        <h2 className={s.question}>{simulator.question}</h2>

        <AnimatePresence mode="wait">
          {!picked ? (
            <motion.div
              key="choices"
              className={s.choices}
              initial={{ opacity: undoing ? 0 : 0, y: undoing ? -14 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
            >
              {simulator.choices.map((c, i) => (
                <motion.button
                  key={c.id}
                  className={s.choice}
                  onClick={() => choose(c)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: reduced ? 0 : i * 0.07 }}
                  whileHover={reduced ? undefined : { y: -3 }}
                >
                  <span className={s.choiceKey}>{String.fromCharCode(65 + i)}</span>
                  <span className={s.choiceLabel}>{c.label}</span>
                  <span className={s.choiceBlurb}>{c.blurb}</span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className={s.result}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18, scale: undoing ? 0.98 : 1 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            >
              <p className={`lab-micro ${s.youPicked}`}>You picked</p>
              <h3 className={s.pickedName}>{picked.label}</h3>

              <div className={s.meters}>
                <Meter label="User value" v={picked.value} tone="lime" delay={0.05} />
                <Meter label="Engineering effort" v={picked.effort} tone="ink" delay={0.12} />
                <Meter label="Product risk" v={picked.risk} tone="violet" delay={0.19} />
              </div>
              <p className={`lab-micro ${s.meterNote}`}>Relative judgement calls, not measurements.</p>

              <dl className={s.detail}>
                <div><dt className="lab-micro">Upside</dt><dd>{picked.upside}</dd></div>
                <div><dt className="lab-micro">Tradeoff</dt><dd>{picked.tradeoff}</dd></div>
                <div><dt className="lab-micro">Engineering</dt><dd>{picked.engineering}</dd></div>
              </dl>

              <p className={s.verdict}>{simulator.verdict}</p>

              <motion.div
                className={s.reveal}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE, delay: reduced ? 0 : 0.25 }}
              >
                <span className={`lab-micro ${s.revealKicker}`}>{simulator.reveal.title}</span>
                <p className={s.revealBody}>{simulator.reveal.body}</p>
                <p className={s.revealFoot}>{simulator.reveal.footnote}</p>
              </motion.div>

              <button className={`lab-btn ${s.again}`} onClick={again}>
                <span className={s.undoIcon} data-spin={undoing || undefined} aria-hidden="true">↺</span>
                Try another decision
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {celebrate && !reduced && (
            <motion.div className={s.confetti} initial={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true">
              {bits.map((b, i) => (
                <motion.span
                  key={i}
                  className={s.bit}
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 1, 0], y: b.y, x: b.x, scale: 1, rotate: b.rot }}
                  transition={{ duration: b.dur, ease: 'easeOut', delay: i * 0.02 }}
                  style={{ background: i % 3 === 0 ? 'var(--violet)' : i % 3 === 1 ? 'var(--lime)' : 'var(--dark)' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Meter({ label, v, tone, delay }: { label: string; v: number; tone: string; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <div className={s.meter}>
      <div className={s.meterTop}>
        <span className="lab-micro">{label}</span>
        <span className={s.meterVal}>{v}</span>
      </div>
      <div className={s.track}>
        <motion.div
          className={s.fill}
          data-tone={tone}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: v / 100 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: EASE, delay: reduced ? 0 : delay }}
        />
      </div>
    </div>
  );
}
