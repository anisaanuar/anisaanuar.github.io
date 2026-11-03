import { useRef, useState } from 'react';
import { leadershipShowcase } from '../data/resume.js';
import RowsOutline from './RowsOutline.jsx';


// Leadership and volunteering as an overview rather than a list: for each organization, who and when
// above, with its select pictures below in rows. A photo with no `src` yet shows a soft placeholder.

export function Photo({ photo, organization, index, current = false }) {
  return (
    <figure
      className={`lead__photo${photo.tall ? ' lead__photo--tall' : ''}${photo.contain ? ' lead__photo--contain' : ''}${current ? ' is-current' : ''}`}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.alt || `${organization}, photo ${index + 1}`}
          style={photo.position ? { objectPosition: photo.position } : undefined}
          loading="lazy"
          draggable={false}
        />
      ) : (
        <span className="lead__placeholder" role="img" aria-label={`Photo from ${organization} to come`} />
      )}
    </figure>
  );
}

// Photos in rows of three, landscape ones together and vertical ones (`tall`) together. An organization
// is one step: its rows of photos, with its name and roles at the left of the last row, and a few words below. The
// rows take turns sitting against the left and right edges, so none lines up with the one above.
const PER_ROW = 3;

const idOf = (name) => `lead-${name.replace(/[^a-z]+/gi, '-').toLowerCase()}`;

const rowsOf = (photos) => {
  const indexed = photos.map((photo, index) => ({ photo, index }));
  return [false, true].flatMap((tall) => {
    const group = indexed.filter(({ photo }) => Boolean(photo.tall) === tall);
    return Array.from({ length: Math.ceil(group.length / PER_ROW) }, (_, i) =>
      group.slice(i * PER_ROW, i * PER_ROW + PER_ROW)
    );
  });
};

export default function Showcase({ org }) {
  const rows = rowsOf(org.photos);
  // About how wide the longest role (title and dates) is on one line, plus the box's right padding, so its box can be made
  // wide enough to keep it on one line.
  const textWidth =
    Math.max(...org.roles.map((r) => `${r.title || ''} ${r.dates || ''}`.length), org.organization.length * 1.4) * 8 + 44;
  const gallery = useRef(null);
  const section = useRef(null);
  const [slide, setSlide] = useState(0);

  // On a small screen the pictures are a swipeable strip; which one is showing, for the dots under it.
  const photos = () => [...(gallery.current?.querySelectorAll('.lead__photo') || [])];
  const onScroll = () => {
    if (photos().length < 2) return;
    setSlide(nearestSlide());
  };
  // The picture whose left edge is nearest the left of the strip.
  const nearestSlide = () => {
    const shots = photos();
    const at = gallery.current.scrollLeft;
    let nearest = 0;
    shots.forEach((shot, i) => {
      if (Math.abs(shot.offsetLeft - shots[0].offsetLeft - at) < Math.abs(shots[nearest].offsetLeft - shots[0].offsetLeft - at)) nearest = i;
    });
    return nearest;
  };

  // A finger swipes the strip by itself; with a mouse (a narrow window on a computer) you can drag it instead. While
  // it is dragged the snapping is off, and when you let go it settles on the nearest picture.
  const drag = useRef(null);
  const onPointerDown = (e) => {
    const g = gallery.current;
    if (e.pointerType !== 'mouse' || e.button !== 0 || g.scrollWidth <= g.clientWidth) return;
    drag.current = { x: e.clientX, left: g.scrollLeft, moved: false };
    g.setPointerCapture(e.pointerId);
    g.style.scrollSnapType = 'none';
    g.classList.add('is-dragging');
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    if (Math.abs(e.clientX - d.x) > 4) d.moved = true;
    gallery.current.scrollLeft = d.left - (e.clientX - d.x);
  };
  const endDrag = () => {
    const g = gallery.current;
    if (!drag.current) return;
    drag.current = null;
    g.classList.remove('is-dragging');
    const target = photos()[nearestSlide()];
    g.scrollTo({ left: target.offsetLeft - photos()[0].offsetLeft, behavior: 'smooth' });
    // Snapping comes back once it has settled (right away if it was already in place).
    setTimeout(() => {
      g.style.scrollSnapType = '';
    }, 400);
  };

  const goTo = (i) => {
    const shots = photos();
    if (!shots[i]) return;
    gallery.current.scrollTo({ left: shots[i].offsetLeft - shots[0].offsetLeft, behavior: 'smooth' });
  };

  // The name and roles: at the left end of the last row of pictures on a big screen, above the pictures on a
  // small one (so there are two, and only one shows at a time).
  const roles = (
    <p className="lead__roles">
      {org.roles.map((r) => (
        <span key={r.title || r.dates}>
          {r.title && (
            <>
              <span className="resume__title">{r.title.replace(/-/g, '\u2011')}</span>{' '}
            </>
          )}
          <span className="resume__dates">{r.dates}</span>
        </span>
      ))}
    </p>
  );
  const who = (
    <header key="who" className="lead__who">
      <h3 id={idOf(org.organization)} className="resume__company">{org.organization}</h3>
      {roles}
    </header>
  );

  return (
    <section
      ref={section}
      className={`lead${org.wideRows ? ' lead--wide-rows' : ''}`}
      style={{ '--text-w': `${textWidth}px` }}
      aria-labelledby={idOf(org.organization)}
    >
      <RowsOutline section={section} starRow={org.starRow} />
      <header className="lead__who lead__who--top" aria-hidden="true">
        <p className="resume__company">{org.organization}</p>
        {roles}
      </header>
      <div
        className="lead__gallery"
        ref={gallery}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {rows.length === 0 && <div className="lead__row lead__row--last">{who}</div>}
        {rows.map((row, i) => {
          const last = i === rows.length - 1;
          return (
            <div key={i} className={`lead__row${last ? ' lead__row--last' : ''}`}>
              {last && who}
              {row.map(({ photo, index }) => (
                <Photo key={index} photo={photo} organization={org.organization} index={index} current={index === slide} />
              ))}
            </div>
          );
        })}
      </div>
      {org.photos.length > 1 && (
        <div className="lead__dots">
          {org.photos.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`lead__dot${i === slide ? ' is-on' : ''}`}
              aria-label={`Photo ${i + 1} of ${org.photos.length}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
      {org.summary && (
        <div className="lead__text">
          <p className="lead__summary">{org.summary}</p>
        </div>
      )}
    </section>
  );
}
