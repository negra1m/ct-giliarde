"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Users, Trophy, Star, Calendar, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function CTGiliardeLima() {
  const [isEditingEvent, setIsEditingEvent] = useState(false)
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    // Check for edit parameter in URL
    const urlParams = new URLSearchParams(window.location.search)
    const editParam = urlParams.get("isEdit")
    setCanEdit(editParam === "bbd7d050f68497418cd44f18806ede35")
  }, [])

  const [eventData, setEventData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("eventData")
      return saved
        ? JSON.parse(saved)
        : {
            title: "COPA ARMLOCK DE JIU-JITSU 2025",
            description: "Prepare-se para uma competição emocionante!",
            content:
              "Participe de um dos maiores eventos de Jiu-Jitsu da região! Onde atletas de diversos níveis disputarão em busca do título.",
            date: "19 Outubro, 2025",
            location: "GINÁSIO BORDADÃO - São Pedro",
            image: "/copa-armlock-event.png",
          }
    }
    return {
      title: "COPA ARMLOCK DE JIU-JITSU 2024",
      description: "Prepare-se para uma competição emocionante!",
      content:
        "Participe de um dos maiores eventos de Jiu-Jitsu da região! Onde atletas de diversos níveis disputarão em busca do título.",
      date: "20 Outubro, 2024",
      location: "GINÁSIO BORDADÃO - São Pedro",
      image: "/copa-armlock-event.png",
    }
  })

  const saveEventData = (data: typeof eventData) => {
    setEventData(data)
    localStorage.setItem("eventData", JSON.stringify(data))
  }

  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => setIsVideoLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setEventData({ ...eventData, image: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="CT Giliarde de Lima" width={50} height={50} className="rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-yellow-500">CT GILIARDE DE LIMA</h1>
                <p className="text-xs text-gray-400">Tradição desde 2004</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection("home")} className="hover:text-yellow-500 transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection("about")} className="hover:text-yellow-500 transition-colors">
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("modalidades")}
                className="hover:text-yellow-500 transition-colors"
              >
                Modalidades
              </button>
              <button onClick={() => scrollToSection("precos")} className="hover:text-yellow-500 transition-colors">
                Preços
              </button>
              <button onClick={() => scrollToSection("eventos")} className="hover:text-yellow-500 transition-colors">
                Eventos
              </button>
              <button onClick={() => scrollToSection("contato")} className="hover:text-yellow-500 transition-colors">
                Contato
              </button>
            </div>
            <a
              href="https://wa.me/5519991834114?text=Olá! Gostaria de saber mais sobre as aulas na academia CT Giliarde de Lima."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                <Phone className="w-4 h-4 mr-2" />
                (19) 99183-4114
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Blurred Background Video for large screens */}
        <div className="absolute inset-0 hidden lg:block">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover blur-md">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AQPRCPPDcM0jYUMYYeIW2ymVDppmHVSFC0HkzaoP_mdZxvl3-tcaEu7dsyVBpQbtFMlniDg0uCp-j6W2GzF9nEbG9JsO-f2S-vaZBQ6es3QUQxZvOTHqbb0AiNn1XMh.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Main Video Background */}
        <div className="absolute inset-0 lg:inset-x-32 xl:inset-x-48 2xl:inset-x-64">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AQPRCPPDcM0jYUMYYeIW2ymVDppmHVSFC0HkzaoP_mdZxvl3-tcaEu7dsyVBpQbtFMlniDg0uCp-j6W2GzF9nEbG9JsO-f2S-vaZBQ6es3QUQxZvOTHqbb0AiNn1XMh.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-36">
            <span className="text-yellow-500">CT GILIARDE DE</span>
            <br />
            <span className="text-white">LIMA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-yellow-500 font-semibold">A MELHOR ACADEMIA DE LUTA DA REGIÃO</p>
          <p className="text-lg mb-8 text-gray-300">Jiu Jitsu • Muay Thai • Boxe • MMA</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
            Venha conhecer nossas aulas e planos em São Pedro!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5519991834114?text=Olá! Gostaria de me matricular na academia CT Giliarde de Lima."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600 text-lg px-8 py-4">
                MATRICULE-SE
              </Button>
            </a>
            <a
              href="https://wa.me/5519991834114?text=Olá! Gostaria de agendar uma aula gratuita na academia CT Giliarde de Lima."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black text-lg px-8 py-4 bg-transparent"
              >
                AULA GRATUITA
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-yellow-500">Transforme-se</span> com o poder do Jiu Jitsu
            </h2>
            <p className="text-lg mb-8 text-gray-300 leading-relaxed">
              Descubra o poder transformador do Jiu Jitsu na nossa academia. Estamos aqui para guiar o aluno em uma
              jornada de autodescoberta e superação. Seja você um iniciante ou um praticante experiente, encontrará um
              ambiente acolhedor e motivador para alcançar seus objetivos físicos e mentais.
            </p>
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-lg p-6 mb-8">
              <blockquote className="text-lg italic text-gray-300 mb-4">
                "Nunca te orgulhes de haver vencido a um adversário, ao que venceste hoje poderá derrotar-te amanhã. A
                única vitória que perdura é a que se conquista sobre a própria ignorância."
              </blockquote>
              <cite className="text-yellow-500 font-semibold">— Jigoro Kano, criador do Judô</cite>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Família</h3>
                <p className="text-gray-400">Fazemos parte de uma grande família dentro e fora do tatame</p>
              </div>
              <div className="text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Tradição</h3>
                <p className="text-gray-400">Tradição desde 2004 com respeito e disciplina</p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Excelência</h3>
                <p className="text-gray-400">A melhor academia de luta da região</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section id="modalidades" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-yellow-500">Nossas</span> Modalidades
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "JIU-JITSU ADULTO", description: "Arte suave para adultos" },
              { name: "JIU-JITSU KIDS", description: "Formação para crianças" },
              { name: "MUAY-THAI", description: "A arte das oito armas" },
              { name: "MMA", description: "Artes marciais mistas" },
            ].map((modalidade, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-yellow-500/20 hover:border-yellow-500/50 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-yellow-500">{modalidade.name}</CardTitle>
                  <CardDescription className="text-gray-400">{modalidade.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={`https://wa.me/5519991834114?text=Olá! Gostaria de saber mais sobre as aulas de ${modalidade.name} na academia CT Giliarde de Lima.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">CONSULTE</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-yellow-500">Nossos</span> Preços
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { frequency: "1 AULA NA SEMANA", price: "R$110", period: ".00" },
              { frequency: "2 AULAS NA SEMANA", price: "R$140", period: ".00" },
              { frequency: "3 AULAS NA SEMANA", price: "R$160", period: ".00" },
              { frequency: "4 AULAS NA SEMANA", price: "R$190", period: ".00" },
              { frequency: "5 AULAS NA SEMANA", price: "R$210", period: ".00" },
            ].map((plano, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-yellow-500/20 hover:border-yellow-500 transition-colors text-center"
              >
                <CardHeader>
                  <CardTitle className="text-yellow-500 text-sm">{plano.frequency}</CardTitle>
                  <div className="text-3xl font-bold text-slate-300">
                    {plano.price}
                    <span className="text-lg">{plano.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>• Muay Thai</div>
                    <div>• Jiu Jitsu</div>
                    <div>• Personal Fight</div>
                  </div>
                  <a
                    href={`https://wa.me/5519991834114?text=Olá! Gostaria de me matricular no plano de ${plano.frequency} na academia CT Giliarde de Lima.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600 mt-4">MATRICULE-SE</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos */}
      <section id="eventos" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-12">
            <h2 className="text-4xl font-bold text-center">
              <span className="text-yellow-500">Próximos</span> Eventos
            </h2>
            {canEdit && (
              <Button
                onClick={() => setIsEditingEvent(!isEditingEvent)}
                className="bg-yellow-500 text-black hover:bg-yellow-600 text-sm"
              >
                {isEditingEvent ? "Salvar" : "Editar Evento"}
              </Button>
            )}
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-gray-900 to-black border-yellow-500">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-yellow-500" />
                  <Badge className="bg-yellow-500 text-black">EVENTO ESPECIAL</Badge>
                </div>
                {isEditingEvent ? (
                  <input
                    type="text"
                    value={eventData.title}
                    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                    className="text-2xl text-yellow-500 bg-transparent border border-yellow-500/50 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <CardTitle className="text-2xl text-yellow-500">{eventData.title}</CardTitle>
                )}
                {isEditingEvent ? (
                  <input
                    type="text"
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    className="text-lg text-gray-300 bg-transparent border border-yellow-500/50 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <CardDescription className="text-lg text-gray-300">{eventData.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="text-slate-300">
                {/* Event Image */}
                <div className="mb-6">
                  <Image
                    src={eventData.image || "/placeholder.svg"}
                    alt="Imagem do Evento"
                    width={600}
                    height={800}
                    className="w-full object-cover rounded-lg border border-yellow-500/20"
                  />
                  {isEditingEvent && (
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
                      />
                    </div>
                  )}
                </div>

                {isEditingEvent ? (
                  <textarea
                    value={eventData.content}
                    onChange={(e) => setEventData({ ...eventData, content: e.target.value })}
                    className="text-gray-300 bg-transparent border border-yellow-500/50 rounded px-2 py-1 w-full mb-6 h-20 resize-none"
                  />
                ) : (
                  <p className="text-gray-300 mb-6">{eventData.content}</p>
                )}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    {isEditingEvent ? (
                      <input
                        type="text"
                        value={eventData.date}
                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                        className="bg-transparent border border-yellow-500/50 rounded px-2 py-1 flex-1"
                        placeholder="Data: DD Mês, AAAA"
                      />
                    ) : (
                      <span>Data: {eventData.date}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                    {isEditingEvent ? (
                      <input
                        type="text"
                        value={eventData.location}
                        onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                        className="bg-transparent border border-yellow-500/50 rounded px-2 py-1 flex-1"
                        placeholder="Local do evento"
                      />
                    ) : (
                      <span>{eventData.location}</span>
                    )}
                  </div>
                </div>
                {isEditingEvent && (
                  <div className="flex gap-2 mb-4">
                    <Button
                      onClick={() => {
                        saveEventData(eventData)
                        setIsEditingEvent(false)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Salvar Alterações
                    </Button>
                    <Button
                      onClick={() => setIsEditingEvent(false)}
                      variant="outline"
                      className="border-gray-500 text-gray-300 hover:bg-gray-800"
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
                <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                  Inscreva-se Agora
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Aviso sobre persistência de dados */}
          {canEdit && (
            <div className="max-w-4xl mx-auto mt-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-500 text-sm text-center">
                  ⚠️ <strong>Importante:</strong> As alterações são salvas localmente no navegador. Para persistência
                  online, é necessário integrar com um banco de dados ou sistema de gerenciamento de conteúdo.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Horários */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-yellow-500">Nossos</span> Horários
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gray-900 border-yellow-500/20">
              <CardContent className="p-8">
                <div className="space-y-4 text-slate-300">
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">Segunda, Quarta, Sexta</span>
                    </div>
                    <span className="text-yellow-500">7h às 20h</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">Terça e Quinta</span>
                    </div>
                    <span className="text-yellow-500">7h às 19h</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">Sábado</span>
                    </div>
                    <span className="text-yellow-500">Consulte horários</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-center text-yellow-500 font-semibold">
                    Personal Fighting - Consulte nossos horários especiais
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="text-yellow-500">Siga-nos no</span> Instagram
          </h2>
          <p className="text-center text-gray-300 mb-12">Acompanhe nossos treinos, eventos e conquistas!</p>

          <div className="max-w-6xl mx-auto">
            {/* Instagram Header */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full p-1">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Image src="/logo.png" alt="CT Giliarde de Lima" width={50} height={50} className="rounded-full" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">@ctgiliardedelima</h3>
                <p className="text-gray-400">CT Giliarde de Lima</p>
              </div>
            </div>

            {/* Instagram Grid Placeholder */}
            

            {/* Call to Action */}
            <div className="text-center">
              <a
                href="https://www.instagram.com/ctgiliardedelima"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Ver no Instagram
                </Button>
              </a>
              <p className="text-gray-400 text-sm mt-4">Acompanhe nossos treinos, eventos e conquistas diariamente!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">VENHA fazer uma aula experimental!</h2>
          <p className="text-xl mb-8">Conheça nossa academia e nossas modalidades: Jiu-Jitsu | MMA | Muay Thai</p>
          <a
            href="https://wa.me/5519991834114?text=Olá! Gostaria de agendar uma aula experimental na academia CT Giliarde de Lima."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-black text-yellow-500 hover:bg-gray-900 text-lg px-8 py-4">
              QUERO UMA AULA GRATUITA
            </Button>
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-yellow-500">Entre em</span> Contato
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-500">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-yellow-500" />
                  <span>(19) 99183-4114</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-yellow-500" />
                  <span>gilijitsu@hotmail.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
                  <div>
                    <p>Rua Joaquim Teixeira de Toledo, 826</p>
                    <p>Centro - São Pedro/SP</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-500">Projeto Social</h3>
              <p className="text-gray-300 mb-4">
                Você sabia que aqui no CT Giliarde nós temos um serviço de acompanhamento para te ajudar a alcançar os
                seus objetivos? Está esperando o quê? Agende um horário agora mesmo!!
              </p>
              <p className="text-yellow-500 font-semibold">Tradição desde 2004</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-yellow-500/20 py-8">
        <div className="container mx-auto px-4">
          {/* Mapa */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-yellow-500">Nossa Localização</h3>
            <div className="w-full h-64 rounded-lg overflow-hidden border border-yellow-500/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123456789!2d-47.9123456!3d-22.5123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua%20Joaquim%20Teixeira%20de%20Toledo%2C%20826%20-%20Centro%2C%20S%C3%A3o%20Pedro%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização CT Giliarde de Lima"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image src="/logo.png" alt="CT Giliarde de Lima" width={40} height={40} className="rounded-full" />
              <div>
                <h3 className="font-bold text-yellow-500">CT GILIARDE DE LIMA</h3>
                <p className="text-xs text-gray-400">Tradição desde 2004</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© 2024 CT Giliarde de Lima. Todos os direitos reservados.</p>
              <p className="text-yellow-500 text-sm font-semibold mt-1">OSS!</p>
              <p className="text-gray-400 text-xs mt-2">
                Site produzido por{" "}
                <a
                  href="https://www.fewcompany.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  Few Company
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
