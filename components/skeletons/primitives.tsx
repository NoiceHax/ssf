import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton rounded-lg", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-gutter px-5 py-20 md:grid-cols-12 md:px-8 md:py-28 lg:px-margin-desktop">
        <div className="md:col-span-6 space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-14 w-1/2" />
          <SkeletonText lines={3} className="mt-4" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
        <div className="md:col-span-6">
          <Skeleton className="aspect-[4/5] w-full rounded-xl" />
        </div>
      </div>
    </section>
  );
}

export function SkeletonCardGrid({
  count = 3,
  aspect = "video",
}: {
  count?: number;
  aspect?: "video" | "square" | "portrait";
}) {
  const aspectClass =
    aspect === "video"
      ? "aspect-video"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-[4/5]";
  return (
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="space-y-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-6"
        >
          <Skeleton className={cn("w-full rounded-lg", aspectClass)} />
          <Skeleton className="h-6 w-3/4" />
          <SkeletonText lines={3} />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonGallery() {
  return (
    <div className="grid grid-cols-12 gap-gutter">
      <Skeleton className="col-span-12 aspect-[16/9] md:col-span-8" />
      <Skeleton className="col-span-12 aspect-[3/4] md:col-span-4" />
      <Skeleton className="col-span-12 aspect-square md:col-span-4" />
      <Skeleton className="col-span-12 aspect-[21/9] md:col-span-8" />
    </div>
  );
}

export function SkeletonTimeline() {
  return (
    <div className="space-y-16">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16"
        >
          <div className={cn("space-y-3", i % 2 === 0 ? "md:text-right" : "")}>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-2/3" />
            <SkeletonText lines={2} />
          </div>
          <div />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="space-y-4 border border-on-primary/10 p-8"
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonContentBlock() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-margin-desktop lg:py-20">
      <div className="mb-12 space-y-4 text-center">
        <Skeleton className="mx-auto h-4 w-40" />
        <Skeleton className="mx-auto h-10 w-72" />
      </div>
      <SkeletonCardGrid count={3} aspect="video" />
    </div>
  );
}
