import Image from "next/image"
import { BRAND, FOOTER, UI } from "@/lib/content"

/**
 * Rodapé (DESIGN_SPEC §4.8). Server component, sem GSAP.
 * pb-[calc(2rem+34px)] reserva o espaço do <FewBanner/> fixo (34px, z-40).
 * Crédito Few mantido: opacity/filter direto no <img> (mix-blend-screen só funciona assim).
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-gold-line bg-ink-0 pt-10 pb-[calc(2rem_+_34px)] lg:pt-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-4">
            <Image src={BRAND.logo} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full" />
            <div>
              <p className="font-display text-[22px] leading-none tracking-[.1em] text-bone uppercase">{BRAND.nomeDisplay}</p>
              <p className="mt-1 font-body text-[13px] text-bone-70">{BRAND.tagline}</p>
            </div>
          </div>
          <p className="font-display text-[40px] leading-none tracking-[.06em] text-gold-300 lg:text-[48px]">{BRAND.oss}</p>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-body text-[13px] leading-[1.4] tracking-[.04em] text-bone-50">{FOOTER.copyright}</p>
          <a
            href={FOOTER.credit.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${FOOTER.credit.label} — ${UI.novaAba}`}
            className="group inline-flex items-center gap-2 font-body text-[13px] tracking-[.04em] text-bone-50 transition-colors duration-200 hover:text-gold-100"
          >
            <Image
              src={FOOTER.credit.logo}
              alt=""
              width={192}
              height={192}
              className="h-5 w-auto opacity-70 mix-blend-screen grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
            />
            {FOOTER.credit.label}
          </a>
        </div>
      </div>
    </footer>
  )
}
