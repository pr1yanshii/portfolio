import s from './previews.module.css';

export function AtelierPreview() {
  return (
    <div className={s.window} aria-hidden="true">
      <div className={s.card}>
        <div className={s.bar}>
          <span className={s.label}>Atelier</span>
          <span className={s.muted}>Relaxed cotton shirt</span>
          <span className={s.muted} style={{ marginLeft: 'auto' }}>Illustrative</span>
        </div>
        <div className={s.split}>
          <div className={s.product}>
            <div className={s.garment} />
            <div className={s.sizes}>
              {['XS', 'S', 'M', 'L', 'XL'].map((z) => (
                <span key={z} className={`${s.size} ${z === 'M' ? s.sizeOn : ''}`}>{z}</span>
              ))}
            </div>
          </div>
          <div className={s.assistant}>
            <span className={s.label}>Sizing assistant</span>
            <div className={s.inputs}>
              <span className={s.input}><span>Height</span><span>5′6″</span></span>
              <span className={s.input}><span>Fit</span><span>Relaxed</span></span>
              <span className={s.input}><span>Usually</span><span>S / M</span></span>
              <span className={s.input}><span>Brand</span><span>—</span></span>
            </div>
            <p className={s.reco}>
              <span className={s.recoBig}>M</span>
              Fits through the shoulders, with room at the waist.
            </p>
            <div>
              <div className={s.meter} />
              <div className={`${s.muted}`} style={{ marginTop: '0.5em', display: 'flex', justifyContent: 'space-between' }}>
                <span>Confidence</span><span>High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
