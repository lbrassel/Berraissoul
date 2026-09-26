import { useRef } from 'react'
import { Draggable, gsap } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { site } from '../content'
import { useReadyGSAP } from './Transition'
import Counter from './Counter'
import ScrollHighlight from './ScrollHighlight'
import SplitReveal from './SplitReveal'
import './about.css'

function Portrait() {
  return (
    <div className="portrait" data-portrait>
      {site.portrait ? (
        <img src={site.portrait} alt={`Portrait of ${site.name}`} />
      ) : (
        <div className="portrait-art" aria-hidden="true">
          <span className="portrait-orb" />
          <span className="portrait-initial">{site.name[0]}</span>
        </div>
      )}
      <p className="portrait-caption">
        <span>{site.name}</span>
        <span>{site.role}</span>
      </p>
    </div>
  )
}

function Toolbox() {
  const root = useRef(null)
  const reset = useRef(null)

  useReadyGSAP((_, contextSafe) => {
    const chips = gsap.utils.toArray('.tool')
    const reduce = reducedMotion()
    if (!reduce) {
      gsap.from(chips, {
        y: -260,
        opacity: 0,
        rotation: () => gsap.utils.random(-40, 40),
        duration: 1.3,
        ease: 'bounce.out',
        stagger: { each: 0.05, from: 'random' },
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      })
    }
    const draggables = Draggable.create(chips, {
      bounds: root.current.querySelector('.tools-area'),
      inertia: !reduce,
      edgeResistance: 0.7,
      onPress() {
        gsap.to(this.target, { scale: 1.1, duration: 0.25 })
        this.target.style.zIndex = 10
      },
      onRelease() {
        gsap.to(this.target, { scale: 1, duration: 0.4, ease: 'back.out(3)' })
        this.target.style.zIndex = ''
      },
    })
    reset.current = contextSafe(() =>
      gsap.to(chips, { x: 0, y: 0, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)', stagger: 0.02 }),
    )
    return () => draggables.forEach((d) => d.kill())
  }, root)

  return (
    <div className="toolbox" ref={root}>
      <div className="toolbox-head">
        <p className="eyebrow">Toolbox — go on, drag them around</p>
        <button type="button" className="toolbox-reset" onClick={() => reset.current?.()}>
          Tidy up ↺
        </button>
      </div>
      <div className="tools-area">
        {site.tools.map((tool, i) => (
          <span className={`tool tool--${i % 4}`} key={tool} data-cursor="drag">
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const root = useRef(null)

  useReadyGSAP(() => {
    if (reducedMotion()) return
    gsap.fromTo(
      '[data-portrait]',
      { yPercent: 8, rotation: -4 },
      {
        yPercent: -8,
        rotation: 3,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  }, root)

  return (
    <section className="section about" id="about" aria-labelledby="about-title" ref={root}>
      <div className="wrap">
        <header className="section-head">
          <SplitReveal as="h2" className="h-section" id="about-title">
            About <em>me</em>
          </SplitReveal>
        </header>

        <div className="about-grid">
          <div className="about-aside">
            <Portrait />
          </div>
          <div className="about-body">
            <ScrollHighlight className="about-text">{site.about}</ScrollHighlight>

            <dl className="stats">
              {site.stats.map((s, i) => (
                <div className="stat" key={s.label} data-reveal data-reveal-delay={i * 0.1}>
                  <dt>{s.label}</dt>
                  <dd>
                    <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </dd>
                </div>
              ))}
            </dl>

            <Toolbox />
          </div>
        </div>
      </div>
    </section>
  )
}
