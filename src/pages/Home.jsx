import { useEffect, useRef } from 'react'
import { archive, site } from '../content'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Work from '../components/Work'
import Archive from '../components/Archive'
import About from '../components/About'
import Process from '../components/Process'
import Experience from '../components/Experience'
import useReveal from '../components/useReveal'

export default function Home() {
  const root = useRef(null)
  useReveal(root)

  useEffect(() => {
    document.title = `${site.fullName} — ${site.role}`
  }, [])

  return (
    <div ref={root}>
      <Hero />
      <div className="marquee-band" aria-label="What I do">
        <Marquee items={site.skills} />
      </div>
      <Work />
      {archive.length > 0 && <Archive />}
      <About />
      <Process />
      <Experience />
    </div>
  )
}
