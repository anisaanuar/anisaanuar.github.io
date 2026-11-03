import { useEffect, useRef, useState } from 'react';

// One stage for the whole page body. A tall track holds a screen-high stage fixed to the top of the
// window, and every section sits stacked inside it, one showing at a time. Scrolling through the track
// swaps which one shows, in place: the one on screen fades out completely, then the next fades in.
// Nothing scrolls past; you scroll through a fixed amount of page for each section.
//
// `steps` is a list of { key, weight, group?, wide?, content }:
//   weight  how long it stays, in units of scrolling (1 is UNIT screens, below)
//   next    the words of the link at the bottom right that goes on to the following step
//   title   a visible heading for the section, shown only where there is no nav (1024px and narrower)
//   group   a heading shared by neighbouring steps; it stays put while they swap, and fades only
//           when the group changes
//   wide    set the content to the resume's width
//   content ({ active, local }) => node: `active` is whether it is the one showing, and `local` how far
//           through its time it is (0 to 1), for sections that animate as you scroll
//
// Where a section might not fit in one screen (a phone, a tablet, a short window) the sections just
// stack down the page instead, each starting its own animation as it comes into view.

export const UNIT = 1.8; // screens of scrolling per unit of weight: how long each section lingers
const FROZEN = '(min-width: 961px) and (min-height: 700px)';
const END_SLACK = 0.02; // units of scrolling past the last step that still show it

// Helpers for things outside the stage (the homepage's nav) that need to know where its steps are.
const stageTrack = () => document.querySelector('.frozen');
const stepElements = () => [...document.querySelectorAll('.frozen__step')];
export const isFrozen = () => window.matchMedia(FROZEN).matches;

// Which step the page is on right now, or -1 before the stage and after it.
export function currentStep(steps) {
  const track = stageTrack();
  if (!track) return -1;
  if (isFrozen()) {
    const total = steps.reduce((sum, s) => sum + s.weight, 0);
    let scrolled = -track.getBoundingClientRect().top / (window.innerHeight * UNIT);
    // A hair past the end still counts as the end (the page can finish right where the stage does).
    if (scrolled >= total && scrolled < total + END_SLACK) scrolled = total - 1e-6;
    let start = 0;
    for (let i = 0; i < steps.length; i += 1) {
      if (scrolled < start + steps[i].weight) return scrolled >= 0 ? i : -1;
      start += steps[i].weight;
    }
    return -1;
  }
  // Stacked: the last step whose top has reached the upper part of the screen.
  let found = -1;
  stepElements().forEach((el, i) => {
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) found = i;
  });
  return found;
}

// Goes to the start of the step with this key.
export function scrollToStep(steps, key) {
  const track = stageTrack();
  const index = steps.findIndex((s) => s.key === key);
  if (!track || index < 0) return;
  if (isFrozen()) {
    const start = steps.slice(0, index).reduce((sum, s) => sum + s.weight, 0);
    const y = track.getBoundingClientRect().top + window.scrollY + start * UNIT * window.innerHeight + 4;
    // Straight there rather than gliding past every section on the way: the sections just swap.
    window.scrollTo({ top: y, behavior: 'instant' });
  } else {
    stepElements()[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function useFrozen() {
  const [frozen, setFrozen] = useState(() => window.matchMedia(FROZEN).matches);
  useEffect(() => {
    const query = window.matchMedia(FROZEN);
    const change = () => setFrozen(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return frozen;
}

export default function Frozen({ steps }) {
  const track = useRef(null);
  const elements = useRef([]);
  const frozen = useFrozen();
  const [now, setNow] = useState({ active: -1, local: 0 }); // which step, and how far through it
  const [seen, setSeen] = useState(() => steps.map(() => false)); // stacked layout: which have come into view

  const total = steps.reduce((sum, s) => sum + s.weight, 0);
  const groups = [...new Set(steps.map((s) => s.group).filter(Boolean))];

  // Pinned layout: work out which step the scroll position is in.
  useEffect(() => {
    if (!frozen) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      let scrolled = -track.current.getBoundingClientRect().top / (window.innerHeight * UNIT);
      if (scrolled >= total && scrolled < total + END_SLACK) scrolled = total - 1e-6;
      let next = { active: -1, local: 0 }; // before it is pinned, or after it lets go: nothing shows
      if (scrolled >= 0 && scrolled < total) {
        let start = 0;
        steps.some((s, i) => {
          if (scrolled < start + s.weight) {
            next = { active: i, local: (scrolled - start) / s.weight };
            return true;
          }
          start += s.weight;
          return false;
        });
      }
      setNow((prev) =>
        prev.active === next.active && Math.abs(prev.local - next.local) < 0.01 ? prev : next
      );
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      cancelAnimationFrame(frame);
    };
  }, [frozen, steps, total]);

  // Stacked layout: a step counts as active once it has come into view, and stays that way.
  useEffect(() => {
    if (frozen) return undefined;
    const watch = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = elements.current.indexOf(e.target);
          setSeen((prev) => (prev[i] ? prev : prev.map((v, n) => v || n === i)));
          watch.unobserve(e.target);
        });
      },
      { threshold: 0.4 }
    );
    elements.current.forEach((el) => el && watch.observe(el));
    return () => watch.disconnect();
  }, [frozen]);

  const activeGroup = frozen ? steps[now.active]?.group : undefined;

  return (
    <div ref={track} className="frozen" style={{ '--units': total, '--unit': `${UNIT * 100}vh` }}>
      <div className="frozen__stage">
        {groups.map((group) => (
          <h2
            key={group}
            id={`group-${group.replace(/[^a-z]+/gi, '-').toLowerCase()}`}
            className={`resume__heading frozen__heading${group === activeGroup ? ' is-active' : ''}`}
          >
            {group}
          </h2>
        ))}

        {steps.map((step, i) => {
          const active = frozen ? now.active === i : seen[i];
          const firstInGroup = step.group && steps.findIndex((s) => s.group === step.group) === i;
          return (
            <div
              key={step.key}
              ref={(el) => {
                elements.current[i] = el;
              }}
              className={[
                'frozen__step',
                step.wide && 'is-wide',
                frozen && active && 'is-active',
              ].filter(Boolean).join(' ')}
            >
              {step.title && <h2 className="frozen__section-title">{step.title}</h2>}
              {firstInGroup && <h2 className="resume__heading frozen__inline-heading">{step.group}</h2>}
              {step.content({ active, local: frozen && active ? now.local : 0 })}
              {step.next && steps[i + 1] && (
                <a
                  className="frozen__next"
                  href={`#${steps[i + 1].key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToStep(steps, steps[i + 1].key);
                  }}
                >
                  <span>{step.next}</span>
                  {/* The same curved arrow as under the wordmark. */}
                  <svg className="frozen__next-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M3 6H11.5C16 6 18.5 8.5 18.5 13V19M13.5 14.5l5 5 5-5" />
                  </svg>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
