import { useEffect, useState } from 'react';

/**
 * Minimal hash routing — no dependency, no server config.
 * '#/archive' is the only non-home route; everything else (including the
 * portfolio's own '#work' style anchors) stays on home.
 */
export type Route = 'home' | 'archive';

function read(): Route {
  return location.hash.replace(/^#/, '').replace(/^\//, '') === 'archive' ? 'archive' : 'home';
}

export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(read);

  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const go = (r: Route) => {
    if (r === 'archive') location.hash = '#/archive';
    else history.pushState(null, '', location.pathname + location.search);
    setRoute(r);
  };

  return [route, go];
}
