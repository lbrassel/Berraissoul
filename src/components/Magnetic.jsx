import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { finePointer, reducedMotion } from '../lib/motion'

// Pulls its child toward the pointer, then springs back on leave.
export default function Magnetic({ children, strength = 0.4, className = '' }) {
  const outer = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return
    const el = outer.current
    const xTo = gsap.quickTo(inner.current, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.35)' })
    const yTo = gsap.quickTo(inner.current, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.35)' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])

  return (
    <span className={`magnetic ${className}`} ref={outer}>
      <span className="magnetic-inner" ref={inner}>
        {children}
      </span>
    </span>
  )
}
