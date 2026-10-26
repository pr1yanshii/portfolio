import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { projects, earlierWork, type Project } from '../content/projects';
import { Preview } from '../components/previews';
import s from './Archive.module.css';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Composition per project, in page order. The first is a dark full-width
 * hero; the rest alternate between tinted plates and full-width bands so no
 * two neighbours share a shape.
 */
type Variant = 'hero' | 'plate' | 'band';
const RHYTHM: { variant: Variant; span: number; flip?: boolean }[] = [
  { variant: 'hero',  span: 12 },
  { variant: 'plate', span: 5 },
  { variant: 'plate', span: 7 },
  { variant: 'band',  span: 12 },
  { variant: 'plate', span: 7 },
  { variant: 'plate', span: 5 },
  { variant: 'band',  span: 12, flip: true },
];

const isExternal = (href?: string) => !!href?.startsWith('http');
const extAttrs = (href?: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};

const paletteVars = (p: Project): CSSProperties =>
  ({
    '--p-accent': p.palette.accent,
    '--p-tint': p.palette.tint,
    '--p-deep': p.palette.deep,
    '--p-dark': p.palette.dark ?? 'var(--ink)',
    '--p-on-dark': p.palette.onDark ?? 'var(--bg)',
  }) as CSSProperties;

function Visual({ p }: { p: Project }) {
  return (
    <div className={s.visWrap}>
      <div className={s.vis}>
        <div className={s.visInner}>
          {p.image ? (
            <img src={p.image} alt="" loading="lazy" decoding="async" className={s.img} />
          ) : (
            <Preview kind={p.visual} />
          )}
        </div>
      </div>
      {!p.image && <span className={`micro ${s.illus}`}>Illustrative — concept, not a screenshot</span>}
    </div>
  );
}

