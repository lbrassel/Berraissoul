import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useReadyGSAP } from './Transition'

export default function ScrollProgress() {
  const ref = useRef(null)
  useReadyGSAP(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
  }, ref)
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}
