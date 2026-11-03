// One continuous line that drifts across the page and, partway along, writes "hello" in a loose
// handwritten hand before carrying on. It draws itself in when the page loads (see theme.scss).
//
// A long swell leads in from the left and the word sits on the right of the page. Coordinates are in a 1000 x 260 space; the line runs a
// little off both sides so it has no visible ends.

const LINE = [
  // a long, gentle swell arriving from the left
  'M-30 176C60 190 130 130 230 128C330 126 400 180 500 178',
  // h: up and over the top of the tall slanted stem, back down, then into the arch and the foot
  'C530 176 560 150 585 100C598 72 616 62 614 82C612 110 590 160 580 186',
  'C590 150 612 132 632 136C650 140 644 168 638 182C636 190 650 184 664 176',
  // e
  'C678 172 700 160 714 156C728 152 724 138 710 140C694 142 690 168 706 176C718 182 730 176 738 170',
  // l
  'C748 164 758 120 772 86C780 66 796 70 790 94C784 120 772 160 784 178',
  // l
  'C792 188 806 176 814 166C826 144 838 110 848 86C856 66 872 72 866 96C860 124 848 160 860 178',
  // o, with a small curl, then away to the right
  'C868 190 884 178 894 170C906 156 922 150 932 158C942 168 928 182 916 174C906 166 914 152 934 148',
  'C960 144 985 160 1040 160',
].join('');

export default function HelloLine() {
  return (
    <svg className="hello" viewBox="0 0 1000 260" aria-hidden="true" focusable="false">
      <path className="hello__line" d={LINE} pathLength="1" />
      {/* An invisible patch over the word, so the open-hand cursor shows only there. */}
      <rect className="hello__hit" data-cursor="wave" x="540" y="50" width="400" height="150" />
    </svg>
  );
}
