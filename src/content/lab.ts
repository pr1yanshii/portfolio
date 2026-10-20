/**
 * THE PRODUCT LAB — content.
 *
 * ACCURACY RULE: every line here traces to something stated in the portfolio's
 * own project content. Where an artifact does not exist yet (wireframes, Figma
 * files, launch numbers) the entry says so plainly instead of inventing one.
 * There are no metrics in this file that were not supplied.
 */

export type Lens = 'think' | 'design' | 'build';

export const lenses: { id: Lens; label: string; note: string }[] = [
  { id: 'think', label: 'Think', note: 'Problem, users, decisions' },
  { id: 'design', label: 'Design', note: 'Flows, interface, usability' },
  { id: 'build', label: 'Build', note: 'Stack, architecture, debugging' },
];

export interface LensCard {
  /** Stage label, e.g. "Problem" — doubles as the case-study spine. */
  stage: string;
  body: string;
  /** Renders as a quiet "nothing to show yet" card rather than a claim. */
  pending?: boolean;
}

export interface LabProject {
  slug: string;
  title: string;
  kicker: string;
  role: string;
  status: string;
  stack: string[];
  /** Canvas position as a % of the board, desktop only. */
  pos: { x: number; y: number; r: number };
  lenses: Record<Lens, LensCard[]>;
}

