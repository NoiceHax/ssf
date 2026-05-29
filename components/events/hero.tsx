import Image from "next/image";
import { ImageOff } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/section";
import { getAllEvents } from "@/src/data/events";

export function EventsHero() {
  // Derive the hero image from the most recent event's cover — no hardcoded paths.
  const heroImage = getAllEvents().find((e) => e.coverImage)?.coverImage ?? null;

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 lg:pb-section-gap">
      <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-gutter px-5 md:px-8 lg:px-margin-desktop">
        <div className="z-10 col-span-12 lg:col-span-7">
          <SectionEyebrow>Gatherings &amp; Purpose</SectionEyebrow>
          <h1 className="mt-4 mb-6 font-headline text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-headline-display text-primary">
            Community Gatherings
          </h1>
          <p className="max-w-xl font-body text-body-md md:text-body-lg text-on-surface-variant">
            Our events are more than just items on a calendar; they are threads
            that weave our community closer together. Join us in creating a
            legacy of kindness.
          </p>
        </div>
        <div className="relative col-span-12 mt-12 lg:col-span-5 lg:mt-0">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container-high">
            {heroImage ? (
              <Image
                src={heroImage}
                alt="A gathering from one of the foundation's community events."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-on-surface-variant/40">
                <ImageOff size={64} strokeWidth={1.25} />
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute -bottom-8 -left-8 -z-10 h-48 w-48 bg-secondary-fixed opacity-40" />
        </div>
      </div>
    </section>
  );
}
