// ─────────────────────────────────────────────────────────────────────────────
//  Every word on the site lives in this file.
//  Edit it to make the portfolio yours — the components never need to change.
//
//  Anything marked SAMPLE is placeholder copy: swap it for your real work.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'Taha',
  fullName: 'Taha Berraissoul',
  role: 'Product Designer',
  email: 'tahalbrassel@gmail.com',
  location: 'Morocco',
  timezone: 'Africa/Casablanca', // used for the live clock
  availability: 'Open to new roles',
  cv: '/Taha-Berraissoul-CV.pdf', // the PDF in /public, linked from the nav, About and footer

  // Loading screen: cycles through these in order, so end on the one you want people to land on.
  greetings: ['Salam', 'Bonjour', 'Hola', 'Ciao', 'Hallo', 'Hello'],

  // Hero: "<heroLead> <one of heroWords>"
  heroLead: ['I design products', 'that feel'],
  heroWords: ['effortless', 'intuitive', 'human', 'delightful'],
  intro:
    'Product designer with 8+ years turning complex SaaS, fintech and mobile flows into products people use and come back to, across the US, Canada, the UK, France, the UAE and Morocco.',

  about:
    "I'm Taha, a product designer who works like a product partner. I start from the problem and the metric, not the screen, then take it from research and flows to prototypes, tested UI and the design system engineers build from.",

  // Optional: put a photo in /public (e.g. /portrait.jpg) and set its path here.
  portrait: '/portrait.webp',

  // From the CV
  stats: [
    { value: 8, suffix: '+', label: 'Years designing products' },
    { value: 40, suffix: '%', label: 'Higher retention at Topple, 6 months after launch' },
    { value: 15, suffix: '%', label: 'More conversions and 30% less drop-off at Fortunian' },
    { value: 6, suffix: '', label: 'Markets: US, Canada, UK, France, UAE, Morocco' },
  ],

  skills: [
    'Product Thinking',
    'User Research',
    'Information Architecture',
    'Interaction Design',
    'Motion Design',
    'Design Systems',
    'Prototyping',
    'Usability Testing',
    'A/B Testing',
    'UI Design',
  ],

  tools: [
    'Figma',
    'FigJam',
    'ProtoPie',
    'Principle',
    'Framer',
    'Sketch',
    'InVision',
    'Overflow',
    'Zeplin',
    'Miro',
    'Maze',
    'Hotjar',
    'Notion',
    'Jira',
    'Lottie',
    'Photoshop',
    'Illustrator',
    'After Effects',
  ],

  socials: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/berraissoul/' }],
}

// Most recent first. `years` is optional: leave it empty and the row shows its number instead.
export const experience = [
  { years: '2026', role: 'Product Designer (freelance)', company: 'Euka', place: 'Remote' },
  { years: '2023 — Now', role: 'Product Designer', company: 'BlackStone eIT', place: 'Dubai · Remote' },
  { years: '2022 — 2023', role: 'Senior UX/UI Designer', company: 'BlackStone eIT', place: 'Dubai · Remote' },
  { years: '2021 — 2022', role: 'Senior UX/UI Designer', company: 'Fortunian', place: 'United States · Remote' },
  { years: '2020 — 2022', role: 'Product Designer', company: 'Topple', place: 'United States · Remote' },
  { years: '2018 — 2021', role: 'UI/UX Designer', company: 'Feel and Clic', place: 'Paris, France' },
]

export const process = [
  {
    title: 'Discover',
    text: 'Interviews, analytics and competitive audits to understand the real problem — not just the one in the brief.',
    items: ['Stakeholder interviews', 'User research', 'Audits'],
  },
  {
    title: 'Define',
    text: 'Turning insight into direction: clear problem statements, success metrics and the flows that matter most.',
    items: ['Journey maps', 'Information architecture', 'KPIs'],
  },
  {
    title: 'Design',
    text: 'Fast iterations from wireframes to high-fidelity prototypes, tested with real people at every step.',
    items: ['Wireframes', 'Prototypes', 'Usability tests'],
  },
  {
    title: 'Deliver',
    text: 'Pixel-tight specs, a living design system and close pairing with engineers until it ships — and after.',
    items: ['Design systems', 'Dev handoff', 'QA & iteration'],
  },
]

// Each cover is drawn in code. `kind` picks the illustration:
// 'mobile' | 'dashboard' | 'commerce' | 'system' | 'creators' (Euka) | 'academy' (UGC University) |
// 'treasury' (Poplar) | 'abstract'
// To use a real image instead, add `image: '/work/pulse.jpg'` (file in /public).

