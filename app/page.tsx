import { SiteNav } from "@/components/site/nav"
import { SiteFooter } from "@/components/site/footer"
import { Hero } from "@/components/sections/hero"
import { Modalidades } from "@/components/sections/modalidades"
import { Horarios } from "@/components/sections/horarios"
import { Sensei } from "@/components/sections/sensei"
import { ProjetoSocial } from "@/components/sections/projeto-social"
import { Instagram } from "@/components/sections/instagram"
import { AulaExperimental } from "@/components/sections/aula-experimental"
import { Contato } from "@/components/sections/contato"

/**
 * One-page CT Giliarde de Lima (DESIGN_SPEC §7). Server component: só compõe as seções.
 * Estado e animação vivem nos client components (nav, hero, reveal, marquee).
 */
export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Modalidades />
        <Horarios />
        <Sensei />
        <ProjetoSocial />
        <Instagram />
        <AulaExperimental />
        <Contato />
      </main>
      <SiteFooter />
    </>
  )
}
