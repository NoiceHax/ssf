import manifest from "./events-manifest.json";

export type SiteEvent = {
  id: string;
  eventNumber: number;
  title: string;
  slug: string;
  date?: string;
  coverImage: string | null;
  galleryImages: string[];
  description?: string[];
};

const events: SiteEvent[] = manifest as SiteEvent[];

export function getAllEvents(): SiteEvent[] {
  return events;
}

export function getEventBySlug(slug: string): SiteEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getAllSlugs(): string[] {
  return events.map((e) => e.slug);
}

/**
 * Adjacent events for prev/next navigation. The list is sorted newest-first, so
 * `newer` is the more recent event and `older` is the preceding one.
 */
export function getAdjacentEvents(slug: string): {
  newer?: SiteEvent;
  older?: SiteEvent;
} {
  const i = events.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return {
    newer: i > 0 ? events[i - 1] : undefined,
    older: i < events.length - 1 ? events[i + 1] : undefined,
  };
}
