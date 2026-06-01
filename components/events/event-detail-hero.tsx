import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import type { SiteEvent } from "@/src/data/events";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function EventDetailHero({ event }: { event: SiteEvent }) {
  return (
    <header className="relative w-full overflow-hidden bg-primary">
      <div className="relative aspect-[16/10] w-full md:aspect-[21/9] lg:aspect-[24/9]">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={`${event.title} cover`}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/10" />
      </div>

      <div className="absolute inset-x-0 top-6 z-10 mx-auto max-w-7xl px-5 md:top-8 md:px-8 lg:px-margin-desktop">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 rounded-full bg-surface/90 px-4 py-2 font-body text-label-md font-semibold uppercase tracking-widest text-primary backdrop-blur-md transition-all hover:bg-surface"
        >
          <ArrowLeft size={16} /> All Events
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-16 lg:px-margin-desktop lg:pb-20">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-label-md uppercase tracking-widest text-on-primary/80">
            <span>{event.id}</span>
            {event.date && (
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} /> {event.date}
              </span>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl font-headline text-3xl leading-tight text-on-primary md:text-5xl lg:text-headline-display">
            {event.title}
          </h1>
        </div>
      </div>
    </header>
  );
}
