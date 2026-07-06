"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { eventsCarouselSlides } from "@/src/data/events-carousel";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5000;

type CarouselQuery = "(min-width: 1024px)" | "(max-width: 1023px)";

function useEventsCarousel(query: CarouselQuery) {
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
    const mq = window.matchMedia(query);
    const update = () => setActive(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  useEffect(() => {
    if (!active || paused) return;
    const id = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [next, paused, active]);

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: (e: React.FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
        setPaused(false);
      }
    },
  };

  return { slides, count, index, setIndex, next, prev, pauseHandlers };
}

type SlideProps = {
  index: number;
  slideIndex: number;
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

function CarouselSlide({
  index,
  slideIndex,
  src,
  alt,
  sizes,
  priority,
}: SlideProps) {
  return (
    <div
      aria-hidden={slideIndex !== index}
      className={cn(
        "absolute inset-0 transition-opacity duration-700 ease-in-out",
        slideIndex === index ? "opacity-100" : "opacity-0"
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

type ControlsProps = {
  count: number;
  index: number;
  setIndex: (i: number) => void;
  next: () => void;
  prev: () => void;
  dotClass?: string;
  activeDotClass?: string;
};

function CarouselControls({
  count,
  index,
  setIndex,
  next,
  prev,
  dotClass = "bg-white/50 hover:bg-white/75",
  activeDotClass = "w-6 bg-secondary",
}: ControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary/50 text-white backdrop-blur-sm transition-colors hover:bg-primary/70 md:left-4"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary/50 text-white backdrop-blur-sm transition-colors hover:bg-primary/70 md:right-4"
      >
        <ChevronRight size={18} />
      </button>

      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
        role="tablist"
        aria-label="Choose slide"
      >
        {eventsCarouselSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1} of ${count}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? activeDotClass : cn("w-1.5", dotClass)
            )}
          />
        ))}
      </div>
    </>
  );
}

/** Portrait carousel for the hero column — desktop only. */
export function EventsCarouselHero() {
  const { slides, count, index, setIndex, next, prev, pauseHandlers } =
    useEventsCarousel("(min-width: 1024px)");

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Highlights from foundation events"
      className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container-high"
      {...pauseHandlers}
    >
      {slides.map((slide, i) => (
        <CarouselSlide
          key={slide.src}
          index={index}
          slideIndex={i}
          src={slide.src}
          alt={slide.alt}
          sizes="40vw"
          priority={i === 0}
        />
      ))}

      <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-surface/90 px-3 py-1.5 font-body text-label-md font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
        {slides[index].eventId}
      </span>

      <CarouselControls
        count={count}
        index={index}
        setIndex={setIndex}
        next={next}
        prev={prev}
      />
    </div>
  );
}

/** Full-width banner carousel — mobile only. */
export function EventsCarouselBanner() {
  const { slides, count, index, setIndex, next, prev, pauseHandlers } =
    useEventsCarousel("(max-width: 1023px)");

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights from foundation events"
      className="relative w-full overflow-hidden bg-primary lg:hidden"
      {...pauseHandlers}
    >
      <div className="relative aspect-[16/9] w-full">
        {slides.map((slide, i) => (
          <CarouselSlide
            key={slide.src}
            index={index}
            slideIndex={i}
            src={slide.src}
            alt={slide.alt}
            sizes="100vw"
            priority={i === 0}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-primary/30" />

        <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-surface/90 px-3 py-1.5 font-body text-label-md font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
          {slides[index].eventId}
        </span>

        <div className="absolute bottom-14 left-4 right-4 z-10 md:bottom-16 md:left-6 md:right-6">
          <p className="line-clamp-2 font-body text-body-sm text-white/85 md:text-body-md">
            {slides[index].alt}
          </p>
        </div>

        <CarouselControls
          count={count}
          index={index}
          setIndex={setIndex}
          next={next}
          prev={prev}
        />
      </div>
    </section>
  );
}

/** @deprecated Use EventsCarouselHero or EventsCarouselBanner */
export function EventsCarousel() {
  return <EventsCarouselHero />;
}
