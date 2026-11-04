import { useRef } from 'react'
import usePointerDrift from './usePointerDrift'
import './ugc-cover.css'

// The UGC University cover: a lesson from the course player, with the pieces that keep a
// creator coming back floating off it: an approved video, the daily streak and the level
// track. Every layer drifts with the pointer at its own depth (--d); on hover the lesson
// settles flat, the module bar and the level track fill, and the streak days tick in.

const IMG = '/work/ugc-university'

// ── Icons ────────────────────────────────────────────────────────────────────

const Check = () => (
  <svg viewBox="0 0 24 24" className="uw-ico" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

const Flame = () => (
  <svg viewBox="0 0 24 24" className="uw-ico" aria-hidden="true">
    <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.8 3-5.7 3.6-9.3 2 1.1 3.2 3 3.4 5 1-.6 1.7-1.6 1.9-2.8 2.1 1.7 3.6 4.2 3.6 7.1 0 3.6-2.6 6.2-6 6.2Z" />
    <path d="M12 21c-1.5 0-2.6-1.1-2.6-2.6 0-1.7 1.4-2.4 2.1-3.9 1.6.9 3 2.1 3 3.9 0 1.5-1 2.6-2.5 2.6Z" />
  </svg>
)

const Snow = () => (
  <svg viewBox="0 0 24 24" className="uw-ico" aria-hidden="true">
    <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
  </svg>
)

const Play = () => (
  <svg viewBox="0 0 24 24" className="uw-ico uw-fill" aria-hidden="true">
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
  </svg>
)

// ── Lesson ───────────────────────────────────────────────────────────────────

const MODULES = 14
const DONE = 4

function Lesson() {
  return (
    <div className="ug-lesson">
      <div className="ug-card">
        <div className="ug-head">
          <span className="ug-chip">Fitness</span>
          <b>Parts of a Video Overview</b>
        </div>
        <div className="ug-video">
          <img src={`${IMG}/cover-lesson.webp`} alt="" />
          <span className="ug-play">
            <Play />
          </span>
          <div className="ug-bar">
            <span>3:38 / 5:32</span>
            <i />
          </div>
        </div>
        <div className="ug-foot">
          <img src={`${IMG}/cover-coach.webp`} alt="" className="ug-face" />
          <span className="ug-coach">
            <b>Steve Aliance</b>
            <small>Coach</small>
          </span>
          <span className="ug-mods">
            {Array.from({ length: MODULES }, (_, i) => (
              <i key={i} className={i < DONE ? 'is-done' : ''} style={{ '--i': i }} />
            ))}
          </span>
          <span className="ug-pct">28%</span>
        </div>
      </div>
    </div>
  )
}

// ── Widgets ──────────────────────────────────────────────────────────────────

function Approved() {
  return (
    <div className="uw uw-toast ug-toast">
      <span className="uw-tile">
        <Check />
      </span>
      <span>
        <b>First video approved</b>
        <small>Unboxing Hook · Coach review</small>
      </span>
      <span className="uw-xp">+75 XP</span>
    </div>
  )
}

// M T W T F S S: four days done, a streak freeze on Wednesday, today still open.
const week = [
  ['M', 'done'],
  ['T', 'done'],
  ['W', 'freeze'],
  ['T', 'done'],
  ['F', 'today'],
  ['S', ''],
  ['S', ''],
]

function Streak() {
  return (
    <div className="uw uw-streak ug-streak">
      <p className="uw-row">
        <span>Streak</span>
        <span className="uw-best">Best 30</span>
      </p>
      <p className="uw-count">
        <span className="uw-flame">
          <Flame />
        </span>
        <span>
          <b>12</b>
          <small>Day streak</small>
        </span>
      </p>
      <ol className="uw-week">
        {week.map(([day, state], i) => (
          <li key={i} className={state && `is-${state}`} style={{ '--i': i }}>
            <span>{state === 'done' ? <Check /> : state === 'freeze' ? <Snow /> : null}</span>
            {day}
          </li>
        ))}
      </ol>
    </div>
  )
}

const levels = ['Newbie', 'Creator', 'Rising star', 'Content pro', 'Viral machine', 'Legend']

function Level() {
  return (
    <div className="uw uw-level ug-level">
      <p className="uw-row">
        <img src={`${IMG}/cover-avatar.webp`} alt="" className="uw-avatar" />
        <span className="uw-lv">Level 3 · Rising star</span>
      </p>
      <p className="uw-xp-line">
        <b>540 XP</b> · 460 XP to Content pro
      </p>
      <div className="uw-track">
        <i className="uw-fill-line" />
        {levels.map((name, i) => (
          <span key={name} className={i <= 2 ? 'is-on' : ''} title={name} />
        ))}
      </div>
    </div>
  )
}

export default function UgcCover() {
  const root = useRef(null)
  usePointerDrift(root)

  return (
    <div className="ug" ref={root}>
      <Lesson />
      <Approved />
      <Streak />
      <Level />
    </div>
  )
}
