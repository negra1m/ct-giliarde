import { Fragment } from "react"
import { BRAND, CTA_FINAL } from "@/lib/content"
import { Reveal } from "@/components/site/reveal"
import { Marquee } from "@/components/site/marquee"
import { SectionHeading } from "@/components/site/section-heading"
import { WaButton } from "@/components/site/wa-button"

/**
 * 06 · Aula experimental (DESIGN_SPEC §4.6 + overrides do PO, brief §8). Server component.
 * Ticker <Marquee/> (client) encostado no topo da seção (border-y gold-line, 64/88px) com as artes + OSS!
 * em outline dourado. Bloco centralizado: cabeçalho 06 (numeral + régua centralizados), H2 [data-split],
 * sub com os "|" em gold-300 e CTAs (G12: primário aula gratuita, secundário planos e valores preenchido).
 * Toda a entrada em tela vem dos data-attrs lidos pelo <Reveal> (§6.4): o SSR já é o estado final.
 */

const SEPARATOR = " | "

export function AulaExperimental() {
  const subParts = CTA_FINAL.sub.split(SEPARATOR)

  return (
    <Reveal as="section" id="aula-experimental" aria-labelledby="aula-experimental-title" className="bg-ink-1">
      <Marquee items={[...BRAND.artes, BRAND.oss]} />

      <div className="mx-auto w-full max-w-[880px] px-5 py-20 text-center lg:px-8 lg:py-28">
        <SectionHeading n="06" id="aula-experimental-title" title={CTA_FINAL.titulo} align="center" />

        <p
          data-reveal
          className="mx-auto mt-6 max-w-[760px] font-body text-[17px] leading-[1.55] text-bone-70 lg:mt-8 lg:text-[20px] lg:leading-[1.5]"
        >
          {subParts.map((part, i) => (
            <Fragment key={`${i}-${part}`}>
              {i > 0 && <span className="text-gold-300">{SEPARATOR}</span>}
              {part}
            </Fragment>
          ))}
        </p>

        <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:mt-10">
          <WaButton
            variant="primary"
            icon
            label={CTA_FINAL.primary.label}
            message={CTA_FINAL.primary.message}
            className="w-full sm:w-auto"
          />
          <WaButton
            variant="secondary"
            label={CTA_FINAL.secondary.label}
            message={CTA_FINAL.secondary.message}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </Reveal>
  )
}
