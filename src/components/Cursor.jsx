import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { finePointer, reducedMotion } from '../lib/motion'
import './cursor.css'

// Elements opt into special cursor states with data attributes:
//   data-cursor="view" data-cursor-label="View case"   → big filled bubble with text
//   data-cursor="drag"                                  → "Drag" bubble
//   data-cursor="hide"                                  → hide the custom cursor
// Links and buttons get the "link" state automatically.
const INTERACTIVE = '[data-cursor], a, button, [role="button"], label, summary'

export default function Cursor() {
  const [enabled] = useState(finePointer)
  const root = useRef(null)
  const ring = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const html = document.documentElement
    html.classList.add('has-cursor')
    const lag = reducedMotion() ? 0.01 : 0.5
    const ringX = gsap.quickTo(ring.current, 'x', { duration: lag, ease: 'power3' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: lag, ease: 'power3' })
    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' })
    let state = ''

    const setState = (next, text = '') => {
      if (next === state && label.current.textContent === text) return
      state = next
      root.current.dataset.state = next
      label.current.textContent = text
    }

    const move = (e) => {
      ringX(e.clientX)
      ringY(e.clientY)
      dotX(e.clientX)
      dotY(e.clientY)
      root.current.classList.add('is-visible')
    }

    const over = (e) => {
      const target = e.target.closest?.(INTERACTIVE)
      if (!target) return setState('')
      const kind = target.dataset.cursor || 'link'
      const text = target.dataset.cursorLabel || (kind === 'drag' ? 'Drag' : '')
      setState(kind, text)
    }

    const leave = () => root.current.classList.remove('is-visible')
    const down = () => root.current.classList.add('is-down')
    const up = () => root.current.classList.remove('is-down')

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      html.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor-ring" ref={ring}>
        <div className="cursor-ring-shape">
          <span className="cursor-label" ref={label} />
        </div>
      </div>
      <div className="cursor-dot" ref={dot}>
        <div className="cursor-dot-shape" />
      </div>
    </div>
  )
}
