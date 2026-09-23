import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './ArrowLink.module.css';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  direction?: 'right' | 'up-right' | 'down';
  muted?: boolean;
}

/** Text link with a hairline underline and an arrow that nudges on hover. */
export function ArrowLink({ children, direction = 'right', muted, className = '', ...rest }: Props) {
  const glyph = direction === 'up-right' ? '↗' : direction === 'down' ? '↓' : '→';
  return (
    <a className={`${styles.link} ${muted ? styles.muted : ''} ${className}`} data-dir={direction} {...rest}>
      <span className={`u-link ${styles.text}`}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">{glyph}</span>
    </a>
  );
}