export const labProjects: LabProject[] = [
  {
    slug: 'showup',
    title: 'Show Up',
    kicker: 'Campus event discovery',
    role: 'Founder · Product + Engineering',
    status: 'In development · 2026',
    stack: ['Next.js', 'Supabase'],
    pos: { x: 4, y: 6, r: -2.2 },
    lenses: {
      think: [
        { stage: 'Problem', body: 'Plenty happens on campus. Finding out about it is the hard part — events are scattered across UConntact, UConn Events, Athletics and individual organisation pages.' },
        { stage: 'Users', body: 'UConn students trying to answer one question: what is worth going to this week?' },
        { stage: 'Discovery', body: 'Student interviews and problem discovery, to check the fragmentation was the real complaint and not just my own.' },
        { stage: 'Decision', body: 'Aggregation and data quality came before anything clever. A discovery app whose data is stale, duplicated or wrong is worse than no app.' },
        { stage: 'Where it stands', body: 'Still in development. Mobile-first discovery, search and a campus map are the shape of the product; it has not launched.' },
      ],
      design: [
        { stage: 'Principle', body: 'Mobile-first. The question "what is happening tonight" gets asked while walking across campus, not at a desk.' },
        { stage: 'Shape', body: 'One visual discovery surface instead of five tabs — events, categories and time collapsed into a single browsable feed.' },
        { stage: 'Artifacts', body: 'Interface work is in progress. No published wireframes or Figma files to show here yet.', pending: true },
      ],
      build: [
        { stage: 'Stack', body: 'Next.js and Supabase, chosen to keep one person able to move across the whole stack.' },
        { stage: 'Hard part', body: 'Event aggregation. Multiple sources, different formats, and the same event listed more than once in more than one place.' },
        { stage: 'Data quality', body: 'Cleaning and deduplication sit between the sources and the feed. This is most of the unglamorous work.' },
        { stage: 'Surface', body: 'Search and filtering over the cleaned set, plus the campus map and discovery experience on top.' },
      ],
    },
  },
  {
    slug: 'raingarden',
    title: 'Rain Garden',
    kicker: 'Plant discovery platform',
    role: 'Data modeling, import, search, interface',
    status: 'UConn Institutional Insights & Innovation · 2025',
    stack: ['Laravel', 'PHP', 'SQL'],
    pos: { x: 54, y: 5, r: 1.8 },
    lenses: {
      think: [
        { stage: 'Problem', body: 'The plant and location information was accurate and already existed — it just lived in spreadsheet-style datasets nobody could browse.' },
        { stage: 'Users', body: 'People choosing appropriate plants for a site, who should not have to read a spreadsheet to do it.' },
        { stage: 'Stakeholders', body: 'Requirements came from the people who owned the data. Getting the questions right mattered more than the schema.' },
        { stage: 'Decision', body: 'Model the relationships properly first. Search and filtering are only as good as the structure underneath them.' },
        { stage: 'Outcome', body: 'A browsable, filterable interface in place of manual spreadsheet lookup, shaped by stakeholder feedback along the way.' },
      ],
      design: [
        { stage: 'Shape', body: 'A searchable, filterable list — the fastest path from "I have these conditions" to "these plants suit them".' },
        { stage: 'Decision', body: 'Filters mirror the questions people actually asked, rather than the column names in the source data.' },
        { stage: 'Iteration', body: 'Stakeholder feedback drove changes more than once. That was the point of showing it early.' },
      ],
      build: [
        { stage: 'Stack', body: 'Laravel and PHP over a relational database.' },
        { stage: 'Modeling', body: 'Plants and locations related many-to-many — the structure the spreadsheets were implying but could not express.' },
        { stage: 'Import', body: 'A data import to move the existing datasets into that structure without losing what was already correct.' },
        { stage: 'Surface', body: 'Search and filtering, then the interface over it.' },
      ],
    },
  },
  {
    slug: 'ping',
    title: 'Ping',
    kicker: 'Proximity-based social discovery',
    role: 'CSE Team Manager & iOS Developer',
    status: 'In development · Senior Design Team 36 · Sept 2026 — Present',
    stack: ['Swift', 'iOS', 'Bluetooth / UWB'],
    pos: { x: 27, y: 45, r: -1.2 },
    lenses: {
      think: [
        { stage: 'Context', body: 'An existing iOS app. Our senior design team is debugging and developing it toward an MVP — we did not build it from scratch.' },
        { stage: 'My role', body: 'CSE Team Manager. Coordinating development tasks across our software team, the ECE hardware team, our external sponsor and our faculty advisor.' },
        { stage: 'Decisions', body: 'Helping define what the MVP has to do, and balancing what we want the product to be against what the platform will actually allow.' },
        { stage: 'Evidence', body: 'Gathering user feedback to find usability issues and let them set priorities, rather than guessing at them.' },
        { stage: 'Where it stands', body: 'Ongoing team project, not launched. Profile editing and messaging work. Proximity discovery, background detection and direction still need investigation and debugging.' },
      ],
      design: [
        { stage: 'Focus', body: 'Nearby-device discovery and the connection flows around it — the part of the product people actually feel.' },
        { stage: 'Evidence', body: 'User feedback is the input. It surfaces usability problems that are invisible from inside the codebase.' },
        { stage: 'Artifacts', body: 'This is an inherited codebase we are improving. No design files of mine to publish here.', pending: true },
      ],
      build: [
        { stage: 'Stack', body: 'Swift and iOS. Tested on physical iPhones, because proximity behaviour cannot be trusted in a simulator.' },
        { stage: 'Research', body: 'Bluetooth discovery, Apple’s Nearby Interaction framework, and where UWB stops cooperating.' },
        { stage: 'Debugging', body: 'Working through the existing codebase to reproduce and isolate bugs rather than rewrite around them.' },
        { stage: 'Constraint', body: 'Background behaviour and direction detection are the open problems. Some of what we want may not be possible on the platform — finding that boundary is part of the work.' },
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/* The decision simulator                                              */
/* ------------------------------------------------------------------ */

export interface Choice {
  id: 'map' | 'search' | 'ai';
  label: string;
  blurb: string;
  /** 0–100, for the animated meters. Judgement calls, not measurements. */
  value: number;
  effort: number;
  risk: number;
  upside: string;
  tradeoff: string;
  engineering: string;
}

export const simulator = {
  prompt: 'You are launching a campus event discovery app. You have two weeks of engineering time.',
  question: 'What do you prioritise?',
  choices: [
    {
      id: 'map',
      label: 'Interactive campus map',
      blurb: 'Put every event where it actually is.',
      value: 62,
      effort: 78,
      risk: 55,
      upside: 'Location is the most natural way students already think about campus. A map demos beautifully and makes the product feel real.',
      tradeoff: 'A map only helps once there is something worth plotting. If the event data is thin or wrong, a map makes that more obvious, not less.',
      engineering: 'Map rendering, geocoding venues that were written as free text, clustering when fifty things happen in one building. Two weeks is tight.',
    },
    {
      id: 'search',
      label: 'Event search & filtering',
      blurb: 'Help people find the thing they already want.',
      value: 74,
      effort: 42,
      risk: 28,
      upside: 'Directly answers the question people arrive with. Cheap to build, easy to test, and it works even when the catalogue is small.',
      tradeoff: 'It is not a story anyone repeats to a friend. Search rarely wins a demo, and it assumes people know what to search for.',
      engineering: 'Mostly query work over data you already hold, plus sensible filter design. The smallest of the three.',
    },
    {
      id: 'ai',
      label: 'Personalised recommendations',
      blurb: 'Learn what each student cares about.',
      value: 55,
      effort: 88,
      risk: 82,
      upside: 'The most differentiated answer, and the one that scales attention as the catalogue grows.',
      tradeoff: 'Needs behaviour to learn from, and at launch there is none. Cold-start recommendations are usually indistinguishable from random.',
      engineering: 'A model or heuristic, an evaluation story, and a feedback loop. Hard to do credibly in two weeks, harder to know if it worked.',
    },
  ] as Choice[],

  /** Shown after any choice — no option is scored as correct. */
  verdict:
    'There is no right answer here. Prioritisation depends on who your users are, what evidence you actually have, and what you can finish. All three of these are defensible — what matters is being able to say why you picked one and what you gave up.',

  /** Verified from the Show Up project content only. */
  reveal: {
    title: 'What actually happened in Show Up',
    body:
      'None of the three. The work that unlocked everything else sat upstream of all of them: events live across UConntact, UConn Events, Athletics and individual organisation pages, in different formats, and the same event often appears more than once. Aggregation, cleaning and deduplication had to come first — search, the campus map and the discovery experience all sit on top of that. It is still in development.',
    footnote: 'The least demo-able option is often the one holding up the other three.',
  },
};

/* ------------------------------------------------------------------ */
/* Canvas furniture                                                    */
/* ------------------------------------------------------------------ */

export const stickies: { id: string; text: string; x: number; y: number; r: number; tone: 'violet' | 'lime' | 'paper' }[] = [
  { id: 'n1', text: 'The boring data work is usually the real feature.', x: 79, y: 35, r: 3.4, tone: 'lime' },
  { id: 'n2', text: 'Ask what they did last week, not what they want.', x: 2, y: 46, r: -2.6, tone: 'paper' },
  { id: 'n3', text: 'Scope is a product decision, not a failure.', x: 57, y: 66, r: 2.1, tone: 'violet' },
  { id: 'n4', text: '"It works on my machine" is a proximity-app punchline.', x: 4, y: 72, r: -1.4, tone: 'paper' },
];

/** Hover-to-reveal lessons attached to small canvas marks. */
export const lessons: { id: string; prompt: string; lesson: string; x: number; y: number }[] = [
  { id: 'l1', prompt: 'Why ship small?', lesson: 'Because the first version is a question, not an answer.', x: 44, y: 10 },
  { id: 'l2', prompt: 'When to say no', lesson: 'When yes would cost the thing that is already working.', x: 88, y: 14 },
  { id: 'l3', prompt: 'Best research tool', lesson: 'Silence after you finish asking the question.', x: 42, y: 80 },
];

/** Easter egg. Obviously fictional, deliberately bad. */
export const badIdeas = {
  a: ['Uber', 'Tinder', 'LinkedIn', 'Figma', 'Notion', 'Slack', 'Duolingo', 'Strava', 'Spotify'],
  b: ['but for', 'except for', 'meets', 'crossed with', 'but exclusively for'],
  c: ['dentists', 'houseplants', 'group projects', 'parallel parking', 'your landlord', 'lab reports', 'Tuesdays', 'communal fridges', 'printer queues'],
  d: ['on the blockchain', 'with haptics', 'powered by vibes', 'as a subscription', 'but it is a physical kiosk', 'with an aggressive push strategy'],
};
