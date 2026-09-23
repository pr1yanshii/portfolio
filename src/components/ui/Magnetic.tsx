import { useRef, type ReactNode, type PointerEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import { useFinePointer } from '../../hooks/useFinePointer';

/**
 * Very low-intensity magnetic wrapper: the child drifts a few pixels toward
 * the cursor and springs back. Pointer-only, reduced-motion aware.
 */
export function Magnetic({ children, strength = 0.18, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ display: 'inline-block', transition: 'transform 420ms var(--ease-expo)', willChange: 'transform' }}
    >
      {children}
    </span>
  );
}
