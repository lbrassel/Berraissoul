import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import 'lenis/dist/lenis.css'
import './styles/global.css'
import App from './App'

// `npm run build:preview` makes a self-contained build for hosts that can't
// serve the site's own URLs: routes live in memory and analytics is off.
const preview = import.meta.env.MODE === 'preview'
const Router = preview ? MemoryRouter : BrowserRouter

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
      {!preview && <Analytics />}
    </Router>
  </StrictMode>,
)
