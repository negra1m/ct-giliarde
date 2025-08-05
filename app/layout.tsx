import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
  metadataBase: new URL("https://ctgiliardedelima.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CT Giliarde de Lima - Academia de Jiu-Jitsu, Muay Thai e MMA",
    description:
      "A melhor academia de luta da região! Jiu-Jitsu, Muay Thai, Boxe e MMA em São Pedro/SP. Tradição desde 2004.",
    url: "https://ctgiliardedelima.com.br",
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
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#EAB308" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
