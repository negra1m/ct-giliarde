// lib/content.ts — única fonte de texto do site (DESIGN_SPEC §3). Server-safe, sem JSX.
export const WA_MAIN = "5519991834114"
export const WA_SOCIAL = "5519998977213"

export function wa(message: string, number: string = WA_MAIN): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const WA_MESSAGES = {
  saberMais: "Olá! Gostaria de saber mais sobre as aulas na academia CT Giliarde de Lima.",
  matricular: "Olá! Gostaria de me matricular na academia CT Giliarde de Lima.",
  aulaGratuita: "Olá! Gostaria de agendar uma aula gratuita na academia CT Giliarde de Lima.",
  aulaExperimental: "Olá! Gostaria de agendar uma aula experimental na academia CT Giliarde de Lima.",
  personal: "Olá! Gostaria de consultar os horários disponíveis para Personal Fight na academia CT Giliarde de Lima.",
  planos: "Olá! Gostaria de saber os planos e valores da academia CT Giliarde de Lima.",
  modalidade: (nome: string) =>
    `Olá! Gostaria de saber mais sobre as aulas de ${nome} na academia CT Giliarde de Lima.`,
  socialSaberMais: "Olá! Gostaria de saber mais sobre o projeto social de Jiu-Jitsu na Escola Guido Dante.",
  socialParticipar: "Olá! Gostaria de participar do projeto social de Jiu-Jitsu na Escola Guido Dante.",
} as const

export const BRAND = {
  nome: "CT Giliarde de Lima",
  nomeDisplay: "CT GILIARDE DE LIMA",
  tagline: "Tradição desde 2004",
  cidade: "São Pedro/SP",
  desde: "Desde 2004 · São Pedro/SP",
  claim: "A MELHOR ACADEMIA DE LUTA DA REGIÃO",
  artes: ["Jiu-Jitsu", "Muay Thai", "Boxe", "MMA"],
  oss: "OSS!",
  bioAcademia: "Escola de ARTES MARCIAIS · Desde 2004 transformando vidas · São Pedro/SP",
  logo: "/logo.png",
  videoSrc:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AQPRCPPDcM0jYUMYYeIW2ymVDppmHVSFC0HkzaoP_mdZxvl3-tcaEu7dsyVBpQbtFMlniDg0uCp-j6W2GzF9nEbG9JsO-f2S-vaZBQ6es3QUQxZvOTHqbb0AiNn1XMh.mp4",
} as const

export const NAV = [
  { label: "Modalidades", href: "#modalidades" },
  { label: "Horários", href: "#horarios" },
  { label: "Sensei", href: "#sensei" },
  { label: "Projeto Social", href: "#projeto-social" },
  { label: "Instagram", href: "#instagram" },
  { label: "Contato", href: "#contato" },
] as const

export const HERO = {
  h1: ["CT GILIARDE", "DE LIMA"],
  primary: { label: "Matricule-se", message: WA_MESSAGES.matricular },
  secondary: { label: "Aula experimental", message: WA_MESSAGES.aulaExperimental },
} as const

const IG = "https://www.instagram.com"
const HL = (id: string) => `${IG}/stories/highlights/${id}/`

/** H2 das seções 01 e 02 (strings do site atual, DESIGN_SPEC §4.1/§4.2). */
export const MODALIDADES_TITULO = "Nossas Modalidades"
export const HORARIOS_TITULO = "Nossos Horários"

export const MODALIDADES = [
  { n: "01", nome: "Jiu-Jitsu Adulto", desc: "Arte suave para adultos", highlight: HL("17924187474106583") },
  { n: "02", nome: "Jiu-Jitsu Kids", desc: "Formação para crianças", highlight: HL("17961611081975414") },
  { n: "03", nome: "Muay Thai", desc: "A arte das oito armas", highlight: HL("17857925316433116") },
  { n: "04", nome: "MMA", desc: "Artes marciais mistas", highlight: HL("18079172329786409") },
] as const
// WhatsApp por modalidade: wa(WA_MESSAGES.modalidade(m.nome))

export const HORARIOS = [
  { nome: "Jiu Jitsu Adulto", tag: null, linhas: ["Segunda e Sexta às 20:00", "Quarta às 7:00 e 20:00", "Terça e Quinta às 15:30"] },
  { nome: "Jiu Jitsu Kids", tag: "8 a 12 anos", linhas: ["Terça e Quinta às 19:00", "Quarta e Sexta às 9:30"] },
  { nome: "Jiu Jitsu Mirim", tag: "4 a 7 anos", linhas: ["Terça e Quinta às 18:00", "Quarta e Sexta às 9:30"] },
  { nome: "Muay Thai", tag: null, linhas: ["Segunda, Quarta e Sexta às 18:00", "Terça e Quinta às 9:30"] },
] as const

export const PERSONAL_FIGHT = {
  nome: "Personal Fight",
  texto: "Consultar horários disponíveis",
  cta: { label: "Consultar horários", message: WA_MESSAGES.personal },
} as const

export type TimePart = { kind: "text" | "time"; value: string }
/** Mantém a string literal; só marca os tokens hh:mm para receber a fonte display. */
export function splitTimes(line: string): TimePart[] {
  return line
    .split(/(\d{1,2}:\d{2})/)
    .filter(Boolean)
    .map((value) => ({ kind: /^\d{1,2}:\d{2}$/.test(value) ? "time" : "text", value }))
}

export const SENSEI = {
  nome: "Giliarde de Lima",
  handle: "@giliarde_de_lima",
  url: `${IG}/giliarde_de_lima/`,
  credenciais: [
    "Faixa preta 4º grau de Jiu-Jitsu",
    "Faixa preta de Muay Thai",
    "Profissão: transformar vidas através da arte marcial",
  ],
} as const

