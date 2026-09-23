import s from './showup.module.css';

export type ShowUpScreen = 'feed' | 'event' | 'filters';

/**
 * Placeholder screens for Show Up. Content is illustrative — generic
 * campus event types, no real organizations or counts. Replaced by real
 * screenshots via `images` in projects.ts.
 */
const events = [
  ['Involvement fair', 'Student Union · Thu 12:00', 'Campus life'],
  ['Jazz ensemble', 'Von der Mehden · Fri 7:30', 'Music'],
  ['Home game', 'Gampel Pavilion · Sat 2:00', 'Athletics'],
  ['Founder talk', 'Werth Tower · Tue 6:00', 'Career'],
];

function Status() {
  return (
    <div className={s.status} aria-hidden="true">
      <span>9:41</span>
      <span className={s.statusRight}><i /><i /><i /></span>
    </div>
  );
}

export function ShowUpPreview({ screen }: { screen: ShowUpScreen }) {
  if (screen === 'event') {
    return (
      <div className={s.screen} aria-hidden="true">
        <Status />
        <div className={s.hero}>
          <span className={s.back}>←</span>
          <span className={s.heroTag}>Music</span>
        </div>
        <div className={s.pad}>
          <div className={s.h1}>Jazz ensemble</div>
          <div className={s.metaRow}><span className={s.k}>When</span><span>Fri · 7:30 – 9:00 PM</span></div>
          <div className={s.metaRow}><span className={s.k}>Where</span><span>Von der Mehden Recital Hall</span></div>
          <div className={s.metaRow}><span className={s.k}>Host</span><span>School of Fine Arts</span></div>
          <div className={s.lines}><i style={{ width: '92%' }} /><i style={{ width: '78%' }} /><i style={{ width: '55%' }} /></div>
          <div className={s.cta}>Add to calendar</div>
          <div className={s.source}>Source · UConn Events</div>
        </div>
      </div>
    );
  }
  if (screen === 'filters') {
    return (
      <div className={s.screen} aria-hidden="true">
        <Status />
        <div className={s.pad}>
          <div className={s.search}><span>Search events</span><span>⌕</span></div>
          <div className={s.k} style={{ marginTop: '1.4em' }}>When</div>
          <div className={s.chips}>
            <span className={`${s.chip} ${s.chipOn}`}>Today</span>
            <span className={s.chip}>This week</span>
            <span className={s.chip}>Weekend</span>
          </div>
          <div className={s.k} style={{ marginTop: '1.4em' }}>Categories</div>
          <ul className={s.list}>
            {['Campus life', 'Music', 'Athletics', 'Career', 'Free food', 'Workshops', 'Culture'].map((c, i) => (
              <li key={c}><span>{c}</span><span className={`${s.box} ${i < 3 ? s.boxOn : ''}`} /></li>
            ))}
          </ul>
          <div className={s.cta}>Show events</div>
        </div>
      </div>
    );
  }
  return (
    <div className={s.screen} aria-hidden="true">
      <Status />
      <div className={s.pad}>
        <div className={s.brandRow}>
          <span className={s.brand}>Show Up</span>
          <span className={s.k}>This week</span>
        </div>
        <div className={s.search}><span>Search events</span><span>⌕</span></div>
        <div className={s.chips}>
          <span className={`${s.chip} ${s.chipOn}`}>All</span>
          <span className={s.chip}>Music</span>
          <span className={s.chip}>Athletics</span>
          <span className={s.chip}>Career</span>
          <span className={s.chip}>Free food</span>
        </div>
        <div className={s.cards}>
          {events.map(([name, when, cat]) => (
            <div key={name} className={s.card}>
              <div className={s.thumb} />
              <div className={s.cardBody}>
                <div className={s.cardTag}>{cat}</div>
                <div className={s.cardTitle}>{name}</div>
                <div className={s.cardMeta}>{when}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={s.tabs}><span className={s.tabOn}>Discover</span><span>Saved</span><span>Map</span></div>
    </div>
  );
}
