import manifest from "./events-manifest.json";
import { loadLocalEvents } from "./local-events-loader";
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

function buildEvents(): SiteEvent[] {
  const manifestEvents = manifest as SiteEvent[];
  const manifestIds = new Set(manifestEvents.map((e) => e.id));

  // Merge auto-discovered events with the hand-listed ones. The generated
  // manifest always wins: if an event's photos get uploaded later, its manifest
  // entry supersedes the manual placeholder of the same id.
  const merged = [
    ...manifestEvents,
    ...manualEvents.filter((e) => !manifestIds.has(e.id)),
  ];

  // Local admin overlay (dev only, gitignored `.local/events.json`) takes
  // precedence over manifest/manual entries with the same id.
  const localEvents = loadLocalEvents();
  if (localEvents.length > 0) {
    const localIds = new Set(localEvents.map((e) => e.id));
    return [...localEvents, ...merged.filter((e) => !localIds.has(e.id))].sort(
      (a, b) => b.eventNumber - a.eventNumber
    );
  }

  return merged.sort((a, b) => b.eventNumber - a.eventNumber);
}

export function getAllEvents(): SiteEvent[] {
  return buildEvents();
}

export function getEventBySlug(slug: string): SiteEvent | undefined {
  return getAllEvents().find((e) => e.slug === slug);
}

export function getEventById(id: string): SiteEvent | undefined {
  return getAllEvents().find((e) => e.id === id);
}

export function getAllSlugs(): string[] {
  return getAllEvents().map((e) => e.slug);
}

/**
 * Adjacent events for prev/next navigation. The list is sorted newest-first, so
 * `newer` is the more recent event and `older` is the preceding one.
 */
export function getAdjacentEvents(slug: string): {
  newer?: SiteEvent;
  older?: SiteEvent;
} {
  const events = getAllEvents();
  const i = events.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return {
    newer: i > 0 ? events[i - 1] : undefined,
    older: i < events.length - 1 ? events[i + 1] : undefined,
  };
}
