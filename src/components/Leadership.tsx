import { leadership } from '../content/experience';
import styles from './Leadership.module.css';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties;

/**
 * Leadership: one editorial moment, not a page. A numbered kicker, a
 * two-line headline, and the facts — nothing else.
 */
export function Leadership() {
  return (
    <section id="leadership" data-theme="light" className={styles.section} aria-labelledby="leadership-title">
      <div className="container">
        <hr className="rule" />
        <div className={`grid ${styles.body}`}>
          <p className={`micro ${styles.kicker}`} data-reveal>
            <span>04</span>
            <span className={styles.kickerSep} aria-hidden="true">/</span>
            <span>Leadership</span>
          </p>

          <h2 className={styles.headline} id="leadership-title">
            {leadership.headline.map((l, i) => (
              <span key={i} data-reveal-mask style={delay(80 + i * 100)}>
                <span className={i === 1 ? 'serif' : undefined}>{l}</span>
              </span>
            ))}
          </h2>

          <div className={styles.entries}>
            {leadership.entries.map((e, i) => (
              <div key={e.org} className={styles.facts} data-reveal style={delay(280 + i * 90)}>
                <p className={styles.org}>{e.org}</p>
                <p className={styles.role}>
                  {e.role}
                  {e.period && <span className={styles.period}> · {e.period}</span>}
                </p>
                <p className={styles.text}>{e.text}</p>
                <ul className={styles.areas} aria-label={`${e.org} highlights`}>
                  {e.meta.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
