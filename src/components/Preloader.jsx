import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { reducedMotion, wait } from '../lib/motion'
import { site } from '../content'
import { usePageTransition } from './Transition'
import { loadProjects } from './Projects'
import './preloader.css'

// The curtain's trailing edge: bowed while it travels up, flat once it has left.
const BOWED = 'M0 0H100Q50 20 0 0Z'
const FLAT = 'M0 0H100Q50 0 0 0Z'

const FIRST_HOLD = 1 // seconds on the first greeting before the cycle starts
const STEP = 0.17 // seconds per greeting while cycling
const LAST_HOLD = 0.5 // seconds on the final greeting

export default function Preloader() {
  const { setReady } = usePageTransition()
  const root = useRef(null)
  const [done, setDone] = useState(false)
  const words = site.greetings?.length ? site.greetings : ['Hello']

  useGSAP(
    (context, contextSafe) => {
      const word = root.current.querySelector('.pl-word')
      const dot = root.current.querySelector('.pl-dot')
      const meta = root.current.querySelectorAll('.pl-meta')
      const curve = root.current.querySelector('.pl-curve')
      const path = curve.querySelector('path')
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

      const intro = gsap
        .timeline()
        .from(dot, { scale: 0, duration: 0.7, ease: 'back.out(2.2)' })
        .from(word, { yPercent: 45, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.1)
        .from(meta, { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, 0.2)

      // Flick through the greetings, then rest on the last one.
      let at = FIRST_HOLD
      words.slice(1).forEach((text) => {
        intro.call(() => (word.textContent = text), null, at)
        at += STEP
      })
      intro.to({}, { duration: LAST_HOLD }, at - STEP)

      // The dot keeps breathing if the data takes longer than the greetings.
      const pulse = gsap.to(dot, { scale: 1.35, duration: 0.55, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.8 })

      const exit = contextSafe(() => {
        if (!live) return
        pulse.kill()
        gsap
          .timeline({ onComplete: () => setDone(true) })
          .to([word, dot, meta], { opacity: 0, y: -24, duration: 0.45, ease: 'power2.in', stagger: 0.03 })
          .to(
            root.current,
            { y: () => -(root.current.offsetHeight + curve.getBoundingClientRect().height), duration: 1.15, ease: 'power4.inOut' },
            '-=0.2',
          )
          .to(path, { attr: { d: FLAT }, duration: 1.15, ease: 'power2.out' }, '<')
          .add(() => setReady(true), '-=0.8')
      })

      let pending = 2
      const settle = () => --pending === 0 && exit()
      loaded.then(settle)
      intro.eventCallback('onComplete', settle)
      return () => {
        live = false
        word.textContent = words[0]
      }
    },
    { scope: root },
  )

  if (done) return null

  return (
    <div className="pl" ref={root} aria-hidden="true">
      <p className="pl-meta pl-meta--tl">
        {site.name} — {site.role}
      </p>
      <p className="pl-meta pl-meta--tr">Portfolio ©{new Date().getFullYear()}</p>
      <p className="pl-greeting">
        <span className="pl-dot" />
        <span className="pl-word">{words[0]}</span>
      </p>
      <svg className="pl-curve" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d={BOWED} />
      </svg>
    </div>
  )
}
