import { UtensilsCrossed, MapPin, CalendarClock, Heart } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function Annadhanam() {
  return (
    <section className="bg-surface py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <Reveal>
          <div className="relative overflow-hidden border border-secondary/20 bg-gradient-to-br from-secondary-fixed/30 via-surface-container-lowest to-secondary-fixed/10 p-8 md:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary-fixed opacity-20 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-gutter">
              <div className="lg:col-span-7">
                <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
                  Weekly Initiative
                </span>
                <h2 className="mt-3 font-headline text-2xl leading-tight text-primary md:text-3xl lg:text-headline-md">
                  Every Saturday, We Serve
                </h2>
                <p className="mt-4 max-w-2xl font-body text-body-md leading-relaxed text-on-surface-variant md:text-body-lg">
                  Sneha Sammilana Foundation organizes the distribution of free
                  meals every Saturday at Rama Temple, Sarjapura for
                  all devotees. This sacred act of
                  serving food symbolizes compassion, dignity, and community
                  spirit.
                </p>
                <p className="mt-3 max-w-2xl font-body text-body-md leading-relaxed text-on-surface-variant italic">
                  Join us in this noble cause to spread joy and sustenance to
                  those in need. Together, let&rsquo;s make a difference, one
                  meal at a time.
                </p>
              </div>

              <div className="flex flex-col justify-center gap-5 lg:col-span-5">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed/50 text-secondary">
                    <CalendarClock size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-body text-label-md font-semibold uppercase tracking-widest text-primary">
                      Every Saturday
                    </p>
                    <p className="mt-0.5 font-body text-body-md text-on-surface-variant">
                      Weekly meal distribution
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed/50 text-secondary">
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-body text-label-md font-semibold uppercase tracking-widest text-primary">
                      Rama Temple, Sarjapura
                    </p>
                    <p className="mt-0.5 font-body text-body-md text-on-surface-variant">
                      Bengaluru, Karnataka
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed/50 text-secondary">
                    <Heart size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-body text-label-md font-semibold uppercase tracking-widest text-primary">
                      Free Meals
                    </p>
                    <p className="mt-0.5 font-body text-body-md text-on-surface-variant">
                      for all devotees
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed/50 text-secondary">
                    <UtensilsCrossed size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-body text-label-md font-semibold uppercase tracking-widest text-primary">
                      Annadhanam Initiative
                    </p>
                    <p className="mt-0.5 font-body text-body-md text-on-surface-variant">
                      Compassion through community service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
