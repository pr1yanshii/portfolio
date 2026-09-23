import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { site } from '../content/site';
import { useLocalTime } from '../hooks/useLocalTime';
import { useFinePointer } from '../hooks/useFinePointer';
import { Serif } from './ui/Serif';
import styles from './Hero.module.css';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties;

/**
 * The introduction. The name is the composition. Two quiet interactions:
 * the type drifts a few pixels against the cursor, and the word after
 * "Currently →" cycles slowly under a mask.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const time = useLocalTime(site.timeZone);

  // Cursor parallax: name moves with the cursor (±4px), positioning line against it (±2px)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 60, damping: 20, mass: 0.6 };
  const nameX = useSpring(useTransform(mx, [-1, 1], [-4, 4]), spring);
  const nameY = useSpring(useTransform(my, [-1, 1], [-4, 4]), spring);
  const lineX = useSpring(useTransform(mx, [-1, 1], [2, -2]), spring);
  const lineY = useSpring(useTransform(my, [-1, 1], [2, -2]), spring);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  // Scroll: the hero settles back as you leave it
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  // Cycling word
  const words = site.currently;
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIdx((i) => {
        setPrev(i);
        return (i + 1) % words.length;
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduced, words.length]);

  return (
    <section id="intro" className={styles.hero} ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className={`container ${styles.inner}`} style={{ y, opacity }}>
        <p className={`micro ${styles.masthead}`} data-reveal style={delay(80)}>
          <span>Product</span><span className={styles.x}>×</span>
          <span>Technology</span><span className={styles.x}>×</span>
          <span>AI</span><span className={styles.x}>×</span>
          <span>Venture</span>
        </p>

        <div className={styles.stage}>
          <motion.h1 className={styles.name} style={{ x: nameX, y: nameY }}>
            <span data-reveal-mask style={delay(160)}><span>{site.first}</span></span>
            <span data-reveal-mask style={delay(260)}><span className={styles.last}>{site.last}</span></span>
          </motion.h1>

          <motion.p className={styles.positioning} style={{ x: lineX, y: lineY }}>
            {site.positioning.map((line, i) => (
              <span key={i} data-reveal-mask style={delay(420 + i * 90)}>
                <span><Serif text={line} /></span>
              </span>
            ))}
          </motion.p>
        </div>

        <div className={styles.foot}>
          <hr className="rule" data-reveal style={delay(600)} />
          <div className={`grid ${styles.footRow}`}>
            <p className={`${styles.edu}`} data-reveal style={delay(660)}>
              Computer Science + Entrepreneurship
              <span className={styles.eduSub}>{site.school} · {site.graduation}</span>
            </p>

            <p className={styles.currently} data-reveal style={delay(720)} aria-live="off">
              <span className={styles.currentlyLabel}>Currently</span>
              <span className={styles.currentlyArrow} aria-hidden="true">→</span>
              <span className={styles.wordMask}>
                {prev !== null && prev !== idx && (
                  <span key={`out-${prev}`} className={`serif ${styles.wordOut}`} aria-hidden="true">{words[prev]}</span>
                )}
                <span key={`in-${idx}`} className={`serif ${styles.wordIn}`}>{words[idx]}</span>
              </span>
            </p>

            <p className={`micro ${styles.place}`} data-reveal style={delay(780)}>
              {site.location} <span className={styles.sep}>·</span> <time>{time}</time>
            </p>

            <a href="#experience" className={`micro ${styles.scroll}`} data-reveal style={delay(840)}>
              <span>Scroll</span>
              <span className={styles.scrollLine} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
