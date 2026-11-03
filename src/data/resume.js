// Content from "Anisa Anuar - Resume - August 2026.pdf" (public/resume.pdf).
// Summary and contact info are left out for now. Each job's `skills` are keywords picked from its
// own bullet points, shown beside it; edit them freely.

export const experience = [
  {
    company: 'Intuit',
    location: 'New York, NY',
    roles: [{ title: 'Senior Design Technologist', dates: 'July 2022 – Present' }],
    skills: ['Prototyping', 'Generative AI', 'LLM tools', 'Three.js', 'Cursor', 'Cross-functional work', 'Workshop facilitation'],
    // The story's paragraphs come first, then the list; *words* between asterisks are set in italics.
    story: [
      'One of the most common questions I get when I tell people my job title is, “What do you do?”',
      'My best answer almost always is, “It’s complicated.” Because it is. I do design work, I do engineering work. I do a little bit of both, and sometimes, I do something completely unique. All I can say is, it’s definitely my dream job. Being able to do something that’s creative *and* requires logical, computational thinking? That’s my bread and butter. (And if you know me, you know I *love* bread and butter.)',
      'At Intuit specifically, I’ve worked on:',
    ],
    bullets: [
      'High-fidelity coded prototypes for user testing or executive leadership review',
      'Early-stage LLM-powered tools and GenAI initiatives',
      'Dynamic marketing pages for the QuickBooks homepage',
      'Motion design and micro-interactions across QuickBooks Online',
      'Team-building activity and workshop facilitation',
    ],
    // A closing paragraph, after the list.
    after: [
      'At Intuit, I’ve grown so much. Not just as an individual contributor, but as a leader. Outside of my “day job”, I’ve had the chance to [volunteer for and lead organizations](pride) that I am passionate about and [speak at conferences](appearances) that are near and dear to my heart.',
    ],
    // Optional pictures shown under a job: { src, alt, position } (see leadershipShowcase for what `position` does).
    photos: [
      { src: '/images/experience/intuit-ged-1.jpg', alt: 'Anisa smiling beside a table with two monitors showing a Rive animation framework prototype, at Intuit’s Global Engineering Days gallery walk', position: '50% 55%' },
      { src: '/images/experience/intuit-ged-2.jpg', alt: 'Anisa and a colleague smiling beside laptops and monitors showing an Intuit assistant greeting “Good morning, Anisa!”, at a Global Engineering Days station', position: '50% 55%' },
      { src: '/images/experience/intuit-ghc.jpg', alt: 'Anisa standing in front of the Intuit booth at the Grace Hopper Celebration', position: '50% 74%' },
    ],
  },
  {
    company: 'PayJoy',
    // Its pictures are phone screens, so they keep their own shapes instead of being cropped to fill the strip.
    natural: true,
    location: 'Somerville, MA',
    roles: [{ title: 'Full-Stack Software Engineer', dates: 'January 2020 – June 2022' }],
    skills: ['TypeScript', 'AngularJS', 'Ionic', 'HTML & CSS', 'Design systems', 'Cross-functional work'],
    // A short story in place of bullet points (the other jobs still use `bullets`): a string, or a list of paragraphs.
    story: [
      'I started at PayJoy as a software engineering co-op in 2020. After two design internships, I looked forward to starting a more software development-focused role. I looked mostly for smaller companies with closer-knit teams, since my previous co-ops were at big companies where I felt mostly distant from the people I worked with, as our responsibilities were always so separate. Not only did PayJoy check off all these boxes, but it was also a company that caught my eye immediately from their mission statement. They embody equity in the sense that their products exist solely to uplift and provide for those who are underserved. They put faith in those who other corporations wouldn’t “take a risk on” and provide assistance to so many who need it.',
      'During my time at PayJoy, the majority of the work I did was related to the UI of the app. As a designer, I inherently prioritize certain bugs or feature fixes more than most other engineers would. Improving the user experience is my intrinsic motivation, and the reason I enjoy front-end development is because I have the most direct tie to what a user sees. Having been on the other side of the hand-off, I tried to be the developer I would have wanted to work with as a designer.',
      'Creating this app was such a beautiful experience for me. From the start of my co-op to when I left PayJoy, I had turned a skeleton of an app into something visually exciting and functional. Beyond everything else, I was so grateful for the team I got to work with. I owe so much of what I learned and also just my day-to-day ease to their energy and passion for the customers, and I will always be grateful for them!',
    ],
    photos: [
      { src: '/images/experience/payjoy-1.jpg', alt: 'Three PayJoy Cash App onboarding screens in Spanish that Anisa updated: validate your ID, take a selfie with your ID, and enter your phone number' },
      { src: '/images/experience/payjoy-landing.png', alt: 'The PayJoy Cash App landing screen on a tilted phone, in Spanish on a yellow background: “Te aprobamos hoy mismo” (“We approve you today”)', contain: true },
    ],
  },
  {
    company: 'Intuit',
    location: 'San Diego, CA',
    roles: [{ title: 'Experience Design Co-op', dates: 'January 2019 – August 2019' }],
    skills: ['Wireframing', 'High-fidelity mockups', 'User interviews', 'Rapid testing', 'Design patterns'],
    // A short story in place of bullet points (the other jobs still use `bullets`): a string, or a list of paragraphs.
    story: [
      'I spent seven and a half months at Intuit, and I appreciated every moment of my time there. Prior to the co-op, I had limited professional experience with UX design, wireframing and prototyping, working in sprints, and collaborating with other designers. I left with not only seven and a half months of experience with these skills, but also amazing memories of a fantastic company and a beautiful West Coast city.',
      'My main project at Intuit involved working on the TurboTax Live Community website, which we were creating for our tax experts to use to connect and communicate with one another. Since my mentor was already handling a lot of his own projects, I was the only designer on my team that could work on the website. Because of this, I was able to take full ownership of everything I did, which was both exciting and extremely nerve-wracking. The part of my job that I absolutely loved, and that made me most excited to come into the office, were the days I spent talking directly to our target users. The more I got to know who I was working for and listen to their issues and concerns, the more I felt responsible for their satisfaction.',
      'Beyond the work I did there, I was able to become part of the community at Intuit. I raced in the San Diego Dragon Boat Festival as part of Intuit’s team, marched in the San Diego Pride Parade, and networked with other designers and interns in different offices. I am beyond grateful for the faith that my manager had in me to give me such significant responsibilities, and for my team for always supporting me. Without their efforts, I would not have gotten so far and created so much in my short time there.',
    ],
    photos: [
      { src: '/images/experience/intuit-coop-1.jpg', alt: 'The Intuit dragon boat team in blue Turbo Dragon shirts, posing beside an Intuit banner by the water at the San Diego Dragon Boat Festival' },
      { src: '/images/experience/intuit-coop-2.jpg', alt: 'The Intuit summer interns posing for a group photo outside the San Diego office building, beneath the American, California and rainbow flags', position: '50% 100%' },
      { src: '/images/experience/intuit-coop-3.jpg', alt: 'Four Intuit employees in matching Pride shirts holding rainbow flags at the San Diego Pride Parade' },
    ],
  },
  {
    company: 'Nokia Technologies',
    location: 'Cambridge, MA',
    roles: [{ title: 'Design Coordinator Co-op', dates: 'January 2018 – June 2018' }],
    skills: ['Adobe After Effects', 'Web design', 'HTML email', 'HubSpot CMS', 'Conversion rate'],
    // A short story in place of bullet points (the other jobs still use `bullets`): a string, or a list of paragraphs.
    story: [
      'At Nokia, I had purpose. As design coordinator, I was given a variety of responsibilities. My work ranged from simple poster design to creating HTML e-mail templates, designing visual assets of products to creating a fully animated promotional video. I started out by working on maintenance for the product site and quickly found myself completely redesigning the homepage. It was an unbelievably fulfilling first co-op, and I constantly look back in awe of how amazing of an opportunity I had.',
      'During the latter half of my time at Nokia, I was given a huge assignment: re-designing the homepage. This required not only a large amount of time but also endless planning, review, meetings, and learning. There was still a lot for me to learn, at least in terms of HTML, CSS, and JavaScript, and on top of that, I had to design assets, form a script, and put together an entire video from scratch. The task required motivation, drive, and determination to last for the two months it took me to complete it.',
      'When I first started this co-op, I was a little more reluctant to take risks. I had less confidence in my capabilities, so I stuck mainly to what I knew best. Over time, I learned that I could acquire many skills so long as I put my mind and time to it. I learned to plan, ask for feedback, reflect, reform, and repeat until I was confident in what I had. I left my co-op more confident, capable, and excited for future roles.',
    ],
    photos: [
      { src: '/images/experience/nokia-3.jpg', alt: 'A Nokia Health Solutions webinar page that Anisa redesigned early in her co-op: a “Demo of the Nokia Patient Care Platform” headline, a registration form, and a laptop showing the dashboard' },
      { src: '/images/experience/nokia-1.jpg', alt: 'Nokia health devices that Anisa illustrated in Adobe Illustrator, including a watch, a thermometer, a blood pressure cuff and a scale, shown with the word “data”' },
    ],
  },
];

