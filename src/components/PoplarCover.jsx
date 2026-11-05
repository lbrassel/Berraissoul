import { useRef } from 'react'
import usePointerDrift from './usePointerDrift'
import './poplar-cover.css'

// The Poplar cover: the "Your Funds" card from the dashboard, with the idle cash Poplar
// found, the finished setup and a completed deposit floating off it, all over the brand's
// dotted poplar tree. Every layer drifts with the pointer at its own depth (--d); on hover
// the funds card settles flat, the balance line redraws and the tree's dots light up.

// ── Icons ────────────────────────────────────────────────────────────────────

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="pp-ico" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const Check = () => (
  <svg viewBox="0 0 24 24" className="pp-ico" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

// ── The poplar tree (the logo mark), dot by dot: [x, y, light?] ─────────────

const DOTS = [
  [30, 2, 1], [14, 14, 1], [44, 14, 1], [30, 22, 1], [14, 28, 1], [44, 28, 0],
  [0, 41, 1], [30, 41, 0], [58, 41, 0], [14, 50, 1], [44, 50, 0], [0, 60, 1],
  [30, 60, 0], [58, 60, 0], [14, 70, 1], [44, 70, 0], [30, 79, 0], [30, 96, 0],
]

function Tree({ className }) {
  return (
    <svg className={className} viewBox="-4 -2 66 102" aria-hidden="true">
      {DOTS.map(([x, y, light], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" className={light ? 'is-light' : ''} style={{ '--i': i }} />
      ))}
    </svg>
  )
}

// ── Your Funds ───────────────────────────────────────────────────────────────

const balance = 'M0 58 L14 40 C 20 30, 24 18, 30 26 S 36 40, 44 36 S 52 30, 56 40 S 62 54, 68 40 S 74 22, 80 30 S 90 44, 96 20 S 104 26, 110 14 S 116 12, 120 2'

function Funds() {
  return (
    <div className="pp-funds">
      <div className="pp-card">
        <div className="pp-head">
          <Tree className="pp-mark" />
          <b>Your Funds</b>
          <span className="pp-toggle">
            <i className="is-on">Balance</i>
            <i>Earnings</i>
          </span>
        </div>
        <div className="pp-nums">
          <p>
            <small>Balance</small>
            <b>$155,780.56</b>
          </p>
          <p>
            <small>Total earnings</small>
            <b className="is-green">$7,780.56</b>
          </p>
        </div>
        <div className="pp-chart">
          <svg viewBox="0 0 120 60" aria-hidden="true">
            <defs>
              <linearGradient id="pp-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#123149" stopOpacity="0.28" />
                <stop offset="1" stopColor="#123149" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${balance} L120 60 L0 60 Z`} fill="url(#pp-fill)" />
            <path d={balance} pathLength="1" className="pp-line" />
          </svg>
          <span className="pp-tip">
            <small>Total balance</small>
            <b>$155,780.56</b>
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Widgets ──────────────────────────────────────────────────────────────────

function IdleCash() {
  return (
    <div className="pw pp-idle">
      <p className="pw-serif">You have idle cash!</p>
      <p className="pp-idle-num">$189,639.75</p>
      <p className="pw-row">
        <small>Found across 2 accounts</small>
        <span className="pp-go">
          <Arrow />
        </span>
      </p>
    </div>
  )
}

const steps = ['Submit documentation', 'Connect bank accounts', 'Deposit and start yielding']

function Setup() {
  return (
    <div className="pw pp-setup">
      <p className="pw-row">
        <b>Poplar setup</b>
        <span className="pp-ring">3/3</span>
      </p>
      <ol>
        {steps.map((s, i) => (
          <li key={s} style={{ '--i': i }}>
            <span>
              <Check />
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  )
}

function Deposit() {
  return (
    <div className="pw pp-toast">
      <span className="pp-in">
        <Arrow />
      </span>
      <span>
        <b>Deposit complete</b>
        <small>Chase Checking ··4567</small>
      </span>
      <span className="pp-amt">+$150,000</span>
    </div>
  )
}

export default function PoplarCover() {
  const root = useRef(null)
  usePointerDrift(root)

  return (
    <div className="pp" ref={root}>
      <Tree className="pp-tree" />
      <Funds />
      <IdleCash />
      <Setup />
      <Deposit />
    </div>
  )
}
