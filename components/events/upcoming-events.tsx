import Link from "next/link";
import { CalendarClock, MapPin, Sparkles } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Reveal } from "@/components/ui/reveal";
import { getAllEvents } from "@/src/data/events";
import { getUpcomingEvents } from "@/src/data/upcoming-events";

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-start gap-3 border border-dashed border-outline-variant bg-surface-container-lowest p-5 md:flex-row md:items-center md:gap-5 md:p-6">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed/40 text-secondary md:h-12 md:w-12">
        <Sparkles size={20} strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-headline text-lg text-primary md:text-xl lg:text-headline-sm">
          Coming soon
        </p>
        <p className="mt-1 font-body text-body-sm text-on-surface-variant md:text-body-md">
          {label}
        </p>
      </div>
    </div>
  );
}

function UpcomingCard({
  event,
  index,
}: {
  event: ReturnType<typeof getUpcomingEvents>[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <li className="flex h-full flex-col gap-3 border border-outline-variant bg-surface-container-lowest p-5 editorial-shadow transition-transform duration-300 hover:-translate-y-0.5 md:gap-4 md:p-6">
        <p className="inline-flex items-center gap-1.5 font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
          <CalendarClock size={14} /> {event.date}
        </p>
        <h3 className="font-headline text-lg leading-tight text-primary md:text-xl lg:text-headline-sm">
          {event.title}
        </h3>
        {event.location && (
          <p className="inline-flex items-center gap-1.5 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
            <MapPin size={14} /> {event.location}
          </p>
        )}
        {event.description && (
          <p className="font-body text-body-sm leading-relaxed text-on-surface-variant md:text-body-md">
            {event.description}
          </p>
        )}
      </li>
    </Reveal>
  );
}

export function UpcomingEvents() {
  const recentEvent = getAllEvents()[0];
  const upcoming = getUpcomingEvents();

  return (
    <section aria-label="Recent and upcoming events" className="section-py bg-surface">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-gutter">
          <div>
            <Reveal>
              <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
                Just wrapped up
              </span>
              <h2 className="mt-2 font-headline text-2xl text-primary md:mt-3 md:text-3xl lg:text-headline-md">
                Recent Event
              </h2>
            </Reveal>

            <div className="mt-4 md:mt-6">
              {recentEvent ? (
                <Reveal delay={0.06}>
                  <EventCard event={recentEvent} priority />
                  <p className="mt-3 font-body text-body-sm text-on-surface-variant md:mt-4 md:text-body-md">
                    <Link
                      href="/events"
                      className="font-semibold text-secondary underline-offset-4 hover:underline"
                    >
                      Browse all past events
                    </Link>
                  </p>
                </Reveal>
              ) : (
                <ComingSoon label="Our latest gathering will be posted here shortly." />
              )}
            </div>
          </div>

          <div>
            <Reveal>
              <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
                On the horizon
              </span>
              <h2 className="mt-2 font-headline text-2xl text-primary md:mt-3 md:text-3xl lg:text-headline-md">
                Upcoming Events
              </h2>
            </Reveal>

            <div className="mt-4 md:mt-6">
              {upcoming.length === 0 ? (
                <ComingSoon label="New drives, camps, and gatherings will be announced here as soon as they are planned." />
              ) : (
                <ul role="list" className="flex flex-col gap-4 md:gap-5">
                  {upcoming.map((event, i) => (
                    <UpcomingCard key={event.id} event={event} index={i} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
