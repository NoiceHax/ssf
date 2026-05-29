import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/section";
import { siteImages } from "@/src/data/site-images";

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-12 md:gap-gutter md:px-8 lg:px-margin-desktop">
        <div className="z-10 md:col-span-6">
          <SectionEyebrow>Our Identity</SectionEyebrow>
          <h1 className="mt-6 mb-8 font-headline text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-headline-display text-primary">
            The Heart of Our Mission.
          </h1>
          <p className="max-w-lg font-body text-body-md md:text-body-lg text-on-surface-variant">
            Sneha Sammilana is more than a foundation. It is a lifelong pact
            made in the hallways of school, rekindled decades
            later to serve the community that raised us.
          </p>
        </div>
        <div className="relative md:col-span-6">
          <div className="relative w-full overflow-hidden rounded-lg bg-surface-container-high shadow-xl">
            <Image
              src={siteImages.about_hero}
              alt="A class photograph from 10th grade (SSLC), the founding friends of Sneha Sammilana in their school years."
              width={1600}
              height={1200}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="block h-auto w-full"
            />
          </div>
          <div className="mt-6 hidden max-w-xs rounded-lg bg-secondary-fixed p-6 md:mt-8 md:block md:p-8">
            <p className="font-headline text-headline-md text-on-secondary-fixed">
              25 Years
            </p>
            <p className="font-body text-body-md text-on-secondary-fixed-variant">
              Of friendship that evolved into a movement for change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
