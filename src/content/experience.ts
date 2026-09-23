export interface Experience {
  org: string;
  place: string;
  roles: string[];
  period: string;
  summary: string;
  points: string[];
  /** Optional typographic figure rendered beside the entry */
  figure?: 'framework' | 'venture';
  related?: string[];   // project slugs
}

export const experience: Experience[] = [
  {
    org: 'No Bad Days Club',
    place: 'Boston, MA',
    roles: ['AI Product Intern'],
    period: 'May — June 2026',
    summary: 'Owned the end-to-end feedback-to-feature pipeline during beta launch.',
    points: [
      'Built a structured Discord intake system for user feedback.',
      'Prioritized requests by user demand × business impact × feasibility.',
      'Delivered 3+ feature specifications to the development team, grounded in real user feedback.',
      'Conducted user research and in-field testing at community experiences.',
      'Translated research into 2+ product decisions and continued feature iterations.',
    ],
    figure: 'framework',
  },
  {
    org: 'Institutional Insights & Innovation',
    place: 'University of Connecticut',
    roles: ['Student Business Strategist & Developer'],
    period: 'December 2025 — Present',
    summary: 'Internal software and product projects for the university — user testing, development, and iteration.',
    points: [
      'Sourcery — led beta testing and onboarding research.',
      'TimeTracker — re-engineered authentication and improved the interface.',
      'Rain Garden — turned plant and location data into a browsable application.',
    ],
    related: ['sourcery', 'raingarden'],
  },
  {
    org: 'Hillside Ventures',
    place: 'University of Connecticut',
    roles: ['SaaS Vertical Lead', 'Operations Lead', 'Analyst'],
    period: 'December 2024 — Present',
    summary: 'Evaluated 80+ early-stage SaaS startups across customer acquisition, retention, pricing, business models, and market dynamics.',
    points: [
      'Work contributed to 3+ investment decisions totaling $100K+ in deployed capital.',
      'Led SaaS vertical operations and analyst workflows.',
      'Restructured the process, improving investment decision turnaround time by roughly 20%.',
    ],
    figure: 'venture',
  },
];

export const ventureFigures = [
  { value: '80+', label: 'startups evaluated' },
  { value: '3+', label: 'investment decisions' },
  { value: '$100K+', label: 'capital deployed' },
  { value: '~20%', label: 'faster turnaround' },
];

export const leadership = {
  org: 'Girls into VC — UConn',
  role: 'Founder & President',
  period: 'February 2026 — Present',
  headline: ['Building the room,', 'not just entering it.'],
  text: 'Founded UConn’s first Girls into VC chapter and built campus programming around venture capital.',
  areas: ['Investor engagement', 'Cross-campus partnerships', 'Startup sourcing', 'Diligence & evaluation', 'Venture education'],
};
