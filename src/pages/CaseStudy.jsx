import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { site } from '../content'
import { TLink, useReadyGSAP } from '../components/Transition'
import Counter from '../components/Counter'
import ProjectCover from '../components/ProjectCover'
import StepIcon, { DEFAULT_STEP_ICONS } from '../components/StepIcon'
import ScrollHighlight from '../components/ScrollHighlight'
import SplitReveal from '../components/SplitReveal'
import useReveal from '../components/useReveal'
import { useProjects } from '../components/Projects'
import NotFound from './NotFound'
import './case.css'

// Keyed by slug so moving between case studies mounts a fresh page.
export default function CaseStudyRoute() {
  const { slug } = useParams()
  const { projects, loading } = useProjects()
  if (loading) return null
  const index = projects.findIndex((p) => p.slug === slug)
  if (index < 0) return <NotFound />
  return <CaseStudy key={slug} project={projects[index]} next={projects[(index + 1) % projects.length]} />
}

function CaseStudy({ project: p, next }) {
  const root = useRef(null)
  useReveal(root)

  useEffect(() => {
    document.title = `${p.title} — ${site.name}`
  }, [p.title])

  useReadyGSAP(() => {
    if (reducedMotion()) return

    gsap.from('.cs-meta > div', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.5 })

    // The cover grows from an inset card to full-bleed as it scrolls in.
    gsap.fromTo(
      '.cs-cover',
      { clipPath: 'inset(0% 7% 0% 7% round 32px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'none',
        scrollTrigger: { trigger: '.cs-cover', start: 'top 85%', end: 'top 15%', scrub: true },
      },
    )
    gsap.fromTo(
      '.cs-cover .cover-art',
      { yPercent: -6, scale: 1.12 },
      {
        yPercent: 6,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.cs-cover', start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )

    // Stacked highlight cards: each one eases back a little as the next slides over it.
    const cards = gsap.utils.toArray('.cs-hl')
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      gsap.to(card.querySelector('.cs-hl-inner'), {
        scale: 0.93,
        ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top 70%', end: 'top 20%', scrub: true },
      })
    })

    // Screens: each one opens from the bottom, then drifts slightly as you scroll.
    gsap.utils.toArray('.cs-shot').forEach((shot) => {
      gsap.fromTo(
        shot,
        { clipPath: 'inset(18% 0% 0% 0% round 18px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 18px)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: shot, start: 'top 90%', once: true },
        },
      )
      gsap.fromTo(
        shot.querySelector('img'),
        { scale: 1.12, yPercent: -3 },
        {
          scale: 1,
          yPercent: 3,
          ease: 'none',
          scrollTrigger: { trigger: shot, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })

    // Feature screens open from the bottom, then their numbered markers pop in.
    gsap.utils.toArray('.cs-feature-screen').forEach((screen) => {
      const trigger = { trigger: screen, start: 'top 88%', once: true }
      gsap.fromTo(
        screen,
        { clipPath: 'inset(14% 0% 0% 0% round 14px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.4, ease: 'expo.out', scrollTrigger: trigger },
      )
      gsap.from(screen.querySelectorAll('.cs-pin'), {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(2)',
        stagger: 0.08,
        delay: 0.6,
        scrollTrigger: trigger,
      })
    })

    // Next project preview rises on hover.
    gsap.from('.cs-next-title', {
      yPercent: 100,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.cs-next', start: 'top 80%', once: true },
    })
  }, root)

  const styleVars = { '--p-bg': p.colors.bg, '--p-bg2': p.colors.bg2, '--p-ink': p.colors.ink, '--p-accent': p.colors.accent }
  const meta = [
    ['Role', p.role],
    ['Timeline', p.timeline],
    ['Team', p.team],
    ['Platform', p.platform],
  ].filter(([, v]) => v)
  const approach = p.approach ?? []
  const highlights = p.highlights ?? []
  const results = p.results ?? []
  const gallery = (p.gallery ?? []).filter((g) => g.url)
  const features = (p.features ?? []).filter((f) => f.title && f.images?.length)
  const explorations = (p.explorations?.items ?? []).filter((x) => x.url)
  const resultsHeading = p.resultsHeading ?? {}

  return (
    <article className="cs" ref={root} style={styleVars}>
      <header className="cs-hero wrap">
        <TLink to="/#work" className="cs-back" label="Work">
          <span className="arrow">←</span> All work
        </TLink>
        <p className="eyebrow" data-reveal>
          {[p.category, p.year].filter(Boolean).join(' — ')}
        </p>
        <SplitReveal as="h1" type="chars" immediate delay={0.1} className="cs-title">
          {p.title}
        </SplitReveal>
        {p.tagline && (
          <SplitReveal as="p" immediate delay={0.35} className="cs-tagline">
            {p.tagline}
          </SplitReveal>
        )}
        {meta.length > 0 && (
          <dl className="cs-meta">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <div className="cs-cover cover-host">
        <ProjectCover project={p} ratio="16 / 9" className="cover--wide" />
      </div>

      {p.overview && (
        <section className="cs-section wrap cs-split">
          <p className="eyebrow">Overview</p>
          <ScrollHighlight className="cs-lead">{p.overview}</ScrollHighlight>
        </section>
      )}

      {(p.challenge || p.quote) && (
        <section className="cs-section wrap cs-split">
          <p className="eyebrow">The challenge</p>
          <div>
            {p.challenge && (
              <p className="cs-body" data-reveal>
                {p.challenge}
              </p>
            )}
            {p.quote && (
              <SplitReveal as="blockquote" className="cs-quote">
                “{p.quote}”
              </SplitReveal>
            )}
          </div>
        </section>
      )}

      {approach.length > 0 && (
        <section className="cs-section wrap">
          <div className="cs-split cs-split--head">
            <p className="eyebrow">Approach</p>
            <SplitReveal as="h2" className="cs-h2">
              From insight to <em>interface</em>
            </SplitReveal>
          </div>
          <ol className="cs-steps">
            {approach.map((step, i) => (
              <li key={i} data-reveal data-reveal-delay={i * 0.1}>
                <span className="cs-step-icon">
                  <StepIcon name={step.icon || DEFAULT_STEP_ICONS[i % DEFAULT_STEP_ICONS.length]} />
                </span>
                <span className="cs-step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {features.length > 0 && (
        <>
          <section className="cs-section wrap">
            <div className="cs-split cs-split--head">
              <p className="eyebrow">The product</p>
              <SplitReveal as="h2" className="cs-h2">
                {countWord(features.length)} flows, <em>up close</em>
              </SplitReveal>
            </div>
          </section>
          {features.map((f, i) => (
            <Feature key={f.title} feature={f} index={i} />
          ))}
        </>
      )}

      {highlights.length > 0 && (
        <section className="cs-section wrap">
          <div className="cs-split cs-split--head">
            <p className="eyebrow">The solution</p>
            <SplitReveal as="h2" className="cs-h2">
              Key <em>moments</em>
            </SplitReveal>
          </div>
          <div className="cs-hls">
            {highlights.map((h, i) => (
              <div className="cs-hl" key={i} style={{ top: `calc(var(--nav-h) + ${i * 28}px)` }}>
                <div className={`cs-hl-inner${h.image ? ' has-img' : ''}`}>
                  <span className="cs-hl-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="cs-hl-copy">
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </div>
                  {h.image ? (
                    <img className="cs-hl-img" src={h.image} alt={h.title} loading="lazy" />
                  ) : (
                    <span className="cs-hl-shape" aria-hidden="true" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {explorations.length > 0 && (
        <section className="cs-section wrap" aria-label="Explorations">
          <div className="cs-split cs-split--head">
            <p className="eyebrow">Explorations</p>
            <div>
              <SplitReveal as="h2" className="cs-h2">
                {p.explorations.title} {p.explorations.em && <em>{p.explorations.em}</em>}
              </SplitReveal>
              {p.explorations.text && (
                <p className="cs-feature-problem" data-reveal>
                  {p.explorations.text}
                </p>
              )}
            </div>
          </div>
          <div className="cs-explore">
            {explorations.map((x, i) => (
              <figure className={`cs-explore-item${x.note ? ' is-chosen' : ''}`} key={x.url} data-reveal data-reveal-delay={i * 0.06}>
                <div className="cs-explore-img">
                  <img src={x.url} alt={x.label} loading="lazy" />
                </div>
                <figcaption>
                  <b>{x.label}</b>
                  {x.note && <span className="cs-chosen">{x.note}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="cs-section wrap" aria-label="Screens">
          <div className="cs-split cs-split--head">
            <p className="eyebrow">Screens</p>
            <SplitReveal as="h2" className="cs-h2">
              A closer <em>look</em>
            </SplitReveal>
          </div>
          <div className="cs-gallery">
            {gallery.map((g, i) => (
              <figure className="cs-shot-wrap" key={g.url + i}>
                <div className="cs-shot">
                  <img
                    src={g.url}
                    alt={g.caption || `${p.title} screen ${i + 1}`}
                    loading="lazy"
                    style={g.ratio ? { aspectRatio: g.ratio } : undefined}
                  />
                </div>
                {g.caption && <figcaption>{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {results.length > 0 && (
        <section className="cs-section wrap">
          <div className="cs-split cs-split--head">
            <p className="eyebrow">{resultsHeading.eyebrow || 'Impact'}</p>
            <SplitReveal as="h2" className="cs-h2">
              {resultsHeading.title || 'The'} <em>{resultsHeading.em || 'results'}</em>
            </SplitReveal>
          </div>
          <dl className="cs-results">
            {results.map((r, i) => (
              <div key={i} data-reveal data-reveal-delay={i * 0.1}>
                <dd>
                  <Counter value={Number(r.value) || 0} suffix={r.suffix} decimals={r.decimals} />
                </dd>
                <dt>{r.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {p.learnings && (
        <section className="cs-section wrap cs-split">
          <p className="eyebrow">What I learned</p>
          <ScrollHighlight className="cs-lead">{p.learnings}</ScrollHighlight>
        </section>
      )}

      <TLink
        to={`/work/${next.slug}`}
        label={next.title}
        className="cs-next cover-host"
        data-cursor="view"
        data-cursor-label="Next case"
      >
        <div className="wrap cs-next-inner">
          <p className="eyebrow">Next project</p>
          <span className="cs-next-mask">
            <span className="cs-next-title">{next.title}</span>
          </span>
          <p className="cs-next-meta">{[next.category, next.year].filter(Boolean).join(' — ')}</p>
        </div>
        <div className="cs-next-cover">
          <ProjectCover project={next} ratio="16 / 9" className="cover--wide" />
        </div>
      </TLink>
    </article>
  )
}

const COUNT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
const countWord = (n) => COUNT_WORDS[n] ?? String(n)

// A feature deep-dive: the problem, the screen(s) with numbered markers, and the
// decision behind each marker. Hovering a marker or a decision highlights both.
function Feature({ feature: f, index }) {
  const [active, setActive] = useState(null)
  const notes = f.notes ?? []
  const images = f.images.filter((img) => img.url)
  const hover = (i) => ({ onMouseEnter: () => setActive(i), onMouseLeave: () => setActive(null) })

  return (
    <section className="cs-section wrap cs-feature">
      <div className="cs-split cs-split--head">
        <p className="eyebrow">
          {String(index + 1).padStart(2, '0')} — {f.eyebrow}
        </p>
        <div>
          <SplitReveal as="h2" className="cs-h2 cs-feature-title">
            {f.title} {f.em && <em>{f.em}</em>}
          </SplitReveal>
          {f.problem && (
            <p className="cs-feature-problem" data-reveal>
              {f.problem}
            </p>
          )}
        </div>
      </div>

      <div className={`cs-feature-plate${images.length > 1 ? ' is-pair' : ''}`}>
        {images.map((img, k) => (
          <div className="cs-feature-screen" key={img.url}>
            <img
              src={img.url}
              alt={img.alt || f.title}
              loading="lazy"
              style={img.ratio ? { aspectRatio: img.ratio } : undefined}
            />
            {notes.map((n, i) =>
              (n.img ?? 0) === k ? (
                <span
                  key={i}
                  className={`cs-pin${active === i ? ' is-active' : ''}`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  aria-hidden="true"
                  {...hover(i)}
                >
                  {i + 1}
                </span>
              ) : null,
            )}
          </div>
        ))}
      </div>

      {notes.length > 0 && (
        <ol className={`cs-notes${active !== null ? ' has-active' : ''}`}>
          {notes.map((n, i) => (
            <li key={i} className={active === i ? 'is-active' : ''} data-reveal data-reveal-delay={i * 0.08} {...hover(i)}>
              <span className="cs-note-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
