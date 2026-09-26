import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { getLenis } from '../lib/scroll'
import { site } from '../content'
import { TLink, useReady } from './Transition'
import RollText from './RollText'
import ThemeToggle from './ThemeToggle'
import './nav.css'

const links = [
  { to: '/#work', label: 'Work' },
  { to: '/#about', label: 'About' },
  { to: '#contact', label: 'Contact' },
]

export default function Nav() {
  const bar = useRef(null)
  const menu = useRef(null)
  const [open, setOpen] = useState(false)
  const ready = useReady()
  const location = useLocation()
  const timeline = useRef(null)

  // Slide in once the page is revealed, hide on scroll down, show on scroll up.
  useGSAP(
    () => {
      if (!ready) return
      if (!reducedMotion()) {
        gsap.from('.nav-item', { yPercent: -120, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.2 })
      }
      // Created up front (inside the context) so a page change always resets it.
      const hide = gsap.to(bar.current, { yPercent: -110, duration: 0.6, ease: 'power3.out', paused: true })
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 160) hide.play()
          else hide.reverse()
        },
      })
    },
    { scope: bar, dependencies: [ready], revertOnUpdate: true },
  )

  // Full-screen mobile menu.
  useGSAP(
    () => {
      timeline.current = gsap
        .timeline({ paused: true })
        .set(menu.current, { visibility: 'visible' })
        .fromTo(
          menu.current,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power4.inOut' },
        )
        .from('.menu-link-inner', { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, '-=0.35')
        .from('.menu-foot > *', { opacity: 0, y: 16, duration: 0.5, stagger: 0.05 }, '-=0.6')
    },
    { scope: menu },
  )

  useEffect(() => {
    const tl = timeline.current
    if (!tl) return
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      reducedMotion() ? tl.progress(1) : tl.timeScale(1).play()
    } else {
      lenis?.start()
      reducedMotion() ? tl.progress(0) : tl.timeScale(1.6).reverse()
    }
  }, [open])

  // Close the menu on navigation and on Escape.
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Resume scrolling right away so a same-page anchor link can glide to its target.
  const closeMenu = () => {
    getLenis()?.start()
    setOpen(false)
  }

  return (
    <>
      <header className="nav" ref={bar}>
        <TLink to="/" className="nav-item nav-logo" label={site.name} aria-label={`${site.name} — home`}>
          <RollText>{site.name}</RollText>
          <sup>©</sup>
        </TLink>

        <p className="nav-item nav-role">
          <span className="status-dot" /> {site.availability}
        </p>

        <nav className="nav-item nav-links" aria-label="Primary">
          {links.map((l) => (
            <TLink key={l.to} to={l.to} className="nav-link">
              <RollText>{l.label}</RollText>
            </TLink>
          ))}
        </nav>

        <div className="nav-item nav-actions">
          <ThemeToggle />
          <button
            type="button"
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <RollText>{open ? 'Close' : 'Menu'}</RollText>
          </button>
        </div>
      </header>

      <div className="menu" id="mobile-menu" ref={menu} aria-hidden={!open} inert={!open}>
        <nav className="menu-links" aria-label="Mobile">
          {[{ to: '/', label: 'Home' }, ...links].map((l) => (
            <TLink key={l.to} to={l.to} className="menu-link" onClick={closeMenu}>
              <span className="menu-link-inner">{l.label}</span>
            </TLink>
          ))}
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
