import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useFinePointer } from '../hooks/useFinePointer';
import styles from './Cursor.module.css';

/**
 * A small dot that follows the pointer. Over an element with
 * data-cursor="view" it grows into a "View" disc; over data-cursor="ext"
 * it shows ↗. Pointer devices only; off for reduced motion.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) {
      delete document.documentElement.dataset.cursor;
      return;
    }
    document.documentElement.dataset.cursor = 'on';
    const el = ref.current!;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, visible = false;

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        x = tx; y = ty; visible = true;
        el.dataset.visible = 'true';
      }
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      const mode = target?.dataset.cursor ?? '';
      if (el.dataset.mode !== mode) el.dataset.mode = mode;
    };
    const onLeave = () => { visible = false; el.dataset.visible = 'false'; };
    const onEnter = () => { visible = false; };
    const onDown = () => { el.dataset.down = 'true'; };
    const onUp = () => { el.dataset.down = 'false'; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      delete document.documentElement.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true" data-visible="false" data-mode="">
      <span className={styles.dot} />
      <span className={styles.label}>View</span>
      <span className={styles.arrow}>↗</span>
    </div>
  );
}
