import { useCallback, useEffect, useState } from 'react';
import { useLenis, scrollToId } from './hooks/useLenis';
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

  const lenis = useLenis(entered);
  useSectionTheme(entered);
  useReveal(entered);
  const active = useActiveSection(entered);

  // Handle a hash on load (e.g. /#work) once everything is mounted
  useEffect(() => {
    if (!entered || !location.hash) return;
    const el = document.querySelector(location.hash);
    el?.scrollIntoView();
  }, [entered]);

  // Route every in-page anchor (scroll cue, back-to-top, …) through Lenis
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#' || e.defaultPrevented) return;
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
      <Cursor />
      <Nav active={active} lenis={lenis} visible={entered} />
      <main>
        <Hero />
        <Work />
        <Experience />
        <About />
        <Leadership />
        <Contact />
      </main>
    </>
  );
}
