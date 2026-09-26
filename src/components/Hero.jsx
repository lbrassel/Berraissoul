import { useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { site } from '../content'
import { TLink, useReadyGSAP } from './Transition'
import DotField from './DotField'
import LocalTime from './LocalTime'
import Magnetic from './Magnetic'
import './hero.css'

export default function Hero() {
  const root = useRef(null)

  useReadyGSAP(() => {
    const reduce = reducedMotion()
    const words = gsap.utils.toArray('.hero-word')
    const slot = root.current.querySelector('.hero-rotator')
    const setSlot = (el) => gsap.set(slot, { width: el.offsetWidth })
    setSlot(words[0])

    if (reduce) {
      gsap.set(words.slice(1), { yPercent: 110 })
      return
    }

    // Intro
    const split = SplitText.create('.hero-line-text', {
      type: 'words,chars',
      mask: 'words',
      wordsClass: 'sw',
      charsClass: 'sc',
    })
    gsap.set(words.slice(1), { yPercent: 110 })
    gsap
      .timeline({ delay: 0.15 })
      .from(split.chars, { yPercent: 120, rotate: 8, duration: 1.3, ease: 'expo.out', stagger: 0.022 })
      .from(words[0], { yPercent: 120, rotate: 8, duration: 1.3, ease: 'expo.out' }, 0.45)
      .from('.hero-canvas', { opacity: 0, duration: 2, ease: 'power2.out' }, 0)
      .from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08 }, 0.6)

    // Rotating word: slide the current word out and the next one in, while
    // the slot eases to the new word's width.
    let index = 0
    const rotate = gsap.timeline({ repeat: -1, delay: 2.4, onRepeat: () => rotate.invalidate() })
    words.forEach((word, i) => {
      const next = words[(i + 1) % words.length]
      rotate
        .to(word, { yPercent: -110, duration: 0.8, ease: 'power4.inOut' }, '+=1.8')
        .set(next, { yPercent: 110 }, '<')
        .to(next, { yPercent: 0, duration: 0.8, ease: 'power4.inOut' }, '<')
        .to(slot, { width: () => next.offsetWidth, duration: 0.8, ease: 'power4.inOut' }, '<')
        .call(() => (index = (i + 1) % words.length))
    })

    const onResize = () => setSlot(words[index])
    window.addEventListener('resize', onResize)

    // Parallax out as you scroll past.
    gsap.to('.hero-content', {
      yPercent: -18,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to('.hero-canvas', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    })

    return () => window.removeEventListener('resize', onResize)
  }, root)

  return (
    <section className="hero" ref={root} aria-label="Introduction">
      <DotField className="hero-canvas" />

      <div className="hero-content wrap">
        <div className="hero-top">
          <p className="eyebrow" data-hero-fade>
            {site.role} — Portfolio ’{String(new Date().getFullYear()).slice(2)}
          </p>
          <p className="eyebrow hero-status" data-hero-fade>
            <span className="status-dot" /> {site.availability}
          </p>
        </div>

        <h1 className="hero-title">
          <span className="hero-line">
            <span className="hero-line-text">{site.heroLead[0]}</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-text">{site.heroLead[1]}</span>{' '}
            <span className="hero-rotator">
              {site.heroWords.map((w, i) => (
                <em className="hero-word" key={w} aria-hidden={i > 0 ? true : undefined}>
                  {w}
                </em>
              ))}
            </span>
          </span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-intro" data-hero-fade>
            {site.intro}
          </p>
          <div className="hero-cta" data-hero-fade>
            <Magnetic>
              <TLink to="#work" className="btn btn--accent">
                See my work <span className="arrow">↓</span>
              </TLink>
            </Magnetic>
          </div>
          <div className="hero-meta" data-hero-fade>
            <span className="eyebrow">Based in {site.location}</span>
            <LocalTime timeZone={site.timezone} />
          </div>
        </div>
      </div>
    </section>
  )
}
