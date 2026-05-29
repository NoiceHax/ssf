import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/section";
import { siteImages } from "@/src/data/site-images";

export function DonateHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden md:min-h-[640px]">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteImages.donate_hero}
          alt="An illustration of people standing together with raised arms, holding red hearts, a symbol of community and collective giving."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="max-w-2xl">
          <SectionEyebrow>Support Our Legacy</SectionEyebrow>
          <h1 className="mb-6 mt-4 font-headline text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-headline-display text-primary">
            Join the Journey
          </h1>
          <p className="max-w-lg font-body text-body-md md:text-body-lg text-on-surface-variant">
            Your contribution fuels a future built on kinship and collective
            impact. Every rupee is a step toward sustainable change in our
            communities.
          </p>
        </div>
      </div>
    </section>
  );
}
