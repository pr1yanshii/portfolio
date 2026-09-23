/**
 * Site-wide facts and links. Items marked TODO are placeholders.
 */
export const site = {
  name: 'Priyanshi Sitlani',
  first: 'Priyanshi',
  last: 'Sitlani',
  mark: 'PS.',
  school: 'University of Connecticut',
  schoolShort: 'UConn',
  degree: 'B.S. Computer Science',
  minor: 'Minor in Entrepreneurship & Technology Innovation',
  graduation: 'May 2027',
  location: 'Storrs, CT',
  timeZone: 'America/New_York',

  /** Hero positioning */
  positioning: ['Product, technology', '& *the space between.*'],
  /** The cycling word after "Currently →" */
  currently: ['building', 'exploring', 'researching', 'experimenting'],

  links: {
    email: 'priyanshi.sitlani@uconn.edu',
    linkedin: 'https://www.linkedin.com/in/priyanshi-sitlani',
    github: 'https://github.com/TODO',   // TODO: GitHub URL
    resume: '/resume.pdf',               // TODO: drop resume.pdf into /public
  },
} as const;

/**
 * The section index. Drives the nav, numbering, the "01 / 05" counter,
 * and the page theme (background cross-fades as sections cross the viewport).
 */
export const sections = [
  { id: 'work',       number: '01', label: 'Work',       theme: 'light', nav: true  },
  { id: 'experience', number: '02', label: 'Experience', theme: 'dark',  nav: true  },
  { id: 'about',      number: '03', label: 'About',      theme: 'light', nav: true  },
  { id: 'leadership', number: '04', label: 'Leadership', theme: 'light', nav: false },
  { id: 'contact',    number: '05', label: 'Contact',    theme: 'dark',  nav: true  },
] as const;

export type SectionId = (typeof sections)[number]['id'] | 'intro';
