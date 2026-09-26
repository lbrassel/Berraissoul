import { useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { reducedMotion } from '../lib/motion'
import { useReadyGSAP } from './Transition'

// Text that rises out of a mask, line by line (or char by char), when it
// scrolls into view — or immediately with `immediate`.
export default function SplitReveal({
  as: Tag = 'div',
  type = 'lines',
  delay = 0,
  immediate = false,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useReadyGSAP(() => {
    if (reducedMotion()) return
    const chars = type === 'chars'
    SplitText.create(ref.current, {
      type: chars ? 'words,chars' : 'lines',
      mask: chars ? 'words' : 'lines',
      linesClass: 'sl',
      wordsClass: 'sw',
      charsClass: 'sc',
      autoSplit: !chars,
      onSplit: (self) =>
        gsap.from(chars ? self.chars : self.lines, {
          yPercent: 120,
          rotate: chars ? 6 : 2,
          duration: chars ? 1.1 : 1.2,
          ease: 'expo.out',
          stagger: chars ? 0.022 : 0.09,
          delay,
          scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 88%', once: true },
        }),
    })
  }, ref)

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
