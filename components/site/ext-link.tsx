import type { AnchorHTMLAttributes, ReactNode } from "react"
import { UI } from "@/lib/content"

/**
 * Link externo (Instagram etc.). Server component.
 * Sempre target="_blank" rel="noopener noreferrer".
 * Com ariaLabel: aria-label="{ariaLabel} — abre em nova aba" (substitui o conteúdo para leitores de tela).
 * Sem ariaLabel: acrescenta <span class="sr-only"> (abre em nova aba)</span> ao conteúdo.
 * Demais atributos do <a> (data-*, id, onClick…) são repassados.
 */
export type ExtLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel" | "aria-label" | "children"
> & {
  href: string
  children: ReactNode
  ariaLabel?: string
}

export function ExtLink({ href, children, className, ariaLabel, ...rest }: ExtLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel ? `${ariaLabel} — ${UI.novaAba}` : undefined}
      {...rest}
    >
      {children}
      {!ariaLabel && <span className="sr-only"> ({UI.novaAba})</span>}
    </a>
  )
}
