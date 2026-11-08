# New Super Nick Bruce

The official website for **New Super Nick Bruce**, a cinematic superhero film by Nick Bruce Productions. It premieres **only on YouTube on December 4, 2026 (12.4.26)**.

The site is a single cinematic page with:

- A hero with the film's key art, title treatment and a live countdown to the premiere
- The official trailer, which loads only when the visitor presses play
- The plot synopsis alongside the main poster
- The cast, shown as character posters that open full size
- Links to Instagram, YouTube and TikTok, plus contact information

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19, Vite) with Tailwind CSS 4
- Hosted on Netlify. Images are resized and converted to WebP by the Netlify Image CDN.

## Editing content

Copy, cast, links, the premiere date and the trailer ID are all in `src/content/film.ts`. Artwork is in `public/img/`.

## Running locally

```bash
pnpm install
netlify dev      # or: pnpm dev
```
