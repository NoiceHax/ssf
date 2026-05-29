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
