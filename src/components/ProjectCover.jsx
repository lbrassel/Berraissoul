import './cover.css'

// Illustrated project covers drawn with HTML/CSS so the portfolio looks finished
// before real screenshots exist. Everything scales with the cover's width (cqw).
// Set `image` on a project in content.js to use a real picture instead.

const bars = [42, 64, 38, 80, 56, 92, 70, 48]
const line = 'M0 70 C 40 60, 60 20, 100 34 S 170 70, 210 40 S 280 10, 320 22'

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

const kinds = { mobile: Mobile, dashboard: Dashboard, commerce: Commerce, system: System, abstract: Abstract }

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
