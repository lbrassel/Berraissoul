import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { finePointer, reducedMotion } from '../lib/motion'
import { archive } from '../content'
import { useReadyGSAP } from './Transition'
import ProjectCover from './ProjectCover'
import SplitReveal from './SplitReveal'
import './archive.css'

// A list of smaller projects. On desktop, a preview card follows the pointer,
// tilting with its speed, and slides between covers as you move across rows.
export default function Archive() {
  const root = useRef(null)
  const preview = useRef(null)
  const [active, setActive] = useState(0)

  useReadyGSAP((_, contextSafe) => {
    if (!reducedMotion()) {
      gsap.from('.ar-row', {
        yPercent: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: '.ar-list', start: 'top 85%', once: true },
      })
    }
    if (!finePointer() || reducedMotion()) return

    const el = preview.current
    const list = root.current.querySelector('.ar-list')
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' })
    const rTo = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3' })
    let lastX = 0

    const move = contextSafe((e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.6))
      lastX = e.clientX
    })
    const enter = contextSafe((e) => {
      gsap.set(el, { x: e.clientX, y: e.clientY })
      lastX = e.clientX
      gsap.to(el, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'expo.out', overwrite: 'auto' })
    })
    const leave = contextSafe(() => {
      gsap.to(el, { scale: 0, autoAlpha: 0, duration: 0.4, ease: 'power3.in', overwrite: 'auto' })
      rTo(0)
    })

    list.addEventListener('pointermove', move)
    list.addEventListener('pointerenter', enter)
    list.addEventListener('pointerleave', leave)
    return () => {
      list.removeEventListener('pointermove', move)
      list.removeEventListener('pointerenter', enter)
      list.removeEventListener('pointerleave', leave)
    }
  }, root)

  return (
    <section className="section archive" aria-labelledby="archive-title" ref={root}>
      <div className="wrap">
        <header className="section-head">
          <SplitReveal as="h2" className="h-section" id="archive-title">
            More <em>explorations</em>
          </SplitReveal>
          <p className="section-lede" data-reveal>
            Concepts, side projects and playgrounds where I try new ideas.
          </p>
        </header>

        <ul className="ar-list">
          {archive.map((item, i) => {
            const Tag = item.href ? 'a' : 'div'
            const linkProps = item.href ? { href: item.href, target: '_blank', rel: 'noreferrer' } : {}
            return (
              <li key={item.title} onPointerEnter={() => setActive(i)}>
                <Tag className="ar-row" data-cursor="hide" {...linkProps}>
                  <span className="ar-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ar-title">{item.title}</span>
                  <span className="ar-type">{item.type}</span>
                  <span className="ar-year">{item.year}</span>
                </Tag>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="ar-preview" ref={preview} aria-hidden="true">
        <div className="ar-reel" style={{ translate: `0 ${(active * -100) / archive.length}%` }}>
          {archive.map((item) => (
            <ProjectCover project={item} key={item.title} ratio="4 / 3" />
          ))}
        </div>
      </div>
    </section>
  )
}
