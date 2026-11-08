// All copy and media for the film site lives here so it can be updated in one place.

export const film = {
  title: 'New Super Nick Bruce',
  studio: 'Nick Bruce Productions',
  tagline: 'A cinematic film by Nick Bruce Productions.',
  // Premiere: December 4, 2026 (Eastern Time)
  premiereISO: '2026-12-04T00:00:00-05:00',
  premiereLabel: '12.4.26',
  trailerYouTubeId: 'wCYqUUYK4LA',
  synopsis:
    "When an unlikely hero named Nick Bruce gets superpowers from a thunderbolt on one night in particular, things change when Nick reveals he has superpowers... becoming a superhuman that can race at the speed of light and use lightning at full force... until someone wants that source of energy, Nick knows he's up for a secret of his life. Because when an evil version of himself is keeping a devastating plot under wraps... Nick must get his friends to team up with him before the time of their life runs out.",
  contactPhone: '(937) 360-8820',
  contactPhoneHref: 'tel:+19373608820',
}

export type CastMember = {
  name: string
  role?: string
  image: string
  /** Glow colour that matches the character poster */
  glow: string
}

export const cast: CastMember[] = [
  {
    name: 'Nicholas Ryan Bruce',
    role: 'Lead Actor | Director | Editor',
    image: '/img/cast-nicholas-ryan-bruce.webp',
    glow: 'oklch(0.62 0.24 25)',
  },
  {
    name: 'Zygmunt Kosmowski',
    role: 'Second Lead Actor',
    image: '/img/cast-zygmunt-kosmowski.webp',
    glow: 'oklch(0.72 0.19 50)',
  },
  {
    name: 'Virgeil Cartwright',
    image: '/img/cast-virgeil-cartwright.webp',
    glow: 'oklch(0.86 0.17 95)',
  },
  {
    name: 'Vixen Woods',
    image: '/img/cast-vixen-woods.webp',
    glow: 'oklch(0.62 0.25 305)',
  },
  {
    name: 'Daniel Peterson',
    image: '/img/cast-daniel-peterson.webp',
    glow: 'oklch(0.78 0.22 145)',
  },
  {
    name: 'Blake Hall',
    role: 'Co Director',
    image: '/img/cast-blake-hall.jpg',
    glow: 'oklch(0.72 0.17 255)',
  },
]

export const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/brucefifthteen',
    icon: 'instagram',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@nickbruceproductions6505',
    icon: 'youtube',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@nicholasbruce18',
    icon: 'tiktok',
  },
] as const

/** Netlify Image CDN URL for a file in /public */
export function img(path: string, width: number) {
  return `/.netlify/images?url=${path}&w=${width}&fm=webp&q=80`
}
