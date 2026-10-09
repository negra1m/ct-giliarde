# CT Giliarde de Lima — TODO

> Site one-page (Next 16 App Router, Tailwind 4, GSAP). Deploy Vercel: https://www.ct-giliarde.com.br
> Convenção: todo `[x]` leva a data `(YYYY-MM-DD)`.

## Redesign MMA (branch `feat/redesign-mma`)
- [x] Atualizar libs: Next 16.4, React 19.3, Tailwind 4.3.3, GSAP 3.15 + @gsap/react, lucide 1.54, ESLint 9 flat; remover package-lock.json (pnpm é o gerenciador) (2026-10-09)
- [x] Remover seção de preços e colocar CTA "Planos e valores pelo WhatsApp" no lugar (2026-10-09)
- [x] Remover seção de eventos (editor localStorage `?isEdit=` e imagens) — corrige hydration error no `next dev` (2026-10-09)
- [x] Pesquisar Instagram do sensei (@giliarde_de_lima) e da academia (@ctgiliardedelima): perfis, highlights por modalidade, reels linkados no site (2026-10-09)
- [x] Página mais curta: desktop 9149 → 6413px, mobile 12678 → 8041px, 7 seções (2026-10-09)
- [x] Tipografia MMA/UFC: Bebas Neue (display) + Barlow (corpo) via next/font (2026-10-09)
- [x] GSAP: intro do hero por máscara, reveals por seção (SplitText, réguas, fade+rise, numerais), parallax só desktop, prefers-reduced-motion respeitado (2026-10-09)
- [x] Preto + dourado sofisticado: tokens ink/gold/bone, hairlines douradas, zero gradiente azulado, hero full-bleed (2026-10-09)
- [x] SEO: canonical/og:url corrigidos para https://www.ct-giliarde.com.br (domínio antigo não existia) (2026-10-09)
- [x] Poda: 62 arquivos shadcn/assets sem uso e 42 dependências removidas (2026-10-09)
- [ ] PO decidir: "aula experimental" × "aula gratuita" (manter os dois termos verbatim?)
- [ ] PO decidir: citação de Jigoro Kano encurtada (manter, inteira ou remover)
- [ ] PO decidir: chips "UFC Rio" / "UFC 316" / "Miguel MMA 1" (nomes verbatim dos highlights do sensei)
- [ ] PO decidir: botão pausar/reproduzir o vídeo do hero (acessibilidade WCAG 2.2.2, não pedido)
- [ ] PO decidir: turmas vistas no Instagram e NÃO publicadas (MMA iniciantes a partir de 05/10, condicionamento segunda 19:00, Infanto-juvenil, NoGi)
- [ ] Merge do PR e conferir preview na Vercel
