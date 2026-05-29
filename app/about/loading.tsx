import {
  SkeletonHero,
  SkeletonCardGrid,
  Skeleton,
  SkeletonText,
} from "@/components/skeletons/primitives";

export default function AboutLoading() {
  return (
    <>
      <SkeletonHero />

      <section className="bg-surface-container-lowest py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-24">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-2/3" />
              <SkeletonText lines={5} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-margin-desktop lg:py-section-gap">
        <div className="mb-16 space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-60" />
          <Skeleton className="mx-auto h-4 w-80" />
        </div>
        <SkeletonCardGrid count={3} aspect="video" />
      </section>

      <section className="bg-surface-container-high py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          <Skeleton className="mb-4 h-10 w-1/3" />
          <Skeleton className="mb-12 h-4 w-2/3" />
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <li key={i} className="flex flex-col items-center">
                <Skeleton className="aspect-square w-full rounded-full" />
                <Skeleton className="mt-4 h-4 w-24" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
