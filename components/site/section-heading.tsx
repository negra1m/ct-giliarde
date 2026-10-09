import { cn } from "@/lib/utils"

/**
 * Cabeçalho padrão de seção (DESIGN_SPEC §4 + override do PO: H2 44/80px).
 * Numeral + régua [data-rule] (aria-hidden, G15: sem label de texto) e <h2 id data-split>.
 * O id do h2 é o alvo do aria-labelledby da <Reveal as="section">.
 */
export type SectionHeadingProps = {
  n: string
  id: string
  title: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ n, id, title, align = "left", className }: SectionHeadingProps) {
  const center = align === "center"
  return (
    <div className={cn(center && "flex flex-col items-center text-center", className)}>
      <p aria-hidden="true" className={cn("flex items-center gap-3", center && "justify-center")}>
        <span className="font-display text-[18px] leading-none tracking-[.08em] text-gold-300 lg:text-[20px]">{n}</span>
        <span data-rule data-rule-origin={center ? "center" : undefined} className="h-px w-12 bg-gold-300" />
      </p>
      <h2
        id={id}
        data-split
        className="mt-4 font-display text-[44px] leading-none tracking-[.02em] text-bone uppercase lg:text-[80px]"
      >
        {title}
      </h2>
    </div>
  )
}
