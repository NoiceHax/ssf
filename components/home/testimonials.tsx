import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/src/data/testimonials";

export function Testimonials() {
  // Duplicate the list so the marquee loops seamlessly (translate -50%).
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-surface-container-low py-20 md:py-28 lg:py-section-gap"
    >
      <div className="mx-auto mb-12 max-w-7xl px-5 md:mb-16 md:px-8 lg:px-margin-desktop">
        <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
          In Their Words
        </span>
        <h2
          id="testimonials-heading"
          className="mt-3 max-w-3xl font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary"
        >
          The community we serve, in their own words
        </h2>
      </div>

      <div
        className="group relative"
        role="region"
        aria-label="Testimonials carousel"
      >
        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-container-low to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-container-low to-transparent md:w-32" />

        <ul className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused] md:gap-8">
          {loop.map((t, i) => (
            <TestimonialCard
              key={`${t.id}-${i}`}
              testimonial={t}
              aria-hidden={i >= testimonials.length ? "true" : undefined}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  ...rest
}: {
  testimonial: Testimonial;
  "aria-hidden"?: "true" | undefined;
}) {
  return (
    <li
      {...rest}
      className="flex w-[88vw] shrink-0 flex-col gap-5 border border-outline-variant bg-surface-container-lowest p-8 sm:w-[440px] md:w-[480px] md:p-10 lg:w-[520px]"
    >
      <Quote
        size={28}
        strokeWidth={1.5}
        className="text-secondary"
        aria-hidden="true"
      />
      <p className="font-body text-body-md text-on-surface-variant leading-relaxed md:text-body-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto border-t border-outline-variant pt-5">
        <p className="font-headline text-base font-semibold text-primary">
          {testimonial.author}
        </p>
        <p className="mt-1 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
          {[testimonial.role, testimonial.organization]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </li>
  );
}
