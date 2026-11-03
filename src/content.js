// ─────────────────────────────────────────────────────────────────────────────
//  Every word on the site lives in this file.
//  Edit it to make the portfolio yours — the components never need to change.
//
//  Anything marked SAMPLE is placeholder copy: swap it for your real work.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'Taha',
  role: 'Product Designer',
  email: 'hello@example.com', // TODO: your real email
  location: 'Morocco',
  timezone: 'Africa/Casablanca', // used for the live clock
  availability: 'Available for new projects',

  // Hero: "<heroLead> <one of heroWords>"
  heroLead: ['I design products', 'that feel'],
  heroWords: ['effortless', 'intuitive', 'human', 'delightful'],
  intro:
    'Product designer crafting end-to-end experiences for startups and ambitious teams — from the first messy sketch to the last shipped pixel.',

  about:
    "I'm Taha, a product designer who turns complex problems into clear, useful and beautiful products. I move between research, interaction and visual design, and I care about the small details that make software feel alive — the kind you notice only when they're missing.",

  // Optional: put a photo in /public (e.g. /portrait.jpg) and set its path here.
  portrait: null,

  // SAMPLE numbers
  stats: [
    { value: 6, suffix: '+', label: 'Years designing' },
    { value: 40, suffix: '+', label: 'Products shipped' },
    { value: 25, suffix: '', label: 'Teams partnered with' },
  ],

  skills: [
    'Product Strategy',
    'UX Research',
    'Interaction Design',
    'Design Systems',
    'Prototyping',
    'UI Design',
    'Motion',
    'Usability Testing',
  ],

  tools: [
    'Figma',
    'FigJam',
    'Framer',
    'ProtoPie',
    'Rive',
    'Spline',
    'Webflow',
    'Notion',
    'Maze',
    'Linear',
    'After Effects',
    'HTML & CSS',
  ],

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' }, // TODO
    { label: 'Dribbble', href: 'https://dribbble.com/' }, // TODO
    { label: 'Behance', href: 'https://www.behance.net/' }, // TODO
    { label: 'Instagram', href: 'https://www.instagram.com/' }, // TODO
  ],
}

