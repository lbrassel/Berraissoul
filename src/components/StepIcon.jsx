// Line icons for the Approach steps of a case study. Pick one with `icon` on a step;
// steps without one fall back to DEFAULT_STEP_ICONS by position.

const paths = {
  loop: (
    <>
      <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8.5" />
      <path d="M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66L4 15.5" />
      <path d="M4 20v-4.5h4.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-3 7.9-7 9.5-4-1.6-7-5.2-7-9.5V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 21 8l-9 5-9-5 9-5Z" />
      <path d="m3 12.5 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
      <path d="m14 7 3 3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  spark: <path d="M12 3.5c.7 4.3 2.9 6.6 7.2 7.3-4.3.7-6.5 2.9-7.2 7.2-.7-4.3-2.9-6.5-7.2-7.2 4.3-.7 6.5-3 7.2-7.3Z" />,
  chart: (
    <>
      <path d="M3 20h18" />
      <path d="M6 16v-5M11 16V6M16 16v-8M21 16v-3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" />
    </>
  ),
}

// Shown in /admin as the choices for a step's icon.
export const STEP_ICONS = {
  loop: 'Loop',
  shield: 'Trust',
  layers: 'System',
  compass: 'Discover',
  pen: 'Design',
  search: 'Search',
  spark: 'AI',
  chart: 'Data',
  users: 'People',
}

export const DEFAULT_STEP_ICONS = ['compass', 'pen', 'layers']

export default function StepIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] ?? paths.compass}
    </svg>
  )
}
