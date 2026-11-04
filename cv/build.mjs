// Renders cv/cv.html to public/Taha-Berraissoul-CV.pdf with Playwright's Chromium.
// Run with `npm run cv` (Playwright must be installed: `npm i -D playwright && npx playwright install chromium`).
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

// require() also finds a globally installed Playwright (via NODE_PATH).
const { chromium } = createRequire(import.meta.url)('playwright')

const here = path.dirname(fileURLToPath(import.meta.url))
const source = pathToFileURL(path.join(here, 'cv.html')).href
const output = path.join(here, '..', 'public', 'Taha-Berraissoul-CV.pdf')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(source, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.pdf({ path: output, format: 'A4', preferCSSPageSize: true, printBackground: true })
await browser.close()
console.log(`Saved ${path.relative(process.cwd(), output)}`)
