"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { Menu, MessageCircle, X } from "lucide-react"
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "@/lib/gsap"
import { BRAND, NAV, UI, WA_MESSAGES, wa } from "@/lib/content"
import { WaButton } from "@/components/site/wa-button"

const MENU_ID = "menu-mobile"
const FOCUSABLE = "a[href], button:not([disabled])"

/**
 * Nav fixa + overlay do menu mobile (DESIGN_SPEC §5.1 + §6.5). Client component.
 * Renderiza um fragmento: <header class="site-nav"> e, como irmão, <div id="menu-mobile">
 * (o backdrop-filter do header rolado criaria containing block e confinaria o overlay).
 * is-scrolled via ScrollTrigger toggleClass (fora de matchMedia: não é movimento).
 */
export function SiteNav() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  useGSAP(() => {
    const header = headerRef.current
    const overlay = overlayRef.current
    if (!header || !overlay) return

    ScrollTrigger.create({
      start: 72,
      end: "max",
      toggleClass: { targets: header, className: "is-scrolled" },
    })

    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const links = overlay.querySelectorAll("[data-menu-link]")
      const tl = gsap
        .timeline({ paused: true })
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "power2.out" })
        .fromTo(links, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06 }, "-=0.1")
      tlRef.current = tl
      return () => {
        tlRef.current = null
      }
    })
    return () => mm.revert()
  })

  // Abre/fecha: timeline sob no-preference, gsap.set instantâneo sob reduce.
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const tl = tlRef.current
    if (tl) {
      if (open) tl.play()
      else tl.reverse()
    } else {
      gsap.set(overlay, { autoAlpha: open ? 1 : 0 })
    }
  }, [open])

  // Estado aberto: trava o scroll, foca o 1º link, prende o Tab, Esc fecha, desktop fecha.
  useEffect(() => {
    if (!open) return
    const overlay = overlayRef.current
    if (!overlay) return

    document.body.style.overflow = "hidden"

    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        overlay.querySelector<HTMLElement>("[data-menu-link]")?.focus()
      })
    })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== "Tab") return
      const els = Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (els.length === 0) return
      const first = els[0]
      const last = els[els.length - 1]
      const active = document.activeElement
      const inside = active instanceof Node && overlay.contains(active)
      if (e.shiftKey) {
        if (!inside || active === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (!inside || active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const desktop = window.matchMedia("(min-width: 1024px)")
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) close()
    }

    document.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onDesktop)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onDesktop)
      document.body.style.overflow = ""
    }
  }, [open, close])

  return (
    <>
      <header ref={headerRef} className="site-nav fixed inset-x-0 top-0 z-50 h-16 lg:h-[72px]">
        <div className="mx-auto grid h-full w-full max-w-[1280px] grid-cols-[auto_1fr_auto] items-center px-5 lg:px-8">
          <a href="#hero" aria-label={`${BRAND.nome} — início`} className="flex min-w-0 items-center gap-3">
            <Image
              src={BRAND.logo}
              alt=""
              width={44}
              height={44}
              priority
              className="size-10 shrink-0 rounded-full lg:size-11"
            />
            <span className="truncate font-display text-[20px] leading-none tracking-[.1em] text-bone uppercase lg:text-[22px]">
              {BRAND.nomeDisplay}
            </span>
          </a>

          <nav aria-label={UI.secoes} className="hidden justify-center lg:flex">
            <ul className="flex gap-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-body text-[12px] font-medium tracking-[.22em] text-bone-70 uppercase transition-colors duration-200 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden justify-end lg:flex">
            <WaButton variant="primary" size="sm" icon label={UI.whatsapp} message={WA_MESSAGES.saberMais} />
          </div>

          <div className="flex items-center justify-end gap-1 lg:hidden">
            <a
              href={wa(WA_MESSAGES.saberMais)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${UI.falarWhatsApp} — ${UI.novaAba}`}
              className="grid size-11 place-items-center text-gold-300"
            >
              <MessageCircle size={22} aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? UI.fecharMenu : UI.abrirMenu}
              className="grid size-11 place-items-center text-bone"
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id={MENU_ID}
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label={UI.menu}
        className="invisible fixed inset-0 z-[60] flex flex-col bg-ink-2/96 px-6 pt-24 pb-[calc(34px_+_24px)] opacity-0 backdrop-blur-md lg:hidden"
      >
        <button
          type="button"
          onClick={close}
          aria-label={UI.fecharMenu}
          className="absolute top-2.5 right-5 grid size-11 place-items-center text-bone"
        >
          <X size={24} aria-hidden="true" />
        </button>

        <nav aria-label={UI.secoes}>
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href} className="border-t border-gold-line">
                <a data-menu-link href={item.href} onClick={close} className="flex items-baseline gap-4 py-4">
                  <span aria-hidden="true" className="font-display text-[14px] tracking-[.08em] text-gold-300">
                    {`0${i + 1}`}
                  </span>
                  <span className="font-display text-[40px] leading-none tracking-[.04em] text-bone uppercase">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <WaButton variant="primary" full icon label={UI.whatsapp} message={WA_MESSAGES.saberMais} />
        </div>
      </div>
    </>
  )
}
