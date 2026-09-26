import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // React + GSAP (with ScrollTrigger, SplitText, Draggable) make one ~170 kB gzip bundle.
    chunkSizeWarningLimit: 700,
  },
})
