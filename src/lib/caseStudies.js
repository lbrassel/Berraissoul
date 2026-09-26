import { SUPABASE_KEY, SUPABASE_URL, TABLE } from './supabase'

export const KINDS = ['mobile', 'dashboard', 'commerce', 'system', 'abstract']
export const DEFAULT_COLORS = { bg: '#3a2dff', bg2: '#8b6bff', ui: '#ffffff', accent: '#c9ff4a', ink: '#15123a' }

const list = (value) => (Array.isArray(value) ? value : [])
const text = (value) => value ?? ''

// Database row → the shape the site's components use.
export function toProject(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: text(row.title),
    tagline: text(row.tagline),
    category: text(row.category),
    year: text(row.year),
    role: text(row.role),
    timeline: text(row.timeline),
    team: text(row.team),
    platform: text(row.platform),
    kind: KINDS.includes(row.kind) ? row.kind : 'mobile',
    colors: { ...DEFAULT_COLORS, ...(row.colors || {}) },
    image: row.cover_url || null,
    overview: text(row.overview),
    challenge: text(row.challenge),
    quote: text(row.quote),
    approach: list(row.approach),
    highlights: list(row.highlights),
    results: list(row.results),
    gallery: list(row.gallery),
    learnings: text(row.learnings),
    published: Boolean(row.published),
    position: row.position ?? 0,
  }
}

// Site-shaped project (e.g. a sample from content.js) → database row.
export function toRow(p) {
  return {
    slug: p.slug,
    title: p.title,
    tagline: text(p.tagline),
    category: text(p.category),
    year: text(p.year),
    role: text(p.role),
    timeline: text(p.timeline),
    team: text(p.team),
    platform: text(p.platform),
    kind: p.kind || 'mobile',
    colors: { ...DEFAULT_COLORS, ...(p.colors || {}) },
    cover_url: p.image || null,
    overview: text(p.overview),
    challenge: text(p.challenge),
    quote: text(p.quote),
    approach: list(p.approach),
    highlights: list(p.highlights),
    results: list(p.results),
    gallery: list(p.gallery),
    learnings: text(p.learnings),
    published: Boolean(p.published),
    position: p.position ?? 0,
  }
}

// Public read through the REST API — no client library needed on the site.
export async function fetchPublishedCaseStudies() {
  const url = `${SUPABASE_URL}/rest/v1/${TABLE}?select=*&published=eq.true&order=position.asc,created_at.asc`
  const res = await fetch(url, { headers: { apikey: SUPABASE_KEY } })
  if (!res.ok) throw new Error(`Supabase responded ${res.status}`)
  return (await res.json()).map(toProject)
}
