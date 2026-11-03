// Small icon links in the top right: LinkedIn, GitHub and the contact page (a small profile card, a virtual business card).
// The icons are inline SVG so they never wait on a font or an image to load.
import { Link } from 'react-router-dom';

export const LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anisaanuar/',
    external: true,
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/anisaanuar',
    external: true,
    path: 'M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3',
  },
  {
    label: 'Contact',
    to: '/contact',
    path: 'M1.77 0h20.46C23.2 0 24 .8 24 1.77v20.46c0 .97-.8 1.77-1.77 1.77H1.77C.8 24 0 23.2 0 22.23V1.77C0 .8.8 0 1.77 0zM8 6.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2zM3.8 18h8.4c0-2.3-1.9-3.9-4.2-3.9S3.8 15.7 3.8 18zM14 7h6.2v1.8H14zm0 3.6h6.2v1.8H14zm0 3.6h4V16h-4z',
  },
];

export default function SocialLinks() {
  return (
    <nav className="social" aria-label="Contact and profiles">
      {LINKS.map(({ label, href, to, external, path }) => {
        const icon = (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d={path} fillRule="evenodd" />
          </svg>
        );
        return to ? (
          <Link key={label} className="social__link" to={to} aria-label={label} title={label}>
            {icon}
          </Link>
        ) : (
          <a
            key={label}
            className="social__link"
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {icon}
          </a>
        );
      })}
    </nav>
  );
}
