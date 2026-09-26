import { createContext, useContext, useEffect, useState } from 'react'
import { hasSupabase } from '../lib/supabase'
import { fetchPublishedCaseStudies } from '../lib/caseStudies'
import { projects as samples } from '../content'

// Case studies come from Supabase. Until any are published — or if Supabase
// isn't configured — the sample projects in content.js are shown instead.
let request = null
export function loadProjects() {
  if (!request) {
    request = hasSupabase
      ? fetchPublishedCaseStudies()
          .then((list) => (list.length ? list : samples))
          .catch((error) => {
            console.warn('Could not load case studies, showing samples instead.', error)
            return samples
          })
      : Promise.resolve(samples)
  }
  return request
}

const Ctx = createContext({ projects: samples, loading: false })
export const useProjects = () => useContext(Ctx)

export function ProjectsProvider({ children }) {
  const [state, setState] = useState(() => ({ projects: hasSupabase ? [] : samples, loading: hasSupabase }))

  useEffect(() => {
    let live = true
    loadProjects().then((projects) => live && setState({ projects, loading: false }))
    return () => {
      live = false
    }
  }, [])

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}
