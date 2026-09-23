import s from './previews.module.css';

/**
 * Placeholder composition. Bars are illustrative only — no real funnel
 * numbers are shown. Replace with a screenshot via `image` in projects.ts.
 */
const stages: [string, number, boolean][] = [
  ['Sign-up', 100, false],
  ['First open', 84, false],
  ['Setup', 46, true],
  ['First real use', 38, false],
  ['Return visit', 33, false],
];

export function SourceryPreview() {
  return (
    <div className={s.window} aria-hidden="true">
      <div className={s.card}>
        <div className={s.bar}>
          <span className={s.label}>Sourcery · beta</span>
          <span className={s.muted}>Onboarding funnel</span>
          <span className={s.muted} style={{ marginLeft: 'auto' }}>Illustrative</span>
        </div>
        <div className={s.funnel}>
          {stages.map(([name, w, drop]) => (
            <div key={name} className={s.stage}>
              <span className={drop ? s.title : s.muted}>{name}</span>
              <div className={`${s.stageBar} ${drop ? s.stageDrop : ''}`} style={{ '--w': `${w}%` } as React.CSSProperties} />
              <span className={s.stageVal}>{drop ? '↓' : ''}</span>
            </div>
          ))}
          <div className={s.callout}>
            <span className={s.dot} />
            <span><b>Drop-off concentrated at setup.</b> Interviews + engagement data → onboarding friction.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
