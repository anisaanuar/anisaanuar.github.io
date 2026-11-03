import { useEffect, useRef, useState } from 'react';
import Star from './Star.jsx';

// A thin line around a section's rows of pictures, and a fainter one further out with the star set into a break on its
// left side, as around the photo in About Me. The lines follow the shape the rows make together (each row a rectangle, the
// rows offset from one another), so they step in and out with the rows. Drawn as an SVG over the section, from where the
// rows actually are, and drawn again whenever the section changes size.

const INNER = 12; // how far the inner line is from the pictures
const HALO = 22; // and the outer one, as far out as in About Me
const RADIUS = 14; // how round the inner line's corners are. Further out, a corner that turns out is rounder by the distance, and one that turns in is tighter by it, so the two lines stay the same distance apart all the way round.
const CONCAVE = 24; // how round a corner of the inner line that turns in is (softer than the others, so the outer line's is not too sharp)
const FADE = 32; // how far from the star the outer line is back to full strength; it is gone within a third of that, as in About Me

// The outline of the union of some rectangles [l, t, r, b]: every rectangle's edges are on a grid, each cell of the grid is
// in or out, and the edges between an "in" and an "out" cell are chained into loops (clockwise on screen).
function loops(rects) {
  const xs = [...new Set(rects.flatMap((r) => [r[0], r[2]]))].sort((a, b) => a - b);
  const ys = [...new Set(rects.flatMap((r) => [r[1], r[3]]))].sort((a, b) => a - b);
  const filled = (i, j) => {
    if (i < 0 || j < 0 || i >= xs.length - 1 || j >= ys.length - 1) return false;
    const cx = (xs[i] + xs[i + 1]) / 2;
    const cy = (ys[j] + ys[j + 1]) / 2;
    return rects.some((r) => cx > r[0] && cx < r[2] && cy > r[1] && cy < r[3]);
  };
  const next = new Map();
  const add = (a, b) => next.set(`${a[0]},${a[1]}`, { to: b, used: false });
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < ys.length - 1; j++) {
      if (!filled(i, j)) continue;
      const [x0, x1, y0, y1] = [xs[i], xs[i + 1], ys[j], ys[j + 1]];
      if (!filled(i, j - 1)) add([x0, y0], [x1, y0]);
      if (!filled(i + 1, j)) add([x1, y0], [x1, y1]);
      if (!filled(i, j + 1)) add([x1, y1], [x0, y1]);
      if (!filled(i - 1, j)) add([x0, y1], [x0, y0]);
    }
  }
  const out = [];
  next.forEach((edge, key) => {
    if (edge.used) return;
    const loop = [];
    let k = key;
    while (next.has(k) && !next.get(k).used) {
      const e = next.get(k);
      e.used = true;
      const [x, y] = k.split(',').map(Number);
      loop.push([x, y]);
      k = `${e.to[0]},${e.to[1]}`;
    }
    // Drop the points that sit in the middle of a straight run.
    const corners = loop.filter((p, i) => {
      const a = loop[(i + loop.length - 1) % loop.length];
      const b = loop[(i + 1) % loop.length];
      return (p[0] - a[0]) * (b[1] - p[1]) - (p[1] - a[1]) * (b[0] - p[0]) !== 0;
    });
    if (corners.length > 2) out.push(corners);
  });
  return out;
}

// A loop of corners as a path with every corner rounded: `convex` for a corner that turns out, `concave` for one that turns in.
function rounded(loop, convex, concave) {
  const n = loop.length;
  const unit = (a, b) => {
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / d, (b[1] - a[1]) / d, d];
  };
  const pts = loop.map((v, i) => {
    const prev = loop[(i + n - 1) % n];
    const nextV = loop[(i + 1) % n];
    const [ix, iy, di] = unit(prev, v);
    const [ox, oy, dn] = unit(v, nextV);
    // Clockwise on screen, so a turn to the right is a corner of the shape and a turn to the left is one that turns in.
    const radius = ix * oy - iy * ox > 0 ? convex : concave;
    const r = Math.min(radius, di / 2, dn / 2);
    return { v, a: [v[0] - ix * r, v[1] - iy * r], b: [v[0] + ox * r, v[1] + oy * r] };
  });
  const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  let d = `M${f(pts[0].b)}`;
  for (let k = 1; k <= n; k++) {
    const p = pts[k % n];
    d += `L${f(p.a)}Q${f(p.v)} ${f(p.b)}`;
  }
  return `${d}Z`;
}

const inflate = (r, by) => [r[0] - by, r[1] - by, r[2] + by, r[3] + by];

export default function RowsOutline({ section, starRow = 0 }) {
  const [shape, setShape] = useState(null);
  const id = useRef(`rows-gap-${Math.random().toString(36).slice(2, 8)}`).current;

  // (An effect, not a layout effect: the section's ref is only set once its children have been laid out.)
  useEffect(() => {
    const el = section.current;
    if (!el) return undefined;
    const measure = () => {
      const base = el.getBoundingClientRect();
      // Each row as one rectangle around its pictures (not its text).
      const rects = [...el.querySelectorAll('.lead__row')]
        .map((row) => {
          const shots = [...row.querySelectorAll('.lead__photo')].map((p) => p.getBoundingClientRect());
          if (!shots.length) return null;
          return [
            Math.min(...shots.map((s) => s.left)) - base.left,
            Math.min(...shots.map((s) => s.top)) - base.top,
            Math.max(...shots.map((s) => s.right)) - base.left,
            Math.max(...shots.map((s) => s.bottom)) - base.top,
          ];
        })
        .filter(Boolean);
      if (!rects.length) return setShape(null);
      const beside = rects[Math.min(starRow, rects.length - 1)];
      setShape({
        w: base.width,
        h: base.height,
        inner: loops(rects.map((r) => inflate(r, INNER))).map((l) => rounded(l, RADIUS, CONCAVE)).join(''),
        halo: loops(rects.map((r) => inflate(r, HALO))).map((l) => rounded(l, RADIUS + (HALO - INNER), Math.max(CONCAVE - (HALO - INNER), 2))).join(''),
        // The star sits on the left side of the outer line, in the upper half of one of the rows (about a fifth of the
        // way down it), upright along the line.
        star: [beside[0] - HALO, beside[1] + (beside[3] - beside[1]) * 0.22],
      });
    };
    measure();
    const watch = new ResizeObserver(measure);
    watch.observe(el);
    return () => watch.disconnect();
  }, [section, starRow]);

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
          <mask id={id} maskUnits="userSpaceOnUse" x={-200} y={-200} width={shape.w + 600} height={shape.h + 400}>
            <rect x={-200} y={-200} width={shape.w + 600} height={shape.h + 400} fill="#fff" />
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
