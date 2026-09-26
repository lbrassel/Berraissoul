import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { site } from '../content'
import ThemeToggle from '../components/ThemeToggle'
import { explain, supabase } from './client'
import Dashboard from './Dashboard'
import Editor from './Editor'
import './admin.css'

export default function AdminApp() {
  useEffect(() => {
    document.title = `Admin — ${site.name}`
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)
    return () => robots.remove()
  }, [])

  return <div className="admin">{supabase ? <Gate /> : <Setup />}</div>
}

function TopBar({ email, onSignOut }) {
  return (
    <header className="a-top">
      <Link to="/admin" className="a-brand">
        {site.name}
        <sup>©</sup> <span>Admin</span>
      </Link>
      <div className="a-top-actions">
        {email && <span className="a-muted a-hide-sm">{email}</span>}
        <a className="a-link" href="/" target="_blank" rel="noreferrer">
          View site ↗
        </a>
        <ThemeToggle />
        {onSignOut && (
          <button type="button" className="a-btn a-btn--small" onClick={onSignOut}>
            Sign out
          </button>
        )}
      </div>
    </header>
  )
}

// Signed out → login. Signed in but not an admin → how to fix it. Admin → the editor.
function Gate() {
  const [session, setSession] = useState(undefined)
  const [access, setAccess] = useState({ state: 'checking' })

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  const userId = session?.user?.id
  const check = useCallback(async () => {
    setAccess({ state: 'checking' })
    const { data, error } = await supabase.rpc('is_admin')
    if (error) setAccess({ state: 'error', message: explain(error) })
    else setAccess({ state: data ? 'admin' : 'denied' })
  }, [])

  useEffect(() => {
    if (userId) check()
  }, [userId, check])

  const signOut = () => supabase.auth.signOut()

  if (session === undefined) return null
  if (!session) {
    return (
      <>
        <TopBar />
        <Login />
      </>
    )
  }

  const email = session.user.email
  return (
    <>
      <TopBar email={email} onSignOut={signOut} />
      {access.state === 'checking' && <p className="a-page a-muted">Checking your access…</p>}
      {access.state === 'error' && (
        <div className="a-page a-narrow">
          <h1 className="a-title">Something’s not set up</h1>
          <p className="a-error">{access.message}</p>
          <button type="button" className="a-btn" onClick={check}>
            Check again
          </button>
        </div>
      )}
      {access.state === 'denied' && <Denied email={email} onRetry={check} />}
      {access.state === 'admin' && (
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/new" element={<Editor />} />
          <Route path="/admin/edit/:id" element={<EditRoute />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      )}
    </>
  )
}

function EditRoute() {
  const { id } = useParams()
  return <Editor key={id} id={id} />
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) setError(/invalid/i.test(error.message) ? 'That email and password don’t match an account.' : explain(error))
  }

  return (
    <main className="a-page a-login">
      <form className="a-card a-login-card" onSubmit={submit}>
        <h1 className="a-title">Sign in</h1>
        <p className="a-muted">Manage the case studies on your portfolio.</p>
        <div className="a-field">
          <label htmlFor="login-email">Email</label>
          <input id="login-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="a-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="a-error">{error}</p>}
        <button type="submit" className="a-btn a-btn--primary" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}

function Denied({ email, onRetry }) {
  const sql = `insert into public.admins (user_id)\nselect id from auth.users where email = '${email}';`
  const [copied, setCopied] = useState(false)
  const copy = () =>
    navigator.clipboard
      ?.writeText(sql)
      .then(() => setCopied(true))
      .catch(() => {})

  return (
    <main className="a-page a-narrow">
      <h1 className="a-title">This account can’t edit yet</h1>
      <p>
        You’re signed in as <strong>{email}</strong>. To let it add and edit case studies, run this in Supabase → SQL Editor:
      </p>
      <pre className="a-code">{sql}</pre>
      <div className="a-row">
        <button type="button" className="a-btn" onClick={copy}>
          {copied ? 'Copied' : 'Copy SQL'}
        </button>
        <button type="button" className="a-btn a-btn--primary" onClick={onRetry}>
          Check again
        </button>
      </div>
    </main>
  )
}

function Setup() {
  return (
    <>
      <TopBar />
      <main className="a-page a-narrow">
        <h1 className="a-title">Connect Supabase</h1>
        <p>The admin needs your Supabase project. Add these two environment variables, then redeploy:</p>
        <pre className="a-code">{`VITE_SUPABASE_URL=https://<your-project>.supabase.co\nVITE_SUPABASE_PUBLISHABLE_KEY=<publishable or anon key>`}</pre>
        <p className="a-muted">
          On Vercel: Project → Settings → Environment Variables. Locally: a <code>.env</code> file in the project folder. Both values are in Supabase →
          Project Settings → API Keys.
        </p>
      </main>
    </>
  )
}
