import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/src/data/events";
import { EventDetailHero } from "@/components/events/event-detail-hero";
import { PhotoGallery } from "@/components/events/photo-gallery";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const event = getEventBySlug(params.slug);
  if (!event) return { title: "Event not found | Sneha Sammilana" };
  return {
    title: `${event.title} | Sneha Sammilana Foundation`,
    description: event.date
      ? `${event.title} ${event.date}`
      : event.title,
  };
}

export default function EventDetailPage({ params }: { params: Params }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();

  return (
    <article className="bg-surface">
      <EventDetailHero event={event} />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20 lg:px-margin-desktop lg:py-24">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
          <span>{event.id}</span>
          {event.date && <span>{event.date}</span>}
          <span>
            {event.galleryImages.length} photo
            {event.galleryImages.length === 1 ? "" : "s"}
          </span>
        </div>
        <h2 className="mt-4 max-w-4xl font-headline text-2xl text-primary md:text-3xl lg:text-headline-md">
          {event.title}
        </h2>

        {event.description && event.description.length > 0 && (
          <div className="mt-8 max-w-3xl space-y-5 font-body text-body-md text-on-surface-variant leading-relaxed md:mt-10 md:text-body-lg">
            {event.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </section>

      {event.galleryImages.length > 0 && (
        <section
          aria-labelledby="gallery-heading"
          className="pb-20 md:pb-28 lg:pb-section-gap"
        >
          <div className="mx-auto mb-8 max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
            <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
              Photo Archive
            </span>
            <h2
              id="gallery-heading"
              className="mt-3 font-headline text-2xl md:text-3xl lg:text-headline-md text-primary"
            >
              From the day
            </h2>
            <p className="mt-2 font-body text-body-md text-on-surface-variant">
              Drag horizontally to walk through the gallery.
            </p>
          </div>

          <div className="pl-5 md:pl-8 lg:pl-margin-desktop">
            <PhotoGallery
              photos={event.galleryImages}
              eventTitle={event.title}
              ariaLabel={`${event.title} photos`}
            />
          </div>
        </section>
      )}
    </article>
  );
}
