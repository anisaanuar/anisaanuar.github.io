import { useEffect, useState } from 'react';

// A quick exchange between the about-me card and the resume. The question slides in from the left
// as the section arrives. The reply comes on its own after a moment (typing dots, then its words),
// even if nobody scrolls; scrolling through the section brings it on sooner, so a fast scroller still
// catches it. If the section is left before the reply is written it starts over next time; once the reply has been
// written it stays written, so coming back to the section shows the finished exchange.
//
// step 0: nothing   1: the question   2: the reply, typing   3: the reply, written out

const TYPING_AFTER = 1500; // ms after the section arrives that the reply starts typing, if nobody scrolls
const WRITTEN_AFTER = 3600; // ms after it arrives that the words replace the dots
const TYPING_AT = 0.15; // how far through its time the reply starts typing, when scrolling
const WRITTEN_AT = 0.5; // how far through its time the words come in, when scrolling

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// `active` is whether the section is showing; `local` is how far through its time it is (0 to 1).
export default function ChatSection({ active, local }) {
  const [timed, setTimed] = useState(0); // how far the clock alone has taken it
  const [finished, setFinished] = useState(false); // the reply has been written out once

  useEffect(() => {
    if (!active) {
      setTimed(0);
      return undefined;
    }
    setTimed(1);
    const timers = [
      setTimeout(() => setTimed(2), TYPING_AFTER),
      setTimeout(() => setTimed(3), WRITTEN_AFTER),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const scrolled = local >= WRITTEN_AT ? 3 : local >= TYPING_AT ? 2 : 1;
  let step = active ? Math.max(timed, scrolled) : 0;
  // Anyone who prefers less motion just gets the finished exchange.
  if (active && reduced()) step = 3;
  // Once it has been written out, it stays that way.
  if (finished) step = 3;

  useEffect(() => {
    if (step === 3) setFinished(true);
  }, [step]);

  return (
    <section className="chat" aria-label="A short conversation">
      <p className={`chat__bubble chat__bubble--ask${step >= 1 ? ' is-in' : ''}`}>
        so what does a design technologist do anyway?
      </p>

      <p className={`chat__bubble chat__bubble--reply${step >= 2 ? ' is-in' : ''}${step >= 3 ? ' is-written' : ''}`}>
        <span className="chat__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="chat__words">it's complicated...</span>
      </p>
    </section>
  );
}
