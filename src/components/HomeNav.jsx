import { useEffect, useRef, useState } from 'react';
import { currentStep, isFrozen, scrollToStep } from './Frozen.jsx';

// A light nav at the top left, always the same: a house icon for Home, then a trail of short lines, one for each
// section, ending in a line with a rounded end. A section with parts of its own (the jobs, say) has a longer line, one
// piece for the section and one for each part, running together as one. The one you are in is solid and the ones you have passed are a little
// darker than the ones ahead. A word fades in beside the section you are in, with its parts under it, and beside
// any you point at. Each links to its place; Home goes back to the top.
//
// `items` are { key (of a step), label, icon?, subs?: [{ key, label }] }, in the order they appear.

const NAV_ROOM = 240; // the room the nav takes down the left side (--nav-w in theme.scss)

export default function HomeNav({ steps, items }) {
  // Takes the nav away (as `no-nav` on the page) once the rows of pictures, which keep their size, would reach it. Their
  // left edge is how far in from the right edge of the window their widest row runs; the nav's room is NAV_ROOM.
  useEffect(() => {
    const root = document.documentElement;
    const check = () => {
      let left = Infinity;
      document.querySelectorAll('.lead__row').forEach((row) => {
        const shots = [...row.querySelectorAll('.lead__photo')];
        if (!shots.length) return;
        const width = shots.reduce((sum, shot) => sum + shot.offsetWidth, 0) + 8 * (shots.length - 1);
        const pushedOut = parseFloat(getComputedStyle(row).marginRight) || 0; // negative when it runs off the edge
        left = Math.min(left, window.innerWidth - width - pushedOut);
      });
      root.classList.toggle('no-nav', left < NAV_ROOM + 16);
    };
    check();
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('resize', check);
      root.classList.remove('no-nav');
    };
  }, []);

  // Where you are: the index of the section, and of the part inside it (-1 when you are in the section's own step).
  const [at, setAt] = useState({ item: -1, sub: -1 });
  // After clicking a place, the nav shows that place straight away and stays put while the page scrolls there,
  // instead of lighting up every section it passes on the way. It lets go once the page arrives, after a few
  // seconds, or as soon as you scroll by hand.
  const going = useRef(null);

  useEffect(() => {
    const indexOf = (key) => steps.findIndex((s) => s.key === key);
    let frame = 0;
    const update = () => {
      frame = 0;
      const step = currentStep(steps);
      if (going.current) {
        if (step === going.current.step || performance.now() > going.current.until) going.current = null;
        else return;
      }
      let item = -1;
      let sub = -1;
      items.forEach((it, i) => {
        if (step >= indexOf(it.key)) item = i;
      });
      if (item >= 0 && items[item].subs) {
        items[item].subs.forEach((s, j) => {
          if (step >= indexOf(s.key)) sub = j;
        });
      }
      // The stage starts at the top of the page, so being past it means being past the last section.
      if (step < 0) {
        item = items.length - 1;
        sub = items[item].subs ? items[item].subs.length - 1 : -1;
      }
      setAt((prev) => (prev.item === item && prev.sub === sub ? prev : { item, sub }));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Scrolling by hand (wheel, touch, keys) ends the trip, so the nav follows the page again.
    const byHand = () => {
      going.current = null;
      queue();
    };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    window.addEventListener('wheel', byHand, { passive: true });
    window.addEventListener('touchmove', byHand, { passive: true });
    window.addEventListener('keydown', byHand);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      window.removeEventListener('wheel', byHand);
      window.removeEventListener('touchmove', byHand);
      window.removeEventListener('keydown', byHand);
      cancelAnimationFrame(frame);
    };
  }, [steps, items]);

  // Go to a place: show it in the nav now, then scroll there.
  const goTo = (key, item, sub) => {
    going.current = { step: steps.findIndex((s) => s.key === key), until: performance.now() + 4000 };
    setAt({ item, sub });
    scrollToStep(steps, key);
  };

  const atHome = at.item < 0;
  // Whether a mark is where you are, behind you, or ahead of you.
  const stateOf = (i, j) => {
    const here = i === at.item && j === at.sub;
    if (here) return 'current';
    if (i < at.item || (i === at.item && j < at.sub)) return 'past';
    return 'ahead';
  };

  return (
    <nav className="hnav" aria-label="Sections">
      <a
        href="#top"
        className={`hnav__link hnav__home${atHome ? ' is-active' : ''}`}
        data-state={atHome ? 'current' : 'other'}
        aria-label="Home"
        aria-current={atHome ? 'true' : undefined}
        title="Home"
        onClick={(e) => {
          e.preventDefault();
          going.current = { step: 0, until: performance.now() + 4000 };
          setAt({ item: -1, sub: -1 });
          window.scrollTo({ top: 0, behavior: isFrozen() ? 'instant' : 'smooth' });
        }}
      >
        <svg className="hnav__mark hnav__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 3 22 12h-2.5v9h-5.3v-5.8q0-.7-.7-.7h-3q-.7 0-.7.7V21H4.5v-9H2z" />
        </svg>
        <span className="hnav__tag" aria-hidden="true">Home</span>
      </a>

      {items.map((item, i) => {
        const state = stateOf(i, -1);
        const insideSection = i === at.item;
        return (
          <div key={item.key} className="hnav__group" data-current={insideSection ? 'true' : undefined}>
            <a
              href={`#${item.key}`}
              className={`hnav__link${state === 'current' ? ' is-active' : ''}${insideSection ? ' is-section' : ''}`}
              data-state={state}
              aria-label={item.label}
              aria-current={state === 'current' ? 'true' : undefined}
              title={item.label}
              onClick={(e) => {
                e.preventDefault();
                goTo(item.key, i, -1);
              }}
            >
              <span
                className={`hnav__mark hnav__dash${item.icon === 'end' ? ' hnav__dash--end' : ''}`}
                aria-hidden="true"
              />
              <span className="hnav__tag" aria-hidden="true">{item.label}</span>
            </a>

            {item.subs &&
              item.subs.map((sub, j) => {
                const subState = stateOf(i, j);
                return (
                  <a
                    key={sub.key}
                    href={`#${sub.key}`}
                    className={`hnav__link hnav__link--sub${subState === 'current' ? ' is-active' : ''}`}
                    data-state={subState}
                    aria-label={sub.label}
                    aria-current={subState === 'current' ? 'true' : undefined}
                    title={sub.label}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(sub.key, i, j);
                    }}
                  >
                    <span className="hnav__mark hnav__dash" aria-hidden="true" />
                    <span className="hnav__tag hnav__tag--sub" aria-hidden="true">{sub.label}</span>
                  </a>
                );
              })}
          </div>
        );
      })}
    </nav>
  );
}
