# Anisa Anuar's portfolio

React 18 + Vite 5 single-page site (react-router `BrowserRouter`), styled with Sass (`src/theme.scss`), set in Zalando
Sans. Deployed to GitHub Pages at https://anisaanuar.github.io by `.github/workflows/deploy.yml` on every push to
`master` (Pages source is "GitHub Actions"). The old static HTML site is tagged `old-site`.

```
npm ci          # install
npm run dev     # local dev server
npm run build   # production build into dist/
```

## How Anisa likes to work

- Small, incremental steps. Do only what is asked; don't add extras.
- The words are hers: write copy in her voice (warm, plain, a bit playful), and use details from her earlier portfolios
  (`public/portfolio2019`, `2020`, `2021`) when drafting.
- Say what was and wasn't checked. Don't claim something looks right unless it was actually seen.

## How the site is built

- The home page is one fixed "stage" (`src/components/Frozen.jsx`): a tall scroll track with a sticky 100vh stage, and
  each section fades out and the next fades in. Frozen mode is `(min-width: 961px) and (min-height: 700px)`; below that
  the sections stack down the page. A nav at the top left (`HomeNav.jsx`) goes away when the pictures would reach it
  (`html.no-nav`), and always at 1024px and under.
- Sections: hero wordmark, About Me (`ContactCard.jsx`), a short chat (`ChatSection.jsx`), Work Experience
  (`pages/Resume.jsx`, data in `src/data/resume.js`), Outside of Work (`Showcase.jsx`), Guest Appearances
  (`Appearances.jsx`), and a closing note.
- Each section after About Me ends with a bottom-right "next" link (the `next` field on a step).
- The border treatment (a thin inner line, a fainter outer line, and the wordmark's star in a break on it) appears
  around About Me's photo, Work Experience's picture strip, Outside of Work's rows (`RowsOutline.jsx`) and Guest
  Appearances (`AppearOutline.jsx`). On 1024px and under the pictures are swipeable galleries with no lines.
- Bullets and separators in Work Experience are small four-point sparkles (`star-bullet()` in `theme.scss`).
- Fonts and colors are tokens at the top of `theme.scss`. Layout widths are CSS variables on `:root`
  (`--nav-w`, `--content-left`, `--content-w`).

## Status and open items

- The wordmark's one-time sweep animation exists (`sheen` prop on `AnisaMark`, route in `AnisaMark.jsx`, styles at
  `.anisa-mark__*` in `theme.scss`) but is switched off in `Home.jsx` while Anisa works out the look.
- The Intuit (current role) story is still bullets plus intro paragraphs; the other jobs are stories.
- The Work Experience stars sit about 1.4px off the line (the star's points lean); Outside of Work and Guest
  Appearances were corrected, Work Experience was not.
- Not yet checked: the 961-1024px range, and phones, for the newest Work Experience and border changes.
- The favicon is `public/favicon.svg` (the wordmark's A over a soft white circle). `index.html` still links the old green
  PNG (`/assets/logo.png`) as a fallback for browsers without SVG favicons (e.g. Safari).
- The built site is about 1.5 GB (mostly the 2019-2021 archives), over GitHub Pages' 1 GB guideline. If a deploy fails
  on size, trim archive videos/PDFs from the published copy.
