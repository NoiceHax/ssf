import type { Metadata } from "next";
import { UpcomingEvents } from "@/components/events/upcoming-events";

export const metadata: Metadata = {
  title: "Upcoming Events | Sneha Sammilana Foundation",
  description:
    "Drives, camps, and gatherings the Sneha Sammilana Foundation has planned. Join us at an upcoming event.",
};

export default function UpcomingPage() {
  return (
    <>
      <section className="bg-surface pt-16 pb-4 md:pt-24 md:pb-6 lg:pt-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
            Looking Ahead
          </span>
          <h1 className="mt-4 max-w-3xl font-headline text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-headline-display text-primary">
            Upcoming Events
          </h1>
          <p className="mt-6 max-w-xl font-body text-body-md md:text-body-lg text-on-surface-variant">
            Every gathering is a chance to give back together. Here&rsquo;s
            what we&rsquo;re planning next &mdash; we&rsquo;d love to see you
            there.
          </p>
        </div>
      </section>
      <UpcomingEvents />
    </>
  );
}
