import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, SplitText, Draggable, useGSAP }
