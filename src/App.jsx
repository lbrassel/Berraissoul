import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ScrollTrigger } from './lib/gsap'
import { scrollToTarget } from './lib/scroll'
import { TransitionProvider, useReady } from './components/Transition'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'

// Handles scroll position for browser back/forward and deep links like /#contact.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const ready = useReady()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) return
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  useEffect(() => {
    if (!ready || !first.current) return
    first.current = false
    if (!hash) return
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      scrollToTarget(hash, { immediate: true })
    })
    return () => cancelAnimationFrame(id)
  }, [ready, hash])

  return null
}

export default function App() {
  return (
    <TransitionProvider>
      <SmoothScroll />
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </TransitionProvider>
  )
}
