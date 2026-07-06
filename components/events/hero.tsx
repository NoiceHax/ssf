import { SectionEyebrow } from "@/components/ui/section";
import {
  EventsCarouselBanner,
  EventsCarouselHero,
} from "@/components/events/events-carousel";

export function EventsHero() {
  return (
    <>
      <EventsCarouselBanner />

      <section className="relative overflow-hidden pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-20">
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

          <div className="relative col-span-12 mt-12 hidden lg:col-span-5 lg:mt-0 lg:block">
            <EventsCarouselHero />
            <div className="pointer-events-none absolute -bottom-8 -left-8 -z-10 h-48 w-48 bg-secondary-fixed opacity-40" />
          </div>
        </div>
      </section>
    </>
  );
}
