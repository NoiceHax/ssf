import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/src/data/testimonials";

export function Testimonials() {
  // Duplicate the list so the marquee loops seamlessly (translate -50%).
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-primary py-20 text-on-primary md:py-28 lg:py-20"
    >
      <div className="mx-auto mb-12 max-w-7xl px-5 md:mb-16 md:px-8 lg:px-margin-desktop">
        <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary-fixed-dim">
          In Their Words
        </span>
        <h2
          id="testimonials-heading"
          className="mt-3 max-w-3xl font-headline text-3xl md:text-4xl lg:text-headline-lg text-on-primary"
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
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-primary to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-primary to-transparent md:w-32" />

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
      className="flex w-[88vw] shrink-0 flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:w-[440px] md:w-[480px] md:p-10 lg:w-[520px]"
    >
      <Quote
        size={28}
        strokeWidth={1.5}
        className="text-secondary-fixed-dim"
        aria-hidden="true"
      />
      <p className="font-body text-body-md leading-relaxed text-on-primary/85 md:text-body-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto border-t border-white/10 pt-5">
        <p className="font-headline text-base font-semibold text-on-primary">
          {testimonial.author}
        </p>
        <p className="mt-1 font-body text-label-md uppercase tracking-widest text-on-primary/60">
          {[testimonial.role, testimonial.organization]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </li>
  );
}
