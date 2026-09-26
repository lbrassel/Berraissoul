// Supabase settings come from environment variables (set them in Vercel).
// Either the new publishable key or the legacy anon key works.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY
export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY)

export const TABLE = 'case_studies'
export const BUCKET = 'case-studies'
