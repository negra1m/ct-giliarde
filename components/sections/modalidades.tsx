import { ArrowRight, MessageCircle } from "lucide-react"
import { MODALIDADES, MODALIDADES_TITULO, UI, WA_MESSAGES, wa } from "@/lib/content"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { ExtLink } from "@/components/site/ext-link"
import { InstagramIcon } from "@/components/site/icons"

/**
 * 01 · Modalidades (DESIGN_SPEC §4.1 + overrides do PO). Server component.
 * As 4 modalidades como linhas de fight card: numeral, nome em display, descrição e ações
 * (Stories no Instagram / WhatsApp). Rodapé da lista: "Planos e valores pelo WhatsApp" (G1).
 * Entrada em tela só via data-attrs lidos pelo <Reveal> (§6.4): data-split/data-rule no
 * cabeçalho, data-reveal em cada linha e no link de planos. Hover/active são CSS puro (§6.2).
 * No desktop a seção tem min-h 80vh e as linhas crescem (flex-1) para distribuir o conteúdo.
 */

const ACTION_LINK =
  "inline-flex min-h-11 items-center gap-2 font-body text-[12px] font-semibold tracking-[.18em] text-gold-300 uppercase transition-colors duration-200 hover:text-gold-100"

const ACTION_ICON =
  "shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:translate-none"

export function Modalidades() {
  return (
    <Reveal
      as="section"
      id="modalidades"
      aria-labelledby="modalidades-title"
      className="bg-ink-0 py-20 lg:flex lg:min-h-[80vh] lg:flex-col lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:grid lg:flex-1 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <SectionHeading
          n="01"
          id="modalidades-title"
          title={MODALIDADES_TITULO}
          className="mb-10 lg:col-span-4 lg:mb-0"
        />

        <div className="lg:col-span-8 lg:flex lg:flex-col">
          <ol role="list" className="lg:flex lg:flex-1 lg:flex-col">
            {MODALIDADES.map((m) => (
              <li
                key={m.n}
                data-reveal
                className="group relative -mx-4 grid grid-cols-[auto_1fr] gap-x-4 border-t border-gold-line px-4 py-5 transition-colors duration-300 last:border-b hover:bg-gold-glow active:bg-gold-glow after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:z-[1] after:h-px after:origin-left after:scale-x-0 after:bg-gold-300 after:transition-transform after:duration-400 after:ease-[cubic-bezier(.2,.8,.2,1)] hover:after:scale-x-100 lg:flex-1 lg:grid-cols-[48px_1fr_auto] lg:content-center lg:gap-x-6 lg:py-7"
              >
                <span
                  aria-hidden="true"
                  className="self-baseline font-display text-[18px] leading-none tracking-[.08em] text-gold-700 transition-colors duration-300 group-hover:text-gold-300 lg:row-span-2 lg:self-center lg:text-[20px]"
                >
                  {m.n}
                </span>
                <h3 className="self-baseline font-display text-[32px] leading-none tracking-[.03em] text-bone uppercase transition-colors duration-300 group-hover:text-gold-100 lg:text-[44px]">
                  {m.nome}
                </h3>
                <p className="col-start-2 mt-1.5 font-body text-[15px] leading-[1.6] text-bone-70">{m.desc}</p>
                <div className="col-start-2 mt-1 -mb-2 flex flex-wrap gap-x-6 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:my-0 lg:self-center lg:gap-x-8">
                  <ExtLink
                    href={m.highlight}
                    ariaLabel={UI.verStories(m.nome)}
                    className={ACTION_LINK}
                  >
                    <InstagramIcon size={16} aria-hidden="true" className={ACTION_ICON} />
                    {UI.stories}
                  </ExtLink>
                  <ExtLink
                    href={wa(WA_MESSAGES.modalidade(m.nome))}
                    ariaLabel={UI.falarSobre(m.nome)}
                    className={ACTION_LINK}
                  >
                    <MessageCircle size={16} aria-hidden="true" className={ACTION_ICON} />
                    {UI.whatsapp}
                  </ExtLink>
                </div>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-6 flex justify-end">
            <ExtLink href={wa(WA_MESSAGES.planos)} className={`group ${ACTION_LINK}`}>
              {UI.planosLink}
              <ArrowRight size={16} aria-hidden="true" className={ACTION_ICON} />
            </ExtLink>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
