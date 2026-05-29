"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  variant?: "light" | "dark";
  className?: string;
  /** Approximate height in px; width scales automatically. */
  size?: number;
};

/**
 * Brand logo with graceful fallback to a wordmark when the real asset is
 * not yet available. Swap the file at `brand.logoPath` to enable the image.
 */
export function Logo({
  href = "/",
  variant = "light",
  className,
  size = 32,
}: LogoProps) {
  const [errored, setErrored] = useState(false);
  const src = variant === "dark" ? brand.logoDarkPath : brand.logoPath;

  const content = (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      aria-label={brand.name}
    >
      {!errored ? (
        <Image
          src={src}
          alt={`${brand.name} logo`}
          width={size * 2}
          height={size * 2}
          priority
          onError={() => setErrored(true)}
          className="h-10 w-10 object-contain md:h-12 md:w-12"
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full font-headline text-base font-bold md:h-9 md:w-9",
            variant === "dark"
              ? "bg-inverse-on-surface text-primary"
              : "bg-primary text-on-primary"
          )}
        >
          S
        </span>
      )}
      <span
        className={cn(
          "font-headline tracking-tight leading-tight",
          variant === "dark"
            ? "text-inverse-on-surface"
            : "text-primary",
          "text-base sm:text-lg md:text-xl"
        )}
      >
        {brand.name}
      </span>
    </span>
  );

  return href ? (
    <Link href={href} className="inline-flex items-center" aria-label={`${brand.name} home`}>
      {content}
    </Link>
  ) : (
    content
  );
}
