import { useEffect, useRef } from 'react'
import { finePointer, reducedMotion } from '../lib/motion'
import './cover.css'

// Illustrated project covers drawn with HTML/CSS so the portfolio looks finished
// before real screenshots exist. Everything scales with the cover's width (cqw).
// Set `image` on a project in content.js to use a real picture instead.

const bars = [42, 64, 38, 80, 56, 92, 70, 48]
const line = 'M0 70 C 40 60, 60 20, 100 34 S 170 70, 210 40 S 280 10, 320 22'
const trend = 'M0 68 C 12 64, 18 28, 30 36 S 50 74, 62 48 S 86 14, 100 22'
const kpis = [
  ['GMV', '$130K'],
  ['Orders', '5.3K'],
  ['Videos', '2.6K'],
]

function Phone({ className = '', children }) {
  return (
    <div className={`cv-phone ${className}`}>
      <div className="cv-notch" />
      {children}
    </div>
  )
}

function Row({ accent }) {
  return (
    <div className="cv-row">
      <span className={`cv-avatar ${accent ? 'is-accent' : ''}`} />
      <span className="cv-lines">
        <i style={{ width: '70%' }} />
        <i style={{ width: '40%' }} />
      </span>
      <span className="cv-amount" />
    </div>
  )
}

function Mobile({ project }) {
  return (
    <>
      <Phone className="cv-phone--back">
        <div className="cv-card" />
        <Row accent />
        <Row />
        <Row />
        <div className="cv-pills">
          <span className="is-accent" />
          <span />
        </div>
      </Phone>
      <Phone className="cv-phone--front">
        <p className="cv-label">This week</p>
        <p className="cv-big">
          $2,480<small>.00</small>
        </p>
        <div className="cv-bars">
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={i === 5 ? 'is-accent' : ''} />
          ))}
        </div>
        <Row accent />
        <Row />
        <div className="cv-tabbar">
          <span className="is-accent" />
          <span />
          <span />
          <span />
        </div>
      </Phone>
      <span className="cv-chip cv-chip--float">+ {project.title} Pro</span>
    </>
  )
}

function Dashboard() {
  return (
    <div className="cv-window">
      <div className="cv-window-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="cv-window-body">
        <aside className="cv-side">
          <span className="cv-logo" />
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} className={i === 1 ? 'is-active' : ''} />
          ))}
        </aside>
        <div className="cv-main">
          <div className="cv-kpis">
            {['12.4k', '98.2%', '3.1h'].map((v, i) => (
              <div className="cv-kpi" key={v}>
                <i />
                <b>{v}</b>
                <span className={i === 1 ? 'is-down' : ''}>{i === 1 ? '−0.4%' : '+12%'}</span>
              </div>
            ))}
          </div>
          <div className="cv-panels">
            <div className="cv-chart">
              <svg viewBox="0 0 320 90" preserveAspectRatio="none">
                <path d={`${line} L320 90 L0 90 Z`} className="cv-area" />
                <path d={line} className="cv-line" />
              </svg>
            </div>
            <div className="cv-donut">
              <span />
            </div>
          </div>
          <div className="cv-table">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <i />
                <i />
                <i />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Commerce({ project }) {
  return (
    <>
      <div className="cv-product cv-product--a">
        <div className="cv-product-img cv-zellige" />
        <i />
        <b>$84</b>
      </div>
      <Phone className="cv-phone--center">
        <div className="cv-hero-img cv-zellige" />
        <p className="cv-label">{project.category || project.type}</p>
        <p className="cv-title">{project.title}</p>
        <div className="cv-maker">
          <span className="cv-avatar is-accent" />
          <span className="cv-lines">
            <i style={{ width: '60%' }} />
            <i style={{ width: '35%' }} />
          </span>
        </div>
        <div className="cv-cta">Add to bag</div>
      </Phone>
      <div className="cv-product cv-product--b">
        <div className="cv-product-img cv-product-img--alt" />
        <i />
        <b>$36</b>
      </div>
      <span className="cv-chip cv-chip--bag">✓ Added to bag</span>
    </>
  )
}

