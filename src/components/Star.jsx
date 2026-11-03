// The wordmark's star on its own: a four-point star whose long points curve gently, split
// down its curved axis into a lighter and a darker half so it reads as faceted. The shapes
// match the star in AnisaMark.jsx. The star is drawn upright; rotate it with CSS.

const R = 40;
const c = R * 0.1;      // how far the sides are pinched in toward the center
const bend = R * 0.22;  // how far the top and bottom points bow to one side

const TOP = [-bend, -R];
const BOTTOM = [-bend, R];
const LEFT = [-R, 0];
const RIGHT = [R, 0];
const AXIS = `Q${bend} 0 ${TOP[0]} ${TOP[1]}`;
const STAR_LIGHT = `M${TOP}Q${-c} ${-c} ${LEFT}Q${-c} ${c} ${BOTTOM}${AXIS}Z`;
const STAR_DARK = `M${TOP}Q${c} ${-c} ${RIGHT}Q${c} ${c} ${BOTTOM}${AXIS}Z`;

export default function Star(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -60 80 120" aria-hidden="true" {...props}>
      <g transform="scale(0.8 1.2)">
        <path className="star__light" d={STAR_LIGHT} />
        <path className="star__dark" d={STAR_DARK} />
      </g>
    </svg>
  );
}
