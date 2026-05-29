import {
  SkeletonHero,
  SkeletonStats,
  SkeletonCardGrid,
  SkeletonTimeline,
  Skeleton,
  SkeletonText,
} from "@/components/skeletons/primitives";

export default function HomeLoading() {
  return (
    <>
      <SkeletonHero />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-margin-desktop lg:py-section-gap">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <Skeleton className="h-12 w-3/4" />
            <SkeletonText lines={5} />
          </div>
          <Skeleton className="aspect-[4/5] w-full lg:col-span-6 lg:col-start-7" />
        </div>
      </section>

      <section className="bg-primary px-5 py-20 md:px-8 lg:px-margin-desktop lg:py-section-gap">
        <div className="mx-auto max-w-7xl">
          <SkeletonStats />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-margin-desktop lg:py-section-gap">
        <div className="mb-12 space-y-4 text-center">
          <Skeleton className="mx-auto h-4 w-32" />
          <Skeleton className="mx-auto h-12 w-72" />
        </div>
        <SkeletonCardGrid count={3} />
      </section>

      <section className="mx-auto max-w-[1000px] px-5 py-20 md:px-8 lg:px-margin-desktop lg:py-section-gap">
        <div className="mb-16 text-center">
          <Skeleton className="mx-auto h-12 w-60" />
        </div>
        <SkeletonTimeline />
      </section>
    </>
  );
}
