import { useState } from 'react'
import { flushSync } from 'react-dom'
import { reducedMotion } from '../lib/motion'

const current = () => document.documentElement.dataset.theme || 'dark'

// Switches theme with a circular reveal that grows from the click point
// (View Transitions API), falling back to an instant swap.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(current)

  const toggle = (e) => {
    const next = current() === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage unavailable */
      }
      flushSync(() => setTheme(next))
      window.dispatchEvent(new Event('themechange'))
    }

    if (!document.startViewTransition || reducedMotion()) return apply()

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX || rect.left + rect.width / 2
    const y = e.clientY || rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const transition = document.startViewTransition(apply)
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 800, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      data-theme-state={theme}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path className="theme-toggle-half" d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      </svg>
    </button>
  )
}