export const leadership = [
  {
    organization: 'Pride @ Intuit',
    role: 'NYC Co-Lead',
    dates: '2025–2026',
    bullets: [
      'Hosted community events, keynote speakers, small business pop-ups, and watch parties for the NYC office',
      'Led Intuit’s inaugural year walking in the NYC Pride March',
      'Represented Intuit at various external conferences, including Lesbians Who Tech and Out & Equal',
    ],
  },
  {
    organization: 'Out for Undergrad (O4U)',
    role: 'Conference Director',
    dates: '2024–2026',
    bullets: [
      'Coordinated mentorship groups, volunteer shifts, venue technology, and scheduling across O4U Digital and O4U Engineering and Sciences conferences',
      'Planned and ran conference retreats to streamline responsibilities and develop trust within the team',
    ],
  },
  {
    organization: 'Tech Women @ Intuit',
    role: 'Site Champion',
    dates: '2024–2025',
    bullets: [
      'Organized monthly events to build community and connection onsite for Tech Women and allies at Intuit',
    ],
  },
  {
    organization: 'Out for Undergrad (O4U)',
    role: 'Brand & Digital Team',
    dates: '2024–2025',
    bullets: [
      'Created digital content, presentation templates, and graphics for the Out for Undergrad brand',
    ],
  },
];

