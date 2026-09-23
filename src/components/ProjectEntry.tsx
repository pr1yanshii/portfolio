import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import type { Project } from '../content/projects';
import { Preview, ShowUpPreview, type ShowUpScreen } from './previews';
import { ArrowLink } from './ui/ArrowLink';
import styles from './ProjectEntry.module.css';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties;

interface Props {
  project: Project;
  index: number;
}

/**
 * One project: a big visual and a small amount of excellent information.
 * The composition (wide / split / compact, mirrored or not) comes from the
 * content file so no two neighbours look the same. The text stays pinned
 * beside the visual; the numeral drifts on its own axis.
 */
export function ProjectEntry({ project, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const number = String(index + 1).padStart(2, '0');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const numY = useSpring(useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 70, reduced ? 0 : -70]), { stiffness: 80, damping: 26 });
  const scale = useTransform(scrollYProgress, [0, 0.35], [reduced ? 1 : 0.95, 1]);
  const innerY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 16, reduced ? 0 : -16]);
  // Showcase screens drift at three different speeds
  const s0 = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 50, reduced ? 0 : -50]);
  const s1 = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 110, reduced ? 0 : -110]);
  const s2 = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 20, reduced ? 0 : -80]);
  const screenY = [s0, s1, s2];

  const visual = (
    <motion.div className={styles.frame} style={{ scale }}>
      <motion.div className={styles.inner} style={{ y: innerY }}>
        {project.image ? (
          <img src={project.image} alt={`${project.title} — ${project.description}`} loading="lazy" decoding="async" className={styles.image} />
        ) : (
          <Preview kind={project.visual} />
        )}
      </motion.div>
    </motion.div>
  );

  const text = (
    <div className={styles.text}>
      <h3 className={styles.title} id={`work-${project.slug}-title`} data-reveal-mask>
        <span>
          <span className={styles.titleNum}>{number}</span>
          <span className={styles.titleSlash} aria-hidden="true">/</span>
          {project.title}
        </span>
      </h3>

      {project.tagline && (
        <p className={`serif ${styles.tagline}`} data-reveal style={delay(60)}>
          {project.tagline}
        </p>
      )}

      <p className={styles.description} data-reveal style={delay(100)}>
        {project.description}
      </p>

      <p className={`micro ${styles.labels}`} data-reveal style={delay(140)}>
        {project.labels.map((l, i) => (
          <span key={l}>
            {l}
            {i < project.labels.length - 1 && <span className={styles.dot} aria-hidden="true">·</span>}
          </span>
        ))}
      </p>

      {(project.result || project.recognition) && (
        <p className={styles.result} data-reveal style={delay(200)}>
          {project.result && <span>{project.result}</span>}
          {project.recognition && <span className={styles.recognition}>{project.recognition}</span>}
        </p>
      )}

      <dl className={styles.meta} data-reveal style={delay(260)}>
        <div>
          <dt className="micro">Role</dt>
          <dd>{project.contribution}</dd>
        </div>
        <div>
          <dt className="micro">{project.status ? 'Status' : 'Year'}</dt>
          <dd>
            {project.status ? (
              <span className={styles.status}><span className={styles.statusDot} aria-hidden="true" />{project.status}</span>
            ) : (
              project.year
            )}
          </dd>
        </div>
      </dl>

      {project.href && (
        <div data-reveal style={delay(320)}>
          <ArrowLink href={project.href} direction="up-right">View project</ArrowLink>
        </div>
      )}
    </div>
  );

  /* ---- showcase: full-width editorial screen stage ---- */
  if (project.layout === 'showcase') {
    const screens: ShowUpScreen[] = ['feed', 'event', 'filters'];
    const stage = (
      <div className={styles.stage} data-cursor={project.href ? 'view' : undefined}>
        {screens.map((screen, i) => (
          <motion.div key={screen} className={styles.screen} style={{ y: screenY[i] }} data-i={i}>
            <div className={styles.screenSurface}>
              {project.images?.[i] ? (
                <img src={project.images[i]} alt="" loading="lazy" decoding="async" className={styles.image} />
              ) : (
                <ShowUpPreview screen={screen} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
    return (
      <article ref={ref} className={`grid ${styles.entry} ${styles.showcase}`} id={`work-${project.slug}`} aria-labelledby={`work-${project.slug}-title`}>
        <div className={styles.showText}>{text}</div>
        <div className={styles.showStageCol}>
          <motion.span className={`${styles.numeral} ${styles.showNumeral}`} style={{ y: numY }} aria-hidden="true">
            {number}
          </motion.span>
          {project.href ? (
            <a href={project.href} className={styles.visualLink} tabIndex={-1} aria-hidden="true">{stage}</a>
          ) : (
            stage
          )}
        </div>
      </article>
    );
  }

  return (
    <article
      ref={ref}
      className={`grid ${styles.entry}`}
      data-layout={project.layout}
      data-flip={project.flip ? 'true' : undefined}
      id={`work-${project.slug}`}
      aria-labelledby={`work-${project.slug}-title`}
    >
      <div className={styles.visualCol}>
        <motion.span className={styles.numeral} style={{ y: numY }} aria-hidden="true">
          {number}
        </motion.span>
        {project.href ? (
          <a href={project.href} className={styles.visualLink} data-cursor="view" tabIndex={-1} aria-hidden="true">
            {visual}
          </a>
        ) : (
          visual
        )}
      </div>

      <div className={styles.textCol}>{text}</div>
    </article>
  );
}
