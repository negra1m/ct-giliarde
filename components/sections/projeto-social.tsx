import { Fragment } from "react"
import { Clock, MapPin } from "lucide-react"
import { SOCIAL, UI, WA_SOCIAL, splitTimes } from "@/lib/content"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { WaButton } from "@/components/site/wa-button"

/**
 * 04 · Projeto Social (DESIGN_SPEC §4.4 + overrides do PO, brief §8). Server component.
 * Cabeçalho à esquerda; painel ink-1 sem borda (G11) à direita com régua 120×2 [data-rule],
 * meta Local/Horário (hh:mm em display via splitTimes + [data-time]), lista inline e CTAs para WA_SOCIAL.
 * Frase de fechamento: base da coluna esquerda no desktop (grid rows), abaixo do painel no mobile (ordem do DOM).
 * Toda a entrada em tela vem dos data-attrs lidos pelo <Reveal> (§6.4): o SSR já é o estado final.
 */

const TIME =
  "inline-block align-baseline font-display text-[22px] leading-none tracking-[.04em] text-gold-100 tabular-nums lg:text-[26px]"

const EYEBROW = "eyebrow flex items-center gap-2"

export function ProjetoSocial() {
  return (
    <Reveal
      as="section"
      id="projeto-social"
      aria-labelledby="projeto-social-title"
      className="bg-ink-0 py-20 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-10">
          <SectionHeading
            n="04"
            id="projeto-social-title"
            title={SOCIAL.titulo}
            className="mb-12 lg:col-span-4 lg:row-start-1 lg:mb-0"
          />

          {/* Painel: superfície por profundidade de preto, sem 1px (G11) */}
          <div
            data-reveal
            className="rounded-[2px] bg-ink-1 p-6 lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:p-10"
          >
            <span aria-hidden="true" data-rule className="block h-0.5 w-[120px] bg-gold-300" />
            <h3 className="mt-6 font-display text-[28px] leading-none tracking-[.03em] text-bone uppercase lg:text-[36px]">
              {SOCIAL.subtitulo}
            </h3>
            <p className="mt-5 max-w-[62ch] font-body text-[17px] leading-[1.55] text-bone lg:text-[18px] lg:leading-[1.5]">
              {SOCIAL.paragrafo}
            </p>

            <dl className="mt-6 grid gap-6 border-t border-gold-line pt-6 sm:grid-cols-2 sm:gap-8 lg:mt-8">
              <div>
                <dt className={EYEBROW}>
                  <MapPin size={16} aria-hidden="true" className="shrink-0" />
                  {UI.local}
                </dt>
                <dd className="mt-2 font-body text-[16px] leading-[1.6] text-bone">{SOCIAL.local}</dd>
              </div>
              <div>
                <dt className={EYEBROW}>
                  <Clock size={16} aria-hidden="true" className="shrink-0" />
                  {UI.horario}
                </dt>
                <dd className="mt-2 font-body text-[16px] leading-[1.7] text-bone">
                  {splitTimes(SOCIAL.horario).map((part, i) =>
                    part.kind === "time" ? (
                      <span key={`${part.value}-${i}`} data-time className={TIME}>
                        {part.value}
                      </span>
                    ) : (
                      <Fragment key={`${part.value}-${i}`}>{part.value}</Fragment>
                    ),
                  )}
                </dd>
              </div>
            </dl>

            <ul
              role="list"
              className="mt-5 flex flex-wrap gap-x-2 gap-y-1 font-body text-[15px] leading-[1.6] text-bone-70 lg:mt-6"
            >
              {SOCIAL.oferece.map((item, i) => (
                <li key={item}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mr-2 text-gold-300">
                      ·
                    </span>
                  )}
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
              <WaButton
                variant="primary"
                icon
                label={SOCIAL.primary.label}
                message={SOCIAL.primary.message}
                number={WA_SOCIAL}
                className="w-full sm:w-auto"
              />
              <WaButton
                variant="secondary"
                label={SOCIAL.secondary.label}
                message={SOCIAL.secondary.message}
                number={WA_SOCIAL}
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Frase de fechamento */}
          <div
            data-reveal
            className="mt-8 border-t border-gold-line pt-6 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-end"
          >
            <p className="font-body text-[18px] leading-[1.5] text-bone-70">{SOCIAL.frase}</p>
            <p className="eyebrow mt-4 text-bone-70">{SOCIAL.autorFrase}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
