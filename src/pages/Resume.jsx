import { useRef } from 'react';
import useFade from '../hooks/useFade.js';
import Frozen from '../components/Frozen.jsx';
import Walker from '../components/Walker.jsx';
import Showcase from '../components/Showcase.jsx';
import PhotoStrip from '../components/PhotoStrip.jsx';
import Appearances from '../components/Appearances.jsx';
import { experience, leadershipShowcase } from '../data/resume.js';

// *words* between asterisks are set in italics, and [words](key) link to the section with that key.
const emphasis = (text) =>
  text.split(/(\[[^\]]+\]\([\w-]+\)|\*[^*]+\*)/).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([\w-]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          className="resume__link"
          href={`#${link[2]}`}
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('goto-step', { detail: link[2] }));
          }}
        >
          {link[1]}
        </a>
      );
    }
    return part.startsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part;
  });

function Bullets({ items }) {
  return (
    <ul className="resume__bullets">
      {items.map((b) => <li key={b}>{b}</li>)}
    </ul>
  );
}

// One job: the role is the main thing (as in the nav), with the company, where it was and when on one line under it, all
// above what was done. A job with more than one role lists each of them that way.
function Job({ job, id, starAt }) {
  return (
    <article aria-labelledby={id}>
      {job.photos && (
        <PhotoStrip
          photos={job.photos}
          organization={job.company}
          starAt={starAt}
          className={`${job.photos.length === 2 ? 'resume__photos--pair' : ''} ${job.natural ? 'resume__photos--natural' : ''}`}
        />
      )}
      <div className="resume__entry">
        <header className="resume__who">
          {job.roles.map((role, i) => (
            <div key={role.title} className="resume__position">
              {i === 0 ? (
                <h3 id={id} className="resume__company">{role.title.replace(/-/g, '\u2011')}</h3>
              ) : (
                <p className="resume__company">{role.title.replace(/-/g, '\u2011')}</p>
              )}
              <p className="resume__meta">
                <span>{job.company}</span>
                <span>{job.location}</span>
                <span>{role.dates}</span>
              </p>
            </div>
          ))}
        </header>
        {job.story && (
          <div className="resume__story">
            {[].concat(job.story).map((paragraph) => <p key={paragraph}>{emphasis(paragraph)}</p>)}
          </div>
        )}
        {job.bullets && <Bullets items={job.bullets} />}
        {job.after && (
          <div className="resume__story">
            {[].concat(job.after).map((paragraph) => <p key={paragraph}>{emphasis(paragraph)}</p>)}
          </div>
        )}
      </div>
    </article>
  );
}

// The resume's sections as steps of the page's stage (see Frozen.jsx): each job, then each
// organization in leadership and volunteering, then public appearances. The three groups keep their headings while their steps swap.
export const resumeSteps = [
  ...experience.map((job, i) => ({
    key: `job-${i}`,
    weight: 1,
    group: 'Experience',
    title: i === 0 ? 'Work\nExperience' : undefined,
    next: ['Stepping back a bit', 'Experience design at Intuit', 'My very first co-op', 'Life outside of work'][i],
    wide: true,
    // The star sits a little lower on the border in each job than in the one before.
    content: () => <Job job={job} id={`job-${i}`} starAt={[0.28, 0.45, 0.62, 0.8][i]} />,
  })),
  // Leadership and volunteering: a step for each organization, with all its pictures on screen together.
  ...leadershipShowcase.map((org, i) => ({
    key: org.id,
    title: i === 0 ? 'Outside\nof Work' : undefined,
    next: ['Another organization I love', 'Taking the stage'][i],
    weight: 1.2,
    group: 'Leadership & Volunteering',
    content: () => <Showcase org={org} />,
  })),
  {
    key: 'appearances',
    title: 'Guest\nAppearances',
    next: 'Wrapping up',
    weight: 1,
    group: '“Public” Appearances',
    content: () => <Appearances />,
  },
];

// A thank-you and the link to the full resume.
function ClosingNote({ className = 'resume__closing' }) {
  return (
    <div className={className}>
      <Walker />
      <p className="resume__thanks">
        Thank you for stopping by! You know where to find me if you have any questions. Wishing you a great rest
        of your journey.
        {/* A waving hand. Pointing at it turns the cursor into the waving palm, which then stays for 5 seconds wherever the pointer goes. */}
        <span className="resume__wave" data-cursor="wave" data-wave-hold="5000" aria-hidden="true">
          👋🏼
        </span>
      </p>
      <p className="resume__download">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          View my full resume (PDF)
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17L17 7M9 7H17V15" />
          </svg>
        </a>
      </p>
    </div>
  );
}

// The closing note as the last step of the stage, so the page ends with the stage still pinned instead of the
// last section sliding away to make room for it.
export const closingStep = {
  key: 'closing',
  weight: 0.8,
  wide: true,
  content: () => <ClosingNote className="resume__closing resume__closing--stage" />,
};

// The same note under the stage, at the very end, for a page that has nothing after the resume.
export function Download() {
  const root = useRef(null);
  useFade(root);

  return (
    <div className="resume" ref={root}>
      <ClosingNote className="resume__closing fade" />
    </div>
  );
}

// The resume page: just these sections and the link.
export default function Resume({ as: Wrapper = 'main' }) {
  return (
    <Wrapper>
      <Frozen steps={resumeSteps} />
      <Download />
    </Wrapper>
  );
}
