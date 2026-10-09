"use client"

import { Fragment, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, MOTION_REDUCE, DESKTOP_MOTION } from "@/lib/gsap"
import { BRAND, HERO, UI } from "@/lib/content"
import { WaButton } from "@/components/site/wa-button"

/**
 * Hero (DESIGN_SPEC §4.0 + §6.3; override do PO, brief §8.3-a). Client component.
 * Vídeo full-bleed com overlay cinematográfico e o nome em display gigante ancorado na base esquerda,
 * cortando a linha entre o vídeo e o preto. Nunca vídeo em caixa centrada.
 *
 * Motion (só sob prefers-reduced-motion: no-preference):
 *   [data-hero-line] linhas do H1 entram por máscara (yPercent 110 → 0)
 *   [data-hero-rule] régua desenha (scaleX 0 → 1, origin left)
 *   [data-hero-fade] eyebrow, claim, sub, CTAs e botão do vídeo (autoAlpha 0 → 1, y 16 → 0)
 * A timeline dispara após document.fonts.ready (+ ScrollTrigger.refresh único do site).
 * Gate anti-flash html.js-motion (G13) é removido aqui, no mesmo layout effect do gsap.set.
 * Parallax do vídeo só em DESKTOP_MOTION (G3). Sob reduce: vídeo pausado, botão aria-pressed="true",
 * e o SSR é o estado final (nada escondido).
 */

// Overlay §4.0-9: gradiente vertical para ink-0 na base + vinheta radial. Só pretos neutros.
const OVERLAY =
  "linear-gradient(180deg, rgb(5 5 5 / .55) 0%, rgb(5 5 5 / .25) 45%, #050505 100%), radial-gradient(ellipse at center, transparent 40%, rgb(5 5 5 / .75) 100%)"

export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)

  useGSAP(
    () => {
      const root = scope.current
      const video = videoRef.current
      if (!root || !video) return
      // loadeddata pode ter disparado antes da hidratação (§4.0-8)
      if (video.readyState >= 2) video.dataset.loaded = "true"

      const mm = gsap.matchMedia()

      // Intro: separado do parallax para NÃO reexecutar ao cruzar 1024px (§6.3)
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root)
        const lines = q("[data-hero-line]")
        const fades = q("[data-hero-fade]")
        const rule = q("[data-hero-rule]")

        gsap.set(lines, { yPercent: 110 })
        gsap.set(fades, { autoAlpha: 0, y: 16 })
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" })
        document.documentElement.classList.remove("js-motion") // G13: daqui em diante o GSAP manda

        const tl = gsap
          .timeline({ paused: true, delay: 0.15 })
          .to(lines, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12 })
          .to(rule, { scaleX: 1, duration: 1, ease: "power3.inOut" }, "-=0.9")
          .to(fades, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, "-=0.7")

        let alive = true
        document.fonts.ready.then(() => {
          if (!alive) return
          tl.play()
          ScrollTrigger.refresh()
        })

        // Autoplay pode ser recusado (ex.: iOS em economia de energia): o botão reflete o estado real
        video.play().catch(() => setPaused(true))

        return () => {
          alive = false
          tl.revert()
        }
      })

      mm.add(DESKTOP_MOTION, () => {
        gsap.to(video, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
        })
      })

      mm.add(MOTION_REDUCE, () => {
        setPaused(true)
        const stop = () => video.pause()
        if (video.readyState >= 2) stop()
        else video.addEventListener("loadeddata", stop, { once: true })
        return () => video.removeEventListener("loadeddata", stop)
      })

      return () => mm.revert()
    },
    { scope },
  )

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      setPaused(false)
      video.play().catch(() => setPaused(true))
    } else {
      video.pause()
      setPaused(true)
    }
  }

  return (
    <section
      ref={scope}
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex h-svh max-h-[900px] min-h-[640px] overflow-hidden bg-ink-0 lg:min-h-[720px]"
    >
      <video
        ref={videoRef}
        src={BRAND.videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedData={(e) => {
          e.currentTarget.dataset.loaded = "true"
        }}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[900ms] ease-out will-change-transform data-[loaded=true]:opacity-100 motion-reduce:transition-none"
      />
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: OVERLAY }} />

      {/* Mobile: pb reserva FewBanner (34) + 20 + botão do vídeo (44) + 16, para o botão não cobrir o CTA full-width */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-end px-5 pb-[calc(34px_+_20px_+_44px_+_16px)] lg:px-8 lg:pb-24">
        <div className="max-w-[880px]">
          <p
            data-hero-fade
            className="flex items-center gap-3 font-body text-[11px] leading-[1.2] font-medium tracking-[.28em] text-gold-300 uppercase lg:text-[12px]"
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold-300" />
            {BRAND.desde}
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[64px] leading-[.92] tracking-[.01em] text-bone uppercase md:text-[96px] md:leading-[.9] lg:mt-6 lg:text-[128px]"
          >
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                {HERO.h1[0]}
              </span>
            </span>{" "}
            <span className="block overflow-hidden">
              <span data-hero-line className="block gold-brush">
                {HERO.h1[1]}
              </span>
            </span>
          </h1>

          <span data-hero-rule aria-hidden="true" className="mt-6 block h-px w-24 bg-gold-300" />

          <p
            data-hero-fade
            className="mt-6 font-display text-[22px] leading-none tracking-[.06em] text-gold-100 uppercase lg:text-[28px]"
          >
            {BRAND.claim}
          </p>

          <p
            data-hero-fade
            className="mt-3 font-body text-[13px] font-medium tracking-[.2em] text-bone-70 uppercase lg:text-[14px]"
          >
            {BRAND.artes.map((arte, i) => (
              <Fragment key={arte}>
                {i > 0 && <span className="text-gold-300">{" · "}</span>}
                {arte}
              </Fragment>
            ))}
          </p>

          <div data-hero-fade className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-10">
            <WaButton
              variant="primary"
              icon
              label={HERO.primary.label}
              message={HERO.primary.message}
              className="w-full sm:w-auto"
            />
            <WaButton
              variant="secondary"
              label={HERO.secondary.label}
              message={HERO.secondary.message}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* G7 / WCAG 2.2.2: controle do vídeo de fundo. 44px (alvo de toque), acima do FewBanner (34px). */}
      <button
        type="button"
        data-hero-fade
        aria-pressed={paused}
        aria-label={paused ? UI.reproduzirVideo : UI.pausarVideo}
        onClick={toggleVideo}
        className="absolute right-5 bottom-[calc(34px_+_20px)] z-10 grid size-11 place-items-center rounded-full bg-ink-3 text-bone transition-colors duration-200 hover:bg-ink-2 lg:right-8"
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </section>
  )
}
