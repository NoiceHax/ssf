import type { Metadata } from "next";
import { UpcomingEvents } from "@/components/events/upcoming-events";

export const metadata: Metadata = {
  title: "Recent & Upcoming Events | Sneha Sammilana Foundation",
  description:
    "See the Sneha Sammilana Foundation's most recent gathering and what's planned next. Join us at an upcoming drive or camp.",
};

export default function UpcomingPage() {
  return (
    <>
      <section className="bg-surface pt-12 pb-2 md:pt-16 md:pb-4 lg:pt-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
            Looking Ahead
          </span>
          <h1 className="mt-3 max-w-3xl font-headline text-4xl leading-tight text-primary sm:text-5xl md:text-6xl lg:text-headline-display">
            Recent &amp; Upcoming Events
          </h1>
          <p className="mt-4 max-w-xl font-body text-body-md text-on-surface-variant md:text-body-lg">
            Catch up on our latest gathering and see what we&rsquo;re planning
            next. We&rsquo;d love to see you there.
          </p>
        </div>
      </section>
      <UpcomingEvents />
    </>
  );
}
