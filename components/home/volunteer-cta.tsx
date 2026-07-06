import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function VolunteerCta() {
  return (
    <section className="px-5 pb-20 md:px-8 md:pb-28 lg:px-margin-desktop lg:pb-20">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-on-primary sm:p-12 md:p-16 lg:p-24 xl:p-32">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 translate-x-1/3 rounded-full bg-secondary-fixed opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-0 h-64 w-64 rounded-full bg-primary-fixed opacity-10 blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="mb-6 font-headline text-3xl leading-tight text-on-primary md:mb-8 md:text-4xl lg:text-headline-lg">
              Your Presence is a Gift to the Community
            </h2>
            <p className="mb-10 font-body text-body-md text-on-primary/75 md:mb-12 md:text-body-lg">
              Whether it&rsquo;s an hour of mentoring or a contribution towards
              an eye camp, your support fuels the spirit of Sammilana.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/donate#contact-trustee">
                <Button variant="secondary" size="lg">
                  Volunteer Today
                </Button>
              </Link>
              <Link href="/donate#bank-details">
                <Button variant="ghost" size="lg">
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
