import { experience, site } from '../content'
import Marquee from './Marquee'
import SplitReveal from './SplitReveal'
import './experience.css'

export default function Experience() {
  return (
    <section className="section experience" aria-labelledby="xp-title">
      <div className="wrap">
        <header className="section-head">
          <SplitReveal as="h2" className="h-section" id="xp-title">
            Experience
          </SplitReveal>
          <p className="section-lede" data-reveal>
            Where I’ve been learning, shipping and growing.
          </p>
        </header>

        <ol className="xp-list">
          {experience.map((job) => (
            <li className="xp-row" key={job.years + job.role} data-reveal>
              <span className="xp-years">{job.years}</span>
              <span className="xp-role">{job.role}</span>
              <span className="xp-company">{job.company}</span>
              <span className="xp-place">{job.place}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="xp-marquee" aria-label="Skills">
        <Marquee items={site.skills} outline reverse speed={0.5} />
      </div>
    </section>
  )
}
