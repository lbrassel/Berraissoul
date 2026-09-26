import { useEffect } from 'react'
import { site } from '../content'
import { TLink } from '../components/Transition'
import SplitReveal from '../components/SplitReveal'
import './case.css'

export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found — ${site.name}`
  }, [])

  return (
    <section className="wrap not-found">
      <p className="eyebrow">Error 404</p>
      <SplitReveal as="h1" type="chars" immediate className="h-section">
        Lost in <em>space</em>
      </SplitReveal>
      <p>This page doesn’t exist — but plenty of good work does.</p>
      <TLink to="/" label="Home" className="btn btn--accent">
        Back home <span className="arrow">→</span>
      </TLink>
    </section>
  )
}
