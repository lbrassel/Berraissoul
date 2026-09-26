// Text that rolls up letter by letter when its parent link/button is hovered.
export default function RollText({ children }) {
  const text = String(children)
  const chars = [...text].map((c) => (c === ' ' ? ' ' : c))
  const row = (cls) => (
    <span className={`roll-row ${cls}`} aria-hidden="true">
      {chars.map((c, i) => (
        <span key={i} style={{ '--i': i }}>
          {c}
        </span>
      ))}
    </span>
  )
  return (
    <span className="roll">
      <span className="sr-only">{text}</span>
      {row('roll-row--a')}
      {row('roll-row--b')}
    </span>
  )
}