// SAMPLE — replace with your real experience
export const experience = [
  { years: '2023 — Now', role: 'Independent Product Designer', company: 'Freelance', place: 'Remote' },
  { years: '2021 — 2023', role: 'Senior Product Designer', company: 'Digital product studio', place: 'Hybrid' },
  { years: '2019 — 2021', role: 'UI/UX Designer', company: 'Fintech startup', place: 'On-site' },
  { years: '2018 — 2019', role: 'Design Intern', company: 'Creative agency', place: 'On-site' },
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
// 'mobile' | 'dashboard' | 'commerce' | 'system' | 'abstract'
// To use a real image instead, add `image: '/work/pulse.jpg'` (file in /public).

// Euka is a real case study, written from the Euka Figma file. Pulse, Atlas, Souk
// and Kernel below are SAMPLE projects — replace them with your real case studies.
// TODO (Euka): confirm role and add timeline/team (hidden until filled in). The results
// are what the product handles, from the designs; swap in real outcomes once you have them.
export const projects = [
  {
    slug: 'euka',
    title: 'Euka',
    tagline: 'Creator sales, all in one place.',
    category: 'Web App · Creator commerce',
    year: '2026',
    role: 'Product Designer',
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
        text: 'Find creators, send invites, ship samples, track every sale. That loop became the spine of the product: Programs for the work, Insights for the results, and setup progress always one click away.',
      },
      {
        title: 'Design for trust',
        text: 'Agents and AI do the heavy lifting, so every agent, suggestion and segment shows its status, the evidence behind it and a way for a person to step in.',
      },
      {
        title: 'Build the system',
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
    slug: 'pulse',
    title: 'Pulse',
    tagline: 'Personal finance, finally calm.',
    category: 'Mobile App · Fintech',
    year: '2025',
    role: 'Lead Product Designer',
    timeline: '5 months',
    team: '1 PM · 4 Engineers',
    platform: 'iOS & Android',
    kind: 'mobile',
    colors: { bg: '#3a2dff', bg2: '#8b6bff', ui: '#ffffff', accent: '#c9ff4a', ink: '#15123a' },
    overview:
      'Pulse helps young professionals understand where their money goes without the guilt. I led the product design from discovery to launch, shaping the app’s core budgeting experience and its visual language.',
    challenge:
      'Most budgeting apps feel like a spreadsheet that judges you. People downloaded them with good intentions and churned within two weeks.',
    quote: 'How might we make checking your finances feel as light as checking the weather?',
    approach: [
      { title: 'Listen', text: 'Twenty diary studies revealed that anxiety — not a lack of features — drove people away.' },
      { title: 'Reframe', text: 'We replaced red warnings with gentle, forward-looking nudges and a single daily “safe to spend” number.' },
      { title: 'Prototype', text: 'Five rounds of testing on interactive prototypes refined the home screen down to what matters.' },
    ],
    highlights: [
      { title: 'Safe-to-spend', text: 'One number that updates in real time as you spend.' },
      { title: 'Smart pockets', text: 'Drag money into goals with playful, tactile interactions.' },
      { title: 'Calm insights', text: 'Weekly stories instead of overwhelming charts.' },
    ],
    results: [
      { value: 38, suffix: '%', label: 'Higher 30-day retention' },
      { value: 4.8, suffix: '', label: 'App Store rating', decimals: 1 },
      { value: 2, suffix: 'x', label: 'Weekly active sessions' },
    ],
    learnings:
      'Tone is a feature. Small shifts in language and colour changed how people felt about the same numbers — and how often they came back.',
  },
  {
    slug: 'atlas',
    title: 'Atlas',
    tagline: 'Analytics that answer, not overwhelm.',
    category: 'B2B SaaS · Dashboard',
    year: '2024',
    role: 'Senior Product Designer',
    timeline: '8 months',
    team: '2 PMs · 7 Engineers · 2 Designers',
    platform: 'Web',
    kind: 'dashboard',
    colors: { bg: '#0f3b3a', bg2: '#1e7a63', ui: '#f4f7f5', accent: '#ffb547', ink: '#0d2322' },
    overview:
      'Atlas is an operations analytics platform for logistics teams. I redesigned the core dashboard and built the design system that now powers every screen of the product.',
    challenge:
      'Operators juggled twelve tabs to answer one question. The old dashboard showed everything, so it explained nothing.',
    quote: 'What does an operations lead need to know in the first ten seconds of their day?',
    approach: [
      { title: 'Shadow', text: 'On-site shadowing across three warehouses mapped the real decisions behind each metric.' },
      { title: 'Prioritise', text: 'Card sorting and a KPI tree separated the signals from the noise.' },
      { title: 'Systemise', text: 'A token-based design system let the team ship new views in days instead of weeks.' },
    ],
    highlights: [
      { title: 'Morning brief', text: 'An auto-generated summary of what changed overnight.' },
      { title: 'Drill-down', text: 'Every number can be explored without losing context.' },
      { title: 'Alerts', text: 'Thresholds that tell you what to do, not just what broke.' },
    ],
    results: [
      { value: 52, suffix: '%', label: 'Faster time-to-insight' },
      { value: 70, suffix: '+', label: 'Reusable components' },
      { value: 31, suffix: '%', label: 'Fewer support tickets' },
    ],
    learnings:
      'A design system is a product with its own users. Treating engineers as those users made adoption effortless.',
  },
  {
    slug: 'souk',
    title: 'Souk',
    tagline: 'A marketplace for modern craft.',
    category: 'E-commerce · Marketplace',
    year: '2024',
    role: 'Product Designer',
    timeline: '4 months',
    team: '1 Founder · 3 Engineers',
    platform: 'iOS · Web',
    kind: 'commerce',
    colors: { bg: '#e8582a', bg2: '#ffb088', ui: '#fff8f1', accent: '#1f5f5b', ink: '#2a1a12' },
    overview:
      'Souk connects independent artisans with buyers around the world. I designed the shopping experience end to end, from discovery to checkout, plus the seller tools behind it.',
    challenge:
      'Handmade products lose their story online. Listings looked like generic stock and artisans struggled to stand out.',
    quote: 'How might we bring the feeling of a walk through the medina to a phone screen?',
    approach: [
      { title: 'Immerse', text: 'Workshops with artisans uncovered the stories buyers actually care about.' },
      { title: 'Story-first', text: 'Product pages lead with the maker, the material and the process.' },
      { title: 'Simplify', text: 'A three-step seller flow made listing a product possible in under five minutes.' },
    ],
    highlights: [
      { title: 'Maker stories', text: 'Short, swipeable stories on every product page.' },
      { title: 'One-tap bag', text: 'A frictionless, delightful add-to-bag moment.' },
      { title: 'Seller studio', text: 'Listing tools built for a phone camera.' },
    ],
    results: [
      { value: 27, suffix: '%', label: 'Higher conversion' },
      { value: 3, suffix: 'x', label: 'More active sellers' },
      { value: 64, suffix: '%', label: 'Faster listing time' },
    ],
    learnings:
      'Authenticity can’t be faked with a filter. Designing around real people’s stories gave the whole product a voice.',
  },
  {
    slug: 'kernel',
    title: 'Kernel',
    tagline: 'One system, every surface.',
    category: 'Design System',
    year: '2023',
    role: 'Design Systems Lead',
    timeline: 'Ongoing',
    team: '3 Designers · 5 Engineers',
    platform: 'Web · iOS · Android',
    kind: 'system',
    colors: { bg: '#e6e2ff', bg2: '#c2b8ff', ui: '#ffffff', accent: '#5b3df5', ink: '#1a1440' },
    overview:
      'Kernel is a multi-platform design system serving six product teams. I led its foundations — tokens, components, documentation and the governance model that keeps it alive.',
    challenge:
      'Six teams, four button styles, zero shared language. Every new feature re-invented the same patterns.',
    quote: 'Can a design system feel like a product people choose, rather than a rule they follow?',
    approach: [
      { title: 'Audit', text: 'An inventory of 1,200 screens exposed duplication and hidden inconsistencies.' },
      { title: 'Foundations', text: 'Semantic tokens for colour, type, space and motion synced between Figma and code.' },
      { title: 'Adopt', text: 'Office hours, contribution guidelines and a public roadmap turned users into contributors.' },
    ],
    highlights: [
      { title: 'Tokens', text: 'One source of truth for every platform and theme.' },
      { title: 'Components', text: 'Accessible, documented and tested by default.' },
      { title: 'Motion', text: 'A shared vocabulary of easing and timing.' },
    ],
    results: [
      { value: 6, suffix: '', label: 'Product teams onboarded' },
      { value: 45, suffix: '%', label: 'Faster feature delivery' },
      { value: 100, suffix: '%', label: 'WCAG AA components' },
    ],
    learnings:
      'Systems scale through people, not files. The documentation site mattered as much as the component library.',
  },
]

// SAMPLE — smaller explorations shown in the "More work" list
export const archive = [
  { title: 'Mood', type: 'AI journaling concept', year: '2025', kind: 'abstract', colors: { bg: '#ff8fb1', bg2: '#ffd2a6', ui: '#fff', accent: '#2b1740', ink: '#2b1740' }, href: null },
  { title: 'Orbit', type: 'Smart home app', year: '2025', kind: 'mobile', colors: { bg: '#111827', bg2: '#334155', ui: '#f8fafc', accent: '#38bdf8', ink: '#0b1220' }, href: null },
  { title: 'Ledger', type: 'Crypto wallet redesign', year: '2024', kind: 'dashboard', colors: { bg: '#1c1917', bg2: '#57534e', ui: '#fafaf9', accent: '#a3e635', ink: '#1c1917' }, href: null },
  { title: 'Fika', type: 'Café ordering kiosk', year: '2023', kind: 'commerce', colors: { bg: '#6b4f3a', bg2: '#c7a27c', ui: '#fffaf3', accent: '#e76f51', ink: '#2e2118' }, href: null },
  { title: 'Wave', type: 'Music visualiser', year: '2023', kind: 'abstract', colors: { bg: '#0ea5e9', bg2: '#6366f1', ui: '#fff', accent: '#fde047', ink: '#0b1024' }, href: null },
]
