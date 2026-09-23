import { Fragment } from 'react';
import s from './previews.module.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hours = ['9', '11', '1', '3'];
// [row, col] → shift label
const shifts: Record<string, string> = {
  '0-0': 'Front desk\n9:00 – 12:00',
  '1-2': 'Help desk\n11:00 – 2:00',
  '2-4': 'Projects\n1:00 – 4:00',
  '0-3': 'Front desk\n9:00 – 11:00',
};

export function TimeTrackerPreview() {
  return (
    <div className={s.window} aria-hidden="true">
      <div className={s.card}>
        <div className={s.bar}>
          <span className={s.label}>TimeTracker</span>
          <span className={s.muted}>Week of Sep 14</span>
          <span className={s.button}>+ New shift</span>
        </div>
        <div className={s.week}>
          <div />
          {days.map((d) => (
            <div key={d} className={s.dayHead}>{d}</div>
          ))}
          {hours.map((h, r) => (
            <Fragment key={r}>
              <div className={s.hour}>{h}</div>
              {days.map((_, c) => {
                const key = `${r}-${c}`;
                const v = shifts[key];
                const isNew = r === 3 && c === 1;
                return (
                  <div key={key}>
                    {v && (
                      <div className={s.shift}>
                        {v.split('\n').map((l, i) => (
                          <div key={i} className={i ? s.muted : undefined}>{l}</div>
                        ))}
                      </div>
                    )}
                    {isNew && <div className={`${s.shift} ${s.shiftNew}`}>Drag to add</div>}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
        <div className={s.bar} style={{ borderBottom: 0, borderTop: '1px solid var(--line)' }}>
          <span className={s.dot} />
          <span className={s.muted}>Signed in with Microsoft Entra</span>
          <span className={s.muted} style={{ marginLeft: 'auto' }}>Illustrative</span>
        </div>
      </div>
    </div>
  );
}