// Euka, UGC University and Poplar are real case studies, written from their Figma files.
// TODO (UGC University): confirm role, and add timeline/team for all three (hidden until filled in).
// TODO (Poplar): confirm the year and role.
// The results are what the products contain, from the designs; swap in real outcomes once
// you have them.
export const projects = [
  {
    slug: 'euka',
    title: 'Euka',
    tagline: 'Creator sales, all in one place.',
    category: 'Web App · Creator commerce',
    year: '2026',
    role: 'Product Designer · Freelance',
    timeline: '',
    team: '',
    platform: 'Web · Light & dark',
    kind: 'creators',
    colors: { bg: '#b1dc45', bg2: '#e6f6b0', ui: '#ffffff', accent: '#61a52f', ink: '#0c110d' },
    overview:
      'Euka helps TikTok Shop brands turn creators into a sales channel: find the right creators with AI, automate outreach and samples, and see every sale they drive. I designed the product end to end, from onboarding to AI creator search, outreach automation, the affiliate CRM and analytics, along with the design system underneath it.',
    challenge:
      'Creator marketing is a loop with a lot of moving parts: finding creators, inviting them, shipping samples, chasing content and tracing every sale back. Euka puts that whole loop in one product, so the challenge was making a dense, data-heavy, partly automated workspace feel calm, scannable and honest about what is happening.',
    quote: 'How might a brand go from finding a creator to seeing their first sale without ever leaving one product?',
    approach: [
      {
        title: 'Map the loop',
        icon: 'loop',
        text: 'Find creators, send invites, ship samples, track every sale. That loop became the spine of the product: Programs for the work, Insights for the results, and setup progress always one click away.',
      },
      {
        title: 'Design for trust',
        icon: 'shield',
        text: 'Agents and AI do the heavy lifting, so every agent, suggestion and segment shows its status, the evidence behind it and a way for a person to step in.',
      },
      {
        title: 'Build the system',
        icon: 'layers',
        text: '26 colour tokens checked to WCAG AA in light and dark, a type scale and ten component groups, from creator-level badges to combo charts, so 70+ screens and states read as one product.',
      },
    ],
    features: [
      {
        eyebrow: 'Onboarding',
        title: 'Up and running in',
        em: 'minutes',
        problem:
          'A creator program has a lot of moving parts. If day one feels like configuring software, a brand never gets to its first creator sale.',
        images: [
          { url: '/work/euka/f-signup.webp', ratio: '1728 / 1117', alt: 'Sign-up, step 4 of 4: connect your store' },
          { url: '/work/euka/f-setup.webp', ratio: '1728 / 1117', alt: 'Getting started: the setup guide, 9 of 10 steps complete' },
        ],
        notes: [
          { img: 0, x: 13.4, y: 28.8, title: 'Four short steps', text: 'Account, email, brand, store. A segmented bar shows exactly how much is left.' },
          { img: 0, x: 13.4, y: 68, title: 'Trust before access', text: 'Connecting a store says up front what Euka can touch: read-only, never your listings, prices or orders.' },
          { img: 1, x: 16.5, y: 21, title: 'Progress you can see', text: 'The workspace opens on a setup guide: 9 of 10 steps done, one to go.' },
          { img: 1, x: 16.5, y: 34.9, title: 'One next step, not ten', text: 'The next task gets the spotlight, with a preview of what it makes and how long it takes. Finished steps fold away.' },
        ],
      },
      {
        eyebrow: 'AI Creator Search',
        title: 'Find creators who',
        em: 'sell',
        problem:
          'Brands scroll through thousands of profiles and pick by follower count and gut feel. Followers say little about who will actually sell.',
        images: [{ url: '/work/euka/f-search.webp', alt: 'AI Creator Search with five filters applied' }],
        notes: [
          { x: 16.5, y: 10.9, title: 'Describe, don’t configure', text: 'Search starts as a sentence, like “creators saying ‘best shampoo’ in English”, or an image, not a wall of dropdowns.' },
          { x: 16.5, y: 21.2, title: 'Filters you can see', text: 'Refinements from a five-tab filter drawer stay on screen as chips, so narrowing 4.4M creators to 12,480 is never a black box.' },
          { x: 16.5, y: 35, title: 'Sales signals first', text: 'Cards lead with GMV, GMV tier (L1–L7), live GMV and sample requests: what predicts a creator will sell.' },
          { x: 77.6, y: 13.9, title: 'Built for shortlists', text: 'Tick creators straight from the grid and add them to a list, ready for outreach.' },
        ],
      },
      {
        eyebrow: 'Outreach automation',
        title: 'Automation you can',
        em: 'trust',
        problem:
          'Creators message brands all day with the same questions. Answering by hand does not scale, and a bot that answers wrongly can cost the partnership.',
        images: [{ url: '/work/euka/f-automation.webp', alt: 'Auto Responder: suggested answers to creator questions' }],
        notes: [
          { x: 16.5, y: 17, title: 'Say what’s off, and the fix', text: 'When automation is paused, a banner says so in plain words, when it last ran, and offers the fix in one click.' },
          { x: 16.5, y: 38.7, title: 'Show the AI’s work', text: 'Messages scanned, questions detected, suggestions ready: the numbers behind every suggestion.' },
          { x: 16.5, y: 62.3, title: 'Show the evidence', text: 'Each suggested answer lists the creator messages that triggered it.' },
          { x: 76.5, y: 75.2, title: 'A person signs off', text: 'Nothing goes live on its own: add it to the FAQ, edit it first, or mark it not useful.' },
        ],
      },
      {
        eyebrow: 'Affiliate CRM',
        title: 'A CRM that knows',
        em: 'what’s next',
        problem: 'A list of 5,000 affiliates does not tell you who needs a nudge today.',
        images: [{ url: '/work/euka/f-segments.webp', alt: 'Affiliate CRM segments, grouped by funnel stage' }],
        notes: [
          { x: 16.5, y: 32, title: 'Segments follow the funnel', text: 'Samples in shipment, content pending, posted a video, revenue generating: each stage is a segment that keeps itself up to date.' },
          { x: 16.5, y: 40.4, title: 'Every number has a next step', text: 'Each segment comes with the one action that moves creators on: a welcome message, a reminder to post, a request for Spark codes.' },
          { x: 16.5, y: 55.6, title: 'Win back the quiet ones', text: 'Creators who posted once, went inactive or never posted are grouped and ready to re-engage.' },
          { x: 97.8, y: 79, title: 'Segments power agents', text: 'Any custom segment can start an outreach agent in one click.' },
        ],
      },
      {
        eyebrow: 'Analytics',
        title: 'A dashboard that',
        em: 'explains itself',
        problem: 'Brands could see their GMV, but not why it moved or which part of the program to fix.',
        images: [{ url: '/work/euka/f-dashboard.webp', alt: 'Dashboard: key metrics and the affiliate funnel' }],
        notes: [
          { x: 16.5, y: 30.4, title: 'Always compared', text: 'Every metric is measured against the previous period by default, with a clear up or down chip.' },
          { x: 16.5, y: 69, title: 'One funnel, four verbs', text: 'Reach, activate, amplify, convert, each with volume, change and an efficiency rate, like orders per 1K impressions.' },
          { x: 16.5, y: 87, title: 'Say what changed', text: 'A plain-language read-out sits next to the numbers: “Impressions fell 21%. Orders held. Each view is converting better.”' },
          { x: 71.5, y: 78.9, title: 'No fake zeros', text: 'Where tracking is not set up, the row says “No data” and links to the fix, instead of showing a misleading 0.' },
        ],
      },
    ],
    explorations: {
      title: 'Five directions for',
      em: 'the first screen',
      text: 'Sign-in and sign-up are where a brand first sees what Euka does, so the brand panel got its own exploration, from a static app window to live, moving activity.',
      items: [
        { url: '/work/euka/ex-a.webp', label: 'App window' },
        { url: '/work/euka/ex-b.webp', label: 'Floating widgets' },
        { url: '/work/euka/ex-c.webp', label: 'Dark bento', note: 'Sign-up' },
        { url: '/work/euka/ex-d.webp', label: 'Live activity' },
        { url: '/work/euka/ex-e.webp', label: 'Live activity, v2', note: 'Sign-in' },
      ],
    },
    gallery: [
      { url: '/work/euka/sign-in.webp', caption: 'Sign-in, with the live-activity panel from the exploration above.' },
      { url: '/work/euka/design-colour.webp', ratio: '4 / 5', caption: 'Colour tokens: 26 semantic tokens, text contrast checked to AA in light and dark.' },
      { url: '/work/euka/design-badges.webp', ratio: '4 / 5', caption: 'Badges: status never relies on colour alone, and creator levels run L1 to L7.' },
      { url: '/work/euka/creator-panel.webp', caption: 'Creator drawer: 30-day GMV, sales-channel and category breakdowns and recent videos, without leaving the results.' },
      { url: '/work/euka/outreach-agents.webp', caption: 'Outreach agents: quotas, status and results for every agent, and a plain alert when they stop.' },
    ],
    resultsHeading: { eyebrow: 'The product', title: 'Built to', em: 'scale' },
    results: [
      { value: 4.4, suffix: 'M', decimals: 1, label: 'Creators searchable in plain language' },
      { value: 5, suffix: 'K', label: 'Creator invites a day, sent by outreach agents' },
      { value: 10, suffix: 'K', label: 'Live collaborations tracked at once' },
    ],
    learnings:
      'Automated products earn trust through honesty: a status that says what is off, a suggestion that shows its evidence, a funnel that says “No data” instead of pretending. A token-based system made that consistency cheap across every screen.',
  },
  {
    slug: 'ugc-university',
    title: 'UGC University',
    tagline: 'A masterclass for creators.',
    category: 'Web App · Creator education',
    year: '2026',
    role: 'Product Designer',
    timeline: '',
    team: '',
    platform: 'Web',
    kind: 'academy',
    colors: { bg: '#ff6137', bg2: '#ffd9cc', ui: '#ffffff', accent: '#ff6137', ink: '#1b1714' },
    overview:
      'UGC University trains creators to make content brands pay for. Creators pick a coach who already sells on TikTok Shop, learn by filming real assignments, get reviewed, and graduate into paid brand partnerships. I designed the learning platform end to end, from sign-in and choosing a coach to lessons, submissions, achievements, partnerships and the graduate hub, plus the marketing website that sells the program.',
    challenge:
      'Most creator courses are a playlist and a promise: people watch, never film, and drift off long before they earn anything. The platform had to turn watching into doing, give creators a reason to come back every day, and keep the payoff, real brand deals, in sight from day one without opening it up before they are ready.',
    quote: 'How might we turn watching tutorials into a daily habit of filming, with a brand deal at the end?',
    approach: [
      {
        title: 'Follow the path',
        icon: 'compass',
        text: 'Choose a coach, learn, film, get reviewed, graduate, partner with brands. That path became the product: each step is a section of the sidebar, in the order a creator lives it.',
      },
      {
        title: 'Make practice the product',
        icon: 'pen',
        text: 'Every lesson ends in something to film. Submissions, coach reviews and their statuses are first-class screens, not a comment box under a video.',
      },
      {
        title: 'Reward the habit',
        icon: 'spark',
        text: 'XP, six levels, streaks, milestones and badges turn a long course into daily wins, and every locked thing says exactly what unlocks it.',
      },
    ],
    features: [
      {
        eyebrow: 'Onboarding',
        title: 'Choose a coach,',
        em: 'not a course',
        problem:
          'A creator’s first decision is who to learn from. A catalogue of courses hides what matters most: whether the person teaching actually sells.',
        images: [
          { url: '/work/ugc-university/f-coach.webp', ratio: '1440 / 1024', alt: 'Choose your coach: eight coaches with category, brand revenue and videos created' },
          { url: '/work/ugc-university/f-coach-intro.webp', ratio: '1440 / 1024', alt: 'A coach’s intro video, with Continue to enrol' },
        ],
        notes: [
          { img: 0, x: 26.2, y: 21.2, title: 'Pick a category', text: 'Every coach is tagged with what they sell, from Fitness to Beauty & Makeup or Baby & Kids, so creators find someone in their niche.' },
          { img: 0, x: 26.2, y: 30.3, title: 'Proof before promises', text: 'Cards lead with brand revenue and videos created: a coach’s track record, not a bio.' },
          { img: 0, x: 90.2, y: 11.9, title: 'One choice, one button', text: 'A single selection and one Continue button keep a big decision light.' },
          { img: 1, x: 26.5, y: 11.4, title: 'Meet them first', text: 'An intro video lets creators hear a coach’s style before they enrol.' },
        ],
      },
      {
        eyebrow: 'Lessons',
        title: 'Every lesson ends',
        em: 'on camera',
        problem: 'Watching videos doesn’t make someone a creator. Filming does, and getting honest feedback on what they filmed.',
        images: [
          { url: '/work/ugc-university/f-lesson.webp', alt: 'A lesson: the coach’s video, a description and the assignment' },
          { url: '/work/ugc-university/f-submitted.webp', alt: 'The same lesson after submitting, ready to resubmit' },
        ],
        notes: [
          { img: 0, x: 26.5, y: 55.9, title: 'One idea per lesson', text: 'A short coach video and a single line on what it covers, like the gear you need and why a $5,000 camera isn’t on the list.' },
          { img: 0, x: 27.6, y: 65.2, title: 'Homework you film', text: 'Each lesson ends in an assignment: questions to answer and a 20-second video, checked for audio, lighting and background.' },
          { img: 0, x: 74.9, y: 93.2, title: 'A person reviews it', text: 'Work goes to the coach, not an auto-grader, and the button says so: Submit for review.' },
          { img: 1, x: 28.3, y: 94.2, title: 'Status next to the fix', text: 'After submitting, answers stay readable and the status sits beside the action, so a creator can revise and resubmit in place.' },
        ],
      },
      {
        eyebrow: 'Dashboard',
        title: 'A home that says',
        em: 'what’s next',
        problem: 'Between lessons, reviews and coaches, a creator needs one place that answers: how am I doing, and what should I do today?',
        images: [{ url: '/work/ugc-university/f-dashboard.webp', alt: 'Dashboard: stats, my courses, recent submissions, streak and recent activity' }],
        notes: [
          { x: 17.4, y: 16.6, title: 'Four numbers that matter', text: 'Videos submitted, approval rate, average rating and leaderboard rank, at a glance.' },
          { x: 17.4, y: 50.7, title: 'Progress in steps', text: 'Segmented bars show a course module by module, so it reads as steps to take, not a long scroll.' },
          { x: 70.9, y: 75.6, title: 'Status in plain words', text: 'Approved, Needs changes, In review. When a coach asks for changes, the row says how many notes they left.' },
          { x: 80.3, y: 31.3, title: 'A reason to come back', text: 'A daily streak with the week laid out and streak freezes, so one missed day doesn’t wipe out a habit.' },
        ],
      },
      {
        eyebrow: 'Achievements',
        title: 'Progress you can',
        em: 'feel',
        problem: 'A course with twenty modules is a long way to go. Without small wins along the way, creators stall in the middle.',
        images: [
          { url: '/work/ugc-university/f-achievements-start.webp', alt: 'Achievements on day one: level 1, every milestone and badge locked' },
          { url: '/work/ugc-university/f-achievements.webp', alt: 'Achievements a few weeks in: level 3, milestones in progress, two badges earned' },
        ],
        notes: [
          { img: 0, x: 18.1, y: 17.2, title: 'Six levels, one track', text: 'Newbie to Legend, with the XP for every step and the next goal spelled out: 75 XP to Creator.' },
          { img: 0, x: 18.8, y: 46.2, title: 'Day one isn’t empty', text: 'Before anything is earned, every milestone shows its reward and a lock, so new creators see the whole path.' },
          { img: 1, x: 38.8, y: 47.1, title: 'Locks turn into progress', text: 'Once work starts, locks give way to progress: Module 1 · 60% done, or 2 videos in review.' },
          { img: 1, x: 18.1, y: 78.9, title: 'Badges, dated', text: 'Earned badges light up with the date; the rest say exactly what unlocks them.' },
        ],
      },
      {
        eyebrow: 'Partnerships',
        title: 'Graduation unlocks',
        em: 'the brands',
        problem:
          'Brand deals are why creators sign up, and brands only want creators who can deliver. The deals had to be visible from day one but earned.',
        images: [
          { url: '/work/ugc-university/f-partnerships.webp', alt: 'Brand partnerships, each locked until you graduate' },
          { url: '/work/ugc-university/f-graduate.webp', alt: 'Graduate hub before graduating: what unlocks, and two coaching plans' },
        ],
        notes: [
          { img: 0, x: 16.7, y: 11.6, title: 'The rule, up front', text: 'Graduate to apply, then earn commission on every sale your content drives. The page opens with it.' },
          { img: 0, x: 19.3, y: 42.7, title: 'A lock that names its key', text: 'Earnings, products and rating are visible now, and the lock says which course opens it: Graduate from Beauty & Makeup to apply.' },
          { img: 1, x: 50.5, y: 31.5, title: 'An empty state with a way forward', text: 'Before graduation, the Graduate Hub explains what’s waiting and links straight back to choosing a coach.' },
          { img: 1, x: 25, y: 57.6, title: 'What comes after', text: 'Graduates can keep learning: weekly group coaching, or a personal video audit from their coach.' },
        ],
      },
    ],
    website: {
      eyebrow: 'The website',
      title: 'A site that sells',
      em: 'the outcome',
      text: 'Before anyone sees the app, the website has to make a pay-what-you-want course feel credible. Every section leads with proof: real coaches, real revenue and real student results.',
      pages: [
        {
          url: '/work/ugc-university/web-home.webp',
          height: 7838,
          label: 'Home',
          path: 'ugcuniversity.com',
          alt: 'The full home page: hero with coaches, stats, the program, coach earnings, three steps, success stories, pricing and FAQ',
        },
        {
          url: '/work/ugc-university/web-coach.webp',
          height: 7598,
          label: 'Coach profile',
          path: 'ugcuniversity.com/coaches/sam-schuerman',
          alt: 'A full coach profile: about, stats, top-earning videos, ten course modules, success stories, pricing and FAQ',
        },
      ],
      notes: [
        { title: 'The coaches are the product', text: 'The hero leads with the coaches themselves, each with their niche, brand revenue and videos created, before any feature list.' },
        { title: 'Proof before the pitch', text: '125K+ affiliates trained, $1B+ in revenue, 15M+ products sold: the numbers come first, and again right where people decide to pay.' },
        { title: 'Pay what you think it’s worth', text: 'The pricing promise is the headline. The pricing block says “You decide”, with everything included listed beside it.' },
        { title: 'Every coach gets a page', text: 'A profile with their story, top-earning videos and the full module list, each module one sign-in away.' },
      ],
    },
    explorations: {
      eyebrow: 'Statuses',
      title: 'One lesson,',
      em: 'four states',
      text: 'Every lesson card says where it stands in plain words and a colour of its own, so creators can tell at a glance what’s waiting on them and what’s waiting on their coach. Changes come with the coach’s notes, and resubmitting happens on the same page.',
      items: [
        { url: '/work/ugc-university/status-not-started.webp', label: 'Not started', alt: 'A lesson card at 0%, with no status yet' },
        { url: '/work/ugc-university/status-in-review.webp', label: 'In review', alt: 'A lesson card marked In review' },
        { url: '/work/ugc-university/status-needs-changes.webp', label: 'Needs changes', alt: 'A lesson card marked Needs changes' },
        { url: '/work/ugc-university/status-approved.webp', label: 'Approved', alt: 'A lesson card marked Approved' },
      ],
    },
    gallery: [
      { url: '/work/ugc-university/sign-in.webp', caption: 'Sign-in: the promise and the proof first, with 125,847+ creators trained by coaches still in the game.' },
      { url: '/work/ugc-university/courses.webp', ratio: '1440 / 1024', caption: 'Courses: one coach at a time. The others dim, and a banner says how to switch.' },
      { url: '/work/ugc-university/submissions.webp', ratio: '1440 / 1024', caption: 'Submissions: total, approved, pending and what needs your action, above one list of work.' },
    ],
    resultsHeading: { eyebrow: 'The product', title: 'By the', em: 'numbers' },
    results: [
      { value: 14, suffix: '', label: 'Screens and states, from sign-in to graduation' },
      { value: 6, suffix: '', label: 'Creator levels, from Newbie to Legend' },
      { value: 15, suffix: '', label: 'Milestones and badges to earn along the way' },
    ],
    learnings:
      'Motivation is a design material. A streak, the next level, a lock that names its key: making progress visible kept the path clear better than any copy could. And practice needs a person on the other end. The review loop is what makes it a school, not a playlist.',
  },
  {
    slug: 'poplar',
    title: 'Poplar',
    tagline: 'Idle cash, earning every minute.',
    category: 'Web App · Fintech',
    year: '2023',
    role: 'Product Designer',
    timeline: '',
    team: '',
    platform: 'Web · Desktop & mobile',
    kind: 'treasury',
    colors: { bg: '#123149', bg2: '#d4efe2', ui: '#ffffff', accent: '#11cc7a', ink: '#0b1f2f' },
    overview:
      'Poplar helps businesses put idle cash to work. It connects to a company’s bank accounts, finds the money that has been sitting still, and moves it into yield strategies, with Prime Trust as the regulated custodian. I designed the MVP end to end, on desktop and mobile: sign-up and two-factor log-in, business verification, bank linking and idle cash, one-time and automated deposits, withdrawals, the dashboard, the earnings forecaster, plans and settings.',
    challenge:
      'A business doesn’t hand its cash to an app it just met. Before earning a cent, Poplar asks a finance team for incorporation papers, directors, beneficiaries and access to its bank, then asks it to let automation move real money. The product had to make a regulated, paperwork-heavy setup feel short, show the value before the work, and make every transfer predictable, with a review before anything moves.',
    quote: 'How might a finance team go from sign-up to earning on idle cash without ever feeling it lost track of a dollar?',
    approach: [
      {
        title: 'Value before paperwork',
        icon: 'chart',
        text: 'Verification takes days, so it never blocks the app. A three-step setup card tracks it on the dashboard, and people can skip ahead, explore and see what Poplar would earn them while documents are reviewed.',
      },
      {
        title: 'One way to move money',
        icon: 'layers',
        text: 'Every deposit and withdrawal, one-time or automated, is the same stack of step cards that unlock in order and end on a preview. Learn it once, use it everywhere.',
      },
      {
        title: 'Trust at every step',
        icon: 'shield',
        text: 'Secured by Prime Trust on every form, two-factor log-in from day one, plain warnings before risky amounts, and an activity log of every sign-in and withdrawal.',
      },
    ],
    features: [
      {
        eyebrow: 'Business verification',
        title: 'Verification that',
        em: 'waits for you',
        problem:
          'Before a business can earn, the custodian needs its incorporation papers, directors, beneficiaries and proof of address. Few founders have all of that to hand in one sitting.',
        images: [
          { url: '/work/poplar/f-documents.webp', ratio: '1400 / 1513', alt: 'Business verification, step 3 of 3: six required documents, uploaded, uploading or failed' },
          { url: '/work/poplar/f-setup.webp', ratio: '1400 / 1207', alt: 'The dashboard after submitting: Poplar setup, 2 of 3 steps done' },
        ],
        notes: [
          { img: 0, x: 67.4, y: 13, title: 'Trust, up front', text: 'Every verification step carries “Secured by Prime Trust”, the regulated custodian that holds the funds.' },
          { img: 0, x: 34, y: 51.6, title: 'Every file says how it went', text: 'Uploaded, uploading or failed, and a failure gives the reason and a Retry: “file is too large, over 5MB”.' },
          { img: 0, x: 57.2, y: 90.8, title: 'Leave and come back', text: '“I’ll do it later” saves progress instead of blocking the app, so a missing document never ends the session.' },
          { img: 1, x: 3.2, y: 36.4, title: 'Waiting, said plainly', text: 'Once submitted, the setup card says review takes 3–5 business days and invites people to explore in the meantime.' },
        ],
      },
      {
        eyebrow: 'Idle cash',
        title: 'Find the money',
        em: 'sitting still',
        problem:
          'Most businesses keep far more in checking than they need, and no one has time to work out how much. Poplar has to show that number before it asks for anything else.',
        images: [
          { url: '/work/poplar/f-idle-found.webp', ratio: '1400 / 958', alt: 'You have idle cash: $189,639.75 found across 2 accounts' },
          { url: '/work/poplar/f-idle-breakdown.webp', ratio: '1400 / 960', alt: 'Idle cash breakdown for Chase Checking, by how long it has been idle' },
        ],
        notes: [
          { img: 0, x: 34.8, y: 39.5, title: 'Lead with the number', text: '$189,639.75 across two accounts: what the scan found comes first, in the biggest type on the screen.' },
          { img: 0, x: 24.2, y: 52.5, title: 'Explain the jargon', text: '“Idle cash” is defined in one plain sentence, with a link to read more for anyone who wants it.' },
          { img: 0, x: 35.2, y: 67.4, title: 'No pressure', text: '“I’ll do it later” sits beside View idle cash, and the number stays pinned on the dashboard for when they’re ready.' },
          { img: 1, x: 66.6, y: 44, title: 'How long it’s been still', text: 'Each account breaks idle cash down by age, 60, 87 or 156 days, so a finance team can see what is safe to move.' },
        ],
      },
      {
        eyebrow: 'Automated deposits',
        title: 'Set rules,',
        em: 'not reminders',
        problem:
          'Moving idle cash by hand each month is the chore that gets skipped. But automation that touches the company’s bank account has to be precise and impossible to misread.',
        images: [
          { url: '/work/poplar/f-automated-steps.webp', ratio: '1400 / 1142', alt: 'Automated deposit: source account, amount and frequency, and rules and conditions, each filled in' },
          { url: '/work/poplar/f-preview.webp', ratio: '1400 / 1443', alt: 'Deposit preview: a warning, the schedule, the condition, the strategies and a 0% fee' },
        ],
        notes: [
          { img: 0, x: 21.4, y: 64.6, title: 'Read back in a sentence', text: 'Each finished step turns into a plain summary, like “Deposit $150,000.00, every quarter, starting on Jun 7, 2023”, with Edit beside it.' },
          { img: 0, x: 21.4, y: 80.6, title: 'Rules a CFO would write', text: 'Conditions like “if account balance is above $750,000” keep operating cash safe: the deposit only runs when the rule holds.' },
          { img: 1, x: 16, y: 23.5, title: 'Warn before, not after', text: 'The preview flags an amount above the recommended share, 10% against an advised 7%, before anyone confirms.' },
          { img: 1, x: 15.4, y: 61.3, title: 'No black box', text: 'Every strategy shows its yield, its share and its total, and the fee is spelled out, even when it is 0%.' },
        ],
      },
      {
        eyebrow: 'Dashboard',
        title: 'A dashboard that',
        em: 'shows the yield',
        problem:
          'Once money is in, the question is simple: is it working? The answer had to be on the first screen, right next to the money that still isn’t.',
        images: [
          { url: '/work/poplar/f-dashboard.webp', ratio: '1400 / 1604', alt: 'Dashboard: your funds with the balance chart, the idle cash card and recent transactions' },
          { url: '/work/poplar/f-earnings.webp', ratio: '1400 / 1382', alt: 'Dashboard with the Earnings view: total earnings curve over the week' },
        ],
        notes: [
          { img: 0, x: 66.6, y: 8.2, title: 'Idle cash never hides', text: 'Money that could be earning stays pinned at the top right, one arrow away from a deposit.' },
          { img: 0, x: 16.4, y: 25.3, title: 'The two numbers that matter', text: 'Balance and total earnings sit side by side, earnings in Poplar green.' },
          { img: 0, x: 39, y: 77.4, title: 'Status at a glance', text: 'Complete, Pending, Cancelled, Rejected: each status has its own colour, and arrows tell deposits from withdrawals.' },
          { img: 1, x: 46.2, y: 28.6, title: 'One chart, two stories', text: 'A toggle swaps the balance history for the earnings curve, so “am I earning?” is one click away.' },
        ],
      },
      {
        eyebrow: 'Withdrawals',
        title: 'Getting money out,',
        em: 'just as clear',
        problem:
          'People only trust putting money in when taking it out feels easy. A withdrawal can’t hide its limits or hurry the person making it.',
        images: [
          { url: '/work/poplar/f-withdraw-steps.webp', ratio: '1400 / 871', alt: 'One-time withdrawal: choose the destination account first, the next steps still faded' },
          { url: '/work/poplar/f-withdraw-balance.webp', ratio: '1400 / 1103', alt: 'One-time withdrawal with the available balance at the top and the destination account chosen' },
        ],
        notes: [
          { img: 0, x: 17.3, y: 56, title: 'One step at a time', text: 'Later steps stay faded until the one before is done, so the next action is never in doubt.' },
          { img: 0, x: 67.2, y: 80.4, title: 'Preview before it moves', text: 'Preview stays off until the form is complete. Every money flow ends on a review screen, never straight on a transfer.' },
          { img: 1, x: 18.3, y: 32, title: 'Know the ceiling first', text: 'A later iteration put the available balance at the top, so people know what they can take out before typing an amount.' },
          { img: 1, x: 18.3, y: 78.6, title: 'Optional, and says so', text: 'Scheduling is there for planned payouts and labelled optional, so it never slows down an urgent withdrawal.' },
        ],
      },
    ],
    explorations: {
      eyebrow: 'Mobile',
      title: 'The same product,',
      em: 'in a pocket',
      text: 'Every core flow was also designed at 320px wide. Steps stack, side panels become full screens and long previews scroll, so a founder can check the yield or set up a deposit from a phone.',
      items: [
        { url: '/work/poplar/m-dashboard.webp', label: 'Setup', alt: 'Mobile dashboard: Poplar setup, 1 of 3 steps' },
        { url: '/work/poplar/m-documents.webp', label: 'Verification', alt: 'Mobile business verification: required documents' },
        { url: '/work/poplar/m-idle.webp', label: 'Idle cash', alt: 'Mobile idle cash: $189,639.75 from 2 accounts' },
        { url: '/work/poplar/m-preview.webp', label: 'Deposit preview', alt: 'Mobile deposit preview with the recommended-amount warning' },
        { url: '/work/poplar/m-withdraw.webp', label: 'Withdrawal', alt: 'Mobile one-time withdrawal, first step' },
      ],
    },
    gallery: [
      { url: '/work/poplar/sign-up.webp', ratio: '1440 / 959', caption: 'Sign-up: five fields with the company name optional, and two-factor set up right after the first log-in.' },
      { url: '/work/poplar/bank-accounts.webp', ratio: '1440 / 987', caption: 'Bank accounts: each linked account with its balance and the idle cash found in it.' },
      { url: '/work/poplar/plans.webp', ratio: '1440 / 987', caption: 'Plans: Earn, Grow and Poplar Pro, told apart by how much can earn interest at once.' },
      { url: '/work/poplar/security.webp', ratio: '1440 / 1302', caption: 'Security: two-factor, password and an activity log of every sign-in and withdrawal, with IP, location and device.' },
      { url: '/work/poplar/notifications.webp', ratio: '1440 / 987', caption: 'Notifications: every deposit and withdrawal with its amount, account and time, grouped by day.' },
      { url: '/work/poplar/insufficient.webp', ratio: '1440 / 987', caption: 'Nothing to withdraw yet: the modal says why and leads back to the dashboard instead of a dead end.' },
    ],
    resultsHeading: { eyebrow: 'The product', title: 'By the', em: 'numbers' },
    results: [
      { value: 150, suffix: '+', label: 'Desktop screens and states, from sign-up to settings' },
      { value: 80, suffix: '+', label: 'Mobile screens, every core flow at 320px' },
      { value: 6, suffix: '', label: 'Documents collected for verification, each with its own upload state' },
    ],
    learnings:
      'In fintech the interface is the trust. Saying how long a review takes, showing where every dollar goes and putting a preview before every transfer did more for confidence than any badge. And one pattern for every money movement meant people only had to learn it once.',
  },
]

// Case studies on the way: shown in the work grid as "coming soon" cards, not clickable.
// Remove an entry here once its full case study is added to `projects` above.
export const upcoming = [
  {
    slug: 'topple',
    title: 'Topple',
    tagline: 'Buying ads, as easy as ordering a ride.',
    category: 'Web App · Ad tech',
    role: 'Product Designer',
    kind: 'dashboard',
    colors: { bg: '#1d2b53', bg2: '#4058a8', ui: '#f5f7ff', accent: '#ffcc33', ink: '#0d1430' },
  },
  {
    slug: 'fortunian',
    title: 'Fortunian',
    tagline: 'Key screens, redesigned to convert.',
    category: 'Product redesign',
    role: 'Senior UX/UI Designer',
    kind: 'mobile',
    colors: { bg: '#0f3b3a', bg2: '#1e7a63', ui: '#f4f7f5', accent: '#ffb547', ink: '#0d2322' },
  },
]

// Smaller explorations for the "More explorations" list. The section is hidden while this is empty.
export const archive = []
