import { site } from '../content/site';
import { useLocalTime } from '../hooks/useLocalTime';
import { ArrowLink } from './ui/ArrowLink';
import { Magnetic } from './ui/Magnetic';
import styles from './Contact.module.css';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties;

export function Contact() {
  const time = useLocalTime(site.timeZone);
  const year = new Date().getFullYear();
  const links = [
    { label: 'Email', value: site.links.email, href: `mailto:${site.links.email}`, ext: false },
    { label: 'LinkedIn', value: 'linkedin.com/in/priyanshi-sitlani', href: site.links.linkedin, ext: true },
    { label: 'GitHub', value: 'github.com/pr1yanshii', href: site.links.github, ext: true },
  ];

  return (
    <section id="contact" data-theme="dark" className={styles.section}>
      <div className="container">
        <div className={`grid ${styles.top}`}>
          <p className={`micro ${styles.num}`} data-reveal>05 — Contact</p>
          <h2 className={styles.ask}>
            <span data-reveal-mask><span>Have an interesting problem?</span></span>
            <span data-reveal-mask style={delay(110)}>
              <span className={styles.askSerif}>I'd like to hear about it.</span>
            </span>
          </h2>
          <p className={styles.blurb} data-reveal style={delay(200)}>
            Especially the kind where nobody agrees what the product should be yet. Product roles, early-stage teams, venture — or just an idea you want to think through.
          </p>
        </div>

        <div className={`grid ${styles.links}`} data-reveal style={delay(260)}>
          <ul className={styles.linkList}>
            {links.map((l) => (
              <li key={l.label} className={styles.linkRow}>
                <span className={`micro ${styles.linkLabel}`}>{l.label}</span>
                <Magnetic strength={0.1}>
                  <ArrowLink
                    href={l.href}
                    direction={l.ext ? 'up-right' : 'right'}
                    target={l.ext ? '_blank' : undefined}
                    rel={l.ext ? 'noopener noreferrer' : undefined}
                    data-cursor={l.ext ? 'ext' : undefined}
                    className={styles.link}
                  >
                    {l.value}
                  </ArrowLink>
                </Magnetic>
              </li>
            ))}
          </ul>
          <div className={styles.resume}>
            <Magnetic strength={0.1}>
              <a href={site.links.resume} target="_blank" rel="noreferrer" className={styles.resumeBtn} data-cursor="ext">
                <span>Résumé</span>
                <span className={styles.resumeMeta}>PDF · placeholder</span>
                <span className={styles.resumeArrow} aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.wordmark} aria-label={site.name}>
            <span data-reveal-mask><span>{site.first}</span></span>
            <span data-reveal-mask style={delay(90)}><span className={styles.wordmarkLast}>{site.last}</span></span>
          </p>
          <div className={`micro ${styles.colophon}`}>
            <span>© {year}</span>
            <span>{site.location} · <time>{time}</time></span>
            <span className={styles.colophonRight}>Still figuring out what to build.</span>
            <a href="#intro" className={styles.top2}>Back to top ↑</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
