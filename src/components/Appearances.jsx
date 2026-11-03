import { useRef } from 'react';
import { Photo } from './Showcase.jsx';
import AppearOutline from './AppearOutline.jsx';
import { appearances, appearancesIntro } from '../data/resume.js';

// "Guest" appearances: a few words about speaking at conferences, then a picture from each talk, with its title
// under it and, under that, where and when it was.
export default function Appearances() {
  const section = useRef(null);
  return (
    <div className="appear" ref={section}>
      <AppearOutline section={section} />
      <div className="appear__intro">
        <p>{appearancesIntro}</p>
      </div>
      <ul className="appear__events">
        {appearances.map(({ title, event, photos }) => (
          <li key={title} className="appear__event">
            {photos.map((photo, n) => (
              <Photo key={n} photo={photo} organization={title} index={n} />
            ))}
            <p className="appear__name">{title}</p>
            <p className="appear__where">{event}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
