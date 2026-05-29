import { Skeleton, SkeletonText, SkeletonCardGrid } from "@/components/skeletons/primitives";

export default function DonateLoading() {
  return (
    <>
      <section className="relative min-h-[60vh] bg-surface-container-high md:min-h-[640px]">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-5 py-20 md:px-8 lg:px-margin-desktop">
          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-14 w-2/3" />
            <SkeletonText lines={3} />
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-12 lg:px-margin-desktop">
          <div className="space-y-4 lg:col-span-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-3/4" />
          </div>
          <SkeletonText className="lg:col-span-7" lines={5} />
        </div>
      </section>

      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          <Skeleton className="mb-4 h-10 w-1/3" />
          <Skeleton className="mb-12 h-4 w-2/3" />
          <SkeletonCardGrid count={4} aspect="square" />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          <Skeleton className="mb-4 h-10 w-48" />
          <SkeletonText lines={2} className="mb-10 max-w-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </section>
    </>
  );
}
