import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TABLE } from '../lib/supabase'
import { DEFAULT_COLORS, KINDS, toProject } from '../lib/caseStudies'
import ProjectCover from '../components/ProjectCover'
import { explain, supabase, uploadImage } from './client'
import { Field, ImageField, ItemControls, moveItem, Repeater } from './fields'

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const blank = () => ({
  title: '',
  slug: '',
  tagline: '',
  category: '',
  year: String(new Date().getFullYear()),
  role: '',
  timeline: '',
  team: '',
  platform: '',
  kind: 'mobile',
  colors: { ...DEFAULT_COLORS },
  cover_url: null,
  overview: '',
  challenge: '',
  quote: '',
  approach: [],
  highlights: [],
  results: [],
  gallery: [],
  learnings: '',
  published: false,
})

const KIND_LABELS = {
  mobile: 'Phones',
  dashboard: 'Dashboard',
  commerce: 'Shop',
  system: 'Components',
  abstract: 'Abstract',
}

const COLOR_LABELS = { bg: 'Background', bg2: 'Gradient', ui: 'Screens', accent: 'Accent', ink: 'Text' }

// Only the columns the table has, with numbers stored as numbers.
function toPayload(row) {
  const payload = { ...blank(), ...row }
  delete payload.id
  delete payload.created_at
  delete payload.updated_at
  payload.title = payload.title.trim()
  payload.results = payload.results.map((r) => {
    const value = String(r.value ?? '').trim()
    return { ...r, value: Number(value) || 0, decimals: (value.split('.')[1] || '').length }
  })
  return payload
}

