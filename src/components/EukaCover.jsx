import { useRef } from 'react'
import usePointerDrift from './usePointerDrift'
import './euka-cover.css'

// The Euka cover: the dashboard, with today's widgets from the product's "Live activity"
// panel floating off it (a new sale, GMV today and orders today). Every layer drifts with
// the pointer at its own depth (--d); on hover the widgets spread and the numbers redraw.

// ── Icons ────────────────────────────────────────────────────────────────────

const Bag = () => (
  <svg viewBox="0 0 24 24" className="ew-ico" aria-hidden="true">
    <path d="M5.5 8.5h13l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H8.1a1.5 1.5 0 0 1-1.5-1.3L5.5 8.5Z" />
    <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
  </svg>
)

const Chart = () => (
  <svg viewBox="0 0 24 24" className="ew-ico" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M9 15.5v-3M12 15.5v-6M15 15.5v-4" />
  </svg>
)

const Up = () => (
  <svg viewBox="0 0 24 24" className="ew-ico" aria-hidden="true">
    <path d="M4 16l5.5-5.5 4 4L20 8M15 8h5v5" />
  </svg>
)

// ── Widgets ──────────────────────────────────────────────────────────────────

const gmvLine = 'M0 27 C 6 24, 10 28, 16 26 S 26 20, 32 23 S 42 26, 48 20 S 58 17, 64 18 S 76 10, 82 10 S 94 7, 100 1'

function Gmv() {
  return (
    <div className="ew ew-gmv eu-gmv">
      <p className="ew-label">
        <Chart /> GMV today
      </p>
      <p className="ew-value">
        $4,820
        <span className="ew-delta">
          <Up /> 24%
        </span>
      </p>
      <svg className="ew-area" viewBox="0 0 100 30" aria-hidden="true">
        <path d={`${gmvLine} L100 30 L0 30 Z`} className="ew-area-fill" />
        <path d={gmvLine} pathLength="1" className="ew-area-line" />
      </svg>
    </div>
  )
}

const orderBars = [16, 26, 18, 34, 30, 44, 40, 52, 46, 74]

function Orders() {
  return (
    <div className="ew ew-orders eu-orders">
      <p className="ew-label">
        <Bag /> Orders today
      </p>
      <p className="ew-value">
        96 <span className="ew-up">+18%</span>
      </p>
      <div className="ew-bars">
        {orderBars.map((h, i) => (
          <i key={i} style={{ '--h': `${h}%`, '--i': i }} />
        ))}
      </div>
    </div>
  )
}

function Toast() {
  return (
    <div className="ew ew-toast eu-toast">
      <span className="ew-tile">
        <Bag />
      </span>
      <span>
        <b>New order · +$48</b>
        <small>from @garage_jim’s video</small>
      </span>
    </div>
  )
}

// ── Dashboard ────────────────────────────────────────────────────────────────

const kpis = [
  ['GMV', '$130K'],
  ['Orders', '5.3K'],
  ['Videos', '2.6K'],
]

function Dashboard() {
  return (
    <div className="eu-dash">
      <div className="eu-win">
        <aside className="eu-side">
          <span className="eu-mark" />
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} className={i === 0 ? 'is-active' : ''} />
          ))}
        </aside>
        <div className="eu-main">
          <div className="eu-head">
            <b>Dashboard</b>
            <span />
            <span className="is-dark" />
          </div>
          <div className="eu-kpis">
            {kpis.map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <b>{value}</b>
              </div>
            ))}
          </div>
          <div className="eu-funnel">
            <div>
              <small>Estimated GMV</small>
              <b>$130K</b>
            </div>
            <div className="eu-stages">
              {[100, 74, 52, 30].map((w, i) => (
                <i key={i} style={{ '--w': `${w}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EukaCover() {
  const root = useRef(null)

  usePointerDrift(root)

  return (
    <div className="eu" ref={root}>
      <Dashboard />
      <Toast />
      <Gmv />
      <Orders />
    </div>
  )
}
