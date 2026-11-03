// "Anisa" set in Carattere, converted to outlines so it never waits on a web font.
//
// The ring is one calligraphic stroke. It starts just past the tip of the A's hairline
// tail (leaving at the tail's angle, about 37 degrees), sweeps under the other letters,
// rises wide on the right of the word, and turns over at the top. An upright star sits
// on the way up the right side, well back along the ring from the a's tail.
// From there a thin line comes back down on the line of the final a's tail (about 53
// degrees) and stops just short of it. Both ends are 70 units from their tail tips, so
// there is blank space. The stroke is thinnest at the ends and fattest low on the
// right, in the same color as the star's darker half. The
// ring breaks around the star, leaving blank space on every side of it.
//
// The tails (the capital A's two, the final a's, and the n's exit stroke) are drawn narrowing to a point,
// rather than ending bluntly.
//
// Coordinates are in the outline's own units: letters span x 0-2070, y 0-862,
// baseline at y 699.

// The stroke's centerline, as cubic Bezier segments: [start, control, control, end].
const CENTERLINE = [
  [[759, 803], [882, 864], [1050, 930], [1350, 930]],
  [[1350, 930], [1800, 930], [2150, 860], [2300, 690]],
  [[2300, 690], [2400, 580], [2400, 470], [2315, 445]],
  [[2315, 445], [2250, 428], [2200, 450], [2104, 578]],
];
const WIDTH_MIN = 3;      // the thin part of the stroke, away from the ends
const WIDTH_BOOST = 11;   // extra width at the fattest point
const WIDTH_PEAK = 0.6;   // how far along the stroke the fattest point is
const WIDTH_SPREAD = 0.22;
const TAPER_IN = 0.17;    // how much of the stroke, from its start, narrows to a point
const TAPER_OUT = 0.12;   // the same at its far end, the thin line that comes back down
const TIP = 0.04;         // how much of its width is left right at either tip
const STAR_GAP = 68;      // radius of the blank space cut out of the ring around the star
const TAPER_STAR = 120;   // how far from that blank space the ring narrows to a point at it
const SAMPLES = 48;       // points per segment

const bezier = ([p0, p1, p2, p3], t) => {
  const u = 1 - t;
  return [0, 1].map(
    (i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]
  );
};

// Eases from 0 (at an end of the stroke, or at the blank space around the star) up to 1 (once past the
// taper): smooth, so each end comes to a fine point instead of stopping square.
const taper = (x) => {
  const t = Math.min(Math.max(x, 0), 1);
  return t * t * (3 - 2 * t);
};

