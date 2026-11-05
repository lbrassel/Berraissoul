# Taha — Product Designer Portfolio

A motion-rich portfolio built with **React + Vite**, **GSAP** (ScrollTrigger, SplitText, Draggable, Inertia) and **Lenis** smooth scrolling.

## Case studies (Supabase + /admin)

Case studies are stored in Supabase and edited at **`/admin`**: log in, add or edit a case study, upload a cover and screenshots, and publish. Until at least one case study is published (or if Supabase isn't connected), the site shows the sample projects from `src/content.js`.

**One-time setup**

1. **Create the tables:** in Supabase, go to **SQL Editor → New query**, paste all of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**. This creates the `case_studies` table, an `admins` list, and a public `case-studies` image bucket. Only admins can change them. Already set this up earlier? Run the file again: it is safe to re-run, and it adds the newer fields (feature deep-dives, explorations, a custom results heading) and cover styles (such as the Euka "Creators", UGC University "Academy" and Poplar "Treasury" covers) to your existing table. Those newer fields are edited in `src/content.js` for now; `/admin` keeps them intact when you save.
2. **Create your login:** go to **Authentication → Users → Add user → Create new user**, and enter your email and a password.
3. **Make yourself an admin:** back in the SQL Editor, run this with your email:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
4. **Turn off public sign-ups (recommended):** **Authentication → Sign In / Providers → Allow new users to sign up → off**.
5. **Connect Vercel:** in your Vercel project, open **Settings → Environment Variables** and add both variables, then redeploy:
   - `VITE_SUPABASE_URL`: your project URL, like `https://abcd.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: the publishable key, or the legacy anon key

   Both are in Supabase under **Project Settings → API Keys**. For local development, put the same two lines in a `.env` file (see `.env.example`).

Then open `https://<your-site>/admin`. On the first visit you can **import the samples as drafts** and edit them, or start fresh. The order in the admin list is the order on the site.

## Make it yours

Everything else you read on the site lives in **`src/content.js`**: name, bio, email, socials, the "More explorations" list, experience, process and tools. Anything marked `SAMPLE` or `TODO` is placeholder copy to replace.

- **Portrait:** put a photo in `public/` and set `site.portrait: '/portrait.jpg'`.
- **Colours & fonts:** tokens at the top of `src/styles/global.css`.

## CV

The downloadable CV is `public/Taha-Berraissoul-CV.pdf`, linked from the nav, the About section and the footer. Its source is [`cv/cv.html`](cv/cv.html): edit the words there, then run `npm run cv` to rebuild the PDF (needs Playwright with Chromium).

## Interactions

| Where | What happens |
| --- | --- |
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
| Case studies | Page-transition curtain labelled with the project name; expanding cover; stacking highlight cards; screens gallery with clip reveals; count-up results; "next project" reveal |

Every effect respects `prefers-reduced-motion`, and pointer-only effects are skipped on touch devices.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com), with the two Supabase environment variables above. `vercel.json` rewrites all routes to `index.html` so `/work/<slug>` and `/admin` work on refresh.
