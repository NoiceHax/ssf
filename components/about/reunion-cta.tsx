import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteImages } from "@/src/data/site-images";

export function ReunionCta() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-on-primary md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-gutter md:px-8 lg:px-margin-desktop">
        <div>
          <h2 className="mb-8 font-headline text-4xl leading-tight md:text-5xl lg:text-headline-display">
            Join the Reunion.
          </h2>
          <p className="mb-10 font-body text-body-md md:text-body-lg text-on-primary-container">
            We are always looking for friends who believe that community is the
            ultimate safety net. Whether you give time, resources, or
            voice, you belong here.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/donate">
              <Button variant="secondary" size="md">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden justify-center md:flex">
          <div className="relative aspect-square w-full max-w-md rounded-full border-8 border-primary-container/30 p-4">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={siteImages.about_cta}
                alt="Close-up of hands of different ages and skin tones meeting over a wooden table, symbolizing a pact."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
