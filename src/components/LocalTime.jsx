import { useEffect, useState } from 'react'

export default function LocalTime({ timeZone }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).formatToParts(now)
  const get = (type) => parts.find((p) => p.type === type)?.value
  const zone = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'short' })
    .formatToParts(now)
    .find((p) => p.type === 'timeZoneName')?.value

  return (
    <time className="local-time" dateTime={now.toISOString()}>
      {get('hour')}
      <span className="local-time-colon">:</span>
      {get('minute')} <span className="local-time-zone">{zone}</span>
    </time>
  )
}
