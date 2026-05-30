import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Branded fallback shown when an event (or any) image is missing.
 * Fills its nearest positioned (relative) parent, so wrap it in a
 * container with a defined aspect ratio / size.
 */
export function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <Image
      src="/placeholder.svg"
      alt="Image coming soon"
      fill
      unoptimized
      sizes="(max-width: 768px) 100vw, 600px"
      className={cn("object-cover", className)}
    />
  );
}
