import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SiteEvent } from "@/src/data/events";

type EventNavProps = {
  older?: SiteEvent;
  newer?: SiteEvent;
};

function NavLink({
  event,
  direction,
}: {
  event: SiteEvent;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group flex flex-1 flex-col gap-2 border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary editorial-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:p-8 ${
        isPrev ? "items-start text-left" : "items-end text-right"
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 font-body text-label-md font-semibold uppercase tracking-widest text-secondary ${
          isPrev ? "" : "flex-row-reverse"
        }`}
      >
        {isPrev ? (
          <ArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
        ) : (
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
        {isPrev ? "Previous Event" : "Next Event"}
      </span>
      <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
        {event.id}
        {event.date ? ` · ${event.date}` : ""}
      </span>
      <span className="font-headline text-lg leading-tight text-primary md:text-xl">
        {event.title}
      </span>
    </Link>
  );
}

export function EventNav({ older, newer }: EventNavProps) {
  if (!older && !newer) return null;

  return (
    <nav
      aria-label="Event navigation"
      className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28 lg:px-margin-desktop lg:pb-20"
    >
      <div className="mb-6 border-t border-outline-variant pt-10 md:mb-8">
        <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
          Keep Exploring
        </span>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {/* Previous = the older (preceding) event */}
        {older ? <NavLink event={older} direction="prev" /> : <div className="flex-1" />}
        {/* Next = the newer event */}
        {newer ? <NavLink event={newer} direction="next" /> : <div className="flex-1" />}
      </div>
    </nav>
  );
}
