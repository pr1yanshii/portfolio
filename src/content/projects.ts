/**
 * Selected work. Deliberately concise — the visual does the work.
 *
 * Visuals: set `image` to a real screenshot (drop it in /public/images/<slug>/)
 * and the designed placeholder (`visual`) is ignored.
 * `layout` + `flip` control the composition; alternate them down the page.
 */
export type VisualKind = 'atelier' | 'sourcery' | 'timetracker' | 'raingarden' | 'showup';
/** showcase = full-width editorial screen showcase (for consumer products) */
export type ProjectLayout = 'wide' | 'split' | 'compact' | 'showcase';

export interface Project {
  slug: string;
  title: string;
  tagline?: string;      // optional one-line hook shown above the description
  description: string;   // 1–2 sentences, plain language
  contribution: string;  // my role, one short line
  labels: string[];      // 2–4 category / technology labels
  result?: string;       // one result or metric, if there is one
  recognition?: string;  // e.g. an award
  status?: string;       // e.g. 'In development · 2026' for active projects
  year: string;
  layout: ProjectLayout;
  flip?: boolean;
  visual: VisualKind;
  image?: string;        // e.g. '/images/atelier/cover.png'
  images?: string[];     // showcase layout: several portrait screens, e.g. ['/images/showup/feed.png', …]
  href?: string;         // project page — omit to hide "View project"
}

export const projects: Project[] = [
  {
    slug: 'atelier',
    title: 'Atelier',
    description: 'AI sizing assistant designed to help shoppers feel more confident choosing a clothing size before they buy.',
    contribution: 'Product thinking, MVP development, user testing',
    labels: ['Product', 'AI', 'User testing'],
    result: '70% of 15 testers reported higher purchase confidence',
    recognition: '1st place — Product Hackathon',
    year: '2026',
    layout: 'wide',
    visual: 'atelier',
  },
  {
    slug: 'sourcery',
    title: 'Sourcery',
    description: 'Improved onboarding through beta testing and feedback from 60+ early users.',
    contribution: 'Led beta testing, user research, product changes',
    labels: ['Product', 'User research', 'Experimentation'],
    result: '+18% activation',
    year: '2026',
    layout: 'split',
    flip: true,
    visual: 'sourcery',
  },
  {
    slug: 'timetracker',
    title: 'TimeTracker',
    description: 'Modernized authentication and improved the experience of an internal payroll application used by 50+ staff.',
    contribution: 'Migrated login to Microsoft SSO, improved UI and shift creation',
    labels: ['Laravel', 'Microsoft SSO', 'Product engineering'],
    year: '2025 — 2026',
    layout: 'split',
    visual: 'timetracker',
  },
  {
    slug: 'raingarden',
    title: 'Rain Garden',
    description: 'Turned structured plant and location data into a searchable, filterable web experience.',
    contribution: 'Data modeling, import, search and interface',
    labels: ['Laravel', 'Data', 'UI'],
    year: '2025',
    layout: 'compact',
    flip: true,
    visual: 'raingarden',
  },
  {
    slug: 'showup',
    title: 'Show Up',
    tagline: 'A better way to discover what\u2019s happening at UConn.',
    description: 'A mobile-first platform that brings campus events from different sources into one visual discovery experience.',
    contribution: 'Founder · Product + Engineering',
    labels: ['Next.js', 'Supabase'],
    status: 'In development · 2026',
    year: '2026',
    layout: 'showcase',
    visual: 'showup',
    // images: ['/images/showup/feed.png', '/images/showup/event.png', '/images/showup/filters.png'],
  },
];
