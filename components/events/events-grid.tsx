import { getAllEvents } from "@/src/data/events";
import { EventsGridClient } from "./events-grid-client";

export function EventsGrid() {
  const events = getAllEvents();

  return (
    <section
      aria-labelledby="archive-heading"
      className="bg-surface pb-24 md:pb-32 lg:pb-section-gap"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
              The Archive
            </span>
            <h2
              id="archive-heading"
              className="mt-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary"
            >
              Every Gathering, Remembered
            </h2>
          </div>
          <p className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
            {events.length} Events
          </p>
        </div>

        {events.length === 0 ? (
          <p className="font-body text-body-md text-on-surface-variant">
            No events published yet. Add event folders to the assets repository
            and redeploy to see them here.
          </p>
        ) : (
          <EventsGridClient events={events} />
        )}
      </div>
    </section>
  );
}
