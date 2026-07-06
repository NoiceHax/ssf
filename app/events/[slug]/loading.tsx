import { Skeleton, SkeletonText } from "@/components/skeletons/primitives";

export default function EventDetailLoading() {
  return (
    <article className="bg-surface">
      <header className="relative bg-surface-container-high">
        <Skeleton className="aspect-[16/10] w-full rounded-none md:aspect-[21/9] lg:aspect-[24/9]" />
      </header>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20 lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <SkeletonText lines={5} />
          </div>
          <div className="space-y-3 lg:col-span-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </section>

      <section className="section-pb">
        <div className="mx-auto mb-8 max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-3 h-8 w-48" />
        </div>
        <div className="overflow-x-hidden pl-5 md:pl-8 lg:pl-margin-desktop">
          <div className="flex gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[55vh] max-h-[640px] min-h-[280px] w-[88vw] shrink-0 sm:w-[600px] md:w-[760px] lg:w-[880px] xl:w-[960px]"
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
