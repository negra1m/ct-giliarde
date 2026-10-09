import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { ExtLink } from "@/components/site/ext-link"
import { InstagramIcon } from "@/components/site/icons"
import { SENSEI, SOBRE } from "@/lib/content"

/**
 * 03 · Sensei + Sobre (DESIGN_SPEC §4.3 + overrides do PO). Server component.
 * Toda a entrada em tela vem dos data-attrs lidos pelo <Reveal>: data-rule (régua da placa),
 * data-write (nome em gold-brush), data-reveal (credenciais, handle, parágrafo, pilares, citação);
 * o h2 vem do SectionHeading (data-split). Sob prefers-reduced-motion o SSR já é o estado final.
 */
export function Sensei() {
  return (
    <Reveal
      as="section"
      id="sensei"
      aria-labelledby="sensei-title"
      className="bg-ink-0 py-20 lg:flex lg:min-h-[80vh] lg:flex-col lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:flex lg:flex-1 lg:flex-col lg:px-8">
        <SectionHeading n="03" id="sensei-title" title={SOBRE.titulo} className="mb-12" />

        <div className="grid gap-y-10 lg:flex-1 lg:grid-cols-12 lg:content-between lg:gap-8">
          {/* Placa do sensei */}
          <div className="lg:col-span-5 lg:max-w-[420px]">
            <span aria-hidden="true" data-rule className="block h-0.5 w-12 bg-gold-300" />
            <h3
              data-write
              className="gold-brush mt-4 font-display text-[40px] leading-none tracking-[.03em] uppercase lg:text-[44px]"
            >
              {SENSEI.nome}
            </h3>
            <ul data-reveal className="mt-6 space-y-3">
              {SENSEI.credenciais.map((credencial) => (
                <li
                  key={credencial}
                  className="flex items-start gap-3 font-body text-[16px] leading-[1.6] text-bone"
                >
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-gold-300" />
                  {credencial}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-4">
              <ExtLink
                href={SENSEI.url}
                className="inline-flex min-h-11 items-center gap-2 font-body text-[13px] font-semibold text-gold-300 transition-colors duration-200 hover:text-gold-100"
              >
                <InstagramIcon size={16} aria-hidden="true" />
                {SENSEI.handle}
              </ExtLink>
            </p>
          </div>

          {/* Sobre + pilares */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p
              data-reveal
              className="font-body text-[17px] leading-[1.55] text-bone lg:text-[20px] lg:leading-[1.5]"
            >
              {SOBRE.paragrafo}
            </p>
            <ul className="mt-10 lg:grid lg:grid-cols-3 lg:gap-8">
              {SOBRE.pilares.map((pilar) => (
                <li
                  key={pilar.titulo}
                  data-reveal
                  className="grid grid-cols-[104px_1fr] gap-4 border-t border-gold-line py-3 lg:grid-cols-1 lg:gap-2 lg:pt-4 lg:pb-0"
                >
                  <h4 className="font-display text-[24px] leading-none tracking-[.03em] text-gold-300 uppercase">
                    {pilar.titulo}
                  </h4>
                  <p className="min-w-0 font-body text-[15px] leading-[1.6] text-bone-70">{pilar.texto}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Citação */}
          <figure data-reveal className="relative mt-2 pl-10 lg:col-span-9 lg:mt-6 lg:pl-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-1 left-0 font-display text-[64px] leading-none text-gold-300 select-none"
            >
              “
            </span>
            <blockquote className="font-body text-[18px] leading-[1.45] text-bone lg:text-[22px] lg:leading-[1.4]">
              <p>{SOBRE.citacao.texto}</p>
            </blockquote>
            <figcaption className="eyebrow mt-4 text-bone-70">{SOBRE.citacao.autor}</figcaption>
          </figure>
        </div>
      </div>
    </Reveal>
  )
}
