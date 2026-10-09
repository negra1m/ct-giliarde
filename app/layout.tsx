import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bebas_Neue, Barlow } from "next/font/google"
import "./globals.css"
import FewBanner from "@/components/few-banner"

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" })
const barlow = Barlow({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-barlow", display: "swap" })

const SITE_URL = "https://www.ct-giliarde.com.br"

// Gate anti-flash do hero (DESIGN_SPEC §6.3 / G13): só sob prefers-reduced-motion: no-preference.
const MOTION_GATE =
  "if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){document.documentElement.classList.add('js-motion')}"

export const metadata: Metadata = {
  title: "CT Giliarde de Lima - Academia de Jiu-Jitsu, Muay Thai e MMA em São Pedro",
  description:
    "A melhor academia de luta da região! Jiu-Jitsu, Muay Thai, Boxe e MMA em São Pedro/SP. Tradição desde 2004. Aulas para adultos e crianças. Agende sua aula gratuita!",
  keywords: "jiu-jitsu, muay thai, mma, boxe, academia, são pedro, luta, artes marciais, CT Giliarde de Lima",
  authors: [{ name: "CT Giliarde de Lima" }],
  creator: "Few Company",
  publisher: "CT Giliarde de Lima",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CT Giliarde de Lima - Academia de Jiu-Jitsu, Muay Thai e MMA",
    description:
      "A melhor academia de luta da região! Jiu-Jitsu, Muay Thai, Boxe e MMA em São Pedro/SP. Tradição desde 2004.",
    url: SITE_URL,
    siteName: "CT Giliarde de Lima",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CT Giliarde de Lima - Academia de Artes Marciais",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CT Giliarde de Lima - Academia de Jiu-Jitsu, Muay Thai e MMA",
    description: "A melhor academia de luta da região! Tradição desde 2004 em São Pedro/SP.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script dangerouslySetInnerHTML={{ __html: MOTION_GATE }} />
      </head>
      <body className="font-body bg-ink-0 text-bone antialiased">
        {children}
        <FewBanner />
      </body>
    </html>
  )
}
