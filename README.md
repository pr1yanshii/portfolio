# Priyanshi Sitlani — Portfolio

Single-page portfolio. Vite + React + TypeScript, CSS Modules on a token system, `motion` for scroll-linked transforms, `lenis` for scroll feel. Nothing else at runtime.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Editing content

Everything editable lives in `src/content/`. Components never hard-code facts.

| File | Controls |
|---|---|
| `site.ts` | Name, school, minor, graduation, positioning line, the cycling "Currently →" words, links, and the section index |
| `projects.ts` | Selected Work — title, 1–2 sentence description, contribution, 2–4 labels, one result, year, layout variant, visual |
| `experience.ts` | Experience entries, the venture figures, and the Girls into VC moment |
| `about.ts` | About headline, paragraphs, and the outside-work line |

Placeholders to replace: `links.github` and `links.resume` in `site.ts` (drop `resume.pdf` into `/public`).

## Project visuals

Each project renders a designed placeholder composition until you give it a real image:

```ts
image: '/images/atelier/cover.png'
```

Folders already exist at `public/images/{atelier,sourcery,timetracker,raingarden,showup}/`. Show Up uses the `showcase` layout and takes several portrait screens via `images: [...]` (feed, event detail, filters) instead of a single `image`. Placeholder compositions are marked "Illustrative" and show no real numbers.

## Design system

- Tokens: `src/styles/tokens.css` — color (ivory / bone / ink, and the charcoal passage), type scale, spacing, layout, motion timing.
- Sections carry `data-theme="light|dark"`; the page background cross-fades between them as you scroll.
- Type: Instrument Sans (primary), Instrument Serif italic (editorial moments only), from Google Fonts in `index.html`.
- Cursor: a difference-blend dot that becomes "View" over `[data-cursor="view"]` and ↗ over `[data-cursor="ext"]`. Pointer devices only; off under `prefers-reduced-motion`.
