import { useRef, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useFinePointer } from '../hooks/useFinePointer';
import s from './LabEntry.module.css';

/** Floating artifacts: depth = how far each drifts against the cursor. */
const artifacts = [
  { kind: 'note', x: 12, y: 22, d: 2.4, r: -8, label: 'who is this for?' },
  { kind: 'card', x: 78, y: 18, d: 1.5, r: 6 },
  { kind: 'flow', x: 84, y: 62, d: 2.9, r: -4 },
  { kind: 'note', x: 8, y: 70, d: 1.8, r: 5, label: 'cut scope, not quality' },
  { kind: 'ticket', x: 68, y: 82, d: 2.2, r: -6 },
  { kind: 'swatch', x: 24, y: 86, d: 1.2, r: 9 },
  { kind: 'ticket', x: 30, y: 10, d: 3.2, r: 3 },
] as const;

export function LabEntry({ onStart, onExit }: { onStart: () => void; onExit: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const live = fine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 42, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 42, damping: 18, mass: 0.7 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!live || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <div className={s.entry} ref={ref} onPointerMove={onMove}>
      <div className={s.field} aria-hidden="true">
        {artifacts.map((a, i) => (
          <Artifact key={i} a={a} sx={sx} sy={sy} i={i} live={live} />
        ))}
      </div>

      <header className={s.bar}>
        <span className={`lab-micro ${s.mark}`}>PS. <span className={s.sep}>/</span> Lab</span>
        <button className={`lab-micro ${s.back}`} onClick={onExit}>
          ← Back to portfolio
        </button>
      </header>

      <div className={s.center}>
        <motion.p
          className={`lab-micro ${s.eyebrow}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          <span className={s.dot} /> An experiment
        </motion.p>

        <h1 className={s.title}>
          {['The', 'Product', 'Lab'].map((w, i) => (
            <span key={w} className={s.titleLine}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.09 }}
              >
                {w === 'Product' ? <em className={s.em}>{w}</em> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className={s.quote}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        >
          Good products start with better questions.
        </motion.p>

        <motion.p
          className={s.sub}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        >
          An interactive look at how I think, design, experiment, and build.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.68 }}
        >
          <button className={`lab-btn ${s.cta}`} onClick={onStart}>
            Start exploring
            <span className={s.arrow} aria-hidden="true">→</span>
          </button>
        </motion.div>

        <motion.p
          className={`lab-micro ${s.hint}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          Drag things · switch lenses · make a call
        </motion.p>
      </div>
    </div>
  );
}

function Artifact({
  a, sx, sy, i, live,
}: {
  a: (typeof artifacts)[number];
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  i: number;
  live: boolean;
}) {
  const range = live ? a.d * 14 : 0;
  const x = useTransform(sx, [-1, 1], [range, -range]);
  const y = useTransform(sy, [-1, 1], [range * 0.7, -range * 0.7]);

  return (
    <motion.div
      className={s.artifact}
      data-kind={a.kind}
      style={{ left: `${a.x}%`, top: `${a.y}%`, x, y, rotate: a.r }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.07 }}
    >
      {a.kind === 'note' && <span className={s.noteText}>{'label' in a ? a.label : ''}</span>}
      {a.kind === 'card' && (
        <>
          <span className={s.cardBar} />
          <span className={s.cardLine} />
          <span className={s.cardLine} style={{ width: '60%' }} />
        </>
      )}
      {a.kind === 'flow' && (
        <svg viewBox="0 0 90 60" className={s.flowSvg}>
          <rect x="1" y="12" width="26" height="16" rx="3" />
          <rect x="62" y="12" width="26" height="16" rx="3" />
          <rect x="32" y="38" width="26" height="16" rx="3" />
          <path d="M27 20 H62 M45 28 V38" />
        </svg>
      )}
      {a.kind === 'ticket' && (
        <>
          <span className={s.ticketTop} />
          <span className={s.cardLine} />
        </>
      )}
      {a.kind === 'swatch' && (
        <>
          <span className={s.sw} style={{ background: 'var(--violet)' }} />
          <span className={s.sw} style={{ background: 'var(--lime)' }} />
          <span className={s.sw} style={{ background: 'var(--dark)' }} />
        </>
      )}
    </motion.div>
  );
}
