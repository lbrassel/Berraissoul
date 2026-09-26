import { useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { finePointer, reducedMotion } from '../lib/motion'
import { scrollToTarget } from '../lib/scroll'
import { site } from '../content'
import { useReadyGSAP } from './Transition'
import LocalTime from './LocalTime'
import Magnetic from './Magnetic'
import RollText from './RollText'
import './footer.css'

export default function Footer() {
  const root = useRef(null)
  const toast = useRef(null)
  const copy = useRef(null)

  useReadyGSAP((_, contextSafe) => {
    const reduce = reducedMotion()
    const split = SplitText.create('.cta-text', { type: 'chars', charsClass: 'cc' })

    copy.current = contextSafe(() => {
      toast.current.textContent = 'Email copied to clipboard ✓'
      gsap
        .timeline()
        .fromTo(toast.current, { autoAlpha: 0, y: 30, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' })
        .to(toast.current, { autoAlpha: 0, y: -10, duration: 0.4, ease: 'power2.in' }, '+=1.6')
    })

    if (reduce) return

    gsap.from(split.chars, {
      yPercent: 100,
      opacity: 0,
      rotate: 10,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.035,
      scrollTrigger: { trigger: '.cta-text', start: 'top 90%', once: true },
    })
    gsap.from('.footer-inner', {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true },
    })

    if (!finePointer()) return

    // Letters of the big CTA rise toward the pointer like a wave.
    const heading = root.current.querySelector('.cta-link')
    const lifts = split.chars.map((c) => gsap.quickTo(c, 'y', { duration: 0.6, ease: 'power3' }))
    const move = contextSafe((e) => {
      split.chars.forEach((c, i) => {
        const r = c.getBoundingClientRect()
        const d = Math.abs(e.clientX - (r.left + r.width / 2))
        lifts[i](-Math.max(0, 1 - d / 260) * r.height * 0.22)
      })
    })
    const leave = contextSafe(() => lifts.forEach((lift) => lift(0)))
    heading.addEventListener('pointermove', move)
    heading.addEventListener('pointerleave', leave)
    return () => {
      heading.removeEventListener('pointermove', move)
      heading.removeEventListener('pointerleave', leave)
    }
  }, root)

  // Copy the address instead of opening a mail app; fall back to mailto if the
  // clipboard isn't available.
  const copyEmail = (e) => {
    if (!navigator.clipboard) return
    e.preventDefault()
    navigator.clipboard
      .writeText(site.email)
      .then(() => copy.current?.())
      .catch(() => (window.location.href = `mailto:${site.email}`))
  }

  return (
    <footer className="footer" id="contact" ref={root}>
      <div className="footer-inner wrap">
        <p className="eyebrow">Have a project in mind?</p>

        <h2 className="cta">
          <a className="cta-link" href={`mailto:${site.email}`} data-cursor="view" data-cursor-label="Say hello">
            <span className="cta-text">Let’s talk</span>
            <span className="cta-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </h2>

        <div className="footer-actions">
          <Magnetic>
            <a className="btn btn--accent" href={`mailto:${site.email}`} onClick={copyEmail}>
              {site.email} <span className="footer-copy">Copy</span>
            </a>
          </Magnetic>
          <ul className="footer-socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <Magnetic strength={0.25}>
                  <a className="btn" href={s.href} target="_blank" rel="noreferrer">
                    <RollText>{s.label}</RollText>
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <div>
            <p className="eyebrow">Local time</p>
            <LocalTime timeZone={site.timezone} />
          </div>
          <div>
            <p className="eyebrow">Designed &amp; built by</p>
            <p>
              {site.name} © {new Date().getFullYear()}
            </p>
          </div>
          <button type="button" className="to-top" onClick={() => scrollToTarget(0)}>
            <RollText>Back to top</RollText> <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>

      <div className="toast" ref={toast} role="status" />
    </footer>
  )
}
