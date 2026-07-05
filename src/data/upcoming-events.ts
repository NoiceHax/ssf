/**
 * Upcoming (future) events.
 *
 * Past events are auto-discovered from the GitHub assets repo, but future events
 * have no photos yet, so they're listed here by hand. Add an entry to announce
 * an event; remove it (or move the photos into the assets repo) once it's done.
 *
 * Leaving the array empty is fine, the Upcoming Events section shows a tasteful
 * "nothing scheduled" state.
 */

export type UpcomingEvent = {
  /** Short, stable id used as the React key. */
  id: string;
  title: string;
  /** Human-readable date, e.g. "15 Aug 2026" or "August 2026". */
  date: string;
  location?: string;
  description?: string;
};

export const upcomingEvents: UpcomingEvent[] = [
  // Example (delete or replace):
  // {
  //   id: "U01",
  //   title: "Annual School Material Distribution",
  //   date: "15 Aug 2026",
  //   location: "Sarjapura Cluster, Bengaluru",
  //   description:
  //     "Distribution of study kits and uniforms across government schools.",
  // },
];

import { loadLocalUpcomingEvents } from "./local-events-loader";

export function getUpcomingEvents(): UpcomingEvent[] {
  const local = loadLocalUpcomingEvents();
  if (local.length > 0) return local;
  return upcomingEvents;
}