export const education = [
  {
    school: 'Northeastern University',
    college: 'Khoury College of Computer Sciences',
    degree: 'Bachelor of Science in Computer Science and Interaction Design',
    dates: 'September 2016 – May 2021',
  },
];

// The leadership and volunteering that is shown on the page: for each, who and when, optionally a few words
// (`summary`, which is left off for now), and select pictures. Put a photo in public/images/leadership/ and add it to `photos` as
// { src: '/images/leadership/pride-1.jpg', alt: 'what is in it' }; until then a soft placeholder
// holds the spot. Optional: `tall: true` puts a vertical photo in a taller row of its own (the
// organization's second step), and `position` ('50% 40%') is which part of a photo stays in view when
// it is cropped. `wideRows: true` shows every picture at one wider size (about 8:5), so less of each is cropped away.
export const leadershipShowcase = [
  {
    id: 'pride',
    // Which row of pictures the star on the border sits beside (0 is the top one).
    starRow: 0,
    organization: 'Pride @ Intuit',
    roles: [
      { title: 'NYC Co-Lead', dates: '2025 – Present' },
      { title: 'Trans+ Summit Volunteer Photographer', dates: '2024' },
      { title: 'Bay Area Member', dates: '2023 – 2024' },
    ],
    photos: [
      { src: '/images/leadership/pride-5.jpg', alt: 'The Pride @ Intuit group in matching Pride shirts in front of the 2026 Out & Equal Workplace Summit backdrop', position: '50% 55%' },
      { src: '/images/leadership/pride-oe.jpg', alt: 'The Pride @ Intuit group in black Intuit shirts at the Intuit Pride booth at the Out & Equal Workplace Summit' },
      { src: '/images/leadership/pride-2.jpg', alt: 'The Pride @ Intuit group posing in front of a brick wall with fans and flags' },
      { src: '/images/leadership/pride-3.jpg', alt: 'Two Pride @ Intuit group leads smiling in matching orange NYC Pride shirts', tall: true, position: '50% 100%' },
      { src: '/images/leadership/pride-4.jpg', alt: 'The Pride March making its way down a tree-lined West Village street with rainbow flags and fans', tall: true, position: '50% 100%' },
      { src: '/images/leadership/pride-6.jpg', alt: 'The Pride @ Intuit group posing and cheering in front of an Intuit banner at the TechFutures Summit', tall: true, position: '50% 50%' },
    ],
  },
  {
    id: 'o4u',
    starRow: 1,
    organization: 'Out for Undergrad (O4U)',
    wideRows: true, // every picture is the same, wider size, so less of each is cropped away
    roles: [
      { title: 'O4U Engineering and Sciences Conference Director', dates: '2026' },
      { title: 'O4U Digital Conference Director', dates: '2024 – 2025' },
      { title: 'Brand & Digital Team', dates: '2024 – Present' },
    ],
    photos: [
      { src: '/images/leadership/o4u-1.jpg', alt: 'Conference volunteers posing in front of a rainbow balloon arch' },
      { src: '/images/leadership/o4u-2.jpg', alt: 'The O4U Engineering & Sciences team cheering in front of the conference screens' },
      { src: '/images/leadership/o4u-es-2026.jpg', alt: 'O4U Engineering & Sciences 2026 attendees and directors in a group hug' },
      { src: '/images/leadership/o4u-d-2024.jpg', alt: 'O4U Digital 2024 conference attendees cheering around a large prize check on stage' },
      { src: '/images/leadership/o4u-5.jpg', alt: 'The O4U Digital team smiling close to the camera in front of the O4U Digital backdrop' },
    ],
  },
];

