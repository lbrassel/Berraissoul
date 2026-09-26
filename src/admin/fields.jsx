import { useState } from 'react'
import { uploadImage } from './client'

export function Field({ id, label, hint, error, multiline = false, rows = 4, ...props }) {
  const Control = multiline ? 'textarea' : 'input'
  return (
    <div className={`a-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <Control id={id} rows={multiline ? rows : undefined} aria-invalid={error ? true : undefined} {...props} />
      {error ? <p className="a-error">{error}</p> : hint && <p className="a-hint">{hint}</p>}
    </div>
  )
}

export function ImageField({ id, label, hint, value, onChange, folder }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError('')
    try {
      onChange(await uploadImage(file, folder))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="a-field">
      <span className="a-label">{label}</span>
      <div className="a-image">
        {value ? <img src={value} alt="" /> : <span className="a-image-empty">No image</span>}
      </div>
      <div className="a-row">
        <label className={`a-btn ${busy ? 'is-busy' : ''}`} htmlFor={id}>
          {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          <input id={id} className="a-file" type="file" accept="image/*" onChange={pick} disabled={busy} />
        </label>
        {value && (
          <button type="button" className="a-btn a-btn--ghost" onClick={() => onChange(null)}>
            Remove
          </button>
        )}
      </div>
      {error ? <p className="a-error">{error}</p> : hint && <p className="a-hint">{hint}</p>}
    </div>
  )
}

export function ItemControls({ index, count, onMove, onRemove, removeLabel = 'Remove' }) {
  return (
    <div className="a-item-controls">
      <button type="button" className="a-icon" onClick={() => onMove(index, -1)} disabled={index === 0} aria-label="Move up">
        ↑
      </button>
      <button type="button" className="a-icon" onClick={() => onMove(index, 1)} disabled={index === count - 1} aria-label="Move down">
        ↓
      </button>
      <button type="button" className="a-link a-link--danger" onClick={() => onRemove(index)}>
        {removeLabel}
      </button>
    </div>
  )
}

export const moveItem = (items, index, delta) => {
  const next = [...items]
  const [item] = next.splice(index, 1)
  next.splice(index + delta, 0, item)
  return next
}

// A list of repeated sub-forms (approach steps, key moments, results).
export function Repeater({ name, title, hint, items, onChange, make, addLabel, children }) {
  const update = (i, patch) => onChange(items.map((item, j) => (j === i ? { ...item, ...patch } : item)))
  return (
    <section className="a-card">
      <header className="a-card-head">
        <h2>{title}</h2>
        {hint && <p className="a-hint">{hint}</p>}
      </header>
      {items.length > 0 && (
        <ol className="a-items">
          {items.map((item, i) => (
            <li className="a-item" key={i}>
              <div className="a-item-head">
                <span className="a-item-num">{String(i + 1).padStart(2, '0')}</span>
                <ItemControls
                  index={i}
                  count={items.length}
                  onMove={(index, delta) => onChange(moveItem(items, index, delta))}
                  onRemove={(index) => onChange(items.filter((_, j) => j !== index))}
                />
              </div>
              {children(item, (patch) => update(i, patch), `${name}-${i}`)}
            </li>
          ))}
        </ol>
      )}
      <button type="button" className="a-btn" onClick={() => onChange([...items, make()])}>
        + {addLabel}
      </button>
    </section>
  )
}
