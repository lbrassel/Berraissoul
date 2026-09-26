# Taha — Product Designer Portfolio

A motion-rich portfolio built with **React + Vite**, **GSAP** (ScrollTrigger, SplitText, Draggable, Inertia) and **Lenis** smooth scrolling.

## Make it yours

Everything you read on the site lives in **`src/content.js`**: name, bio, email, socials, projects, case studies, experience, process and tools. Anything marked `SAMPLE` or `TODO` is placeholder copy to replace.

- **Real project images:** drop files in `public/work/` and add `image: '/work/pulse.jpg'` to a project. Without an image, each project gets an illustrated cover drawn in code (`kind: 'mobile' | 'dashboard' | 'commerce' | 'system' | 'abstract'`, coloured by `colors`).
- **Portrait:** put a photo in `public/` and set `site.portrait: '/portrait.jpg'`.
- **Case study highlights:** add `image` to any item in `highlights` to show a screenshot.
- **Colours & fonts:** tokens at the top of `src/styles/global.css`.

## Interactions

| Where | What happens |
| --- | --- |
| Load | Preloader with counter and letter reveal, then a curved curtain wipe |
| Everywhere | Lenis smooth scroll, custom blend-mode cursor with contextual labels, magnetic buttons, letter-roll hover on links, scroll progress bar, film grain |
| Nav | Hides on scroll down, returns on scroll up; full-screen mobile menu |
| Theme | Light/dark switch with a circular reveal from the click point (View Transitions API) |
| Hero | Interactive dot field that ripples and reacts to the pointer; split-letter headline; rotating word with an elastic width slot; parallax exit |
| Marquees | Speed up with scroll velocity, skew, and reverse when you scroll up |
| Work | Clip-path reveals, inner parallax, 3D tilt with glare; illustrated covers animate on hover |
| More explorations | Preview card follows the pointer, tilts with its speed and slides between covers |
| About | Paragraph lights up word by word as you scroll; count-up stats; draggable tools with inertia |
| Process | Pinned horizontal scroll with per-card animations (stacks vertically on mobile) |
| Experience | Rows fill with colour on hover |
| Contact | Giant CTA whose letters wave toward the pointer; click-to-copy email with toast; live local time |
| Case studies | Page-transition curtain labelled with the project name; expanding cover; stacking highlight cards; count-up results; "next project" reveal |

Every effect respects `prefers-reduced-motion`, and pointer-only effects are skipped on touch devices.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com). `vercel.json` rewrites all routes to `index.html` so `/work/<slug>` links work on refresh.
