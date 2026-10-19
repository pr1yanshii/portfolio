import s from './ping.module.css';

/**
 * Placeholder composition for Ping — an abstract range diagram and a nearby
 * list. Illustrative only: no real screenshot, no real people, no distances
 * claimed as measured output.
 */
const pins = [
  { x: 31, y: 36, near: false },
  { x: 62, y: 30, near: true },
  { x: 70, y: 63, near: false },
  { x: 40, y: 70, near: false },
  { x: 22, y: 56, near: false },
];

const nearby = [
  { name: 'Nearby user', sub: 'Shared interest', dist: '~4 m', dir: '↖' },
  { name: 'Nearby user', sub: 'Shared interest', dist: '~12 m', dir: '↗' },
  { name: 'Nearby user', sub: 'Shared interest', dist: '~20 m', dir: '→' },
];

export function PingPreview() {
  return (
    <div className={s.wrap} aria-hidden="true">
      <div className={s.radar}>
        {[1, 2, 3].map((r) => (
          <span key={r} className={s.ring} data-r={r} />
        ))}
        <span className={s.heading} />
        <span className={s.me} />
        {pins.map((p, i) => (
          <span
            key={i}
            className={`${s.pin} ${p.near ? s.pinNear : ''}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}
        <span className={s.radarLabel}>Range · illustrative</span>
      </div>

      <div className={s.panel}>
        <div className={s.head}>
          <span className={s.title}>Ping</span>
          <span className={s.k}>Nearby</span>
        </div>
        {nearby.map((n, i) => (
          <div key={i} className={s.row}>
            <span className={s.avatar} />
            <span>
              <span className={s.name}>{n.name}</span>
              <span className={s.sub}>{n.sub}</span>
            </span>
            <span className={s.dist}>
              {n.dist}
              <span className={s.arrow}>{n.dir}</span>
            </span>
          </div>
        ))}
        <div className={s.cta}>Send a ping</div>
        <div className={s.foot}>
          <span>Bluetooth + UWB</span>
          <span>In development</span>
        </div>
      </div>
    </div>
  );
}
