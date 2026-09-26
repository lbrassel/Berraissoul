import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { projects, site } from '../content'
import { TLink, useReadyGSAP } from '../components/Transition'
import Counter from '../components/Counter'
import ProjectCover from '../components/ProjectCover'
import ScrollHighlight from '../components/ScrollHighlight'
import SplitReveal from '../components/SplitReveal'
import useReveal from '../components/useReveal'
import NotFound from './NotFound'
import './case.css'

// Keyed by slug so moving between case studies mounts a fresh page.
export default function CaseStudyRoute() {
  const { slug } = useParams()
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
      { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { trigger: '.cs-cover', start: 'top bottom', end: 'bottom top', scrub: true } },
    )

    // Stacked highlight cards: each one shrinks and dims as the next slides over it.
    const cards = gsap.utils.toArray('.cs-hl')
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      gsap.to(card.querySelector('.cs-hl-inner'), {
        scale: 0.9,
        filter: 'brightness(0.45)',
        ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true },
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

  return (
    <article className="cs" ref={root} style={styleVars}>
      <header className="cs-hero wrap">
        <TLink to="/#work" className="cs-back" label="Work">
          <span className="arrow">←</span> All work
        </TLink>
        <p className="eyebrow" data-reveal>
          {p.category} — {p.year}
        </p>
        <SplitReveal as="h1" type="chars" immediate delay={0.1} className="cs-title">
          {p.title}
        </SplitReveal>
        <SplitReveal as="p" immediate delay={0.35} className="cs-tagline">
          {p.tagline}
        </SplitReveal>
        <dl className="cs-meta">
          {[
            ['Role', p.role],
            ['Timeline', p.timeline],
            ['Team', p.team],
            ['Platform', p.platform],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="cs-cover cover-host">
        <ProjectCover project={p} ratio="16 / 9" className="cover--wide" />
      </div>

      <section className="cs-section wrap cs-split">
        <p className="eyebrow">Overview</p>
        <ScrollHighlight className="cs-lead">{p.overview}</ScrollHighlight>
      </section>

      <section className="cs-section wrap cs-split">
        <p className="eyebrow">The challenge</p>
        <div>
          <p className="cs-body" data-reveal>
            {p.challenge}
          </p>
          <SplitReveal as="blockquote" className="cs-quote">
            “{p.quote}”
          </SplitReveal>
        </div>
      </section>

      <section className="cs-section wrap">
        <div className="cs-split cs-split--head">
          <p className="eyebrow">Approach</p>
          <SplitReveal as="h2" className="cs-h2">
            From insight to <em>interface</em>
          </SplitReveal>
        </div>
        <ol className="cs-steps">
          {p.approach.map((step, i) => (
            <li key={step.title} data-reveal data-reveal-delay={i * 0.1}>
              <span className="cs-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="cs-section wrap">
        <div className="cs-split cs-split--head">
          <p className="eyebrow">The solution</p>
          <SplitReveal as="h2" className="cs-h2">
            Key <em>moments</em>
          </SplitReveal>
        </div>
        <div className="cs-hls">
          {p.highlights.map((h, i) => (
            <div className="cs-hl" key={h.title} style={{ top: `calc(var(--nav-h) + ${i * 28}px)` }}>
              <div className="cs-hl-inner">
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

      <section className="cs-section wrap">
        <div className="cs-split cs-split--head">
          <p className="eyebrow">Impact</p>
          <SplitReveal as="h2" className="cs-h2">
            The <em>results</em>
          </SplitReveal>
        </div>
        <dl className="cs-results">
          {p.results.map((r, i) => (
            <div key={r.label} data-reveal data-reveal-delay={i * 0.1}>
              <dd>
                <Counter value={r.value} suffix={r.suffix} decimals={r.decimals} />
              </dd>
              <dt>{r.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="cs-section wrap cs-split">
        <p className="eyebrow">What I learned</p>
        <ScrollHighlight className="cs-lead">{p.learnings}</ScrollHighlight>
      </section>

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
          <p className="cs-next-meta">
            {next.category} — {next.year}
          </p>
        </div>
        <div className="cs-next-cover">
          <ProjectCover project={next} ratio="16 / 9" className="cover--wide" />
        </div>
      </TLink>
    </article>
  )
}
