import { useEffect, useState } from 'react';
import { sections, type SectionId } from '../content/site';

/** Which section is currently "the" section — drives the nav indicator and 0X / 06 counter. */
export function useActiveSection(ready: boolean): SectionId {
  const [active, setActive] = useState<SectionId>('intro');

  useEffect(() => {
    if (!ready) return;
    const els = ['intro', ...sections.map((s) => s.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -55% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ready]);

  return active;
}
