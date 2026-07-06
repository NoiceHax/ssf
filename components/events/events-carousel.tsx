"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { eventsCarouselSlides } from "@/src/data/events-carousel";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5000;

export function EventsCarousel() {
  const slides = eventsCarouselSlides;
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((current) => (current + 1) % count),
    [count]
  );
  const prev = useCallback(
    () => setIndex((current) => (current - 1 + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [next, paused]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights from foundation events"
      className="relative w-full overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9] md:aspect-[24/9]">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              unoptimized
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-primary/30" />

        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 md:bottom-6 md:left-8 md:right-8 lg:px-margin-desktop lg:left-0 lg:right-0 lg:mx-auto lg:max-w-7xl">
          <p className="max-w-md font-body text-label-md uppercase tracking-widest text-white/90">
            {slides[index].eventId}
            <span className="mx-2 text-white/40">·</span>
            <span className="normal-case tracking-normal text-white/75">
              {slides[index].alt}
            </span>
          </p>

          <div
            className="hidden shrink-0 items-center gap-2 sm:flex"
            role="group"
            aria-label="Carousel controls"
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-primary/40 text-white backdrop-blur-sm transition-colors hover:bg-primary/60"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-primary/40 text-white backdrop-blur-sm transition-colors hover:bg-primary/60"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-5"
        role="tablist"
        aria-label="Choose slide"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1} of ${count}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-8 bg-secondary" : "w-1.5 bg-white/45 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </section>
  );
}
