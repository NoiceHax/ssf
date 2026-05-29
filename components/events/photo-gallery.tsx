"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PhotoGalleryProps = {
  /** Array of image paths (e.g. from SiteEvent.galleryImages). */
  photos: string[];
  /** Event title used for alt text generation. */
  eventTitle?: string;
  /** ARIA label for the scrollable region. */
  ariaLabel?: string;
};

/**
 * Large horizontal photo strip with:
 * - native smooth scrolling + CSS scroll-snap
 * - pointer drag (desktop)
 * - touch pan (mobile)
 * - prev/next buttons on desktop
 * - lazy-loaded next/image
 *
 * Items are sized to a fixed aspect ratio so layout shift is zero.
 */
export function PhotoGallery({ photos, eventTitle, ariaLabel }: PhotoGalleryProps) {
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScroll: 0,
    pointerId: 0,
  });

  const updateNavState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateNavState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);
    return () => {
      el.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
    };
  }, [updateNavState]);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.85, 320);
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType === "touch") return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current.active = true;
    drag.current.moved = false;
    drag.current.startX = e.clientX;
    drag.current.startScroll = el.scrollLeft;
    drag.current.pointerId = e.pointerId;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = scrollerRef.current;
    try {
      el?.releasePointerCapture(drag.current.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  return (
    <div className="relative">
      <ul
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel ?? "Event photo gallery"}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="flex gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 md:gap-6 [scrollbar-width:thin] cursor-grab active:cursor-grabbing select-none"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {photos.map((src, i) => (
          <li
            key={src}
            className="relative shrink-0 overflow-hidden bg-surface-container-high"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative h-[55vh] max-h-[640px] min-h-[280px] w-[88vw] sm:w-[600px] md:w-[760px] lg:w-[880px] xl:w-[960px]">
              <Image
                src={src}
                alt={`${eventTitle ?? "Event"} photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 88vw, (max-width: 768px) 600px, (max-width: 1024px) 760px, (max-width: 1280px) 880px, 960px"
                loading={i === 0 ? "eager" : "lazy"}
                priority={i === 0}
                draggable={false}
                className="object-cover pointer-events-none"
              />
            </div>
          </li>
        ))}
      </ul>

      <GalleryButton
        direction="prev"
        disabled={!canPrev}
        onClick={() => scrollByPage(-1)}
      />
      <GalleryButton
        direction="next"
        disabled={!canNext}
        onClick={() => scrollByPage(1)}
      />
    </div>
  );
}

function GalleryButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous photo" : "Next photo"}
      className={cn(
        "hidden md:inline-flex absolute top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-surface/95 text-primary border border-outline-variant shadow-lg backdrop-blur-md transition-all duration-200",
        "hover:bg-primary hover:text-on-primary hover:scale-105",
        "disabled:opacity-0 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isPrev ? "left-4" : "right-4"
      )}
    >
      {isPrev ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  );
}
