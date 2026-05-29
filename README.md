# Sneha Sammilana Foundation — Website

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

Open [http://localhost:3000](http://localhost:3000).

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

## Adding Events to the Archive

Each historical event lives under `public/events/<slug>/` and is registered in
`lib/events.ts`:

```
public/events/
  community-eye-camp-2023/
    01.jpg
    02.jpg
    ...
```

Add a new entry to `pastEvents` with the same slug and a `photos` array. The
Previous Events section lazily mounts each event card as it scrolls into view,
so the page stays light even with many photo-heavy events.

## Design Notes

- Desktop PNGs are the primary source of truth; mobile is a responsive
  adaptation of the desktop identity (not a separate design).
- The Material-3 token names from the Stitch theme are preserved as Tailwind
  colors (e.g. `bg-surface-container-low`, `text-on-primary-container`) so the
  generated code reads close to the original intent.
- All section transitions use a single `Reveal` component (in-view fade + rise)
  rather than scattered Framer Motion calls — animations stay subtle.
- Images are served via `next/image` with the Google-hosted Stitch URLs allowed
  in `next.config.mjs`.
