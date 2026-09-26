import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { process } from '../content'
import { useReadyGSAP } from './Transition'
import SplitReveal from './SplitReveal'
import './process.css'

// Pinned section: vertical scrolling drives the steps sideways on large screens.
export default function Process() {
  const root = useRef(null)

  useReadyGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = root.current.querySelector('.proc-track')
      const distance = () => track.scrollWidth - window.innerWidth
      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current.querySelector('.proc-pin'),
          pin: true,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.to('.proc-progress span', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current.querySelector('.proc-pin'), start: 'top top', end: () => `+=${distance()}`, scrub: true },
      })
      // Each card animates relative to the horizontal movement.
      gsap.utils.toArray('.proc-card').forEach((card) => {
        gsap.from(card.querySelectorAll('.proc-num, .proc-title, .proc-text, .proc-items li'), {
          y: 60,
          opacity: 0,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left 85%', end: 'left 45%', scrub: true },
        })
      })
    })
    mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.proc-card').forEach((card) => {
        gsap.from(card, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
      })
    })
    return () => mm.revert()
  }, root)

  return (
    <section className="process" aria-labelledby="process-title" ref={root}>
      <div className="proc-pin">
        <div className="proc-track">
          <header className="proc-intro">
            <p className="eyebrow">Process</p>
            <SplitReveal as="h2" className="h-section" id="process-title">
              How I <em>work</em>
            </SplitReveal>
            <p className="proc-lede">
              A flexible, research-led process — adapted to each team, but always anchored in real people and measurable outcomes.
            </p>
          </header>
          {process.map((step, i) => (
            <article className="proc-card" key={step.title}>
              <span className="proc-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="proc-title">{step.title}</h3>
              <p className="proc-text">{step.text}</p>
              <ul className="proc-items">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="proc-progress wrap" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
