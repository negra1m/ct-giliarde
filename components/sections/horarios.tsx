import { Fragment } from "react"
import { Clock } from "lucide-react"
import { HORARIOS, HORARIOS_TITULO, PERSONAL_FIGHT, splitTimes } from "@/lib/content"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { WaButton } from "@/components/site/wa-button"

/**
 * 02 · Horários (DESIGN_SPEC §4.2 + overrides do PO, brief §8). Server component.
 * Grade de 4 turmas com as strings literais de HORARIOS: só os tokens hh:mm (splitTimes)
 * recebem a fonte display em gold-100 e entram com [data-time]. Linha final Personal Fight.
 * Toda a animação vem dos data-attrs lidos pelo <Reveal> (§6.4): nada é escondido no SSR.
 */

const H3 = "font-display text-[28px] leading-none tracking-[.03em] text-bone uppercase lg:text-[36px]"

const CELL =
  "border-t border-gold-line pt-5 pb-6 transition-colors duration-300 hover:bg-gold-glow lg:-mx-4 lg:px-4 lg:pt-6 lg:pb-8"

/** Uma linha de horário: texto literal, com os hh:mm em display (G14: line-height 1 inline, parágrafo 1.7). */
function Linha({ linha }: { linha: string }) {
  return (
    <p className="font-body text-[16px] leading-[1.7] text-bone-70">
      {splitTimes(linha).map((part, i) =>
        part.kind === "time" ? (
          <span
            key={`${linha}-${i}`}
            data-time
            className="inline-block align-baseline font-display text-[22px] leading-none tracking-[.04em] text-gold-100 tabular-nums lg:text-[26px]"
          >
            {part.value}
          </span>
        ) : (
          <Fragment key={`${linha}-${i}`}>{part.value}</Fragment>
        ),
      )}
    </p>
  )
}

export function Horarios() {
  return (
    <Reveal
      as="section"
      id="horarios"
      aria-labelledby="horarios-title"
      className="bg-ink-1 py-20 lg:flex lg:min-h-[80vh] lg:flex-col lg:justify-center lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <SectionHeading n="02" id="horarios-title" title={HORARIOS_TITULO} className="mb-12 lg:col-span-3 lg:mb-0" />

          <ul role="list" className="lg:col-span-9 lg:grid lg:grid-cols-2 lg:gap-x-12">
            {HORARIOS.map((h) => (
              <li key={h.nome} data-reveal className={CELL}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={H3}>{h.nome}</h3>
                  {h.tag && (
                    <p className="font-body text-[12px] font-medium tracking-[.2em] text-bone-70 uppercase">{h.tag}</p>
                  )}
                </div>
                <div className="mt-4 flex gap-3 lg:mt-5">
                  <Clock size={16} aria-hidden="true" className="mt-1.5 shrink-0 text-gold-300" />
                  <div>
                    {h.linhas.map((linha) => (
                      <Linha key={linha} linha={linha} />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div
            data-reveal
            className="border-t border-gold-line pt-6 lg:col-span-9 lg:col-start-4 lg:-mx-4 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 lg:px-4"
          >
            <div>
              <h3 className={H3}>{PERSONAL_FIGHT.nome}</h3>
              <p className="mt-2 font-body text-[16px] leading-[1.7] text-bone-70">{PERSONAL_FIGHT.texto}</p>
            </div>
            <WaButton
              variant="secondary"
              size="sm"
              label={PERSONAL_FIGHT.cta.label}
              message={PERSONAL_FIGHT.cta.message}
              className="mt-5 h-12 w-full lg:mt-0 lg:h-10 lg:w-auto"
            />
          </div>
        </div>
      </div>
    </Reveal>
  )
}
