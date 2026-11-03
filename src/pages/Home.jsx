import { useEffect } from 'react';
import AnisaMark from '../components/AnisaMark.jsx';
import ChatSection from '../components/ChatSection.jsx';
import ContactCard from '../components/ContactCard.jsx';
import Frozen, { scrollToStep } from '../components/Frozen.jsx';
import HomeNav from '../components/HomeNav.jsx';
import { closingStep, resumeSteps } from './Resume.jsx';

// The homepage: one stage that the whole page scrolls through. It begins with the wordmark, large, set toward
// the bottom right, then the contact card, a short chat, and the resume's sections, each fading in and out in
// place. A light nav sits at the top left. (The hello line and the greeting we tried are kept in
// components/HelloLine.jsx and theme.scss, ready to bring back.)

const steps = [
  // The first screen is a step of the stage like the rest: the wordmark stays where it is and fades out as you
  // scroll, rather than scrolling up the page.
  {
    key: 'hero',
    weight: 0.8,
    content: () => (
      <section className="home">
        <h1 className="home__mark">
          <AnisaMark className="home__mark-svg" />
        </h1>
        <a
          className="home__begin"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToStep(steps, 'contact');
          }}
        >
          <span className="home__begin-text">Pull up a chair — the story starts below.</span>
          {/* A curved arrow like ⤵: out to the right, round a bend, and down to an arrowhead. */}
          <svg className="home__begin-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3 6H11.5C16 6 18.5 8.5 18.5 13V19M13.5 14.5l5 5 5-5" />
          </svg>
        </a>
      </section>
    ),
  },
  { key: 'contact', weight: 1.3, next: 'Learn more about what I do', content: () => <ContactCard as="div" stage /> },
  { key: 'chat', weight: 1.5, next: 'Let’s break it down', content: ({ active, local }) => <ChatSection active={active} local={local} /> },
  ...resumeSteps,
  // The thank-you is the last step of the stage, so the page ends pinned.
  closingStep,
];

// Where each nav item goes: the key of the step it starts at.
const nav = [
  { key: 'contact', label: 'About Me' },
  {
    key: 'chat', // the chat leads into the jobs, so it counts as Work Experience
    label: 'Work Experience',
    subs: [
      { key: 'job-0', label: 'Senior Design Technologist' },
      { key: 'job-1', label: 'Full-Stack Software Engineer' },
      { key: 'job-2', label: 'Experience Design Co-op' },
      { key: 'job-3', label: 'Design Coordinator Co-op' },
    ],
  },
  {
    key: 'pride',
    label: 'Outside of Work',
    subs: [
      { key: 'pride', label: 'Pride @ Intuit' },
      { key: 'o4u', label: 'Out for Undergrad (O4U)' },
    ],
  },
  { key: 'appearances', label: '“Guest” Appearances' },
  { key: 'closing', label: 'Until Next Time', icon: 'end' }, // the thank-you at the very end
];

export default function Home() {
  // A link in the text (see `emphasis` in Resume.jsx) asks to go to a section by its key.
  useEffect(() => {
    const go = (e) => scrollToStep(steps, e.detail);
    window.addEventListener('goto-step', go);
    return () => window.removeEventListener('goto-step', go);
  }, []);

  return (
    <main className="home-page">
      <HomeNav steps={steps} items={nav} />
      <Frozen steps={steps} />
    </main>
  );
}
