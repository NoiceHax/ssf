import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { siteImages } from "@/src/data/site-images";

export function OriginStory() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-margin-desktop lg:py-section-gap">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-gutter">
        <Reveal className="relative lg:col-span-5">
          <div className="pointer-events-none absolute -left-12 -top-12 -z-10 h-48 w-48 rounded-full bg-secondary-fixed/40 blur-3xl" />
          <h2 className="mb-8 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
            It Started With Friendship
          </h2>
          <div className="space-y-6 font-body text-body-md text-on-surface-variant leading-relaxed">
            <p>
              In the quiet classrooms of a 10th-grade school in Sarjapur, Bengaluru, a
              group of friends made a pact. They promised to stay together, not just for themselves,
              but for a purpose larger than their individual dreams.
            </p>
            <p>
              Years later, that reunion sparked the birth of{" "}
              <strong>Sneha Sammilana</strong> which literally translates to
              &lsquo;The Gathering of Friendship&rsquo;. Today, those former
              classmates lead a foundation that bridges the gap between
              privilege and need.
            </p>
            <p className="italic font-medium text-primary">
              &ldquo;Our strength lies in the depth of our history. We don&rsquo;t just
              work together; we trust each other with the future of those we
              serve.&rdquo; Albus Camus 
            </p>
          </div>
          <div className="mt-12 flex gap-12">
            <div>
              <div className="font-headline text-headline-md text-secondary">
                15+
              </div>
              <div className="mt-1 font-body text-label-md uppercase text-on-surface-variant">
                Founding Friends
              </div>
            </div>
            <div>
              <div className="font-headline text-headline-md text-secondary">
                10 yrs+
              </div>
              <div className="mt-1 font-body text-label-md uppercase text-on-surface-variant">
                Legacy of Care
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative lg:col-span-6 lg:col-start-7">
          <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-high shadow-2xl">
            <Image
              src={siteImages.home_origin_story}
              alt="A class photograph from 10th grade (SSLC), the founding friends of Sneha Sammilana in their school years."
              width={1600}
              height={1200}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="block h-auto w-full"
            />
          </div>
          <div className="mt-6 max-w-xs border border-outline-variant bg-surface-container-high p-6 md:mt-8 md:p-8">
            <p className="mb-2 font-headline text-headline-sm md:text-headline-md text-primary">
              Our Roots
            </p>
            <p className="font-body text-body-md text-on-surface-variant">
              Every initiative we lead is built on the same trust we shared in
              school.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
