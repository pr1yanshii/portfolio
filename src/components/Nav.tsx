import { useEffect, useState, type RefObject } from 'react';
import type Lenis from 'lenis';
import { sections, site, type SectionId } from '../content/site';
import { scrollToId } from '../hooks/useLenis';
import { Magnetic } from './ui/Magnetic';
import styles from './Nav.module.css';

interface Props {
  active: SectionId;
  lenis: RefObject<Lenis | null>;
  visible: boolean;
}

export function Nav({ active, lenis, visible }: Props) {
  const [open, setOpen] = useState(false);
  const current = sections.find((s) => s.id === active);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToId(lenis.current, id), open ? 120 : 0);
  };

  return (
    <>
      <header className={`${styles.nav} ${visible ? styles.visible : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Magnetic>
            <a href="#intro" onClick={go('intro')} className={styles.mark} aria-label={`${site.name} — back to top`}>
              {site.mark}
            </a>
          </Magnetic>

          <div className={`micro ${styles.counter}`} aria-live="polite">
            <span className={styles.counterNum}>{current?.number ?? '00'}</span>
            <span className={styles.counterSep}>/</span>
            <span>{String(sections.length).padStart(2, '0')}</span>
            <span className={styles.counterLabel}>{current?.label ?? 'Introduction'}</span>
          </div>

          <nav className={styles.links} aria-label="Primary">
            {sections.filter((s) => s.nav).map((s) => (
              <Magnetic key={s.id} strength={0.12}>
                <a href={`#${s.id}`} onClick={go(s.id)} className={styles.link} aria-current={active === s.id ? 'true' : undefined}>
                  <span className={styles.sup}>{s.number}</span>
                  <span className={styles.linkText}>{s.label}</span>
                </a>
              </Magnetic>
            ))}
          </nav>

          <button className={`micro ${styles.toggle}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-index">
            {open ? 'Close' : 'Index'}
          </button>
        </div>
      </header>

      <div id="site-index" className={styles.index} data-open={open} aria-hidden={!open}>
        <div className={`container ${styles.indexInner}`}>
          <p className={`micro ${styles.indexTitle}`}>Index</p>
          <ol className={styles.indexList}>
            {sections.map((s, i) => (
              <li key={s.id} style={{ '--i': i } as React.CSSProperties}>
                <a href={`#${s.id}`} onClick={go(s.id)} className={styles.indexLink} tabIndex={open ? 0 : -1}>
                  <span className={`micro ${styles.indexNum}`}>{s.number}</span>
                  <span className={styles.indexLabel}>{s.label}</span>
                  {active === s.id && <span className={styles.indexDot} aria-label="current" />}
                </a>
              </li>
            ))}
          </ol>
          <div className={`micro ${styles.indexFoot}`}>
            <span>{site.location}</span>
            <a href={`mailto:${site.links.email}`} tabIndex={open ? 0 : -1}>Email</a>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>LinkedIn</a>
            <a href={site.links.resume} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Résumé</a>
          </div>
        </div>
      </div>
    </>
  );
}
