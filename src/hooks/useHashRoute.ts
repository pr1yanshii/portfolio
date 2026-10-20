import { useEffect, useState } from 'react';

/**
 * Minimal hash routing — no dependency, no server config.
 * '#/lab' is the only non-home route; everything else (including the
 * portfolio's own '#work' style anchors) stays on home.
 */
export type Route = 'home' | 'lab';

function read(): Route {
  return location.hash.replace(/^#/, '').replace(/^\//, '') === 'lab' ? 'lab' : 'home';
}

export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(read);

  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const go = (r: Route) => {
    if (r === 'lab') location.hash = '#/lab';
    else history.pushState(null, '', location.pathname + location.search);
    setRoute(r);
  };

  return [route, go];
}
