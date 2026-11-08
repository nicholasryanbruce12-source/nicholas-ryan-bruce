import { useEffect, useState } from 'react'
import { Play, X } from 'lucide-react'

import { film, img, type CastMember } from '@/content/film'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

/* ------------------------------------------------------------------ */
/* Social icons (brand marks are not in lucide, so they are inline)    */
/* ------------------------------------------------------------------ */

export function SocialIcon({
  name,
  className,
}: {
  name: 'instagram' | 'youtube' | 'tiktok'
  className?: string
}) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
  } as const
  if (name === 'instagram') {
    return (
      <svg {...common}>
        <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.75.07-.98.04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.3.88-.34 1.86C3.1 8.5 3.1 8.85 3.1 12s0 3.5.07 4.75c.04.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.88.3 1.86.34 1.24.06 1.6.07 4.75.07s3.5 0 4.75-.07c.98-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.3-.88.34-1.86.06-1.24.07-1.6.07-4.75s0-3.5-.07-4.75c-.04-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.35-.14-.88-.3-1.86-.34C15.5 4 15.15 4 12 4Zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86Zm0 8.13a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.27-8.33a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
      </svg>
    )
  }
  if (name === 'youtube') {
    return (
      <svg {...common}>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.37-2.48V9.66a5.68 5.68 0 0 0-.77-.05 5.69 5.69 0 0 0-5.69 5.69A5.69 5.69 0 0 0 9.86 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Premiere countdown                                                  */
/* ------------------------------------------------------------------ */

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

function getRemaining(target: number): Remaining | null {
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const target = new Date(film.premiereISO).getTime()
  // Start empty so server and client render the same markup, then tick on the client.
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(
    undefined,
  )

  useEffect(() => {
    setRemaining(getRemaining(target))
    const id = window.setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  if (remaining === null) {
    return (
      <a
        href={`https://www.youtube.com/watch?v=${film.trailerYouTubeId}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 font-condensed text-lg font-semibold tracking-[0.3em] text-bolt uppercase hover:underline"
      >
        Now streaming on YouTube
      </a>
    )
  }

  const units: [string, number | undefined][] = [
    ['Days', remaining?.days],
    ['Hours', remaining?.hours],
    ['Min', remaining?.minutes],
    ['Sec', remaining?.seconds],
  ]

  return (
    <div
      className="flex gap-2 sm:gap-3"
      role="timer"
      aria-label="Countdown to the YouTube premiere"
    >
      {units.map(([label, value]) => (
        <div
          key={label}
          className="min-w-16 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-center backdrop-blur-sm sm:min-w-20"
        >
          <div className="font-display text-3xl leading-none tabular-nums sm:text-4xl">
            {value === undefined ? '--' : String(value).padStart(2, '0')}
          </div>
          <div className="mt-1 font-condensed text-[0.65rem] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Trailer: loads the YouTube player only when the visitor hits play   */
/* ------------------------------------------------------------------ */

export function Trailer() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_80px_-20px_var(--primary)]">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${film.trailerYouTubeId}?autoplay=1&rel=0`}
          title={`${film.title} — official trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring"
          aria-label="Play the official trailer"
        >
          <img
            src={img('/img/key-art.webp', 1280)}
            alt=""
            className="absolute inset-0 size-full object-cover object-[center_35%] opacity-70 transition-opacity duration-300 group-hover:opacity-90 motion-reduce:transition-none"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_40px_var(--primary)] transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none sm:size-24">
              <Play className="size-9 translate-x-0.5 fill-current sm:size-10" />
            </span>
            <span className="font-condensed text-sm font-semibold tracking-[0.35em] text-white uppercase">
              Play official trailer
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cast gallery with full-size character poster on click               */
/* ------------------------------------------------------------------ */

export function CastGrid({ members }: { members: CastMember[] }) {
  const [active, setActive] = useState<CastMember | null>(null)

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {members.map((m) => (
          <li key={m.name}>
            <button
              type="button"
              onClick={() => setActive(m)}
              className="group block w-full cursor-pointer text-left focus-visible:outline-none"
              style={{ '--glow': m.glow } as React.CSSProperties}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-card transition duration-300 group-hover:border-[var(--glow)] group-hover:shadow-[0_0_40px_-8px_var(--glow)] group-focus-visible:ring-2 group-focus-visible:ring-ring motion-reduce:transition-none">
                <img
                  src={img(m.image, 640)}
                  alt={`${m.name} character poster`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="mt-3 flex items-start gap-3">
                <span
                  className="mt-1.5 h-4 w-1 shrink-0 rounded-full"
                  style={{ background: m.glow }}
                  aria-hidden
                />
                <div>
                  <p className="font-display text-xl tracking-[0.12em] sm:text-2xl">
                    {m.name}
                  </p>
                  {m.role && (
                    <p className="font-condensed text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-sm">
                      {m.role}
                    </p>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[min(92vw,42rem)] gap-0 overflow-hidden border-white/10 bg-black p-0 sm:max-w-[min(92vw,42rem)]"
        >
          {active && (
            <>
              <img
                src={img(active.image, 1200)}
                alt={`${active.name} character poster`}
                className="aspect-square w-full object-cover"
              />
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <DialogTitle className="font-display text-3xl font-normal tracking-[0.12em]">
                    {active.name}
                  </DialogTitle>
                  <DialogDescription className="font-condensed text-sm font-semibold tracking-[0.2em] uppercase">
                    {active.role ?? 'Cast'} · {film.title}
                  </DialogDescription>
                </div>
                <DialogClose
                  className="rounded-full border border-white/15 p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
