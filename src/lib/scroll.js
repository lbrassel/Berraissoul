// Lenis lives outside React so any component can reach it without re-rendering.
let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export const getLenis = () => lenis

export function scrollToTarget(target, { immediate = false, force = false, offset = 0 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (typeof target === 'string' && !el) return
  if (lenis) {
    lenis.scrollTo(el ?? target, { immediate, force, offset, duration: 1.6 })
    return
  }
  const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
}
