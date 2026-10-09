import { Mail, MapPin, Phone } from "lucide-react"
import { CONTATO, UI, WA_MESSAGES, wa } from "@/lib/content"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { ExtLink } from "@/components/site/ext-link"

/**
 * 07 · Contato (DESIGN_SPEC §4.7 + overrides do PO, brief §8). Server component.
 * Esquerda: cabeçalho + lista WhatsApp / E-mail / Endereço (ícone, eyebrow, valor), só hairlines
 * horizontais (G11). Direita: mapa por endereço em iframe lazy, monocromático, sem moldura.
 * Entrada em tela só via data-attrs lidos pelo <Reveal> (§6.4): data-split/data-rule no cabeçalho e
 * data-reveal em cada linha. O mapa entra por data-write (wipe de clip-path) em vez de autoAlpha:
 * visibility:hidden no iframe faz o Chrome ignorar o loading="lazy" (iframe oculto carrega na hora),
 * e clip-path não altera a visibilidade computada. Filtro monocromático é CSS estático (G18).
 * Desktop: min-h 70vh com cabeçalho no topo, lista na base e o mapa esticado à altura da linha.
 */

const ROW = "grid grid-cols-[32px_1fr] gap-x-4 border-t border-gold-line py-5 last:border-b lg:py-6"

const ICON = "-mt-0.5 shrink-0 text-gold-300"

/** Alvo de toque 44px sem inflar a linha: o texto fica centrado no box e o -mb-2 devolve o excesso. */
const LINK = "-mb-2 flex min-h-11 w-fit items-center transition-colors duration-200 hover:text-gold-100"

export function Contato() {
  return (
    <Reveal
      as="section"
      id="contato"
      aria-labelledby="contato-title"
      className="bg-ink-0 py-20 lg:flex lg:min-h-[70vh] lg:flex-col lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:grid lg:flex-1 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
          <SectionHeading n="07" id="contato-title" title={CONTATO.titulo} className="mb-10 lg:mb-12" />

          <ul role="list">
            <li data-reveal className={ROW}>
              <Phone size={20} aria-hidden="true" className={ICON} />
              <div>
                <p className="eyebrow">{UI.whatsapp}</p>
                <ExtLink
                  href={wa(WA_MESSAGES.saberMais)}
                  className={`${LINK} font-display text-[28px] leading-none tracking-[.03em] text-bone tabular-nums lg:text-[32px]`}
                >
                  {CONTATO.telefone}
                </ExtLink>
              </div>
            </li>

            <li data-reveal className={ROW}>
              <Mail size={20} aria-hidden="true" className={ICON} />
              <div>
                <p className="eyebrow">{UI.email}</p>
                <a
                  href={`mailto:${CONTATO.email}`}
                  className={`${LINK} font-body text-[16px] leading-[1.6] text-bone`}
                >
                  {CONTATO.email}
                </a>
              </div>
            </li>

            <li data-reveal className={ROW}>
              <MapPin size={20} aria-hidden="true" className={ICON} />
              <div>
                <p className="eyebrow">{UI.endereco}</p>
                <p className="mt-2 font-body text-[16px] leading-[1.6] text-bone-70">{CONTATO.endereco}</p>
              </div>
            </li>
          </ul>
        </div>

        <div
          data-write
          className="relative mt-8 aspect-[4/3] overflow-hidden bg-ink-2 lg:col-span-7 lg:mt-0 lg:aspect-auto lg:self-stretch"
        >
          <iframe
            src={CONTATO.mapSrc}
            title={CONTATO.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.05)_brightness(.85)]"
          />
        </div>
      </div>
    </Reveal>
  )
}
