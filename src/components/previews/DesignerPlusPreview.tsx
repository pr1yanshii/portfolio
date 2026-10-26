import s from './previews.module.css';

/** Placeholder composition. Illustrative only — not a screenshot. */
export function DesignerPlusPreview() {
  return (
    <div className={s.window} aria-hidden="true">
      <div className={s.card}>
        <div className={s.bar}>
          <span className={s.label}>designer+</span>
          <span className={s.muted}>PowerPoint add-in</span>
          <span className={s.muted} style={{ marginLeft: 'auto' }}>Illustrative</span>
        </div>
        <div className={s.deck}>
          <div className={s.slides}>
            <div className={s.slideMain}>
              <span className={s.slideRule} />
              <span className={s.slideTitle}>Quarterly review</span>
              <span className={s.slideLine} style={{ width: '70%' }} />
              <span className={s.slideLine} style={{ width: '45%' }} />
            </div>
            <div className={s.strip}>
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={`${s.thumbSlide} ${i === 1 ? s.thumbOn : ''}`} />
              ))}
            </div>
          </div>
          <div className={s.pane}>
            <span className={s.label}>Directions</span>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`${s.paneOpt} ${i === 0 ? s.paneOptOn : ''}`}>
                <span className={`${s.paneBar} ${i === 0 ? s.paneBarInk : ''}`} />
                <span className={`${s.paneBar} ${i === 1 ? s.paneBarAccent : ''}`} style={{ width: '80%' }} />
                <span className={s.paneBar} style={{ width: '55%' }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
