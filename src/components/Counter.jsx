import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { useReadyGSAP } from './Transition'

// A number that counts up from zero when it scrolls into view.
export default function Counter({ value, decimals = 0, suffix = '', className }) {
  const ref = useRef(null)
  const format = (n) => n.toFixed(decimals)

  useReadyGSAP(() => {
    if (reducedMotion()) return
    const el = ref.current.querySelector('.counter-num')
    const state = { n: 0 }
    el.textContent = format(0)
    gsap.to(state, {
      n: value,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = format(state.n)),
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
    })
    return () => (el.textContent = format(value))
  }, ref)

  return (
    <span ref={ref} className={className}>
      <span className="counter-num">{format(value)}</span>
      {suffix}
    </span>
  )
}
