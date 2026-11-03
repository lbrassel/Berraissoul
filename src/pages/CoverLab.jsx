import { useEffect } from 'react'
import { projects } from '../content'
import ProjectCover from '../components/ProjectCover'
import NotFound from './NotFound'
import './lab.css'

// Temporary page for choosing the Euka cover: each layout in the 5:4 work card and the
// 16:9 case-study frame, side by side. Remove it (and its route) once one is picked.

const layouts = [
  ['a', 'Live activity', 'The sign-in panel brought to life: a live feed of creators, a sale landing, and today’s GMV and orders.'],
  ['b', 'Dashboard + widgets', 'The product at a glance: the dashboard, with today’s GMV, orders and a new sale floating off it.'],
  ['c', 'Creator → brand', 'The journey the product runs: a creator, an invite, a sample, a video, then the brand’s sale.'],
  ['d', 'Widget stack', 'The most minimal: three widgets fanned out like a hand of cards, with a sale on top.'],
]

export default function CoverLab() {
  const euka = projects.find((p) => p.slug === 'euka')

  useEffect(() => {
    document.title = 'Euka — cover proposals'
  }, [])

  if (!euka) return <NotFound />

  return (
    <div className="lab wrap">
      <p className="eyebrow">Euka · cover proposals</p>
      <h1 className="lab-title">
        Pick a <em>cover</em>
      </h1>
      <p className="lab-intro">
        Four layouts built from the Euka widgets. Move your pointer over each one: the layers drift, and on hover the
        numbers redraw. Left is the work-grid card, right is the case-study header.
      </p>

      {layouts.map(([id, name, text]) => {
        const project = { ...euka, coverVariant: id }
        return (
          <section className="lab-item" key={id} aria-labelledby={`lab-${id}`}>
            <header>
              <span className="lab-id">{id.toUpperCase()}</span>
              <h2 id={`lab-${id}`}>{name}</h2>
              <p>{text}</p>
            </header>
            <div className="lab-frames">
              <div className="cover-host">
                <ProjectCover project={project} />
              </div>
              <div className="cover-host">
                <ProjectCover project={project} ratio="16 / 9" className="cover--wide" />
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
