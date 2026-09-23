import { experience, ventureFigures } from '../content/experience';
import { SectionHeader } from './ui/SectionHeader';
import styles from './Experience.module.css';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties;

/** The prioritization framework, set as a typographic figure. */
function FrameworkFigure() {
  return (
    <figure className={styles.figure} data-reveal style={delay(160)} aria-label="Prioritization framework: user demand times business impact times feasibility, leading to what should we build">
      <div className={styles.fwStack}>
        <span className={styles.fwTerm}>User demand</span>
        <span className={styles.fwOp}>×</span>
        <span className={styles.fwTerm}>Business impact</span>
        <span className={styles.fwOp}>×</span>
        <span className={styles.fwTerm}>Feasibility</span>
      </div>
      <span className={styles.fwArrow} aria-hidden="true">↓</span>
      <figcaption className={`serif ${styles.fwResult}`}>What should we build?</figcaption>
    </figure>
  );
}

/** The venture numbers. */
function VentureFigure() {
  return (
    <figure className={styles.figure} data-reveal style={delay(160)}>
      <dl className={styles.vc}>
        {ventureFigures.map((f) => (
          <div key={f.label} className={styles.vcItem}>
            <dt className="micro">{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export function Experience() {
  return (
    <section id="experience" data-theme="dark" className={styles.section}>
      <div className="container">
        <SectionHeader
          number="02"
          title="Experience"
          aside="Product, engineering, and venture — inside a startup, a university, and a student fund."
        />

        <ol className={styles.list}>
          {experience.map((e, i) => (
            <li key={e.org} className={`grid ${styles.entry}`}>
              <div className={styles.side}>
                <p className={`micro ${styles.index}`} data-reveal>
                  Experience {String(i + 1).padStart(2, '0')}
                </p>
                <p className={`micro ${styles.period}`} data-reveal style={delay(60)}>{e.period}</p>
              </div>

              <div className={styles.main}>
                <h3 className={styles.org} data-reveal-mask>
                  <span>{e.org}</span>
                </h3>
                <p className={styles.place} data-reveal style={delay(60)}>{e.place}</p>
                <p className={styles.roles} data-reveal style={delay(100)}>
                  {e.roles.map((r, ri) => (
                    <span key={r}>
                      {r}
                      {ri < e.roles.length - 1 && <span className={styles.roleSep} aria-hidden="true"> / </span>}
                    </span>
                  ))}
                </p>
                <p className={styles.summary} data-reveal style={delay(140)}>{e.summary}</p>
                <ul className={styles.points} data-reveal style={delay(200)}>
                  {e.points.map((p, pi) => (
                    <li key={pi}>
                      <span className={`micro ${styles.pointNum}`}>{String(pi + 1).padStart(2, '0')}</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {e.related && (
                  <p className={`micro ${styles.related}`} data-reveal style={delay(260)}>
                    See{' '}
                    {e.related.map((slug, ri) => (
                      <span key={slug}>
                        <a href={`#work-${slug}`} className="u-link">{slug === 'raingarden' ? 'Rain Garden' : slug === 'timetracker' ? 'TimeTracker' : 'Sourcery'}</a>
                        {ri < e.related!.length - 1 && ', '}
                      </span>
                    ))}
                    {' '}above
                  </p>
                )}
              </div>

              <div className={styles.aside}>
                {e.figure === 'framework' && <FrameworkFigure />}
                {e.figure === 'venture' && <VentureFigure />}
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