// Turns the centerline into a filled outline whose width changes along its length.
function taperedStroke() {
  const star = bezier(CENTERLINE[2], 0.25); // where the star sits; see STAR_AT below
  const pts = [];
  CENTERLINE.forEach((seg, si) => {
    for (let i = si === 0 ? 0 : 1; i <= SAMPLES; i++) pts.push(bezier(seg, i / SAMPLES));
  });
  const lengths = [0];
  for (let i = 1; i < pts.length; i++) {
    lengths.push(lengths[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  const total = lengths[lengths.length - 1];
  const left = [];
  const right = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, pts.length - 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / len;
    const ny = (b[0] - a[0]) / len;
    const s = lengths[i] / total;
    const base = WIDTH_MIN + WIDTH_BOOST * Math.exp(-(((s - WIDTH_PEAK) / WIDTH_SPREAD) ** 2));
    // Near the star the stroke narrows to a point on each side, so it ends fine at the blank space
    // around the star instead of being cut off thick.
    const fromStar = Math.hypot(p[0] - star[0], p[1] - star[1]);
    const narrow = taper(s / TAPER_IN) * taper((1 - s) / TAPER_OUT) * taper((fromStar - STAR_GAP) / TAPER_STAR);
    const half = (base * Math.max(TIP, narrow)) / 2;
    left.push([p[0] + nx * half, p[1] + ny * half]);
    right.push([p[0] - nx * half, p[1] - ny * half]);
  });
  const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  return `M${f(left[0])}${left.slice(1).map((p) => `L${f(p)}`).join('')}${right.reverse().map((p) => `L${f(p)}`).join('')}Z`;
}

const RING = taperedStroke();

// Where the star sits: part of the way up the right side of the curl, so it is well back
// along the ring from the a's tail (about 300 units to the right of the tail tip).
const STAR_AT = bezier(CENTERLINE[2], 0.25);

// Which way the ring is heading at the star, so the star's long axis can follow it.
const STAR_ANGLE = (() => {
  const a = bezier(CENTERLINE[2], 0.25 - 0.01);
  const b = bezier(CENTERLINE[2], 0.25 + 0.01);
  const heading = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI; // 0 = right, -90 = up
  return heading + 90; // the star's long axis is vertical, so turn it by this much
})();
const R = 40;
const c = R * 0.1;  // how far the sides are pinched in toward the center
const bend = R * 0.22; // how far the top and bottom points bow to one side, following the ring

// A four-point star whose long points curve gently, split down its curved axis into a
// lighter and a darker half so it reads as faceted and dimensional.
const TOP = [-bend, -R];
const BOTTOM = [-bend, R];
const LEFT = [-R, 0];
const RIGHT = [R, 0];
const AXIS = `Q${bend} 0 ${TOP[0]} ${TOP[1]}`; // curved from the bottom point back up to the top
const STAR_LIGHT = `M${TOP}Q${-c} ${-c} ${LEFT}Q${-c} ${c} ${BOTTOM}${AXIS}Z`;
const STAR_DARK = `M${TOP}Q${c} ${-c} ${RIGHT}Q${c} ${c} ${BOTTOM}${AXIS}Z`;

const LETTERS =
  "M76 862Q47 862 27 850Q0 835 0 803Q0 775 18 753Q38 730 64 730Q83 730 97 744Q109 758 109 772Q109 797 90 813Q74 828 54 828Q35 828 21 814Q27 836 62 836Q115 836 188 765Q215 739 245.5 702.5Q276 666 309 618Q331 586 352 554.5Q373 523 395 491Q322 379 322 280Q322 223 348 188Q375 153 417 153Q495 153 580 261Q676 162 776 93Q910 0 997 0Q1032 0 1032 15Q1032 19 1029 25Q804 428 777 572Q775 586 773.5 598Q772 610 772 620Q772 683 823 683Q852.93 683 896.76 618.08C897.87 616.45 899.11 614.9 900.27 613.31C901.44 611.72 902.6 610.12 903.76 608.52C904.92 606.91 906.07 605.31 907.22 603.7C908.38 602.1 909.52 600.48 910.66 598.87C911.8 597.26 912.94 595.64 914.08 594.02C915.21 592.4 916.34 590.77 917.46 589.15C918.59 587.52 919.71 585.89 920.83 584.26C921.95 582.63 923.06 580.99 924.17 579.35C925.28 577.71 926.38 576.07 927.48 574.42C928.58 572.78 929.68 571.13 930.77 569.47C931.86 567.82 932.95 566.17 934.03 564.51C935.12 562.85 936.2 561.19 937.27 559.52C938.35 557.86 939.42 556.19 940.48 554.52C941.55 552.85 942.61 551.18 943.67 549.5C944.73 547.83 945.78 546.15 946.83 544.46C947.88 542.78 948.93 541.1 949.97 539.41C951.01 537.72 952.04 536.03 953.08 534.33C954.11 532.64 955.14 530.94 956.16 529.24C957.18 527.54 958.2 525.84 959.22 524.13C960.23 522.43 961.24 520.72 962.25 519.01C963.25 517.3 964.25 515.58 965.25 513.87C966.25 512.15 967.24 510.43 968.23 508.71C969.22 506.98 970.2 505.26 971.18 503.53C972.16 501.8 973.13 500.07 974.1 498.33C975.07 496.6 976.04 494.86 977 493.12C977.96 491.39 978.92 489.64 979.87 487.9C980.83 486.15 981.77 484.41 982.72 482.65C983.66 480.9 984.6 479.15 985.53 477.4C986.47 475.64 987.4 473.88 988.32 472.12C989.25 470.36 990.17 468.6 991.09 466.83C992 465.06 992.92 463.29 993.82 461.52C994.73 459.75 995.63 457.98 996.53 456.2C997.43 454.42 998.32 452.64 999.21 450.86C1000.1 449.08 1000.98 447.29 1001.86 445.51C1002.74 443.72 1003.62 441.93 1004.49 440.14C1005.36 438.35 1006.31 436.59 1007.09 434.75C1006.31 436.59 1005.69 438.49 1004.99 440.35C1004.28 442.22 1003.57 444.08 1002.86 445.94C1002.15 447.8 1001.43 449.66 1000.7 451.52C999.98 453.38 999.25 455.24 998.51 457.09C997.78 458.94 997.04 460.8 996.3 462.65C995.55 464.5 994.8 466.35 994.05 468.2C993.29 470.04 992.53 471.89 991.77 473.73C991 475.58 990.24 477.42 989.46 479.26C988.69 481.1 987.91 482.94 987.12 484.78C986.34 486.61 985.55 488.45 984.76 490.28C983.96 492.11 983.16 493.95 982.36 495.78C981.56 497.6 980.75 499.43 979.93 501.26C979.12 503.08 978.3 504.91 977.48 506.73C976.66 508.55 975.83 510.37 974.99 512.19C974.16 514 973.32 515.82 972.48 517.63C971.64 519.45 970.79 521.26 969.94 523.07C969.08 524.88 968.23 526.69 967.36 528.49C966.5 530.3 965.63 532.1 964.76 533.9C963.89 535.7 963.01 537.5 962.13 539.3C961.25 541.1 960.36 542.89 959.47 544.68C958.58 546.48 957.68 548.27 956.78 550.06C955.88 551.84 954.97 553.63 954.06 555.41C953.15 557.2 952.24 558.98 951.32 560.76C950.4 562.54 949.47 564.32 948.54 566.09C947.61 567.87 946.68 569.64 945.74 571.41C944.8 573.18 943.85 574.95 942.9 576.72C941.95 578.48 941 580.25 940.04 582.01C939.08 583.77 938.12 585.53 937.15 587.29C936.18 589.05 935.21 590.8 934.23 592.55C933.25 594.31 932.27 596.06 931.28 597.8C930.29 599.55 929.3 601.3 928.31 603.04C927.31 604.78 926.31 606.52 925.3 608.26C924.29 610 923.28 611.74 922.27 613.47C921.25 615.2 920.23 616.93 919.21 618.66C918.18 620.39 917.15 622.12 916.12 623.84C915.08 625.56 914.11 627.33 913 629Q885 673 857 694Q829 715 802 715Q768 715 737 689Q698 655 694 594Q667 430 575 314Q543 348 507.5 393Q472 438 432 494Q478 567 537.5 629C539.84 631.44 542.31 633.83 544.72 636.15C547.12 638.47 549.53 640.71 551.93 642.92C554.34 645.12 556.75 647.26 559.15 649.38C561.56 651.5 563.96 653.57 566.37 655.64C568.77 657.7 571.18 659.73 573.59 661.76C575.99 663.79 578.4 665.8 580.8 667.84C583.21 669.87 585.61 671.89 588.02 673.95C590.43 676 592.83 678.07 595.24 680.18C597.64 682.29 600.05 684.42 602.46 686.61C604.86 688.8 607.27 691.08 609.67 693.32C612.08 695.55 614.48 697.81 616.89 700.03C619.3 702.25 621.7 704.45 624.11 706.64C626.51 708.82 628.92 710.99 631.32 713.14C633.73 715.29 636.14 717.42 638.54 719.53C640.95 721.63 643.35 723.72 645.76 725.79C648.16 727.86 650.57 729.91 652.98 731.93C655.38 733.95 657.79 735.96 660.19 737.93C662.6 739.91 665 741.87 667.41 743.8C669.82 745.73 672.22 747.63 674.63 749.51C677.03 751.39 679.44 753.25 681.84 755.08C684.25 756.9 686.66 758.7 689.06 760.48C691.47 762.25 693.87 764 696.28 765.71C698.69 767.43 701.09 769.11 703.5 770.77C705.9 772.43 708.31 774.05 710.71 775.65C713.12 777.24 715.53 778.81 717.93 780.34C720.34 781.87 722.74 783.37 725.15 784.83C727.55 786.3 729.96 787.73 732.37 789.13C734.77 790.53 737.18 791.88 739.58 793.22C741.99 794.56 744.34 795.95 746.8 797.16C744.48 796.01 742.07 795.09 739.7 794.01C737.34 792.93 734.97 791.81 732.61 790.69C730.24 789.56 727.88 788.42 725.51 787.25C723.14 786.09 720.78 784.91 718.41 783.72C716.05 782.52 713.68 781.31 711.32 780.07C708.95 778.84 706.59 777.59 704.22 776.33C701.86 775.06 699.49 773.78 697.12 772.48C694.76 771.17 692.39 769.86 690.03 768.52C687.66 767.18 685.3 765.83 682.93 764.46C680.57 763.09 678.2 761.7 675.83 760.29C673.47 758.88 671.1 757.46 668.74 756.02C666.37 754.58 664.01 753.12 661.64 751.64C659.28 750.17 656.91 748.67 654.54 747.16C652.18 745.65 649.81 744.12 647.45 742.58C645.08 741.03 642.72 739.47 640.35 737.89C637.99 736.31 635.62 734.71 633.26 733.09C630.89 731.48 628.52 729.84 626.16 728.19C623.79 726.54 621.43 724.88 619.06 723.19C616.7 721.51 614.33 719.8 611.97 718.08C609.6 716.36 607.23 714.62 604.87 712.86C602.5 711.11 600.14 709.33 597.77 707.53C595.41 705.73 593.04 703.91 590.68 702.08C588.31 700.24 585.94 698.39 583.58 696.52C581.21 694.65 578.85 692.76 576.48 690.85C574.12 688.94 571.75 687.02 569.39 685.07C567.02 683.13 564.66 681.17 562.29 679.2C559.92 677.23 557.56 675.23 555.19 673.23C552.83 671.22 550.46 669.2 548.1 667.16C545.73 665.12 543.31 663.12 541 661Q504 627 472.5 591.5Q441 556 414 519Q346 615 306.5 670Q267 725 256 739Q174 841 115 856Q96 862 76 862ZM701 523Q707 497 718.5 468.5Q730 440 747 410Q833 257 920 130Q930 116 930 105Q930 92 911 92Q853 92 746 166Q703 196 667 226.5Q631 257 600 288Q668 390 701 523ZM414 464Q453 411 487.5 367Q522 323 553 289Q490 222 441 222Q411 222 394 249Q376 277 376 321Q376 390 414 464ZM913 706Q933 657 963 585Q993 513 1036 419Q1045 399 1053 386Q1061 373 1068 366Q1082 352 1104 352Q1106 352 1111 352Q1116 352 1125 354Q1139 355 1146 354Q1109 376 1035 548Q1047 531 1067.5 510.5Q1088 490 1116 465Q1134 448 1156 432.5Q1178 417 1204 403Q1263 370 1291 370Q1298 370 1301 371Q1285 399 1271.5 425Q1258 451 1246 474Q1188 586 1181 629Q1180 636 1179.5 642Q1179 648 1179 653Q1179 679 1198 679Q1245 679 1286 619Q1229 703 1183 703Q1120 703 1120 638Q1120 585 1185 481Q1195 465 1195 454Q1195 442 1184 442Q1173 442 1155.5 453.5Q1138 465 1114 487Q1076 522 1043 570.5Q1010 619 983 681Q977 696 952 699Q920 702 913 706ZM1472 312Q1438 312 1438 279Q1438 246 1470 246Q1504 246 1504 279Q1504 312 1472 312ZM1336 699Q1307 699 1307 670Q1307 652 1319 621Q1345 557 1368 503Q1391 449 1411 405Q1414 400 1414 394Q1414 380 1401 364L1456 363Q1484 363 1484 377Q1484 381 1482 385.5Q1480 390 1477 398L1385 611Q1371 644 1371 667Q1371 691 1386 699ZM1567 703Q1517 703 1490 673Q1468 648 1468 613Q1468 562 1500 562Q1512 562 1522 571Q1532 581 1532 594Q1532 602 1528 607Q1515 623 1515 642Q1515 661 1527 673Q1540 686 1560 686Q1581 686 1598 672Q1621 651 1621 614Q1621 582 1604 542Q1597 532 1587.5 516Q1578 500 1566 478Q1559 466 1556.5 453.5Q1554 441 1554 429Q1554 387 1585 362Q1617 336 1667 336Q1681 336 1694.5 339Q1708 342 1719 350Q1742 367 1742 392Q1742 403 1738 412Q1729 438 1699 438Q1666 438 1666 404Q1666 394 1669 387Q1672 377 1691 367Q1684 354 1665 354Q1648 354 1640 362Q1616 383 1616 415Q1616 437 1628 463Q1630 467 1667 526Q1692 566 1692 593Q1692 636 1652 669Q1612 703 1567 703ZM1975 701Q1953 701 1939 688Q1919 671 1919 631Q1919 605 1928 572Q1894 629 1857 665Q1819 700 1789 700Q1763 700 1748 677Q1732 655 1732 616Q1732 521 1817 420Q1831 403 1849 389Q1867 375 1888 364Q1931 342 1971 342Q2020 342 2049 374Q2056 381 2056 390Q2056 407 2038 403Q2028 367 1991 367Q1949 367 1892 426Q1872 448 1854 471.5Q1836 495 1820 521Q1777 593 1777 638Q1777 672 1803 672Q1832 672 1870 628Q1891 604 1913 569Q1935 534 1959 488Q1969 469 1977 457Q1985 445 1990 439Q2006 423 2028 424L2048 427Q2061 430 2070 428Q2061 437 2048.5 456.5Q2036 476 2020 507Q2003 540 1992 567Q1981 594 1977 615Q1975 625 1974 633.5Q1973 642 1973 649Q1973 675 1987 675Q2031 675 2062 634Q2011 701 1975 701Z";

// The sweep of light that crosses the word once when the page first loads (see `sheen`): it starts at the foot of the
// A's right leg, runs along through the middle of "nisa", and carries on round the curve of the ring at the right of
// the a, where it ends. This is that route: a smooth curve through a few points along the letters, then the ring's own
// centre line (CENTERLINE) from its end round to its far side.
const ROUTE_POINTS = [
  [850, 690], [930, 610], [1030, 520], [1140, 500], [1250, 540], [1360, 540], [1470, 510], [1580, 520], [1690, 540],
  [1800, 530], [1910, 500], [2010, 530], [2104, 578],
];

const ROUTE = (() => {
  const f = (n) => n.toFixed(1);
  const pts = ROUTE_POINTS;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  // A smooth curve through the points (each piece's handles lean along the line between its neighbours).
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  // Then round the ring's curve at the right: from its end, back along its last two pieces to the bottom of the curve.
  for (let i = CENTERLINE.length - 1; i >= 2; i--) {
    const [a, b, c] = CENTERLINE[i];
    d += `C${c[0]} ${c[1]} ${b[0]} ${b[1]} ${a[0]} ${a[1]}`;
  }
  return d;
})();

export default function AnisaMark({ sheen = false, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-10 0 2450 940"
      role="img"
      aria-label="Anisa"
      fill="currentColor"
      {...props}
    >
      <defs>
        <mask id="anisa-ring-gap" maskUnits="userSpaceOnUse" x="-10" y="0" width="2520" height="940">
          <rect x="-10" y="0" width="2520" height="940" fill="#fff" />
          <circle cx={STAR_AT[0]} cy={STAR_AT[1]} r={STAR_GAP} fill="#000" />
        </mask>
        {sheen && (
          <>
            <filter id="anisa-shadow-blur" x="-10%" y="-20%" width="120%" height="140%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id="anisa-sweep-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="34" />
            </filter>
            <mask id="anisa-sweep-mask" maskUnits="userSpaceOnUse" x="-300" y="-300" width="3000" height="1600">
              <path
                className="anisa-mark__sweep"
                d={ROUTE}
                pathLength="1000"
                fill="none"
                stroke="#fff"
                strokeWidth="270"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#anisa-sweep-blur)"
              />
            </mask>
          </>
        )}
      </defs>
      {sheen && (
        // A soft shadow under the word, cast a little down and to the right, shown only where the sweep is (the mask is a
        // short stretch of the route, moved along it by the animation in theme.scss). It sits behind the letters.
        <g className="anisa-mark__shadow" mask="url(#anisa-sweep-mask)">
          <g transform="translate(18 30)" filter="url(#anisa-shadow-blur)">
            <path d={RING} />
            <path d={LETTERS} />
          </g>
        </g>
      )}
      <path className="anisa-mark__ring" d={RING} mask="url(#anisa-ring-gap)" />
      <path className="anisa-mark__letters" d={LETTERS} />
      <g
        transform={`translate(${STAR_AT[0].toFixed(1)} ${STAR_AT[1].toFixed(1)}) rotate(${STAR_ANGLE.toFixed(1)}) scale(0.8 1.2)`}
      >
        <path className="anisa-mark__star-light" d={STAR_LIGHT} />
        <path className="anisa-mark__star-dark" d={STAR_DARK} />
      </g>
    </svg>
  );
}
