import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { siteImages } from "@/src/data/site-images";

export function FoundersStory() {
  return (
    <section className="bg-surface-container-lowest py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Reveal className="order-2 md:order-1">
            <Image
              src={siteImages.about_founders}
              alt="The founding members of Sneha Sammilana Foundation gathered together in 2015."
              width={1600}
              height={1200}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full rounded-lg"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 md:order-2">
            <h2 className="mb-8 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
              The Founders&rsquo; Story
            </h2>
            <div className="space-y-6 font-body text-body-md text-on-surface-variant">
              <p>
                It began in 1998, in a small classroom where all 10th-graders
                shared wooden benches and had a vision for a better world.
                They promised each other that one day, they would return to
                their roots and give back to the soil that nurtured them.
              </p>
              <p>
                Life took them on separate paths across continents and through
                diverse careers but the bond of{" "}
                <span className="italic text-secondary">Sneha</span> (Friendship)
                never frayed. In 2015, during a chance reunion in their
                hometown, they realised the promise they made at fifteen was
                still waiting to be kept.
              </p>
              <p>
                Sneha Sammilana was born that evening not from a business
                plan, but from a heartfelt conversation, honoring the
                legacy of their mentors and the needs of their community.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12 bg-outline" />
              <span className="font-body text-label-md uppercase tracking-widest text-outline">
                Established 2015
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
