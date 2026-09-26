import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TABLE } from '../lib/supabase'
import { toProject, toRow } from '../lib/caseStudies'
import { projects as samples } from '../content'
import ProjectCover from '../components/ProjectCover'
import { explain, supabase } from './client'
import { moveItem } from './fields'

const COLUMNS = 'id, slug, title, category, year, kind, colors, cover_url, published, position, updated_at'

const updated = (iso) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))

export default function Dashboard() {
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    const { data, error } = await supabase.from(TABLE).select(COLUMNS).order('position').order('created_at')
    if (error) {
      setError(explain(error))
      setItems([])
      return
    }
    setError('')
    setItems(data.map((row) => ({ ...toProject(row), updatedAt: row.updated_at })))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Runs a change, then reloads the list so it always matches the database.
  const run = async (change) => {
    setBusy(true)
    const { error } = (await change()) ?? {}
    if (error) setError(explain(error))
    await load()
    setBusy(false)
  }

  const togglePublished = (item) => run(() => supabase.from(TABLE).update({ published: !item.published }).eq('id', item.id))

  const move = (index, delta) =>
    run(async () => {
      const order = moveItem(items, index, delta)
      const changes = order
        .map((item, position) => ({ item, position }))
        .filter(({ item, position }) => item.position !== position)
        .map(({ item, position }) => supabase.from(TABLE).update({ position }).eq('id', item.id))
      const results = await Promise.all(changes)
      return results.find((r) => r.error)
    })

  const remove = (item) => {
    if (!window.confirm(`Delete “${item.title}”? This can’t be undone.`)) return
    run(() => supabase.from(TABLE).delete().eq('id', item.id))
  }

  const importSamples = () =>
    run(() => supabase.from(TABLE).insert(samples.map((p, position) => ({ ...toRow(p), position, published: false }))))

  return (
    <main className="a-page">
      <header className="a-page-head">
        <div>
          <h1 className="a-title">Case studies</h1>
          <p className="a-muted">Published case studies appear in the Work section, in this order.</p>
        </div>
        <Link to="/admin/new" className="a-btn a-btn--primary">
          + New case study
        </Link>
      </header>

      {error && <p className="a-error a-banner">{error}</p>}

      {items === null && <p className="a-muted">Loading…</p>}

      {items?.length === 0 && !error && (
        <div className="a-card a-empty">
          <h2>No case studies yet</h2>
          <p className="a-muted">
            Until you publish one, the site shows the four sample projects. Start from scratch, or import the samples as drafts and edit them.
          </p>
          <div className="a-row">
            <Link to="/admin/new" className="a-btn a-btn--primary">
              Add your first case study
            </Link>
            <button type="button" className="a-btn" onClick={importSamples} disabled={busy}>
              Import samples as drafts
            </button>
          </div>
        </div>
      )}

      {items?.length > 0 && (
        <ol className={`a-list ${busy ? 'is-busy' : ''}`}>
          {items.map((item, i) => (
            <li className="a-list-row" key={item.id}>
              <Link to={`/admin/edit/${item.id}`} className="a-thumb cover-host" aria-label={`Edit ${item.title}`}>
                <ProjectCover project={item} ratio="4 / 3" />
              </Link>
              <div className="a-list-main">
                <Link to={`/admin/edit/${item.id}`} className="a-list-title">
                  {item.title}
                </Link>
                <p className="a-muted">
                  {[item.category, item.year].filter(Boolean).join(' · ') || 'No category yet'} · /work/{item.slug}
                </p>
                <p className="a-muted a-small">Updated {updated(item.updatedAt)}</p>
              </div>
              <button
                type="button"
                className={`a-pill ${item.published ? 'is-live' : ''}`}
                onClick={() => togglePublished(item)}
                disabled={busy}
                aria-label={item.published ? `Unpublish ${item.title}` : `Publish ${item.title}`}
              >
                {item.published ? 'Published' : 'Draft'}
              </button>
              <div className="a-list-actions">
                <button type="button" className="a-icon" onClick={() => move(i, -1)} disabled={busy || i === 0} aria-label="Move up">
                  ↑
                </button>
                <button
                  type="button"
                  className="a-icon"
                  onClick={() => move(i, 1)}
                  disabled={busy || i === items.length - 1}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <Link to={`/admin/edit/${item.id}`} className="a-btn a-btn--small">
                  Edit
                </Link>
                <button type="button" className="a-link a-link--danger" onClick={() => remove(item)} disabled={busy}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}
