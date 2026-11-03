// Carried over from the 2021 site. `href` points at the archived write-up
// (public/portfolio2021); projects without one only have a preview.
const archive = (page) => `/portfolio2021/${page}`;

export const categories = [
  {
    id: 'web-development',
    title: 'Web Development',
    projects: [
      {
        title: 'AEVPH (Virtual Puzzle Hunt)',
        image: '/projects/aevph-thumbnail.png',
        href: archive('aevph.html'),
        skills: 'HTML, CSS, JavaScript, JQuery, asset creation, puzzle making and mapping, user testing',
        description: 'A 22-level virtual puzzle hunt that I created to celebrate my 22nd birthday with my friends! Complete with a variety of puzzles, from crossword to Sudoku to Codenames, creating this from scratch was a fun and satisfying adventure.',
      },
      {
        title: 'Design Portfolio',
        image: '/projects/portfolio-thumbnail.png',
        href: '/history',
        skills: 'HTML, CSS, JavaScript, React, years of iteration',
        description: 'Any other designers out there who also change their portfolio every year or is it just me? Each "new" portfolio shows my growth in more ways than one. Jump in this virtual time machine and explore the history of my portfolios, leading back as far as 2015.',
      },
    ],
  },
  {
    id: 'app-development',
    title: 'App Development',
    projects: [
      {
        title: 'Radical Healing App',
        image: '/projects/radicalhealing-thumbnail.png',
        href: archive('restor.html'),
        skills: 'Research, intentional interviewing, persona building, journey mapping, Swift, Xcode',
        description: 'Developing a mobile app experience that guides users through a personalized journey of expansive healing practices while keeping significant focus on collective liberation.',
      },
      {
        title: 'MBTA App Redesign',
        image: '/projects/mbta-thumbnail.png',
        href: archive('mbta.html'),
        skills: 'Benchmarking, user flow diagramming, UI specification, VD specification, prototyping',
        description: 'Taking an app that fails to simplify the complicated system of the MBTA and an app that succeeds at making tooth-brushing into something fun and rewarding and combining the two to make something beautiful.',
      },
      {
        title: 'flourish',
        image: '/projects/flourish-thumbnail.png',
        href: archive('flourish.html'),
        skills: 'User interviewing, persona building, brand iteration, journey mapping, Adobe XD',
        description: 'Designed with my mom in mind, flourish is a gardening app "for your home away from home," with a community to share and receive knowledge on growing plants uncommon to the land you occupy.',
      },
    ],
  },
  {
    id: 'information-design',
    title: 'Information Design',
    projects: [
      {
        title: 'Four Years of Financial Data',
        image: '/projects/fouryears-thumbnail.png',
        href: archive('financialdata.html'),
        description: "If you had the chance to read through my experience with work-studies, you may know that my financial status coming into college was completely unstable. Since then, I've worked hard to bring myself to a comfortable place, and this graphic shows those efforts and the time and support it took to get to where I am now.",
      },
      {
        title: 'Stardew Valley Calendar',
        image: '/projects/stardew-thumbnail.png',
        href: archive('stardew.html'),
        description: 'Stardew Valley is a beautiful game, and overwhelming in so many ways. This calendar is intended to help farmers in the game monitor the growth cycle of crops so they can optimize planting. It also shows how much crops are worth to help the farmer consider their profits as well.',
      },
      {
        title: 'Rock Climbing Infographic Posts',
        image: '/projects/rockclimbing-thumbnail.png',
        href: archive('rockclimbing.html'),
        description: 'Rock climbing is one of my favorite pastimes, and I love introducing new people to the sport. This infographic shows the basics of climbing, from the holds to the harnesses to the shoes.',
      },
    ],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    projects: [
      {
        title: 'Apparel Design',
        image: '/projects/apparel-thumbnail.png',
        description: 'Apparel for large groups brings people together in a way that few other things can. It\'s that sense of "we\'re in this together" that I loved designing for.',
      },
      {
        title: 'Promotional Graphics',
        image: '/projects/promo-thumbnail.png',
        description: "The Asian American community at Northeastern hosts quite a few events, and it's given me a lot of experience in creating promotional graphics for fundraisers, conferences, and workshops.",
      },
      {
        title: 'Digital Art',
        image: '/projects/digitalart-thumbnail.png',
        description: 'In my free time, I like to experiment with different digital art styles and create works based on the things that make me or the people around me happy.',
      },
    ],
  },
  {
    id: 'other-media',
    title: 'Other Media',
    projects: [
      {
        title: 'Video Editing',
        image: '/projects/videos-thumbnail.png',
        description: 'There\'s something so satisfying to me about matching up parts of a clip with certain beats of a song, or adjusting cuts just until the pacing of a video feels right.',
      },
      {
        title: 'Acrylic Painting',
        image: '/projects/paintings-thumbnail.png',
        description: 'Ever since studying abroad in Ireland, I\'ve owned multiple large canvases -- as in, 5 ft by 7 ft large. My "larger-than-life" artworks are the ones I find myself showing off the most.',
      },
    ],
  },
];