function System() {
  return (
    <div className="cv-board">
      <div className="cv-tile cv-tile--type">
        <span>Aa</span>
        <small>Display / 64</small>
      </div>
      <div className="cv-tile cv-tile--buttons">
        <span className="cv-btn is-primary">Continue</span>
        <span className="cv-btn">Cancel</span>
      </div>
      <div className="cv-tile cv-tile--swatches">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ '--s': i }} />
        ))}
      </div>
      <div className="cv-tile cv-tile--controls">
        <span className="cv-toggle" />
        <span className="cv-check" />
        <span className="cv-radio" />
      </div>
      <div className="cv-tile cv-tile--input">
        <small>Email</small>
        <span className="cv-input" />
        <span className="cv-slider">
          <i />
        </span>
      </div>
      <div className="cv-tile cv-tile--avatars">
        <span />
        <span />
        <span />
        <b>+12</b>
      </div>
    </div>
  )
}

// A dashboard of widgets with a creator and a brand either side of it, linked by a sale.
// The layers drift with the pointer, each at its own depth.
function Creators() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    const host = el?.closest('.cover')
    if (!host || reducedMotion() || !finePointer()) return

    const aim = (x, y) => {
      el.style.setProperty('--px', x.toFixed(3))
      el.style.setProperty('--py', y.toFixed(3))
    }
    const move = (e) => {
      const r = host.getBoundingClientRect()
      aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const leave = () => aim(0, 0)

    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    return () => {
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="cv-eu" ref={root}>
      <div className="cv-eu-dash">
        <div className="cv-eu-win">
          <aside className="cv-eu-side">
            <span className="cv-eu-mark" />
            {[0, 1, 2, 3].map((i) => (
              <i key={i} className={i === 0 ? 'is-active' : ''} />
            ))}
          </aside>
          <div className="cv-eu-main">
            <div className="cv-eu-kpis">
              {kpis.map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </div>
              ))}
            </div>
            <div className="cv-eu-panels">
              <div className="cv-eu-chart">
                <svg viewBox="0 0 100 90" aria-hidden="true">
                  <path d={`${trend} L100 90 L0 90 Z`} className="cv-eu-area" />
                  <path d={trend} pathLength="1" className="cv-eu-trend" />
                </svg>
              </div>
              <div className="cv-eu-funnel">
                <small>Funnel</small>
                {[100, 72, 46, 28].map((w, i) => (
                  <i key={i} style={{ '--w': `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg className="cv-eu-link" viewBox="0 0 100 80" aria-hidden="true">
        <path d="M22 54 C 44 62, 46 18, 78 15" />
      </svg>

      <div className="cv-eu-creator">
        <div className="cv-eu-w">
          <p className="cv-eu-tag">Creator</p>
          <div className="cv-eu-who">
            <span className="cv-avatar is-accent" />
            <span className="cv-lines">
              <i style={{ width: '70%' }} />
              <i style={{ width: '40%' }} />
            </span>
            <span className="cv-eu-level">L6</span>
          </div>
        </div>
      </div>

      <div className="cv-eu-brand">
        <div className="cv-eu-w">
          <p className="cv-eu-tag">Brand</p>
          <div className="cv-eu-who">
            <span className="cv-eu-logo" />
            <span className="cv-lines">
              <i style={{ width: '70%' }} />
              <i style={{ width: '40%' }} />
            </span>
          </div>
        </div>
      </div>

      <div className="cv-eu-chip">
        <span className="cv-eu-chip-in">
          <b />
          New order · +$48
        </span>
      </div>
    </div>
  )
}

function Abstract({ project }) {
  return (
    <>
      <span className="cv-blob cv-blob--a" />
      <span className="cv-blob cv-blob--b" />
      <span className="cv-ring" />
      <p className="cv-word">{project.title}</p>
    </>
  )
}

const kinds = { mobile: Mobile, dashboard: Dashboard, commerce: Commerce, system: System, creators: Creators, abstract: Abstract }

export default function ProjectCover({ project, className = '', ratio }) {
  const { colors } = project
  const Art = kinds[project.kind] || Abstract
  const style = {
    '--c-bg': colors.bg,
    '--c-bg2': colors.bg2,
    '--c-ui': colors.ui,
    '--c-accent': colors.accent,
    '--c-ink': colors.ink,
    ...(ratio ? { aspectRatio: ratio } : null),
  }

  return (
    <div className={`cover cover--${project.kind} ${className}`} style={style}>
      <div className="cover-art">
        {project.image ? (
          <img src={project.image} alt="" className="cover-img" loading="lazy" />
        ) : (
          <div className="cover-stage" aria-hidden="true">
            <Art project={project} />
          </div>
        )}
      </div>
    </div>
  )
}