export function Archive({ onExit }: { onExit: () => void }) {
  const [open, setOpen] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (open) setOpen(null);
      else onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, onExit]);

  return (
    <motion.div
      className={s.archive}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
    >
      <header className={s.bar}>
        <span className={`micro ${s.mark}`}>PS. <span className={s.sep}>/</span> Archive</span>
        <button className={`micro ${s.back}`} onClick={onExit}>← Back to portfolio</button>
      </header>

      <div className={`container ${s.inner}`}>
        <div className={s.head}>
          <p className={`micro ${s.eyebrow}`}>
            {projects.length + earlierWork.length} projects
            <span className={s.dot}>·</span>
            {projects.filter((p) => p.status).length} in development
          </p>
          <h1 className={s.title}>
            <span className={s.titleLine}><motion.span
              initial={{ y: reduced ? 0 : '110%' }} animate={{ y: 0 }}
              transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}
            >The Build</motion.span></span>
            <span className={s.titleLine}><motion.span
              initial={{ y: reduced ? 0 : '110%' }} animate={{ y: 0 }}
              transition={{ duration: reduced ? 0 : 0.9, ease: EASE, delay: reduced ? 0 : 0.08 }}
            ><em className="serif">Archive</em></motion.span></span>
          </h1>
          <p className={s.lede}>
            Everything I&rsquo;ve built, in one place — shipped, in progress, and the ones that taught me
            something on the way. Each one is here with the problem it was trying to solve.
          </p>
        </div>

        <div className={s.grid}>
          {projects.map((p, i) => {
            const r = RHYTHM[i] ?? { variant: 'plate' as Variant, span: 6 };
            return (
              <motion.article
                key={p.slug}
                className={s.card}
                data-variant={r.variant}
                data-flip={r.flip || undefined}
                style={{ ...paletteVars(p), gridColumn: `span ${r.span}` }}
                initial={{ opacity: 0, y: reduced ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: reduced ? 0 : 0.75, ease: EASE }}
              >
                <Visual p={p} />

                <div className={s.body}>
                  <p className={`micro ${s.meta}`}>
                    <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
                    {p.status
                      ? <span className={s.status}><i aria-hidden="true" />{p.status}</span>
                      : <span className={s.year}>{p.year}</span>}
                  </p>

                  <h2 className={s.name}>
                    <button className={s.openBtn} onClick={() => setOpen(p)} aria-haspopup="dialog">
                      {p.title}
                    </button>
                  </h2>

                  <p className={s.desc}>{p.description}</p>

                  {p.problem && (
                    <p className={s.problem}>
                      <span className={`micro ${s.problemLabel}`}>The problem</span>
                      {p.problem}
                    </p>
                  )}

                  <div className={s.foot}>
                    <ul className={`micro ${s.tech}`}>
                      {p.labels.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                    <p className={`micro ${s.role}`}>{p.contribution}</p>
                  </div>

                  <div className={s.actions}>
                    <button className={s.caseBtn} onClick={() => setOpen(p)}>
                      Case study <span className={s.arrow} aria-hidden="true">→</span>
                    </button>
                    {p.href && (
                      <a className={s.live} href={p.href} {...extAttrs(p.href)} data-cursor="ext">
                        {p.linkLabel ?? 'View project'}
                        <span className={s.arrow} aria-hidden="true">{isExternal(p.href) ? '↗' : '→'}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <section className={s.earlier} aria-labelledby="archive-earlier">
          <p className={`micro ${s.earlierLabel}`} id="archive-earlier">Earlier work</p>
          <ul>
            {earlierWork.map((w) => (
              <li key={w.title} className={s.earlierRow}>
                <h2 className={s.earlierName}>{w.title}</h2>
                <p className={`micro ${s.earlierKind}`}>{w.category} <span className={s.dot}>·</span> {w.year}</p>
                <p className={s.earlierText}>{w.description}</p>
                <p className={`micro ${s.earlierMeta}`}>{w.meta.join('  ·  ')}</p>
              </li>
            ))}
          </ul>
        </section>

        <footer className={s.pageFoot}>
          <button className={s.footBack} onClick={onExit}>← Back to portfolio</button>
        </footer>
      </div>

      <AnimatePresence>
        {open && <CaseStudy key={open.slug} p={open} index={projects.indexOf(open)} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

function CaseStudy({ p, index, onClose }: { p: Project; index: number; onClose: () => void }) {
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => { panel.current?.focus(); }, []);

  const rows: [string, string][] = [
    ...(p.problem ? ([['The problem', p.problem]] as [string, string][]) : []),
    ['What I built', p.description],
    ['My role', p.contribution],
    ['Stack', p.labels.join('  ·  ')],
  ];
  if (p.result) rows.push(['Result', p.result]);
  if (p.recognition) rows.push(['Recognition', p.recognition]);

  return (
    <motion.div
      className={s.overlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.28 }}
      onClick={onClose}
    >
      <motion.div
        ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${p.title} case study`}
        className={s.panel}
        style={paletteVars(p)}
        initial={{ y: reduced ? 0 : 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduced ? 0 : 26, opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.close} onClick={onClose} aria-label="Close">✕</button>

        <header className={s.panelHead}>
          <p className={`micro ${s.panelMeta}`}>
            <span className={s.num}>{String(index + 1).padStart(2, '0')}</span>
            <span className={s.panelRule} aria-hidden="true" />
            <span>{p.status ?? p.year}</span>
          </p>
          <h2 className={s.panelTitle}>{p.title}</h2>
          {p.tagline && <p className={`serif ${s.panelTagline}`}>{p.tagline}</p>}
        </header>

        <div className={s.panelVis}>
          <div className={s.visInner}>
            {p.image ? <img src={p.image} alt="" className={s.img} /> : <Preview kind={p.visual} />}
          </div>
        </div>
        {!p.image && <span className={`micro ${s.illusPanel}`}>Illustrative — concept, not a screenshot</span>}

        <dl className={s.spine}>
          {rows.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: EASE, delay: reduced ? 0 : 0.12 + i * 0.05 }}
            >
              <dt className="micro">{k}</dt>
              <dd>{v}</dd>
            </motion.div>
          ))}
        </dl>

        {p.href && (
          <a className={s.panelLive} href={p.href} {...extAttrs(p.href)} data-cursor="ext">
            {p.linkLabel ?? 'View project'}
            <span className={s.arrow} aria-hidden="true">{isExternal(p.href) ? '↗' : '→'}</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
