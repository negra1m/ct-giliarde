"use client"

import { useRef, type HTMLAttributes, type ReactNode } from "react"
import { gsap, useGSAP, SplitText, MOTION_OK } from "@/lib/gsap"

/**
 * Único motor de entrada em tela das seções (DESIGN_SPEC §6.4).
 * Lê data-attributes no escopo (só sob prefers-reduced-motion: no-preference):
 *   [data-split]  h2 → SplitText lines + mask, yPercent 110 → 0
 *   [data-rule]   régua → scaleX 0 → 1 (origin left; data-rule-origin="center" para cabeçalho centralizado)
 *   [data-write]  nome do sensei → clipPath inset(0 100% 0 0) → inset(0 0% 0 0)
 *   [data-reveal] bloco → autoAlpha 0 → 1, y 28 → 0
 *   [data-time]   hh:mm → autoAlpha 0 → 1, y 8 → 0
 * Um ScrollTrigger por seção: start "top 80%", once: true. Sob reduce o SSR é o estado final.
 */
export type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div"
  children?: ReactNode
}

export function Reveal({ as = "section", children, ...rest }: RevealProps) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root)
        const titles = q<HTMLElement>("[data-split]")
        const items = q("[data-reveal]")
        const rules = q<HTMLElement>("[data-rule]")
        const times = q("[data-time]")
        const writes = q("[data-write]")

        // Arrays vazios (seção sem [data-time]/[data-write] etc.) não entram em set/to: o GSAP avisa "target not found"
        if (titles.length) gsap.set(titles, { autoAlpha: 0 })
        if (items.length) gsap.set(items, { autoAlpha: 0, y: 28 })
        // data-rule-origin="center" (cabeçalho centralizado) cresce a partir do meio; padrão: da esquerda
        rules.forEach((el) =>
          gsap.set(el, { scaleX: 0, transformOrigin: el.dataset.ruleOrigin === "center" ? "center center" : "left center" }),
        )
        if (times.length) gsap.set(times, { autoAlpha: 0, y: 8 })
        if (writes.length) gsap.set(writes, { clipPath: "inset(0 100% 0 0)" })

        let alive = true
        let tl: gsap.core.Timeline | null = null
        const splits: SplitText[] = []
        const st = { trigger: root, start: "top 80%", once: true }

        document.fonts.ready.then(() => {
          if (!alive) return
          titles.forEach((el) => {
            splits.push(
              SplitText.create(el, {
                type: "lines",
                mask: "lines",
                linesClass: "split-line",
                autoSplit: true,
                onSplit: (self) =>
                  gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.1,
                    immediateRender: true,
                    scrollTrigger: { ...st },
                  }),
              }),
            )
          })
          if (titles.length) gsap.set(titles, { autoAlpha: 1 }) // linhas já estão em yPercent 110 dentro da máscara
          tl = gsap.timeline({ scrollTrigger: { ...st } })
          if (rules.length) tl.to(rules, { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, 0)
          if (writes.length) tl.to(writes, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" }, 0.1)
          if (items.length) tl.to(items, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.15)
          if (times.length) tl.to(times, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 }, 0.5)
        })

        return () => {
          alive = false
          tl?.revert()
          splits.forEach((s) => s.revert()) // reverte também o tween devolvido em onSplit
        }
      })

      return () => mm.revert()
    },
    { scope },
  )

  if (as === "div") {
    return (
      <div ref={scope} {...rest}>
        {children}
      </div>
    )
  }
  return (
    <section ref={scope} {...rest}>
      {children}
    </section>
  )
}
