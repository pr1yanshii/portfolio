import s from './previews.module.css';

/** Placeholder composition. Illustrative only — not a screenshot. */
export function ErrandPreview() {
  return (
    <div className={s.window} aria-hidden="true">
      <div className={s.card}>
        <div className={s.bar}>
          <span className={s.label}>Errand</span>
          <span className={s.muted}>Agentic commerce</span>
          <span className={s.muted} style={{ marginLeft: 'auto' }}>Illustrative</span>
        </div>
        <div className={s.thread}>
          <div className={`${s.msg} ${s.msgUser}`}>Need a desk lamp under $60, warm light</div>
          <div className={`${s.msg} ${s.msgBot}`}>Found three. This one fits best — warm 2700K, dimmable.</div>

          <div className={s.buy}>
            <span className={s.buyThumb} />
            <span>
              <span className={s.buyName}>Desk lamp</span>
              <span className={s.buyMeta} style={{ display: 'block' }}>2700K · dimmable</span>
            </span>
            <span className={s.buyPrice}>$52</span>
          </div>

          <div className={s.approve}>
            <div className={s.approveTop}>
              <span className={s.label}>Approve purchase</span>
              <span className={s.muted}>Stripe</span>
            </div>
            <div className={s.limitBar} />
            <div className={s.approveTop}>
              <span className={s.muted}>Monthly limit</span>
              <span className={s.muted}>$52 of $140</span>
            </div>
            <div className={s.approveBtns}>
              <span className={s.approveYes}>Approve</span>
              <span className={s.approveNo}>Not this one</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