// The note above the pictures in "Guest" Appearances.
export const appearancesIntro =
  'As part of my leadership and involvement in various organizations, I’ve had the opportunity to speak at a few conferences. The topics have so far been unique from one to the next, but they’re always something close to me, whether that’s the work I do or the communities I belong to. Here’s where that’s taken me lately:';

// Conference sessions I have led: the talk, the conference and year it was at, and a photo. Put a photo in
// public/images/appearances/ and add it to `photos` as { src: '/images/appearances/techfutures-1.jpg',
// alt: 'what is in it' }; until then a soft placeholder holds the spot.
export const appearances = [
  {
    title: 'AI-Powered Prototypes: Designing Faster, Smarter',
    event: 'TechFutures Summit, 2025',
    photos: [{ src: '/images/appearances/speaking-ai-roots.webp', alt: 'Anisa speaking on stage in front of a slide reading "AI is not a strong root. You are."' }],
  },
  {
    title: 'Ace/Aro Belonging Group',
    event: 'Out & Equal, 2026',
    photos: [{ src: '/images/appearances/out-and-equal.jpg', alt: 'Anisa gesturing to a slide titled "Ace/Aro Belonging Group" at the 2026 Out & Equal Workplace Summit' }],
  },
  {
    title: 'First-Gen/Low Income Panel',
    event: 'O4U Business, 2026',
    photos: [{ src: '/images/appearances/o4u-panel.jpg', alt: 'Anisa speaking into a microphone on a first-gen, low-income panel at an Out for Undergrad conference' }],
  },
];
