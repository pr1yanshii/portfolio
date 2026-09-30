import { Fragment } from 'react';
import { projects, earlierWork } from '../content/projects';
import { SectionHeader } from './ui/SectionHeader';
import { ProjectEntry } from './ProjectEntry';
import styles from './Work.module.css';

export function Work() {
  return (
    <section id="work" data-theme="light" className={styles.section}>
      <div className="container">
        <SectionHeader
          number="02"
          title={<>Selected <em className="serif">work</em></>}
          aside="Four things I've helped build — a consumer product I'm building now, a hackathon product, a beta program, and an internal tool."
        />
        <div className={styles.list}>
          {projects.map((p, i) => (
            <ProjectEntry key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className={styles.earlier}>
          <p className={`micro ${styles.earlierLabel}`} data-reveal>Earlier work</p>
          <ul>
            {earlierWork.map((w, i) => (
              <li key={w.title} className={`grid ${styles.earlierRow}`} data-reveal style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}>
                <h3 className={styles.earlierTitle}>{w.title}</h3>
                <p className={`micro ${styles.earlierKind}`}>
                  {w.category}
                  <span className={styles.earlierDot} aria-hidden="true"> · </span>
                  {w.year}
                </p>
                <p className={styles.earlierText}>{w.description}</p>
                <p className={`micro ${styles.earlierMeta}`}>
                  {w.meta.map((m, mi) => (
                    <Fragment key={m}>
                      <span className={styles.earlierItem}>{m}</span>
                      {mi < w.meta.length - 1 && <span className={styles.earlierDot} aria-hidden="true"> · </span>}
                    </Fragment>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
