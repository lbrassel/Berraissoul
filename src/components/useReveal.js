import { gsap } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { useReadyGSAP } from './Transition'

// Fades up every [data-reveal] element inside `scope` as it enters the viewport.
// Optional: data-reveal-delay="0.2"
export default function useReveal(scope) {
  useReadyGSAP(() => {
    if (reducedMotion()) return
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 48,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        delay: parseFloat(el.dataset.revealDelay || 0),
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    })
  }, scope)
}
