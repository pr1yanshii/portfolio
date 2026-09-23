import { Fragment } from 'react';

/** Renders "*emphasised*" spans of a string in the editorial serif. */
export function Serif({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <em key={i} className="serif">{p.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
