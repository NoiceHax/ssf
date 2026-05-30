import { CalendarClock, MapPin } from "lucide-react";
import { getUpcomingEvents } from "@/src/data/upcoming-events";

export function UpcomingEvents() {
  const events = getUpcomingEvents();

  return (
    <section
      aria-label="Upcoming events"
      className="bg-surface pb-20 pt-6 md:pb-28 md:pt-8 lg:pb-section-gap"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        {events.length === 0 ? (
          <div className="flex flex-col items-start gap-4 border border-dashed border-outline-variant bg-surface-container-lowest p-8 md:flex-row md:items-center md:gap-6 md:p-10">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-fixed/40 text-secondary">
              <CalendarClock size={24} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-headline text-headline-sm text-primary">
                Nothing on the calendar just yet
              </p>
              <p className="mt-1 font-body text-body-md text-on-surface-variant">
                New drives, camps, and gatherings are announced here as soon as
                they&rsquo;re planned. Check back soon.
              </p>
            </div>
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-gutter lg:grid-cols-3"
          >
            {events.map((event) => (
              <li
                key={event.id}
                className="flex h-full flex-col gap-4 border border-outline-variant bg-surface-container-lowest p-6 editorial-shadow md:p-8"
              >
                <p className="inline-flex items-center gap-1.5 font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
                  <CalendarClock size={14} /> {event.date}
                </p>
                <h3 className="font-headline text-xl md:text-2xl lg:text-headline-sm text-primary leading-tight">
                  {event.title}
                </h3>
                {event.location && (
                  <p className="inline-flex items-center gap-1.5 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
                    <MapPin size={14} /> {event.location}
                  </p>
                )}
                {event.description && (
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {event.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
