import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { finePointer, reducedMotion } from '../lib/motion'
import { projects } from '../content'
import { TLink, useReadyGSAP } from './Transition'
import ProjectCover from './ProjectCover'
import SplitReveal from './SplitReveal'
import './work.css'

function WorkCard({ project, index }) {
  const card = useRef(null)

  useReadyGSAP((_, contextSafe) => {
    const media = card.current.querySelector('.work-media')
    const art = card.current.querySelector('.cover-art')

    if (!reducedMotion()) {
      // Reveal: the frame opens from the bottom while the art settles.
      gsap.fromTo(
        media,
        { clipPath: 'inset(100% 0% 0% 0% round 18px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 18px)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: card.current, start: 'top 85%', once: true },
        },
      )
      gsap.fromTo(
        art,
        { scale: 1.3 },
        { scale: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: card.current, start: 'top 85%', once: true } },
      )
      // Parallax inside the frame.
      gsap.fromTo(
        art,
        { yPercent: -5 },
        { yPercent: 5, ease: 'none', scrollTrigger: { trigger: card.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    }

    if (!finePointer() || reducedMotion()) return

    // 3D tilt + glare that follows the pointer.
    const rx = gsap.quickTo(media, 'rotationX', { duration: 0.8, ease: 'power3' })
    const ry = gsap.quickTo(media, 'rotationY', { duration: 0.8, ease: 'power3' })
    const move = contextSafe((e) => {
      const r = media.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      rx((0.5 - py) * 8)
      ry((px - 0.5) * 10)
      media.style.setProperty('--gx', `${px * 100}%`)
      media.style.setProperty('--gy', `${py * 100}%`)
    })
    const leave = contextSafe(() => {
      rx(0)
      ry(0)
    })
    card.current.addEventListener('pointermove', move)
    card.current.addEventListener('pointerleave', leave)
    return () => {
      card.current?.removeEventListener('pointermove', move)
      card.current?.removeEventListener('pointerleave', leave)
    }
  }, card)

  return (
    <article className={`work-card work-card--${index % 2 ? 'right' : 'left'}`} ref={card}>
      <TLink
        to={`/work/${project.slug}`}
        label={project.title}
        className="work-link cover-host"
        data-cursor="view"
        data-cursor-label="View case"
      >
        <div className="work-media">
          <ProjectCover project={project} />
          <span className="work-glare" />
        </div>
        <div className="work-info">
          <span className="work-index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="work-title">
              {project.title}
              <span className="work-tagline"> — {project.tagline}</span>
            </h3>
            <p className="work-meta">
              {project.category} <span>·</span> {project.year}
            </p>
          </div>
          <span className="work-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </TLink>
    </article>
  )
}

export default function Work() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="section-head">
          <SplitReveal as="h2" className="h-section" id="work-title">
            Selected <em>work</em>
            <span className="count">({String(projects.length).padStart(2, '0')})</span>
          </SplitReveal>
          <p className="section-lede" data-reveal>
            A few products I’ve helped shape — from zero-to-one launches to systems that scale.
          </p>
        </header>

        <div className="work-grid">
          {projects.map((p, i) => (
            <WorkCard project={p} index={i} key={p.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}
