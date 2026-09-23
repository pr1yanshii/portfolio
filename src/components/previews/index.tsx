import type { VisualKind } from '../../content/projects';
import { AtelierPreview } from './AtelierPreview';
import { SourceryPreview } from './SourceryPreview';
import { TimeTrackerPreview } from './TimeTrackerPreview';
import { PlantFinderPreview } from './PlantFinderPreview';
import { ShowUpPreview } from './ShowUpPreview';

/** Designed placeholder compositions, keyed by project. Replaced by `image` when present. */
export { ShowUpPreview };
export type { ShowUpScreen } from './ShowUpPreview';

export function Preview({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case 'atelier': return <AtelierPreview />;
    case 'sourcery': return <SourceryPreview />;
    case 'timetracker': return <TimeTrackerPreview />;
    case 'raingarden': return <PlantFinderPreview />;
    case 'showup': return <ShowUpPreview screen="feed" />;
  }
}