export default function Editor({ id }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [row, setRow] = useState(id ? null : blank)
  const [loadError, setLoadError] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(() => location.state?.saved ?? { kind: 'idle', text: '' })
  const [dirty, setDirty] = useState(false)
  const slugTouched = useRef(Boolean(id))

  useEffect(() => {
    if (!id) return
    supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => (error ? setLoadError(explain(error)) : setRow(data)))
  }, [id])

  useEffect(() => {
    if (!dirty) return
    const warn = (e) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  if (loadError) {
    return (
      <main className="a-page a-narrow">
        <p className="a-error">{loadError}</p>
        <Link to="/admin" className="a-btn">
          Back to case studies
        </Link>
      </main>
    )
  }
  if (!row) return <p className="a-page a-muted">Loading…</p>

  const set = (key, value) => {
    setRow((r) => ({ ...r, [key]: value }))
    setDirty(true)
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const setTitle = (title) => {
    set('title', title)
    if (!slugTouched.current) set('slug', slugify(title))
  }

  const folder = row.slug || 'drafts'
  const bind = (key) => ({ value: row[key] ?? '', onChange: (e) => set(key, e.target.value) })

  const save = async (e) => {
    e?.preventDefault()
    const next = {}
    if (!row.title.trim()) next.title = 'Add a title.'
    if (!SLUG.test(row.slug)) next.slug = 'Use lowercase letters, numbers and dashes, like “my-project”.'
    setErrors(next)
    if (Object.keys(next).length) {
      setStatus({ kind: 'error', text: 'Fix the highlighted fields, then save again.' })
      return
    }

    setStatus({ kind: 'saving', text: 'Saving…' })
    const payload = toPayload(row)
    let result
    if (id) {
      result = await supabase.from(TABLE).update(payload).eq('id', id).select().single()
    } else {
      const { data: last } = await supabase.from(TABLE).select('position').order('position', { ascending: false }).limit(1)
      payload.position = (last?.[0]?.position ?? -1) + 1
      result = await supabase.from(TABLE).insert(payload).select().single()
    }

    if (result.error) {
      const text = explain(result.error)
      if (result.error.code === '23505') setErrors({ slug: text })
      setStatus({ kind: 'error', text })
      return
    }
    const saved = { kind: 'saved', text: row.published ? 'Saved. Live on the site.' : 'Saved as a draft.' }
    setRow(result.data)
    setDirty(false)
    setStatus(saved)
    if (!id) navigate(`/admin/edit/${result.data.id}`, { replace: true, state: { saved } })
  }

  const leave = (e) => {
    if (dirty && !window.confirm('Leave without saving your changes?')) e.preventDefault()
  }

  return (
    <form className="a-page a-editor" onSubmit={save} noValidate>
      <header className="a-page-head">
        <div>
          <Link to="/admin" className="a-link" onClick={leave}>
            ← All case studies
          </Link>
          <h1 className="a-title">{row.title.trim() || (id ? 'Untitled case study' : 'New case study')}</h1>
        </div>
      </header>

      <div className="a-editor-grid">
        <div className="a-editor-main">
          <section className="a-card">
            <header className="a-card-head">
              <h2>Basics</h2>
            </header>
            <Field id="f-title" label="Title" value={row.title} onChange={(e) => setTitle(e.target.value)} error={errors.title} required />
            <Field
              id="f-slug"
              label="URL name"
              value={row.slug}
              onChange={(e) => {
                slugTouched.current = true
                set('slug', e.target.value.toLowerCase())
              }}
              hint={`The page address: /work/${row.slug || 'your-project'}`}
              error={errors.slug}
              required
            />
            <Field id="f-tagline" label="Tagline" hint="One short line under the title." {...bind('tagline')} />
            <div className="a-grid-2">
              <Field id="f-category" label="Category" placeholder="Mobile App · Fintech" {...bind('category')} />
              <Field id="f-year" label="Year" {...bind('year')} />
            </div>
          </section>

          <section className="a-card">
            <header className="a-card-head">
              <h2>Project details</h2>
              <p className="a-hint">Shown under the title. Leave any of them empty to hide it.</p>
            </header>
            <div className="a-grid-2">
              <Field id="f-role" label="Your role" placeholder="Lead Product Designer" {...bind('role')} />
              <Field id="f-timeline" label="Timeline" placeholder="5 months" {...bind('timeline')} />
              <Field id="f-team" label="Team" placeholder="1 PM · 4 Engineers" {...bind('team')} />
              <Field id="f-platform" label="Platform" placeholder="iOS & Android" {...bind('platform')} />
            </div>
          </section>

          <section className="a-card">
            <header className="a-card-head">
              <h2>Cover</h2>
              <p className="a-hint">Upload a cover image, or leave it empty to use a drawn illustration in your colours.</p>
            </header>
            <ImageField id="f-cover" label="Cover image" value={row.cover_url} onChange={(url) => set('cover_url', url)} folder={folder} />
            <div className="a-field">
              <span className="a-label">Illustration</span>
              <div className="a-segments" role="radiogroup" aria-label="Illustration">
                {KINDS.map((kind) => (
                  <label key={kind} className={`a-segment ${row.kind === kind ? 'is-on' : ''}`}>
                    <input type="radio" name="kind" value={kind} checked={row.kind === kind} onChange={() => set('kind', kind)} />
                    {KIND_LABELS[kind]}
                  </label>
                ))}
              </div>
            </div>
            <div className="a-field">
              <span className="a-label">Colours</span>
              <div className="a-colors">
                {Object.keys(COLOR_LABELS).map((key) => (
                  <label key={key} className="a-color" htmlFor={`f-color-${key}`}>
                    <input
                      id={`f-color-${key}`}
                      type="color"
                      value={row.colors?.[key] ?? DEFAULT_COLORS[key]}
                      onChange={(e) => set('colors', { ...DEFAULT_COLORS, ...row.colors, [key]: e.target.value })}
                    />
                    <span>{COLOR_LABELS[key]}</span>
                  </label>
                ))}
              </div>
              <p className="a-hint">The colours also tint the “Key moments” cards on the case study page.</p>
            </div>
          </section>

          <section className="a-card">
            <header className="a-card-head">
              <h2>Story</h2>
            </header>
            <Field id="f-overview" label="Overview" multiline rows={5} hint="What the product is and what you did." {...bind('overview')} />
            <Field id="f-challenge" label="The challenge" multiline rows={4} {...bind('challenge')} />
            <Field
              id="f-quote"
              label="Key question"
              hint="Shown as a big quote, e.g. “How might we…?”"
              multiline
              rows={2}
              {...bind('quote')}
            />
            <Field id="f-learnings" label="What I learned" multiline rows={4} {...bind('learnings')} />
          </section>

          <Repeater
            name="approach"
            title="Approach"
            hint="The steps of your process, in order."
            items={row.approach}
            onChange={(items) => set('approach', items)}
            make={() => ({ title: '', text: '' })}
            addLabel="Add step"
          >
            {(item, update, key) => (
              <>
                <Field id={`${key}-title`} label="Step" value={item.title} onChange={(e) => update({ title: e.target.value })} />
                <Field id={`${key}-text`} label="What happened" multiline rows={3} value={item.text} onChange={(e) => update({ text: e.target.value })} />
              </>
            )}
          </Repeater>

          <Repeater
            name="highlights"
            title="Key moments"
            hint="The features or decisions you’re proudest of. Each gets its own card."
            items={row.highlights}
            onChange={(items) => set('highlights', items)}
            make={() => ({ title: '', text: '', image: null })}
            addLabel="Add moment"
          >
            {(item, update, key) => (
              <>
                <Field id={`${key}-title`} label="Title" value={item.title} onChange={(e) => update({ title: e.target.value })} />
                <Field id={`${key}-text`} label="Description" multiline rows={3} value={item.text} onChange={(e) => update({ text: e.target.value })} />
                <ImageField id={`${key}-image`} label="Image (optional)" value={item.image} onChange={(image) => update({ image })} folder={folder} />
              </>
            )}
          </Repeater>

          <Gallery items={row.gallery} onChange={(items) => set('gallery', items)} folder={folder} />

          <Repeater
            name="results"
            title="Results"
            hint="Numbers count up on the page. Use the suffix for %, x or +."
            items={row.results}
            onChange={(items) => set('results', items)}
            make={() => ({ value: '', suffix: '%', label: '' })}
            addLabel="Add result"
          >
            {(item, update, key) => (
              <div className="a-grid-3">
                <Field
                  id={`${key}-value`}
                  label="Number"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  value={item.value}
                  onChange={(e) => update({ value: e.target.value })}
                />
                <Field id={`${key}-suffix`} label="Suffix" value={item.suffix ?? ''} onChange={(e) => update({ suffix: e.target.value })} />
                <Field id={`${key}-label`} label="Label" value={item.label} onChange={(e) => update({ label: e.target.value })} />
              </div>
            )}
          </Repeater>
        </div>

        <aside className="a-editor-side">
          <div className="a-card a-sticky">
            <div className="a-preview cover-host">
              <ProjectCover project={toProject({ ...row, slug: row.slug || 'preview' })} ratio="5 / 4" />
            </div>
            <label className="a-switch" htmlFor="f-published">
              <input id="f-published" type="checkbox" checked={row.published} onChange={(e) => set('published', e.target.checked)} />
              <span>
                <strong>{row.published ? 'Published' : 'Draft'}</strong>
                <span className="a-hint">{row.published ? 'Visible on the site after you save.' : 'Only you can see it.'}</span>
              </span>
            </label>
            <button type="submit" className="a-btn a-btn--primary a-btn--block" disabled={status.kind === 'saving'}>
              {status.kind === 'saving' ? 'Saving…' : 'Save'}
            </button>
            <p className={`a-status is-${dirty && status.kind !== 'error' ? 'dirty' : status.kind}`} role="status">
              {dirty && status.kind !== 'error' ? 'Unsaved changes' : status.text}
            </p>
            {id && row.published && !dirty && (
              <a className="a-link" href={`/work/${row.slug}`} target="_blank" rel="noreferrer">
                View on the site ↗
              </a>
            )}
          </div>
        </aside>
      </div>
    </form>
  )
}

// Screens: upload several images at once, then caption and reorder them.
function Gallery({ items, onChange, folder }) {
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')

  const add = async (e) => {
    const files = [...(e.target.files || [])]
    e.target.value = ''
    if (!files.length) return
    setError('')
    let next = items
    for (const [i, file] of files.entries()) {
      setBusy(`Uploading ${i + 1} of ${files.length}…`)
      try {
        next = [...next, { url: await uploadImage(file, folder), caption: '' }]
        onChange(next)
      } catch (err) {
        setError(`${file.name}: ${err.message}`)
      }
    }
    setBusy('')
  }

  return (
    <section className="a-card">
      <header className="a-card-head">
        <h2>Screens</h2>
        <p className="a-hint">Your screenshots and mockups. Every third one spans the full width, starting with the first.</p>
      </header>
      {items.length > 0 && (
        <ol className="a-shots">
          {items.map((shot, i) => (
            <li className="a-shot" key={shot.url + i}>
              <img src={shot.url} alt="" />
              <div className="a-shot-body">
                <Field
                  id={`gallery-${i}-caption`}
                  label="Caption (optional)"
                  value={shot.caption ?? ''}
                  onChange={(e) => onChange(items.map((s, j) => (j === i ? { ...s, caption: e.target.value } : s)))}
                />
                <ItemControls
                  index={i}
                  count={items.length}
                  onMove={(index, delta) => onChange(moveItem(items, index, delta))}
                  onRemove={(index) => onChange(items.filter((_, j) => j !== index))}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
      <label className={`a-btn ${busy ? 'is-busy' : ''}`} htmlFor="f-gallery">
        {busy || '+ Add screens'}
        <input id="f-gallery" className="a-file" type="file" accept="image/*" multiple onChange={add} disabled={Boolean(busy)} />
      </label>
      {error && <p className="a-error">{error}</p>}
    </section>
  )
}
