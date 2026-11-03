import { useState } from 'react';
import { greeting } from '../data/greetings.js';
import Star from './Star.jsx';

// The virtual business card: the photo on the left (on top on small screens) with the contact
// details beside it. Two outlines stack around the photo; the outer one breaks around a star.
// On the homepage it is one step of the page's stage (`stage`; see Frozen.jsx); on the contact page it
// is the page itself.

export default function ContactCard({ as: Wrapper = 'main', stage = false }) {
  const Heading = stage ? 'h2' : 'h1';
  // Pointing at "yes! three!" swaps the portrait for the cats (a tap does too, for a touch screen).
  const [cats, setCats] = useState(false);

  return (
    <Wrapper className={`contact${stage ? ' contact--stage' : ''}${cats ? ' is-cats' : ''}`}>
      <div className="contact__figure">
        <div className="contact__image">
          <img
            src="/images/contact.jpg"
            width="1125"
            height="1500"
            alt="Anisa sitting on a glass ledge in front of a city skyline"
          />
          <img
            className="contact__cats"
            src="/images/cats.jpg"
            width="1170"
            height="2075"
            alt="Chief, Mila and Ivan, Anisa’s three cats, sitting on a rug and looking up at the camera"
            loading="lazy"
          />
        </div>
        <span className="contact__halo" aria-hidden="true" />
        <Star className="contact__star" />
        <p className="contact__caption">
          <span className="contact__caption-name">Anisa Anuar • she/they</span>
          <span className="contact__caption-cats" aria-hidden={!cats}>From right to left: Chief, Mila, Ivan</span>
        </p>
      </div>

      <div className="contact__details">
        <Heading className="contact__name">
          {greeting.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </Heading>

        <p className="contact__text">Get some rest, stay a while.</p>

        <p className="contact__text">
          If we haven’t already met, my name is Anisa! Currently, I’m a <strong>design technologist</strong> based in Brooklyn, NY.
        </p>

        <p className="contact__text">
          I’ve played a few roles in my professional life, from graphic designer to
          full-stack software engineer to somewhere-in-the-middle-but-also-completely-on-the-outside.
        </p>

        <p className="contact__text">
          At home, I have three cats (
          <span
            className="contact__cats-trigger"
            tabIndex={0}
            onMouseEnter={() => setCats(true)}
            onMouseLeave={() => setCats(false)}
            onFocus={() => setCats(true)}
            onBlur={() => setCats(false)}
            onClick={() => setCats((on) => !on)}
          >
            yes! three!
          </span>
          ). I love having a creative outlet, whether that’s through
          painting, baking, or anything else where I can <em>make</em> something with my hands. And I’m
          a fan of a good puzzle — logic, word, jigsaw, or otherwise.
        </p>

        <p className="contact__text">
          <strong>Let’s connect!</strong> The best way to reach me is through{' '}
          <a href="https://www.linkedin.com/in/anisaanuar/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{' '}
          or via <a href="mailto:anisaanuar98@gmail.com">e-mail</a>.
        </p>
      </div>
    </Wrapper>
  );
}
