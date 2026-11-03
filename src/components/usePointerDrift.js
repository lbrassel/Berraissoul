import { useEffect } from 'react'
import { finePointer, reducedMotion } from '../lib/motion'

// Sets --px/--py (each -1 to 1) on the element as the pointer moves over its cover,
// so the layers inside can drift by their own depth. Skipped for touch and reduced motion.
export default function usePointerDrift(ref) {
  useEffect(() => {
    const el = ref.current
    const host = el?.closest('.cover')
    if (!host || reducedMotion() || !finePointer()) return

    const aim = (x, y) => {
      el.style.setProperty('--px', x.toFixed(3))
      el.style.setProperty('--py', y.toFixed(3))
    }
    const move = (e) => {
      const r = host.getBoundingClientRect()
      aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const leave = () => aim(0, 0)

    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    return () => {
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
    }
  }, [ref])
}
