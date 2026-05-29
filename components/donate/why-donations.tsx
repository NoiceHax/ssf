import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section";

export function WhyDonations() {
  return (
    <section className="bg-surface py-20 md:py-28 lg:py-section-gap">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-gutter">
          <Reveal className="lg:col-span-5">
            <SectionEyebrow>Why Donations Matter</SectionEyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
              Every contribution is a hand held out.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="space-y-6 font-body text-body-md md:text-body-lg text-on-surface-variant">
              <p>
                We do not run on grants or large institutional funding. Sneha
                Sammilana is sustained by friends, families, and well-wishers
                who choose to give, sometimes ₹500, sometimes ₹50,000, every
                month or just once a year.
              </p>
              <p>
                Your donation does not disappear into overhead. It pays for a
                child&rsquo;s school books, a grandmother&rsquo;s cataract
                surgery, a hot meal for a family that has lost work, a water
                filter that a village will use for a decade. We share where the
                money went, with names, dates, and photographs, in our annual
                community letter.
              </p>
              <blockquote className="border-l-2 border-secondary pl-6">
                <p className="italic text-primary">
                  &ldquo;We have never had to turn down a child from a scholarship
                  because of money. That is only because of the people who give
                  quietly, and again and again.&rdquo;
                </p>
                <footer className="mt-3 text-label-md uppercase tracking-widest text-secondary">
                  — Sneha Sammilana Founders
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
