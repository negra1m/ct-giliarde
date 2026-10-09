import { ArrowRight, ArrowUpRight } from "lucide-react"
import { INSTAGRAM, UI } from "@/lib/content"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { ExtLink } from "@/components/site/ext-link"
import { InstagramIcon } from "@/components/site/icons"

/**
 * 05 · Instagram (DESIGN_SPEC §4.5 + overrides do PO). Server component.
 * Três planos: perfis (linhas com hairline dourada), reels (cards-link em ink-1 com corte dourado
 * no topo) e destaques (chips). Todo link externo via <ExtLink> (target _blank + rel noopener noreferrer).
 * Entrada em tela só via data-attrs lidos pelo <Reveal> (§6.4): data-split/data-rule no cabeçalho,
 * data-reveal em cada perfil, cada reel e no bloco de destaques. Hover é CSS puro (§6.2).
 * Desktop: min-h 80vh; o bloco de reels cresce (flex-1) para distribuir o conteúdo na altura.
 */

const ACTION_LINK =
  "inline-flex min-h-11 items-center gap-2 font-body text-[12px] font-semibold tracking-[.18em] text-gold-300 uppercase transition-colors duration-200 hover:text-gold-100"

const ARROW = "shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:translate-none"

export function Instagram() {
  return (
    <Reveal
      as="section"
      id="instagram"
      aria-labelledby="instagram-title"
      className="bg-ink-0 py-20 lg:flex lg:min-h-[80vh] lg:flex-col lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:grid lg:flex-1 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <SectionHeading n="05" id="instagram-title" title={INSTAGRAM.titulo} className="mb-10 lg:col-span-4 lg:mb-0" />

        <div className="lg:col-span-8 lg:flex lg:flex-col">
          {/* Perfis */}
          <ul role="list">
            {INSTAGRAM.perfis.map((p) => (
              <li
                key={p.handle}
                data-reveal
                className="group grid grid-cols-[auto_1fr] items-start gap-x-4 border-t border-gold-line py-5 last:border-b lg:min-h-20 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-x-5 lg:py-4"
              >
                <InstagramIcon size={20} aria-hidden="true" className="mt-1 text-gold-300 lg:mt-0" />
                <div>
                  <h3 className="font-display text-[28px] leading-none tracking-[.03em] text-bone normal-case transition-colors duration-300 group-hover:text-gold-100">
                    {p.handle}
                  </h3>
                  <p className="mt-1.5 font-body text-[14px] leading-[1.5] text-bone-70">{p.bio}</p>
                </div>
                <ExtLink
                  href={p.url}
                  ariaLabel={`${UI.abrirPerfil} ${p.handle} no Instagram`}
                  className={`${ACTION_LINK} col-start-2 -mt-2 -mb-3 lg:col-start-3 lg:my-0`}
                >
                  {UI.abrirPerfil}
                  <ArrowUpRight size={14} aria-hidden="true" className={ARROW} />
                </ExtLink>
              </li>
            ))}
          </ul>

          {/* Reels — o card inteiro é o link */}
          <ul role="list" className="mt-10 grid gap-3 lg:flex-1 lg:grid-cols-3 lg:gap-6">
            {INSTAGRAM.reels.map((r) => (
              <li key={r.url} data-reveal className="flex">
                <ExtLink
                  href={r.url}
                  ariaLabel={`${UI.reel} de ${r.handle} em ${r.data}`}
                  className="group grid h-[104px] w-full grid-cols-[1fr_auto] content-center items-center gap-x-4 gap-y-1.5 border-t border-gold-300 bg-ink-1 px-5 transition-colors duration-300 hover:bg-ink-2 lg:h-auto lg:min-h-[140px] lg:grid-rows-[auto_1fr_auto] lg:content-stretch lg:gap-y-0 lg:p-6"
                >
                  <span className="eyebrow">
                    {UI.reel} · {r.data}
                  </span>
                  <span className="font-display text-[24px] leading-none tracking-[.03em] text-bone normal-case transition-colors duration-300 group-hover:text-gold-100 lg:row-start-3 lg:text-[28px]">
                    {r.handle}
                  </span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className={`${ARROW} col-start-2 row-start-1 row-end-3 self-center text-gold-300 lg:row-start-3 lg:row-end-4`}
                  />
                </ExtLink>
              </li>
            ))}
          </ul>

          {/* Destaques */}
          <div data-reveal className="mt-8">
            <p id="instagram-destaques" className="eyebrow">
              {UI.destaques}
            </p>
            <ul role="list" aria-labelledby="instagram-destaques" className="mt-3 flex flex-wrap gap-2">
              {INSTAGRAM.destaques.map((d) => (
                <li key={d.url}>
                  <ExtLink
                    href={d.url}
                    className="inline-flex h-11 items-center gap-2 rounded-[2px] bg-ink-2 px-3 font-body text-[12px] font-semibold tracking-[.04em] text-bone transition-colors duration-200 hover:bg-ink-3 hover:text-gold-100 lg:h-9"
                  >
                    {d.label}
                    <ArrowUpRight size={12} aria-hidden="true" className="shrink-0 text-gold-300" />
                  </ExtLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
