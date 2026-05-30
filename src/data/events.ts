import manifest from "./events-manifest.json";
import { manualEvents } from "./manual-events";

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

const manifestEvents = manifest as SiteEvent[];
const manifestIds = new Set(manifestEvents.map((e) => e.id));

// Merge auto-discovered events with the hand-listed ones. The generated
// manifest always wins: if an event's photos get uploaded later, its manifest
// entry supersedes the manual placeholder of the same id. Sorted newest-first.
const events: SiteEvent[] = [
  ...manifestEvents,
  ...manualEvents.filter((e) => !manifestIds.has(e.id)),
].sort((a, b) => b.eventNumber - a.eventNumber);

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
