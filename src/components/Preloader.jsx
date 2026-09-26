import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { reducedMotion, wait } from '../lib/motion'
import { site } from '../content'
import { usePageTransition } from './Transition'
import { loadProjects } from './Projects'
import './preloader.css'

export default function Preloader() {
  const { setReady } = usePageTransition()
  const root = useRef(null)
  const [done, setDone] = useState(false)

  useGSAP(
    (context, contextSafe) => {
      const chars = root.current.querySelectorAll('.pl-char')
      const count = root.current.querySelector('.pl-count')
      const bar = root.current.querySelector('.pl-bar')
      const meta = root.current.querySelectorAll('.pl-meta')
      const fonts = Promise.race([document.fonts?.ready ?? Promise.resolve(), wait(2500)])
      const data = Promise.race([loadProjects(), wait(6000)])
      const loaded = Promise.all([fonts, data])
      // Ignore late callbacks from a setup that has already been reverted (StrictMode runs it twice).
      let live = true

      if (reducedMotion()) {
        const fade = contextSafe(() =>
          gsap.to(root.current, { autoAlpha: 0, duration: 0.3, onComplete: () => setDone(true) }),
        )
        loaded.then(() => {
          if (!live) return
          setReady(true)
          fade()
        })
        return () => (live = false)
      }

      const counter = { value: 0 }
      const intro = gsap
        .timeline()
        .from(chars, { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.06 })
        .from(meta, { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, 0.2)
        .to(
          counter,
          {
            value: 100,
            duration: 1.9,
            ease: 'power3.inOut',
            onUpdate: () => (count.textContent = String(Math.round(counter.value)).padStart(3, '0')),
          },
          0,
        )
        .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.9, ease: 'power3.inOut' }, 0)

      const exit = contextSafe(() => {
        if (!live) return
        gsap
          .timeline({ onComplete: () => setDone(true) })
          .to(chars, { yPercent: -115, duration: 0.7, ease: 'power3.in', stagger: 0.04 })
          .to([meta, count, bar], { opacity: 0, duration: 0.4 }, '<')
          .fromTo(
            root.current,
            { clipPath: 'ellipse(150% 125% at 50% 0%)' },
            { clipPath: 'ellipse(150% 0% at 50% 0%)', duration: 1.1, ease: 'power4.inOut' },
            '-=0.25',
          )
          .add(() => setReady(true), '-=0.75')
      })

      let pending = 2
      const settle = () => --pending === 0 && exit()
      loaded.then(settle)
      intro.eventCallback('onComplete', settle)
      return () => (live = false)
    },
    { scope: root },
  )

  if (done) return null

  return (
    <div className="pl" ref={root} aria-hidden="true">
      <p className="pl-meta pl-meta--tl">{site.role}</p>
      <p className="pl-meta pl-meta--tr">Portfolio ©{new Date().getFullYear()}</p>
      <div className="pl-name">
        {[...site.name].map((c, i) => (
          <span className="pl-char-mask" key={i}>
            <span className="pl-char">{c}</span>
          </span>
        ))}
      </div>
      <div className="pl-foot">
        <span className="pl-meta">Loading experience</span>
        <span className="pl-count">000</span>
      </div>
      <span className="pl-bar" />
    </div>
  )
}
