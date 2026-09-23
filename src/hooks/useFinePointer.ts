import { useEffect, useState } from 'react';

/** True on devices with a hover-capable, precise pointer (i.e. not touch). */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
}
