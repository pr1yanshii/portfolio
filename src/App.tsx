import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useLenis, scrollToId } from './hooks/useLenis';
import { useHashRoute } from './hooks/useHashRoute';
import { Lab } from './lab/Lab';
import { useSectionTheme } from './hooks/useSectionTheme';
import { useActiveSection } from './hooks/useActiveSection';
import { useReveal } from './hooks/useReveal';
import { Loader } from './components/Loader';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { About } from './components/About';
import { Leadership } from './components/Leadership';
import { Cursor } from './components/Cursor';
import { Contact } from './components/Contact';

export default function App() {
  const [entered, setEntered] = useState(false);
  const onDone = useCallback(() => setEntered(true), []);

  const [route, go] = useHashRoute();
  const inLab = route === 'lab';

  // The portfolio's scroll + observers pause while the Lab is open.
  const lenis = useLenis(entered && !inLab);
  useSectionTheme(entered);
  useReveal(entered);
  const active = useActiveSection(entered);

  // Handle a hash on load (e.g. /#work) once everything is mounted
  useEffect(() => {
    if (!entered || inLab || !location.hash || location.hash.startsWith('#/')) return;
    const el = document.querySelector(location.hash);
    el?.scrollIntoView();
  }, [entered, inLab]);

  // Route every in-page anchor (scroll cue, back-to-top, …) through Lenis
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#' || e.defaultPrevented) return;
      if (a.getAttribute('href')!.startsWith('#/')) return;   // route links, not anchors
      const id = a.getAttribute('href')!.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(lenis.current, id);
      history.replaceState(null, '', `#${id}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);

  return (
    <>
      <Loader onDone={onDone} />
      {!inLab && <Cursor />}
      <Nav active={active} lenis={lenis} visible={entered && !inLab} onEnterLab={() => go('lab')} />
      <main>
        <Hero />
        <Experience />
        <Work />
        <Leadership />
        <About />
        <Contact />
      </main>

      <AnimatePresence>
        {inLab && <Lab key="lab" onExit={() => go('home')} />}
      </AnimatePresence>
    </>
  );
}
