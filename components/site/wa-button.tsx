import { MessageCircle } from "lucide-react"
import { wa, UI } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Botão de WhatsApp (DESIGN_SPEC §4 convenções). Server component.
 * Sempre <a target="_blank" rel="noopener noreferrer" aria-label="{label} — abre em nova aba">.
 * primary: bg gold-300 / texto ink-0 · secondary: preenchido ink-2 (G4, sem contorno).
 * md: h 52 mobile / 56 desktop, px 32 · sm: h 44 mobile (alvo de toque) / 40 desktop, px 20 (nav).
 */
export type WaButtonProps = {
  variant: "primary" | "secondary"
  size?: "md" | "sm"
  icon?: boolean
  label: string
  message: string
  number?: string
  full?: boolean
  className?: string
}

export function WaButton({
  variant,
  size = "md",
  icon = false,
  label,
  message,
  number,
  full = false,
  className,
}: WaButtonProps) {
  return (
    <a
      href={wa(message, number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${UI.novaAba}`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[2px] font-body font-semibold uppercase tracking-[.18em] whitespace-nowrap transition-[color,background-color,translate] duration-200 motion-reduce:translate-none",
        size === "md" ? "h-13 px-8 text-[13px] lg:h-14" : "h-11 px-5 text-[12px] lg:h-10",
        variant === "primary"
          ? "bg-gold-300 text-ink-0 hover:bg-gold-400 hover:-translate-y-px"
          : "bg-ink-2 text-bone hover:bg-ink-3 hover:text-gold-100",
        full && "w-full",
        className,
      )}
    >
      {icon && <MessageCircle size={16} aria-hidden="true" />}
      {label}
    </a>
  )
}
