# Sneha Sammilana Foundation, Website

A production-quality Next.js implementation of the Sneha Sammilana
Foundation marketing site, rebuilt from Stitch designs.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with a custom Material-3-inspired design token system
- **Animation:** Framer Motion (subtle in-view reveals only)
- **Icons:** lucide-react
- **Fonts:** Literata (headlines) + Be Vietnam Pro (body), loaded via `next/font`

## Pages

| Route | Source design |
| --- | --- |
| `/` | `sneha_sammilana_homepage` |
| `/about` | `sneha_sammilana_about_us` |
| `/events` | `sneha_sammilana_events` |
| `/donate` | `sneha_sammilana_donate_contact` |

Each route ships with a dedicated `loading.tsx` skeleton that mirrors the
final layout.

## Structure

```
app/                  # App Router pages, layouts, and route-level loading states
components/
  ui/                 # Button, Section, Reveal primitives
  skeletons/          # Reusable skeleton blocks
  home/               # Home page sections
  about/              # About page sections
  events/             # Events page sections
  donate/             # Donate/Contact page sections
  navbar.tsx
  footer.tsx
lib/
  utils.ts            # `cn` helper
  images.ts           # Image asset URLs
```

## Getting Started

```bash
npm install
npm run dev
```

Open [https://snehasammilana.in](https://snehasammilana.in).

## Brand Assets

Logo and favicon paths are centralized in `lib/brand.ts`:

```ts
export const brand = {
  logoPath: "/brand/logo.svg",
  faviconPath: "/favicon.ico",
  ...
};
```

Until the real assets are dropped into `public/`, the `<Logo>` component
gracefully falls back to a styled wordmark. Replace the files and the rest of
the app picks them up automatically.

## Event Media, GitHub + CDN

Event photos are **not** stored in this repo. They live in a dedicated,
free assets repository and are served through a CDN:

```
GitHub repo (e.g. noicehax/ssfimages)  ->  Statically CDN  ->  next/image
```

- **Config:** `src/config/cdn.ts` defines `CDN_BASE_URL` and the helpers every
  URL derives from. Override the target repo/branch with env vars (see
  `.env.example`): `NEXT_PUBLIC_GH_USERNAME`, `NEXT_PUBLIC_GH_REPO`,
  `NEXT_PUBLIC_GH_BRANCH`.
- **Delivery:** [Statically.io](https://statically.io), a free CDN that serves
  files straight from GitHub with **no repo size limit**. (jsDelivr was the
  original plan but caps GitHub repos at 50 MB; this 700 MB+ library exceeds
  it.) Swapping CDN providers (e.g. Cloudflare Pages) is a one-line change to
  `CDN_BASE_URL`.
- **Discovery:** `scripts/generate-events.mjs` runs at build time (wired into
  `npm run dev`/`npm run build`). It enumerates the assets repo via the GitHub
  REST git-tree API and writes `src/data/events-manifest.json` with ready-made
  CDN URLs. No filesystem access to the assets repo at runtime, works on
  Vercel. Set `GITHUB_TOKEN` to raise the API rate limit if needed.
- **Source of truth:** event folder names. Format `E<number> <Title> [date]`.
  The first image (natural sort) is the cover; the rest is the gallery.

### Adding a new event (zero code changes)

1. Compress images to WebP.
2. Create `events/E27 Event Name/` in the assets repo.
3. Add `img_001.webp`, `img_002.webp`, ...
4. Push the assets repo and redeploy the site.

The event appears automatically, no manual paths, no registration. A scaffold
for the assets repo lives in `ssfimages/` (move it out to its own GitHub repo).

The events grid renders the latest 8 events and progressively loads older ones
(8 at a time) behind a **View Older Events** button; all images use `next/image`
with lazy loading to stay light even with many photo-heavy events.

## Design Notes

- Desktop PNGs are the primary source of truth; mobile is a responsive
  adaptation of the desktop identity (not a separate design).
- The Material-3 token names from the Stitch theme are preserved as Tailwind
  colors (e.g. `bg-surface-container-low`, `text-on-primary-container`) so the
  generated code reads close to the original intent.
- All section transitions use a single `Reveal` component (in-view fade + rise)
  rather than scattered Framer Motion calls, animations stay subtle.
- Images are served via `next/image` with the Google-hosted Stitch URLs allowed
  in `next.config.mjs`.
