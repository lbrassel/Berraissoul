import { createClient } from '@supabase/supabase-js'
import { BUCKET, hasSupabase, SUPABASE_KEY, SUPABASE_URL } from '../lib/supabase'

export const supabase = hasSupabase ? createClient(SUPABASE_URL, SUPABASE_KEY) : null

const MAX_BYTES = 10 * 1024 * 1024

// Uploads an image to the public bucket and returns its URL.
export async function uploadImage(file, folder = 'drafts') {
  if (!file.type.startsWith('image/')) throw new Error('Choose an image file (PNG, JPG, WebP, GIF or AVIF).')
  if (file.size > MAX_BYTES) throw new Error('Images must be 10 MB or smaller.')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = `${folder}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: '31536000', contentType: file.type })
  if (error) throw new Error(explain(error))
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

// Turns Supabase errors into sentences a person can act on.
export function explain(error) {
  const message = error?.message || String(error)
  if (error?.code === '23505') return 'Another case study already uses this URL name. Choose a different one.'
  if (error?.code === '42501' || /row-level security|violates.*policy|not authorized|unauthorized/i.test(message))
    return 'Your account isn’t allowed to make changes. Add it to the admins table (see the README).'
  if (error?.code === 'PGRST202' || error?.code === '42P01' || /does not exist|schema cache/i.test(message))
    return 'The database isn’t set up yet. Run supabase/schema.sql in the Supabase SQL Editor.'
  if (/bucket not found/i.test(message)) return 'The image bucket is missing. Run supabase/schema.sql in the Supabase SQL Editor.'
  if (/failed to fetch|network/i.test(message)) return 'Couldn’t reach Supabase. Check your connection and try again.'
  return message
}
