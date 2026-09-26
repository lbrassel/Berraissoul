import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { getLenis } from '../lib/scroll'
import './marquee.css'

// An endless ticker that speeds up with scroll velocity and flips direction
// when you scroll back up.
export default function Marquee({ items, reverse = false, outline = false, speed = 0.6 }) {
  const track = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const el = track.current
    let half = el.scrollWidth / 2
    let x = reverse ? -half : 0
    let direction = 1
    let skew = 0
    let visible = true
    const skewTo = gsap.quickSetter(el, 'skewX', 'deg')

    const tick = (_, delta) => {
      if (!visible) return
      const velocity = getLenis()?.velocity ?? 0
      if (Math.abs(velocity) > 0.5) direction = Math.sign(velocity)
      const boost = Math.min(Math.abs(velocity) * 0.35, 14)
      const step = (speed + boost) * direction * (reverse ? 1 : -1) * (delta / 16.67)
      x += step
      if (x <= -half) x += half
      if (x > 0) x -= half
      skew += (gsap.utils.clamp(-8, 8, velocity * -0.35) - skew) * 0.1
      el.style.translate = `${x}px 0`
      skewTo(skew)
    }

    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2))
    ro.observe(el)
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el.parentElement)
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
      io.disconnect()
    }
  }, [reverse, speed])

  const group = (hidden) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span className="marquee-item" key={item}>
          {item}
          <span className="marquee-star">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${outline ? 'marquee--outline' : ''}`}>
      <div className="marquee-track" ref={track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}
