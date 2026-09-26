import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { getLenis, setLenis } from '../lib/scroll'
import { useReady } from './Transition'

export default function SmoothScroll() {
  const ready = useReady()

  useEffect(() => {
    if (reducedMotion()) return
    const lenis = new Lenis({ lerp: 0.09 })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // Freeze scrolling while the preloader or a page transition covers the screen.
  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return
    if (ready) lenis.start()
    else lenis.stop()
  }, [ready])

  return null
}
