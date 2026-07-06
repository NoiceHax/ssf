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
  const [active, setActive] = useState(false);

  const next = useCallback(
    () => setIndex((current) => (current + 1) % count),
    [count]
  );
  const prev = useCallback(
    () => setIndex((current) => (current - 1 + count) % count),
    [count]
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setActive(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!active || paused) return;
    const id = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [next, paused, active]);

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Highlights from foundation events"
      className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container-high"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
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
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      ))}

      <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-surface/90 px-3 py-1.5 font-body text-label-md font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
        {slides[index].eventId}
      </span>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary/50 text-white backdrop-blur-sm transition-colors hover:bg-primary/70"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary/50 text-white backdrop-blur-sm transition-colors hover:bg-primary/70"
      >
        <ChevronRight size={18} />
      </button>

      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
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
              i === index ? "w-6 bg-secondary" : "w-1.5 bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </div>
  );
}
