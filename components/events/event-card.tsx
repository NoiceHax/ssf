import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import type { SiteEvent } from "@/src/data/events";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

type EventCardProps = {
  event: SiteEvent;
  priority?: boolean;
};

export function EventCard({ event, priority = false }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.slug}`}
      aria-label={`View event: ${event.title}`}
      className="group flex h-full w-full min-h-0 flex-col overflow-hidden bg-surface-container-lowest border border-outline-variant transition-all duration-300 hover:-translate-y-1 hover:border-primary editorial-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface-container-high">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={`${event.title} cover`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <ImagePlaceholder className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 font-body text-label-md font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
          {event.id}
        </span>
      </div>

      <div className="flex min-h-[11rem] flex-1 flex-col gap-4 p-6 md:min-h-[12rem] md:p-8">
        {event.date && (
          <p className="inline-flex shrink-0 items-center gap-1.5 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
            <Calendar size={14} /> {event.date}
          </p>
        )}
        <h3 className="min-h-[3.25rem] flex-1 font-headline text-xl leading-tight text-primary md:min-h-[4rem] md:text-2xl lg:min-h-[4.5rem] lg:text-headline-sm">
          {event.title}
        </h3>

        <div className="mt-auto inline-flex items-center gap-2 font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
          View Event
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
