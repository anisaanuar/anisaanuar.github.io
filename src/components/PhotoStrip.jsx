import { useRef, useState } from 'react';
import { Photo } from './Showcase.jsx';
import Star from './Star.jsx';

// A job's pictures. On a big screen they are a joined strip above the role (see .resume__photos); on a small one the
// same pictures become a gallery like the one in Outside of Work: one at a time, swiped (or dragged with a mouse), with
// dots under it.
// `starAt` is how far down the right side of the outer line the star sits, as a fraction of the pictures' height.
export default function PhotoStrip({ photos, organization, className = '', starAt }) {
  const strip = useRef(null);
  const drag = useRef(null);
  const [slide, setSlide] = useState(0);

  const shots = () => [...(strip.current?.querySelectorAll('.lead__photo') || [])];
  // The picture whose left edge is nearest the left of the strip.
  const nearest = () => {
    const all = shots();
    const at = strip.current.scrollLeft;
    let n = 0;
    all.forEach((shot, i) => {
      if (Math.abs(shot.offsetLeft - all[0].offsetLeft - at) < Math.abs(all[n].offsetLeft - all[0].offsetLeft - at)) n = i;
    });
    return n;
  };
  const onScroll = () => {
    if (photos.length > 1) setSlide(nearest());
  };
  const goTo = (i) => {
    const all = shots();
    if (all[i]) strip.current.scrollTo({ left: all[i].offsetLeft - all[0].offsetLeft, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    const g = strip.current;
    if (e.pointerType !== 'mouse' || e.button !== 0 || g.scrollWidth <= g.clientWidth) return;
    drag.current = { x: e.clientX, left: g.scrollLeft };
    g.setPointerCapture(e.pointerId);
    g.style.scrollSnapType = 'none';
    g.classList.add('is-dragging');
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (d) strip.current.scrollLeft = d.left - (e.clientX - d.x);
  };
  const endDrag = () => {
    const g = strip.current;
    if (!drag.current) return;
    drag.current = null;
    g.classList.remove('is-dragging');
    goTo(nearest());
    setTimeout(() => {
      g.style.scrollSnapType = '';
    }, 400);
  };

  return (
    <>
      <div className={`resume__frame ${className}`} style={starAt ? { '--star-at': starAt } : undefined}>
        <div
          className={`resume__photos ${className}`}
          ref={strip}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {photos.map((photo, n) => (
            <Photo key={n} photo={photo} organization={organization} index={n} current={n === slide} />
          ))}
        </div>
        {/* A second, thinner line further out with the star set into a break on its right side, as around the photo in About Me. */}
        <span className="resume__halo" aria-hidden="true" />
        <Star className="resume__star" />
      </div>
      {photos.length > 1 && (
        <div className="resume__dots">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`lead__dot${i === slide ? ' is-on' : ''}`}
              aria-label={`Photo ${i + 1} of ${photos.length}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </>
  );
}
