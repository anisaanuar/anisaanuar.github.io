import { useEffect } from 'react';

// Every `.fade` element inside `root` fades in as it scrolls fully into view, and fades back out
// as it scrolls away. Anything taller than the screen only needs most of the screen to count as
// in view. Skipped for anyone who prefers less motion.
export default function useFade(root, active = true) {
  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    // `root` itself counts too, when it is the thing that fades.
    const items = [...root.current.querySelectorAll('.fade')];
    if (root.current.classList.contains('fade')) items.unshift(root.current);
    items.forEach((el) => el.classList.add('is-pending'));
    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Fully visible (or as visible as it can be) shows it; mostly gone hides it. In
          // between, it stays as it was, so it never flickers at the edge.
          const { height } = e.boundingClientRect;
          const needed = height <= window.innerHeight * 0.9 ? 0.98 : (window.innerHeight * 0.5) / height;
          // The first time, anything mostly on screen just shows (a reload or a jump down the page).
          const first = !e.target.dataset.faded;
          e.target.dataset.faded = 'seen';
          if (e.intersectionRatio >= needed * (first ? 0.6 : 1)) e.target.classList.remove('is-pending');
          else if (e.intersectionRatio < needed * 0.6) e.target.classList.add('is-pending');
        });
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );
    items.forEach((el) => seen.observe(el));
    return () => seen.disconnect();
  }, [root, active]);
}