export const SOBRE = {
  titulo: "Transforme-se com o poder do Jiu Jitsu",
  paragrafo:
    "Descubra o poder transformador do Jiu Jitsu na nossa academia. Estamos aqui para guiar o aluno em uma jornada de autodescoberta e superação. Seja você um iniciante ou um praticante experiente, encontrará um ambiente acolhedor e motivador para alcançar seus objetivos físicos e mentais.",
  pilares: [
    { titulo: "Família", texto: "Fazemos parte de uma grande família dentro e fora do tatame" },
    { titulo: "Tradição", texto: "Tradição desde 2004 com respeito e disciplina" },
    { titulo: "Excelência", texto: "A melhor academia de luta da região" },
  ],
  citacao: {
    texto: "A única vitória que perdura é a que se conquista sobre a própria ignorância.",
    autor: "Jigoro Kano, criador do Judô",
  },
} as const

export const SOCIAL = {
  titulo: "Projeto Social",
  subtitulo: "Jiu-Jitsu para Todos",
  paragrafo:
    "Acreditamos que o Jiu-Jitsu deve ser acessível a todos. Por isso, oferecemos aulas gratuitas para a comunidade, promovendo disciplina, respeito e transformação social através do esporte.",
  local: "Escola Guido Dante, São Pedro - SP",
  horario: "Sábados, 9:45 às 11:00",
  oferece: ["Aulas gratuitas de Jiu-Jitsu", "Formação de caráter", "Disciplina e respeito", "Inclusão social"],
  frase: "O esporte transforma vidas. Venha fazer parte dessa família!",
  autorFrase: "CT Giliarde de Lima",
  primary: { label: "Quero participar", message: WA_MESSAGES.socialParticipar },
  secondary: { label: "Saiba mais", message: WA_MESSAGES.socialSaberMais },
} as const
// CTAs do social: wa(msg, WA_SOCIAL)

export const INSTAGRAM = {
  titulo: "Siga-nos no Instagram",
  perfis: [
    { handle: "@ctgiliardedelima", url: `${IG}/ctgiliardedelima/`, bio: BRAND.bioAcademia },
    { handle: "@giliarde_de_lima", url: SENSEI.url, bio: "Black belt bjj 4° · Black belt Muay Thai · Profissão transformar vidas através da Arte Marcial" },
  ],
  reels: [
    { handle: "@ctgiliardedelima", data: "09/10/2026", url: `${IG}/reel/DeRrJ5_q1Tn/` },
    { handle: "@ctgiliardedelima", data: "06/10/2026", url: `${IG}/reel/DeJv_HqKkLg/` },
    { handle: "@giliarde_de_lima", data: "16/09/2026", url: `${IG}/reel/DdXrKJ-N0kV/` },
  ],
  destaques: [
    { label: "Jiu-Jitsu Mirim", url: HL("17911843146188516") },
    { label: "Infanto-juvenil", url: HL("18289478710252038") },
    { label: "NoGi", url: HL("17956547489848554") },
    { label: "Graduação 06/26", url: HL("18087589052096606") },
    { label: "Lutas", url: HL("17904495049554383") },
    { label: "UFC Rio", url: HL("18307035496247847") },
    { label: "UFC 316", url: HL("18001276868620179") },
    { label: "Miguel MMA 1", url: HL("18362068681183415") },
  ],
} as const

export const CTA_FINAL = {
  titulo: "VENHA fazer uma aula experimental!",
  sub: "Conheça nossa academia e nossas modalidades: Jiu-Jitsu | MMA | Muay Thai",
  primary: { label: "Quero uma aula gratuita", message: WA_MESSAGES.aulaGratuita },
  secondary: { label: "Planos e valores pelo WhatsApp", message: WA_MESSAGES.planos },
} as const

export const CONTATO = {
  titulo: "Entre em Contato",
  telefone: "(19) 99183-4114",
  email: "gilijitsu@hotmail.com",
  endereco: "Rua Joaquim Teixeira de Toledo, 826 — Centro — São Pedro/SP",
  mapSrc: "https://www.google.com/maps?q=Rua+Joaquim+Teixeira+de+Toledo,+826,+Centro,+S%C3%A3o+Pedro+-+SP&output=embed",
  mapTitle: "Mapa: CT Giliarde de Lima, Rua Joaquim Teixeira de Toledo, 826, Centro, São Pedro/SP",
} as const

export const FOOTER = {
  copyright: "© 2026 CT Giliarde de Lima. Todos os direitos reservados.",
  credit: { label: "Construído por Few Company", url: "https://fewcompany.com?client=ct-giliarde", logo: "/few-logo.png" },
} as const

/** Microcopy de UI (chrome). Não é conteúdo da academia — lista para aprovação do PO em DESIGN_SPEC §9. */
export const UI = {
  whatsapp: "WhatsApp",
  falarWhatsApp: "Falar no WhatsApp",
  stories: "Stories",
  abrirPerfil: "Abrir perfil",
  reel: "Reel",
  destaques: "Destaques",
  planosLink: "Planos e valores pelo WhatsApp",
  local: "Local",
  horario: "Horário",
  email: "E-mail",
  endereco: "Endereço",
  abrirMenu: "Abrir menu",
  fecharMenu: "Fechar menu",
  menu: "Menu",
  novaAba: "abre em nova aba",
  pausarVideo: "Pausar vídeo de fundo",
  reproduzirVideo: "Reproduzir vídeo de fundo",
  secoes: "Seções",
  /** aria-labels dos links de ação por modalidade (DESIGN_SPEC §4.1). */
  verStories: (nome: string) => `Ver stories de ${nome} no Instagram`,
  falarSobre: (nome: string) => `Falar no WhatsApp sobre ${nome}`,
} as const
