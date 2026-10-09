"use client"

import { Fragment, useRef } from "react"
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/**
 * Ticker outline dourado (DESIGN_SPEC §6.6). Client component.
 * Trilho com 2 cópias idênticas → xPercent -50 = largura de uma cópia → loop sem emenda.
 * Pausa fora da viewport. Sob reduce: estático (overflow-hidden corta a 2ª cópia).
 * Versão acessível: <p class="sr-only"> com os itens unidos por " · ".
 */
export type MarqueeProps = {
  items: readonly string[]
  className?: string
}

export function Marquee({ items, className }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const rootEl = root.current
      const trackEl = track.current
      if (!rootEl || !trackEl) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tween = gsap.to(trackEl, { xPercent: -50, duration: 30, ease: "none", repeat: -1, paused: true })
        const st = ScrollTrigger.create({
          trigger: rootEl,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => tween.paused(!self.isActive),
        })
        tween.paused(!st.isActive)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const copy = (key: string) => (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((item, i) => (
        <Fragment key={`${key}-${i}`}>
          <span className="font-display text-[48px] leading-none tracking-[.06em] whitespace-nowrap text-outline-gold uppercase lg:text-[72px]">
            {item}
          </span>
          <span className="font-display text-[48px] leading-none text-gold-300 [-webkit-text-stroke:0] lg:text-[72px]">·</span>
        </Fragment>
      ))}
    </div>
  )

  return (
    <div ref={root} className={cn("flex h-16 items-center overflow-hidden border-y border-gold-line lg:h-[88px]", className)}>
      <p className="sr-only">{items.join(" · ")}</p>
      <div ref={track} aria-hidden="true" className="flex w-max will-change-transform">
        {copy("a")}
        {copy("b")}
      </div>
    </div>
  )
}
