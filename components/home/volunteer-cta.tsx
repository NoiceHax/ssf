import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function VolunteerCta() {
  return (
    <section className="px-5 pb-20 md:px-8 md:pb-28 lg:px-margin-desktop lg:pb-section-gap">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-outline-variant bg-surface-container-low p-8 sm:p-12 md:p-16 lg:p-24 xl:p-32">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 translate-x-1/2 rounded-full bg-secondary-fixed opacity-25 blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="mb-6 font-headline text-3xl leading-tight md:text-4xl lg:text-headline-lg text-primary md:mb-8">
              Your Presence is a Gift to the Community
            </h2>
            <p className="mb-10 font-body text-body-md md:text-body-lg text-on-surface-variant md:mb-12">
              Whether it&rsquo;s an hour of mentoring or a contribution towards
              an eye camp, your support fuels the spirit of Sammilana.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/donate">
                <Button variant="primary" size="lg">
                  Volunteer Today
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline" size="lg">
                  Support Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
