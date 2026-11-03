import { useEffect, useRef } from 'react'
import { finePointer, reducedMotion } from '../lib/motion'
import './euka-cover.css'

// The Euka cover, drawn from the product's own widgets (the "Live activity" panel on its
// sign-in screen). Four layouts are on the table; pick one with `coverVariant` on the
// project: 'a' live activity, 'b' dashboard, 'c' creator → brand, 'd' widget stack.
// Every layer drifts with the pointer at its own depth (--d) and moves on hover.

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

const Sparkle = () => (
  <svg viewBox="0 0 24 24" className="ew-ico" aria-hidden="true">
    <path d="M12 3.5c.7 4.3 2.9 6.6 7.2 7.3-4.3.7-6.5 2.9-7.2 7.2-.7-4.3-2.9-6.5-7.2-7.2 4.3-.7 6.5-3 7.2-7.3Z" />
  </svg>
)

const Up = () => (
  <svg viewBox="0 0 24 24" className="ew-ico" aria-hidden="true">
    <path d="M4 16l5.5-5.5 4 4L20 8M15 8h5v5" />
  </svg>
)

// ── Widgets ──────────────────────────────────────────────────────────────────

const gmvLine = 'M0 27 C 6 24, 10 28, 16 26 S 26 20, 32 23 S 42 26, 48 20 S 58 17, 64 18 S 76 10, 82 10 S 94 7, 100 1'

function Gmv({ className = '' }) {
  return (
    <div className={`ew ew-gmv ${className}`}>
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

function Orders({ className = '' }) {
  return (
    <div className={`ew ew-orders ${className}`}>
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

function Toast({ className = '' }) {
  return (
    <div className={`ew ew-toast ${className}`}>
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

function Joined({ className = '' }) {
  return (
    <div className={`ew ew-joined ${className}`}>
      <span className="ew-face ew-face--4" />
      <span>
        <b>New creator joined</b>
        <small>@momshopapproved · just now</small>
      </span>
    </div>
  )
}

const feed = [
  { who: '@vida.de.izzy', what: 'posted a video for Range Shirt', when: '2m ago', tag: 'Posted', tone: 'info', face: 1 },
  { who: '@garage_jim', what: 'drove a new order', when: '6m ago', face: 2, hl: true },
  { who: 'Outreach agent', what: 'invited 32 creators', when: '24m ago', tag: 'Agent', agent: true },
  { who: '@kheezze', what: 'received their sample', when: '1h ago', tag: 'Delivered', face: 3 },
  { who: '@momshopapproved', what: 'accepted your invite', when: '2h ago', tag: 'Accepted', tone: 'ok', face: 4 },
]

function Feed({ className = '', rows = feed }) {
  return (
    <div className={`ew ew-feed ${className}`}>
      <div className="ew-feed-head">
        <b>Today</b>
        <span className="ew-live">Live</span>
        <span className="ew-feed-total">$4,820 GMV</span>
      </div>
      {rows.map((r) => (
        <div className={`ew-row${r.hl ? ' is-hl' : ''}`} key={r.who}>
          {r.agent ? (
            <span className="ew-face is-agent">
              <Sparkle />
            </span>
          ) : (
            <span className={`ew-face ew-face--${r.face}`} />
          )}
          <span className="ew-row-text">
            <span>
              <b>{r.who}</b> {r.what}
            </span>
            <small>{r.when}</small>
          </span>
          {r.tag && <span className={`ew-tag${r.tone ? ` is-${r.tone}` : ''}`}>{r.tag}</span>}
        </div>
      ))}
    </div>
  )
}

const Arcs = () => (
  <span className="eu-arcs">
    <i />
    <i />
    <i />
  </span>
)

// ── Layouts ──────────────────────────────────────────────────────────────────

// A · The sign-in panel's live activity, as widgets.
function LiveActivity() {
  return (
    <>
      <Arcs />
      <span className="eu-ghost eu-ghost--1" />
      <span className="eu-ghost eu-ghost--2" />
      <Feed className="a-feed" />
      <Joined className="a-joined" />
      <Toast className="a-toast" />
      <Gmv className="a-gmv" />
      <Orders className="a-orders" />
    </>
  )
}

const kpis = [
  ['GMV', '$130K'],
  ['Orders', '5.3K'],
  ['Videos', '2.6K'],
]

// B · The dashboard, with today's numbers and a new sale floating off it.
function Dashboard() {
  return (
    <>
      <div className="b-dash">
        <div className="b-win">
          <aside className="b-side">
            <span className="b-mark" />
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} className={i === 0 ? 'is-active' : ''} />
            ))}
          </aside>
          <div className="b-main">
            <div className="b-head">
              <b>Dashboard</b>
              <span />
              <span className="is-dark" />
            </div>
            <div className="b-kpis">
              {kpis.map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </div>
              ))}
            </div>
            <div className="b-funnel">
              <div>
                <small>Estimated GMV</small>
                <b>$130K</b>
              </div>
              <div className="b-stages">
                {[100, 74, 52, 30].map((w, i) => (
                  <i key={i} style={{ '--w': `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast className="b-toast" />
      <Gmv className="b-gmv" />
      <Orders className="b-orders" />
    </>
  )
}

const journey = [
  ['Invite accepted', 'dark'],
  ['Sample delivered', 'dark'],
  ['Video posted', 'light'],
]

// C · From creator to brand: invite, sample, video, then the sale.
function CreatorToBrand() {
  return (
    <>
      <Arcs />
      <svg className="c-path" viewBox="0 0 100 80" aria-hidden="true">
        <path d="M36 24 C 40 18, 42 16, 46 16 C 52 16, 53 25, 50 27 C 46 30, 42 34, 46 37 C 50 40, 52 44, 54 47 C 57 52, 60 56, 66 58" />
      </svg>

      <div className="ew c-creator">
        <div className="c-who">
          <span className="ew-face ew-face--1" />
          <span>
            <b>@vida.de.izzy</b>
            <small>Creator · L6</small>
          </span>
        </div>
        <span className="ew-tag is-info">Posted</span>
        <div className="c-video">
          <span className="c-play" />
        </div>
      </div>

      {journey.map(([label, tone], i) => (
        <span key={label} className={`ew c-step c-step--${i + 1} is-${tone}`} style={{ '--i': i }}>
          <i />
          {label}
        </span>
      ))}
      <Toast className="c-toast" />

      <div className="ew c-brand">
        <div className="c-who">
          <span className="ew-tile">
            <Bag />
          </span>
          <span>
            <b>Range Shirt</b>
            <small>Brand · TikTok Shop</small>
          </span>
        </div>
        <p className="ew-label">GMV today</p>
        <p className="ew-value">
          $4,820
          <span className="ew-delta">
            <Up /> 24%
          </span>
        </p>
      </div>
    </>
  )
}

// D · The most minimal: three widgets fanned out like a hand of cards.
function WidgetStack() {
  return (
    <>
      <Orders className="d-orders" />
      <Feed className="d-feed" rows={feed.slice(0, 3)} />
      <Gmv className="d-gmv is-ink" />
      <Toast className="d-toast is-light" />
    </>
  )
}

const layouts = { a: LiveActivity, b: Dashboard, c: CreatorToBrand, d: WidgetStack }

export default function EukaCover({ project }) {
  const root = useRef(null)
  const variant = layouts[project?.coverVariant] ? project.coverVariant : 'a'
  const Layout = layouts[variant]

  // Pointer drift: --px/--py run from -1 to 1 across the cover.
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
    <div className={`eu eu-${variant}`} ref={root}>
      <Layout />
    </div>
  )
}
