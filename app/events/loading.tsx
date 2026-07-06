import { Skeleton, SkeletonText } from "@/components/skeletons/primitives";

export default function EventsLoading() {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-surface pt-16 pb-20 md:pt-24 md:pb-28 lg:pb-20">
        <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-gutter px-5 md:px-8 lg:px-margin-desktop">
          <div className="col-span-12 space-y-4 lg:col-span-7">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-14 w-3/4" />
            <SkeletonText lines={3} />
          </div>
          <div className="col-span-12 mt-12 lg:col-span-5 lg:mt-0">
            <Skeleton className="aspect-[4/5] w-full" />
          </div>
        </div>
      </section>

      <section className="bg-surface pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-72" />
            </div>
            <Skeleton className="hidden h-4 w-24 md:block" />
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-gutter lg:gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <li
                key={i}
                className="flex flex-col overflow-hidden border border-outline-variant bg-surface-container-lowest"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="space-y-3 p-6 md:p-8">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-32" />
                  <SkeletonText lines={2} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
