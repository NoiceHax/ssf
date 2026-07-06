import Link from "next/link";
import { EventCard } from "@/components/events/event-card";
import { EventLayoutCard } from "@/components/events/event-layout-card";
import { Reveal } from "@/components/ui/reveal";
import { getAllEvents } from "@/src/data/events";
import { getUpcomingEvents } from "@/src/data/upcoming-events";

function ComingSoonCard({ label }: { label: string }) {
  return (
    <EventLayoutCard
      badge="Soon"
      title="Coming soon"
      description={label}
    />
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
                <Reveal delay={0.06}>
                  <ComingSoonCard label="Our latest gathering will be posted here shortly." />
                </Reveal>
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
                <Reveal delay={0.06}>
                  <ComingSoonCard label="New drives, camps, and gatherings will be announced here as soon as they are planned." />
                </Reveal>
              ) : (
                <ul role="list" className="flex flex-col gap-4 md:gap-5">
                  {upcoming.map((event, i) => (
                    <Reveal key={event.id} delay={i * 0.08}>
                      <li>
                        <EventLayoutCard
                          badge={event.id}
                          title={event.title}
                          date={event.date}
                          location={event.location}
                          description={event.description}
                        />
                      </li>
                    </Reveal>
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
