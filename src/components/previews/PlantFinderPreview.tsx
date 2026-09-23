import s from './previews.module.css';

const plants = [
  ['Swamp Milkweed', 'Asclepias incarnata', 'Wet · Full sun'],
  ['Blue Flag Iris', 'Iris versicolor', 'Wet · Part shade'],
  ['Joe-Pye Weed', 'Eutrochium purpureum', 'Moist · Sun'],
  ['Cardinal Flower', 'Lobelia cardinalis', 'Wet · Part shade'],
  ['Switchgrass', 'Panicum virgatum', 'Dry–wet · Sun'],
  ['New England Aster', 'Symphyotrichum novae-angliae', 'Moist · Sun'],
  ['Sensitive Fern', 'Onoclea sensibilis', 'Wet · Shade'],
];

export function PlantFinderPreview() {
  return (
    <div className={s.window} aria-hidden="true">
      <div className={s.card}>
        <div className={s.bar}>
          <span className={s.label}>Rain garden</span>
          <div className={s.field}>
            <span>Search plants…</span>
            <span className={s.mono}>⌘K</span>
          </div>
        </div>
        <div className={s.chips}>
          <span className={`${s.chip} ${s.chipOn}`}>Moisture: Wet</span>
          <span className={`${s.chip} ${s.chipOn}`}>Native to CT</span>
          <span className={s.chip}>Sun: Any</span>
          <span className={s.chip}>Height</span>
          <span className={s.chip}>Bloom</span>
          <span className={`${s.chip} ${s.muted}`}>Clear</span>
        </div>
        <div className={s.rows}>
          {plants.map(([name, latin, tags], i) => (
            <div className={s.row} key={name}>
              <span className={s.rowNum}>{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className={s.title}>{name}</span>
                <span className={s.latin}>{latin}</span>
              </span>
              <span className={s.tags}>{tags}</span>
            </div>
          ))}
        </div>
        <div className={s.bar} style={{ borderBottom: 0, borderTop: '1px solid var(--line)', marginTop: 'auto' }}>
          <span className={s.muted}>Showing 7 results</span>
          <span className={s.muted} style={{ marginLeft: 'auto' }}>Sorted by name</span>
        </div>
      </div>
    </div>
  );
}
