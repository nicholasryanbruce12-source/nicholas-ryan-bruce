import { createFileRoute } from '@tanstack/react-router'
import { Phone, Zap } from 'lucide-react'

import { CastGrid, Countdown, SocialIcon, Trailer } from '@/components/film'
import { cast, film, img, socials } from '@/content/film'

export const Route = createFileRoute('/')({
  component: Home,
})

const nav = [
  { href: '#trailer', label: 'Trailer' },
  { href: '#synopsis', label: 'Synopsis' },
  { href: '#cast', label: 'Cast' },
]

function SpacedHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h2
      id={id}
      className="font-display text-4xl tracking-[0.2em] sm:text-5xl sm:tracking-[0.35em]"
    >
      <span className="text-chrome">{children}</span>
    </h2>
  )
}

function PremiereBadge() {
  return (
    <p className="font-condensed text-sm font-semibold tracking-[0.5em] text-muted-foreground uppercase sm:text-base">
      Only on <span className="text-foreground">YouTube</span>{' '}
      <span className="text-bolt">{film.premiereLabel}</span>
    </p>
  )
}

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6">
          <a
            href="#top"
            className="flex items-center gap-2 font-display text-xl tracking-[0.2em]"
          >
            <Zap className="size-5 fill-bolt text-bolt" aria-hidden />
            <span className="hidden sm:inline">Nick Bruce Productions</span>
            <span className="sm:hidden">NBP</span>
          </a>
          <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-md px-2 py-1.5 font-condensed text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-foreground sm:px-3 sm:text-sm"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate flex min-h-[100svh] items-end pt-16">
          <img
            src={img('/img/key-art.webp', 1920)}
            alt="Nicholas Ryan Bruce and Zygmunt Kosmowski face off against a backdrop of lightning and a city skyline"
            className="absolute inset-0 -z-20 size-full object-cover object-[center_25%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/30 to-background" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
          <div className="lightning-flash pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,oklch(0.9_0.08_250/0.6),transparent_60%)]" />

          <div className="mx-auto flex w-full max-w-content flex-col items-center px-4 pb-16 text-center sm:px-6 sm:pb-20">
            <PremiereBadge />
            <h1 className="mt-4 w-full max-w-3xl">
              <span className="sr-only">{film.title}</span>
              <img
                src={img('/img/title-logo.png', 1400)}
                alt=""
                className="mx-auto w-full drop-shadow-[0_0_30px_oklch(0.6_0.25_300/0.45)]"
              />
            </h1>
            <p className="mt-2 max-w-reading text-lg text-muted-foreground sm:text-xl">
              {film.tagline}
            </p>
            <div className="mt-8 flex flex-col items-center gap-6">
              <a
                href="#trailer"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-condensed text-base font-bold tracking-[0.3em] text-primary-foreground uppercase shadow-[0_0_40px_-6px_var(--primary)] transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-reduce:transition-none"
              >
                Watch the trailer
              </a>
              <Countdown />
            </div>
          </div>
        </section>

        {/* Trailer */}
        <section
          id="trailer"
          aria-labelledby="trailer-heading"
          className="scroll-mt-16 py-20 sm:py-28"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <SpacedHeading id="trailer-heading">TRAILER</SpacedHeading>
              <PremiereBadge />
            </div>
            <Trailer />
          </div>
        </section>

        {/* Synopsis */}
        <section
          id="synopsis"
          aria-labelledby="synopsis-heading"
          className="rain relative scroll-mt-16 border-y border-white/5 bg-card/40 py-20 sm:py-28"
        >
          <div className="mx-auto grid max-w-content items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="relative isolate mx-auto w-full max-w-md">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(circle,oklch(0.6_0.2_255/0.35),transparent_70%)] blur-2xl" />
              <img
                src={img('/img/poster-nick.webp', 900)}
                alt="New Super Nick Bruce poster: Nick stands in the rain as lightning crackles from his hand"
                loading="lazy"
                className="w-full rounded-xl border border-white/10 shadow-2xl"
              />
            </div>
            <div>
              <SpacedHeading id="synopsis-heading">PLOT SYNOPSIS</SpacedHeading>
              <div className="mt-3 h-px w-24 bg-gradient-to-r from-primary to-accent" />
              <p className="mt-8 max-w-reading text-lg leading-relaxed text-foreground/85 sm:text-xl">
                {film.synopsis}
              </p>
              <dl className="mt-10 grid max-w-reading grid-cols-3 gap-4 border-t border-white/10 pt-6 font-condensed uppercase">
                <div>
                  <dt className="text-xs tracking-[0.25em] text-muted-foreground">
                    Premiere
                  </dt>
                  <dd className="mt-1 text-lg font-semibold tracking-wider">
                    Dec 4, 2026
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.25em] text-muted-foreground">
                    Watch on
                  </dt>
                  <dd className="mt-1 text-lg font-semibold tracking-wider">
                    YouTube
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.25em] text-muted-foreground">
                    Studio
                  </dt>
                  <dd className="mt-1 text-lg font-semibold tracking-wider">
                    {film.studio}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Cast */}
        <section
          id="cast"
          aria-labelledby="cast-heading"
          className="scroll-mt-16 py-20 sm:py-28"
        >
          <div className="mx-auto max-w-content px-4 sm:px-6">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <SpacedHeading id="cast-heading">CAST</SpacedHeading>
              <p className="text-muted-foreground">
                Tap a poster to see it full size.
              </p>
            </div>
            <CastGrid members={cast} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="rain relative border-t border-white/5 bg-card/40">
        <div className="mx-auto flex max-w-content flex-col items-center gap-8 px-4 py-16 text-center sm:px-6">
          <img
            src={img('/img/title-logo.png', 700)}
            alt={film.title}
            loading="lazy"
            className="w-64 sm:w-80"
          />
          <PremiereBadge />
          <ul className="flex items-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${film.studio} on ${s.label}`}
                  className="flex size-11 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <SocialIcon name={s.icon} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              {film.studio} · Contact for information:{' '}
              <a
                href={film.contactPhoneHref}
                className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline"
              >
                <Phone className="size-3.5" aria-hidden />
                {film.contactPhone}
              </a>
            </p>
            <p>© 2026 {film.studio}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
