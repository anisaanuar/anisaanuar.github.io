// A fixed, softly flowing gradient backdrop. A deep blue-slate gradient sits underneath, and
// two oversized layers of soft diagonal color bands slide across it very slowly, in
// different directions, so the colors seem to move and mix. There are no round shapes,
// no texture and nothing sharp. The layers are drawn by CSS (.sky::before and .sky::after
// in theme.scss), which is also where the colors and timings live.

export default function Sky() {
  return <div className="sky" aria-hidden="true" />;
}
