import { about } from '../content/about';
import { site } from '../content/site';
import { SectionHeader } from './ui/SectionHeader';
import { Serif } from './ui/Serif';
import styles from './About.module.css';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties;

export function About() {
  return (
    <section id="about" data-theme="light" className={styles.section}>
      <div className="container">
        <SectionHeader number="03" title="About" />

        <div className={`grid ${styles.statement}`}>
          <h3 className={styles.headline} data-reveal>
            <Serif text={about.headline} />
          </h3>
          <div className={styles.prose}>
            {about.paragraphs.map((p, i) => (
              <p key={i} data-reveal style={delay(100 + i * 80)}>{p}</p>
            ))}
          </div>
          <dl className={styles.edu} data-reveal style={delay(240)}>
            <div><dt className="micro">School</dt><dd>{site.school}</dd></div>
            <div><dt className="micro">Degree</dt><dd>{site.degree}</dd></div>
            <div><dt className="micro">Minor</dt><dd>{site.minor.replace('Minor in ', '')}</dd></div>
            <div><dt className="micro">Expected</dt><dd>{site.graduation}</dd></div>
          </dl>
        </div>

        <div className={`grid ${styles.outside}`}>
          <h3 className={styles.outsideLead}>
            {about.outside.lead.map((l, i) => (
              <span key={i} data-reveal-mask style={delay(i * 90)}>
                <span>{l}</span>
              </span>
            ))}
          </h3>
          <ul className={styles.outsideList}>
            {about.outside.items.map((item, i) => {
              const last = i === about.outside.items.length - 1;
              return (
                <li key={item} className={last ? `serif ${styles.outsideLast}` : undefined} data-reveal style={delay(200 + i * 60)}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
