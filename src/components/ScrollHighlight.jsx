import { useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { useReadyGSAP } from './Transition'

// A paragraph whose words light up one by one as you scroll through it.
export default function ScrollHighlight({ as: Tag = 'p', className, children }) {
  const ref = useRef(null)

  useReadyGSAP(() => {
    if (reducedMotion()) return
    SplitText.create(ref.current, {
      type: 'words',
      wordsClass: 'hw',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 55%', scrub: true },
          },
        ),
    })
  }, ref)

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
