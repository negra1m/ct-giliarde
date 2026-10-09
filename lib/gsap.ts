"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
gsap.defaults({ ease: "power3.out", duration: 0.8 })
ScrollTrigger.config({ ignoreMobileResize: true })

export const MOTION_OK = "(prefers-reduced-motion: no-preference)"
export const MOTION_REDUCE = "(prefers-reduced-motion: reduce)"
export const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"

export { gsap, useGSAP, ScrollTrigger, SplitText }
