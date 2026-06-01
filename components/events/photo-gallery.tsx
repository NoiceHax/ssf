"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type PhotoGalleryProps = {
  /** Array of image paths (e.g. from SiteEvent.galleryImages). */
  photos: string[];
  /** Event title used for alt text generation. */
  eventTitle?: string;
  /** ARIA label for the scrollable region. */
  ariaLabel?: string;
};

/** How many unique photos to load per batch. */
const BATCH_SIZE = 8;
/** Pause between batches so the browser is not flooded with requests. */
const BATCH_PAUSE_MS = 2500;

/**
 * Auto-sliding photo marquee. Images load in batches (8 at a time, then wait)
 * and use `unoptimized` because they are already on the CDN.
 */
export function PhotoGallery({ photos, eventTitle, ariaLabel }: PhotoGalleryProps) {
  const [loadCount, setLoadCount] = useState(() =>
    Math.min(BATCH_SIZE, photos.length)
  );

  useEffect(() => {
    let cancelled = false;
    let loaded = Math.min(BATCH_SIZE, photos.length);
    setLoadCount(loaded);

    const scheduleNextBatch = () => {
      if (cancelled || loaded >= photos.length) return;

      window.setTimeout(() => {
        if (cancelled) return;
        loaded = Math.min(loaded + BATCH_SIZE, photos.length);
        setLoadCount(loaded);
        scheduleNextBatch();
      }, BATCH_PAUSE_MS);
    };

    scheduleNextBatch();

    return () => {
      cancelled = true;
    };
  }, [photos]);

  const loop = useMemo(() => [...photos, ...photos], [photos]);

  if (photos.length === 0) return null;

  return (
    <div
      className="group relative overflow-hidden"
      role="region"
      aria-label={ariaLabel ?? "Event photo gallery"}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent md:w-32" />

      <ul className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused] md:gap-6">
        {loop.map((src, i) => {
          const photoIndex = i % photos.length;
          const ready = photoIndex < loadCount;

          return (
            <li
              key={`${src}-${i}`}
              aria-hidden={i >= photos.length ? "true" : undefined}
              className="relative h-[300px] w-[400px] shrink-0 overflow-hidden bg-surface-container-high sm:h-[360px] sm:w-[480px] md:h-[440px] md:w-[640px] lg:h-[480px] lg:w-[720px]"
            >
              {ready ? (
                <Image
                  src={src}
                  alt={`${eventTitle ?? "Event"} photo ${photoIndex + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 400px, (max-width: 768px) 480px, (max-width: 1024px) 640px, 720px"
                  priority={photoIndex === 0}
                  className="object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0 animate-pulse bg-surface-container-high"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
