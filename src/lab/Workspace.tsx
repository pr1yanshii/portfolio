import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { badIdeas, labProjects, lenses, lessons, stickies, type Lens, type LabProject } from '../content/lab';
import { useFinePointer } from '../hooks/useFinePointer';
import { Simulator } from './Simulator';
import s from './Workspace.module.css';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Workspace({ onExit }: { onExit: () => void }) {
  const [lens, setLens] = useState<Lens>('think');
  const [open, setOpen] = useState<LabProject | null>(null);
  const [sim, setSim] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [shipped, setShipped] = useState(false);
  const [idea, setIdea] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const draggable = fine && !reduced;

  // Esc closes whatever is on top
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (idea) setIdea(null);
        else if (sim) setSim(false);
        else if (open) setOpen(null);
      }
      // hidden: press B for the bad idea generator
      if (e.key.toLowerCase() === 'b' && !open && !sim && !(e.target as HTMLElement).closest('input,textarea')) {
        setIdea(rollIdea());
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, sim, idea]);

  const ship = () => {
    setShipped(true);
    window.setTimeout(() => setShipped(false), 2200);
  };

  return (
    <div className={s.workspace}>
      {/* ---------- toolbar ---------- */}
      <header className={s.bar}>
        <div className={s.barLeft}>
          <span className={`lab-micro ${s.mark}`}>PS. <span className={s.sep}>/</span> Lab</span>
          <button className={`lab-micro ${s.back}`} onClick={onExit}>← Portfolio</button>
        </div>

        <div className={s.lensWrap} role="tablist" aria-label="Perspective">
          {lenses.map((l) => (
            <button
              key={l.id}
              role="tab"
              aria-selected={lens === l.id}
              className={s.lensBtn}
              onClick={() => setLens(l.id)}
            >
              {lens === l.id && (
                <motion.span layoutId="lens-pill" className={s.lensPill} transition={{ duration: reduced ? 0 : 0.45, ease: EASE }} />
              )}
              <span className={s.lensLabel}>{l.label}</span>
            </button>
          ))}
        </div>

        <div className={s.actions}>
          <button className={`lab-micro ${s.act}`} onClick={() => setResetKey((k) => k + 1)}>Reset</button>
          <button className={`lab-micro ${s.act}`} onClick={() => setIdea(rollIdea())} title="Also: press B">Bad idea</button>
          <button className={`lab-micro ${s.act} ${s.shipBtn}`} onClick={ship}>Ship it</button>
        </div>
      </header>

      <p className={`lab-micro ${s.lensNote}`} aria-live="polite">
        {lenses.find((l) => l.id === lens)!.note}
      </p>

      {/* ---------- canvas ---------- */}
      <div className={s.board} ref={boardRef} key={resetKey}>
        {labProjects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            p={p}
            lens={lens}
            i={i}
            draggable={draggable}
            constraints={boardRef}
            onOpen={() => setOpen(p)}
          />
        ))}

        {stickies.map((n, i) => (
          <motion.div
            key={n.id}
            className={s.sticky}
            data-tone={n.tone}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ opacity: 0, scale: 0.9, rotate: n.r }}
            animate={{ opacity: 1, scale: 1, rotate: n.r }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: 0.25 + i * 0.05 }}
            drag={draggable}
            dragMomentum={false}
            dragConstraints={boardRef}
            whileDrag={{ scale: 1.05, rotate: 0, zIndex: 40, boxShadow: 'var(--shadow-lg)' }}
          >
            {n.text}
          </motion.div>
        ))}

        {lessons.map((l, i) => (
          <motion.button
            key={l.id}
            className={s.lesson}
            style={{ left: `${l.x}%`, top: `${l.y}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: 0.5 + i * 0.08 }}
          >
            <span className={s.lessonDot} aria-hidden="true" />
            <span className={`lab-micro ${s.lessonPrompt}`}>{l.prompt}</span>
            <span className={s.lessonText}>{l.lesson}</span>
          </motion.button>
        ))}

        {/* the simulator sits on the canvas as the loudest object */}
        <motion.button
          className={s.simCard}
          onClick={() => setSim(true)}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, ease: EASE, delay: 0.35 }}
          whileHover={reduced ? undefined : { y: -4 }}
        >
          <span className={`lab-micro ${s.simKicker}`}>Interactive · 30 seconds</span>
          <span className={s.simTitle}>You&rsquo;re the PM.</span>
          <span className={s.simSub}>Two weeks of engineering. One call to make.</span>
          <span className={s.simGo}>Take the call <span aria-hidden="true">→</span></span>
        </motion.button>
      </div>

      {/* ---------- overlays ---------- */}
      <AnimatePresence>
        {open && <ProjectDetail key="detail" p={open} lens={lens} setLens={setLens} onClose={() => setOpen(null)} />}
        {sim && <Simulator key="sim" onClose={() => setSim(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {shipped && (
          <motion.div
            className={s.shipOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-live="polite"
          >
            <motion.div
              className={s.shipSweep}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
            />
            <motion.span
              className={s.shipStamp}
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: -4 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.55, ease: EASE, delay: reduced ? 0 : 0.18 }}
            >
              Shipped
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {idea && (
          <motion.div
            className={s.ideaWrap}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
            role="status"
          >
            <span className={`lab-micro ${s.ideaKicker}`}>Bad idea generator</span>
            <p className={s.ideaText}>{idea}</p>
            <div className={s.ideaActions}>
              <button className={`lab-micro ${s.act}`} onClick={() => setIdea(rollIdea())}>Another</button>
              <button className={`lab-micro ${s.act}`} onClick={() => setIdea(null)}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function rollIdea() {
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
  return `${pick(badIdeas.a)} ${pick(badIdeas.b)} ${pick(badIdeas.c)}, ${pick(badIdeas.d)}.`;
}

/* ------------------------------------------------------------------ */

function ProjectCard({
  p, lens, i, draggable, constraints, onOpen,
}: {
  p: LabProject; lens: Lens; i: number; draggable: boolean;
  constraints: React.RefObject<HTMLDivElement | null>; onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const preview = p.lenses[lens][0];

  return (
    <motion.div
      className={s.card}
      style={{ left: `${p.pos.x}%`, top: `${p.pos.y}%` }}
      initial={{ opacity: 0, y: 24, rotate: p.pos.r }}
      animate={{ opacity: 1, y: 0, rotate: p.pos.r }}
      transition={{ duration: reduced ? 0 : 0.8, ease: EASE, delay: 0.1 + i * 0.08 }}
      drag={draggable}
      dragMomentum={false}
      dragConstraints={constraints}
      whileDrag={{ scale: 1.03, rotate: 0, zIndex: 50, boxShadow: 'var(--shadow-lg)' }}
      whileHover={reduced || !draggable ? undefined : { y: -4 }}
    >
      {draggable && <span className={s.grip} aria-hidden="true" />}
      <div className={s.cardHead}>
        <span className={`lab-micro ${s.cardKicker}`}>{p.kicker}</span>
        <h3 className={s.cardTitle}>{p.title}</h3>
      </div>

      <div className={s.cardBody}>
        <AnimatePresence mode="wait">
          <motion.div
            key={lens}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
          >
            <span className={`lab-micro ${s.stage}`}>{preview.stage}</span>
            <p className={s.cardText}>{preview.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={s.cardFoot}>
        <span className={`lab-micro ${s.cardRole}`}>{p.role}</span>
        <button className={s.cardOpen} onClick={onOpen} aria-label={`Open ${p.title}`}>
          Open <span aria-hidden="true">↗</span>
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

function ProjectDetail({
  p, lens, setLens, onClose,
}: { p: LabProject; lens: Lens; setLens: (l: Lens) => void; onClose: () => void }) {
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => { panel.current?.focus(); }, []);
  const cards = useMemo(() => p.lenses[lens], [p, lens]);

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
        aria-label={`${p.title} case study`}
        className={s.panel}
        initial={{ y: reduced ? 0 : 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduced ? 0 : 24, opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={s.panelHead}>
          <div>
            <span className={`lab-micro ${s.cardKicker}`}>{p.kicker}</span>
            <h2 className={s.panelTitle}>{p.title}</h2>
            <p className={`lab-micro ${s.panelStatus}`}>{p.status}</p>
          </div>
          <button className={s.close} onClick={onClose} aria-label="Close">✕</button>
        </header>

        <div className={s.panelLenses} role="tablist" aria-label="Perspective">
          {lenses.map((l) => (
            <button
              key={l.id}
              role="tab"
              aria-selected={lens === l.id}
              className={s.panelLens}
              onClick={() => setLens(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ol
            key={lens}
            className={s.stages}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
          >
            {cards.map((c, i) => (
              <motion.li
                key={c.stage}
                className={s.stageRow}
                data-pending={c.pending || undefined}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: reduced ? 0 : i * 0.06 }}
              >
                <span className={`lab-micro ${s.stageNum}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.stageName}>{c.stage}</span>
                <p className={s.stageBody}>{c.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>

        <footer className={s.panelFoot}>
          <span className={`lab-micro ${s.panelRole}`}>{p.role}</span>
          <ul className={s.stackList}>
            {p.stack.map((t) => <li key={t} className="lab-chip">{t}</li>)}
          </ul>
        </footer>
      </motion.div>
    </motion.div>
  );
}
