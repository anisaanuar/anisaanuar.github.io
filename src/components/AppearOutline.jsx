import { useEffect, useRef, useState } from 'react';
import Star from './Star.jsx';

// The thin line (and the fainter one further out, with the star set into a break on it) along the top of the guest
// appearances' pictures: it comes in from beyond the right edge of the window, runs along above the pictures, curves
// down along the left of the first one, and curves away to the left, out of the page, about halfway down that picture. Drawn as an SVG over the section,
// from where the pictures actually are, and drawn again whenever the section changes size. (See RowsOutline.jsx.)

const INNER = 12; // how far the inner line is from the pictures
const HALO = 22; // and the outer one, as far out as in About Me
const RADIUS = 30; // how round the inner line's two corners are; the outer line's stay the same distance from it
const FADE = 32; // how far from the star the outer line is back to full strength; it is gone within a third of that
const LEAVE = 0.55; // how far down the first picture the line turns away to the left (for the inner one), as a fraction of its height
const FAR = 400; // how far past the edges of the section the lines run

export default function AppearOutline({ section }) {
  const [shape, setShape] = useState(null);
  const id = useRef(`appear-gap-${Math.random().toString(36).slice(2, 8)}`).current;

  useEffect(() => {
    const el = section.current;
    if (!el) return undefined;
    const measure = () => {
      const base = el.getBoundingClientRect();
      const first = el.querySelector('.appear__event .lead__photo');
      if (!first) return setShape(null);
      const p = first.getBoundingClientRect();
      const left = p.left - base.left;
      const top = p.top - base.top;
      const height = p.bottom - p.top;
      // One line at a given distance from the pictures: along the top, round the first corner, down the left, round the
      // second, and away to the left. The first corner turns round the pictures, so it is rounder the further out; the
      // second turns away from them, so it is tighter.
      const line = (d) => {
        const r1 = RADIUS + (d - INNER);
        const r2 = Math.max(RADIUS - (d - INNER), 2);
        const x = left - d;
        const y = top - d;
        // The outer line turns about the same centre as the inner one, with a smaller radius, so it runs away to the left above it.
        const yOut = top + height * LEAVE - (d - INNER);
        return [
          `M${base.width + FAR} ${y}`,
          `H${x + r1}`,
          `Q${x} ${y} ${x} ${y + r1}`,
          `V${yOut - r2}`,
          `Q${x} ${yOut} ${x - r2} ${yOut}`,
          `H${-FAR}`,
        ].join('');
      };
      setShape({
        w: base.width,
        h: base.height,
        inner: line(INNER),
        halo: line(HALO),
        // The star sits on the straight run down the left, in the upper part of the first picture's height, above where the line turns away.
        star: [left - HALO, top + height * 0.2],
      });
    };
    measure();
    const watch = new ResizeObserver(measure);
    watch.observe(el);
    return () => watch.disconnect();
  }, [section]);

  if (!shape) return null;
  return (
    <>
      <svg
        className="lead__outline"
        width={shape.w}
        height={shape.h}
        viewBox={`0 0 ${shape.w} ${shape.h}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id={`${id}-fade`}>
            <stop offset={11 / FADE} stopColor="#000" />
            <stop offset="1" stopColor="#fff" />
          </radialGradient>
          <mask id={id} maskUnits="userSpaceOnUse" x={-FAR - 100} y={-200} width={shape.w + 2 * FAR + 200} height={shape.h + 600}>
            <rect x={-FAR - 100} y={-200} width={shape.w + 2 * FAR + 200} height={shape.h + 600} fill="#fff" />
            <circle cx={shape.star[0]} cy={shape.star[1]} r={FADE} fill={`url(#${id}-fade)`} />
          </mask>
        </defs>
        <path className="lead__outline-line lead__outline-line--inner" d={shape.inner} />
        <path className="lead__outline-line lead__outline-line--halo" d={shape.halo} mask={`url(#${id})`} />
      </svg>
      <Star className="lead__star" style={{ left: shape.star[0], top: shape.star[1] }} />
    </>
  );
}
