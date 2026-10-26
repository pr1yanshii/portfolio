import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { projects, earlierWork, type Project } from '../content/projects';
import { Preview } from '../components/previews';
import s from './Archive.module.css';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Column span + proportion per card, in page order. Local to this gallery —
 * the grid rhythm is a layout concern, not project data.
 */
const SIZES = [
  { span: 8, ratio: '16 / 10' },
  { span: 4, ratio: '4 / 5' },
  { span: 4, ratio: '4 / 3' },
  { span: 4, ratio: '4 / 3' },
  { span: 4, ratio: '4 / 3' },
  { span: 7, ratio: '16 / 9' },
  { span: 5, ratio: '4 / 3' },
];

const isExternal = (href?: string) => !!href?.startsWith('http');
const extAttrs = (href?: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
    >
      <header className={s.bar}>
        <span className={`micro ${s.mark}`}>PS. <span className={s.sep}>/</span> Archive</span>
        <button className={`micro ${s.back}`} onClick={onExit}>← Back to portfolio</button>
      </header>

      <div className={`container ${s.inner}`}>
        <div className={s.head}>
          <p className={`micro ${s.eyebrow}`} >
            {projects.length + earlierWork.length} projects · {projects.filter((p) => p.status).length} in development
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
            Everything I&rsquo;ve built, in one place — shipped, in progress, and the ones that taught me something on the way.
          </p>
        </div>

        <div className={s.grid}>
          {projects.map((p, i) => {
            const size = SIZES[i] ?? { span: 4, ratio: '4 / 3' };
            return (
              <motion.article
                key={p.slug}
                className={s.card}
                style={{ gridColumn: `span ${size.span}` }}
                initial={{ opacity: 0, y: reduced ? 0 : 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : (i % 3) * 0.06 }}
              >
                <div className={s.frame} style={{ aspectRatio: size.ratio }}>
                  <div className={s.frameInner}>
                    {p.image ? (
                      <img src={p.image} alt="" loading="lazy" decoding="async" className={s.img} />
                    ) : (
                      <Preview kind={p.visual} />
                    )}
                  </div>
                </div>

                <div className={s.body}>
                  <p className={`micro ${s.num}`}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
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
                  <ul className={`micro ${s.tech}`}>
                    {p.labels.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                  {p.href && (
                    <a className={s.live} href={p.href} {...extAttrs(p.href)} data-cursor="ext">
                      {p.linkLabel ?? 'View project'}
                      <span className={s.liveArrow} aria-hidden="true">{isExternal(p.href) ? '↗' : '→'}</span>
                    </a>
                  )}
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

        <footer className={s.foot}>
          <button className={s.footBack} onClick={onExit}>← Back to portfolio</button>
        </footer>
      </div>

      <AnimatePresence>
        {open && <Detail key={open.slug} p={open} index={projects.indexOf(open)} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

function Detail({ p, index, onClose }: { p: Project; index: number; onClose: () => void }) {
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => { panel.current?.focus(); }, []);

  return (
    <motion.div
      className={s.overlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.28 }}
      onClick={onClose}
    >
      <motion.div
        ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${p.title} details`}
        className={s.panel}
        initial={{ y: reduced ? 0 : 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduced ? 0 : 24, opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.close} onClick={onClose} aria-label="Close">✕</button>

        <div className={s.panelFrame}>
          {p.image ? <img src={p.image} alt="" className={s.img} /> : <Preview kind={p.visual} />}
        </div>

        <p className={`micro ${s.panelNum}`}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className={s.year}>{p.status ?? p.year}</span>
        </p>
        <h2 className={s.panelTitle}>{p.title}</h2>
        {p.tagline && <p className={`serif ${s.panelTagline}`}>{p.tagline}</p>}
        <p className={s.panelDesc}>{p.description}</p>

        {(p.result || p.recognition) && (
          <p className={s.panelResult}>
            {p.result && <span>{p.result}</span>}
            {p.recognition && <span className={s.panelRec}>{p.recognition}</span>}
          </p>
        )}

        <dl className={s.panelMeta}>
          <div><dt className="micro">Role</dt><dd>{p.contribution}</dd></div>
          <div><dt className="micro">Stack</dt><dd>{p.labels.join(' · ')}</dd></div>
        </dl>

        {p.href && (
          <a className={s.panelLive} href={p.href} {...extAttrs(p.href)} data-cursor="ext">
            {p.linkLabel ?? 'View project'}
            <span aria-hidden="true">{isExternal(p.href) ? '↗' : '→'}</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
