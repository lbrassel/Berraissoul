import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/motion'

// An interactive grid of dots: they ripple gently on their own and get pushed
// away from — and lit up by — the pointer.
const GAP = 28
const RADIUS = 170
const PUSH = 34

export default function DotField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const still = reducedMotion()
    let width = 0
    let height = 0
    let dots = []
    let colors = { dot: '#888', accent: '#f60' }
    let raf = 0
    let running = false
    let time = 0
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 }

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      colors = { dot: cs.getPropertyValue('--dot').trim(), accent: cs.getPropertyValue('--accent').trim() }
    }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cols = Math.ceil(width / GAP) + 1
      const rows = Math.ceil(height / GAP) + 1
      const ox = (width - (cols - 1) * GAP) / 2
      const oy = (height - (rows - 1) * GAP) / 2
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = ox + c * GAP
          const hy = oy + r * GAP
          dots.push({ hx, hy, x: hx, y: hy, heat: 0 })
        }
      }
    }

    const draw = () => {
      time += 0.016
      pointer.x += (pointer.tx - pointer.x) * 0.18
      pointer.y += (pointer.ty - pointer.y) * 0.18
      ctx.clearRect(0, 0, width, height)

      const hot = []
      ctx.fillStyle = colors.dot
      ctx.beginPath()
      for (const d of dots) {
        const dx = d.hx - pointer.x
        const dy = d.hy - pointer.y
        const dist = Math.hypot(dx, dy) || 1
        let tx = d.hx
        let ty = d.hy
        let heat = 0
        if (dist < RADIUS) {
          const f = 1 - dist / RADIUS
          heat = f * f
          tx += (dx / dist) * heat * PUSH
          ty += (dy / dist) * heat * PUSH
        }
        const wave = still ? 0 : Math.sin(d.hx * 0.011 + time * 1.3) * Math.cos(d.hy * 0.013 + time)
        ty += wave * 3
        d.x += (tx - d.x) * 0.14
        d.y += (ty - d.y) * 0.14
        d.heat += (heat - d.heat) * 0.12
        const r = 1 + (wave + 1) * 0.3
        ctx.moveTo(d.x + r, d.y)
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        if (d.heat > 0.02) hot.push(d)
      }
      ctx.fill()

      ctx.fillStyle = colors.accent
      for (const d of hot) {
        ctx.globalAlpha = Math.min(1, d.heat * 1.6)
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.2 + d.heat * 2.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (running) raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
      if (pointer.x < -1e3) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
      }
    }
    const onLeave = () => {
      pointer.tx = -1e4
      pointer.ty = -1e4
    }
    const onTheme = () => readColors()

    readColors()
    build()
    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    io.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('themechange', onTheme)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('themechange', onTheme)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
