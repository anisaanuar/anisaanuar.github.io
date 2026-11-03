// A pair of small lace-up boots walking on the spot, seen from the side and facing right, drawn in thin outline with a
// plain flat sole. Inline SVG moved with CSS, so it needs no files and loops forever. Each boot moves as one
// piece: it slides back along the ground while it is down, then its heel peels up and it swings forward in a
// rounded arc and lands heel first. Each boot is darkest as it lands flat, fades to a light grey as it slides back, and darkens again as it swings forward; the far boot is half a step behind. It stands still for anyone who prefers less motion.

function Boot({ far = false }) {
  return (
    <g className={`walker__boot${far ? ' walker__boot--far' : ''}`}>
      {/* the upper: the back of the shaft, its top, the throat and the rounded toe */}
      <path className="walker__line" d="M68 62V87M68 62H82V70Q82.5 75 88 77Q96 78 99.6 83.2Q100.8 85 100.4 87" />
      {/* the cuff, and the laces across the throat */}
      <path className="walker__line" d="M68 66.5H82M79.5 70.5l3.2 1.2M80.5 73.3l3.5 1.4M84 76l3 1" />
      {/* the sole: a plain flat outsole with a heel block and a gentle arch, reaching the same distance past the heel and the toe */}
      <path className="walker__line" d="M67.8 87H100.4Q101.6 87 101.6 88.5V90.5Q101.6 92 100.1 92H87Q86 92 85.5 91Q81 89.6 77.5 91Q77 92 76 92H68.3Q66.8 92 66.8 90.5V88.5Q66.8 87 67.8 87z" />
    </g>
  );
}

export default function Walker() {
  return (
    <svg className="walker" viewBox="36 39 88 65" aria-hidden="true" focusable="false">
      <Boot far />
      <Boot />
    </svg>
  );
}
