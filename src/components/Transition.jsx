import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { frames, reducedMotion } from '../lib/motion'
import { getLenis, scrollToTarget } from '../lib/scroll'
import './transition.css'

const Ctx = createContext(null)

export const usePageTransition = () => useContext(Ctx)
export const useReady = () => useContext(Ctx).ready

// Runs a GSAP setup only once the page is visible (after the preloader or a page
// transition), and reverts it whenever the page gets covered again.
export function useReadyGSAP(setup, scope, deps = []) {
  const ready = useReady()
  return useGSAP(
    (context, contextSafe) => {
      if (!ready) return
      return setup(context, contextSafe)
    },
    { scope, dependencies: [ready, ...deps], revertOnUpdate: true },
  )
}

const HIDDEN_BOTTOM = 'ellipse(150% 0% at 50% 100%)'
const FULL_BOTTOM = 'ellipse(150% 125% at 50% 100%)'
const FULL_TOP = 'ellipse(150% 125% at 50% 0%)'
const HIDDEN_TOP = 'ellipse(150% 0% at 50% 0%)'

export function TransitionProvider({ children }) {
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const overlay = useRef(null)
  const label = useRef(null)
  const busy = useRef(false)

  // React Router navigates inside startTransition, so a new page can take a few
  // frames to commit. `commit(check)` resolves after the first commit where
  // `check({ pathname, ready })` holds — by then every child effect has run.
  const waiting = useRef([])
  const commit = useCallback((check) => new Promise((resolve) => waiting.current.push({ check, resolve })), [])
  useEffect(() => {
    waiting.current = waiting.current.filter(({ check, resolve }) => {
      if (!check({ pathname, ready })) return true
      resolve()
      return false
    })
  })

  const { contextSafe } = useGSAP({ scope: overlay })

  const cover = contextSafe(
    (text) =>
      new Promise((resolve) => {
        const panels = overlay.current.querySelectorAll('.pt-panel')
        label.current.textContent = text
        gsap
          .timeline({ onComplete: resolve })
          .set(overlay.current, { visibility: 'visible' })
          .fromTo(panels, { clipPath: HIDDEN_BOTTOM }, { clipPath: FULL_BOTTOM, duration: 0.9, ease: 'power4.inOut', stagger: 0.1 })
          .fromTo(label.current, { yPercent: 120 }, { yPercent: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      }),
  )

  const uncover = contextSafe(
    () =>
      new Promise((resolve) => {
        const panels = [...overlay.current.querySelectorAll('.pt-panel')].reverse()
        gsap
          .timeline({
            onComplete: () => {
              gsap.set(overlay.current, { visibility: 'hidden' })
              resolve()
            },
          })
          .to(label.current, { yPercent: -120, duration: 0.45, ease: 'power3.in' })
          .fromTo(panels, { clipPath: FULL_TOP }, { clipPath: HIDDEN_TOP, duration: 0.9, ease: 'power4.inOut', stagger: 0.1 }, '-=0.1')
      }),
  )

  const go = useCallback(
    async (to, text = '') => {
      if (busy.current) return
      const url = new URL(to, window.location.href)

      // Same page: just glide to the anchor (or the top).
      if (url.pathname === window.location.pathname) {
        scrollToTarget(url.hash || 0)
        return
      }

      busy.current = true
      const animate = !reducedMotion()
      if (animate) await cover(text)

      setReady(false)
      navigate(url.pathname + url.hash)
      await commit((s) => s.pathname === url.pathname && !s.ready)
      window.scrollTo(0, 0)
      getLenis()?.scrollTo(0, { immediate: true, force: true })

      setReady(true)
      await commit((s) => s.pathname === url.pathname && s.ready)
      await frames(1)
      ScrollTrigger.refresh()
      if (url.hash) scrollToTarget(url.hash, { immediate: true, force: true })

      if (animate) await uncover()
      busy.current = false
    },
    [navigate, commit, cover, uncover],
  )

  const value = useMemo(() => ({ ready, setReady, go }), [ready, go])

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="pt" ref={overlay} aria-hidden="true">
        <div className="pt-panel pt-panel--accent" />
        <div className="pt-panel pt-panel--ink">
          <span className="pt-label-mask">
            <span className="pt-label" ref={label} />
          </span>
        </div>
      </div>
    </Ctx.Provider>
  )
}

// A link that plays the page transition. Falls back to normal browser behaviour
// for new-tab clicks (cmd/ctrl/shift/middle click).
export function TLink({ to, label = '', children, onClick, ...rest }) {
  const { go } = usePageTransition()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    if (to.startsWith('#')) scrollToTarget(to)
    else go(to, label)
  }
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
