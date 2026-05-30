import Image from "next/image";

type PhotoGalleryProps = {
  /** Array of image paths (e.g. from SiteEvent.galleryImages). */
  photos: string[];
  /** Event title used for alt text generation. */
  eventTitle?: string;
  /** ARIA label for the scrollable region. */
  ariaLabel?: string;
};

/**
 * Auto-sliding photo marquee (same mechanism as the testimonials carousel):
 * the list is duplicated and translated -50% on an infinite loop, pausing on
 * hover. Items are sized to a fixed box so layout shift is zero.
 */
export function PhotoGallery({ photos, eventTitle, ariaLabel }: PhotoGalleryProps) {
  if (photos.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly (translate -50%).
  const loop = [...photos, ...photos];

  return (
    <div
      className="group relative overflow-hidden"
      role="region"
      aria-label={ariaLabel ?? "Event photo gallery"}
    >
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent md:w-32" />

      <ul className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused] md:gap-6">
        {loop.map((src, i) => (
          <li
            key={`${src}-${i}`}
            aria-hidden={i >= photos.length ? "true" : undefined}
            className="relative h-[300px] w-[400px] shrink-0 overflow-hidden bg-surface-container-high sm:h-[360px] sm:w-[480px] md:h-[440px] md:w-[640px] lg:h-[480px] lg:w-[720px]"
          >
            <Image
              src={src}
              alt={`${eventTitle ?? "Event"} photo ${(i % photos.length) + 1}`}
              fill
              sizes="(max-width: 640px) 400px, (max-width: 768px) 480px, (max-width: 1024px) 640px, 720px"
              loading="lazy"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
