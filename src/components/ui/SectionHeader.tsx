import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface Props {
  number: string;
  title: ReactNode;
  aside?: ReactNode;   // right-aligned note, e.g. a count or a one-liner
}

/**
 * The recurring section opener: number + hairline + oversized title, with an
 * optional aside on the right. Same bones every time — the variation is in
 * what comes after.
 */
export function SectionHeader({ number, title, aside }: Props) {
  return (
    <header className={styles.header}>
      <hr className="rule" />
      <div className={`grid ${styles.row}`}>
        <span className={`micro ${styles.number}`} data-reveal>
          {number}
        </span>
        <h2 className={styles.title} data-reveal-mask>
          <span>{title}</span>
        </h2>
        {aside && (
          <p className={styles.aside} data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
            {aside}
          </p>
        )}
      </div>
    </header>
  );
}
