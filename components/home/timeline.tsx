import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const items = [
  {
    year: "1989 to 2005",
    title: "The Promise",
    description:
      "A tight-knit group of friends at government high schools in rural Bangalore bond over shared dreams and a common background.",
  },
  {
    year: "2015",
    title: "Foundation Formed",
    description:
      "Sneha Sammilana Foundation is officially registered. The friends reunite, pooling resources to start the community helping hands.",
  },
  {
    year: "2015",
    title: "The Reunion",
    description:
      "Life took us on separate paths across continents and through diverse careers but the bond of Sneha (Friendship) never frayed. In 2015, during a chance reunion in their hometown, they realised the promise they made at fifteen was still waiting to be kept. Sneha Sammilana was born that evening not from a business plan, but from a heartfelt conversation, honoring the legacy of our mentors and the needs of our community.",
  },
];

export function Timeline() {
  return (
    <section className="bg-surface px-5 py-20 md:px-8 md:py-28 lg:px-margin-desktop lg:py-section-gap">
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="mb-16 text-center md:mb-24">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
            Our Journey
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 bg-secondary" />
        </Reveal>

        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px -translate-x-1/2 bg-outline-variant md:left-1/2 md:block" />

          <div className="space-y-16 md:space-y-24">
            {items.map((item, i) => {
              const isRight = i % 2 === 1;
              return (
                <Reveal
                  key={item.year}
                  delay={i * 0.08}
                  className={cn(
                    "relative md:flex md:items-center",
                    isRight && "md:flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "md:w-1/2",
                      isRight
                        ? "md:pl-16 md:text-left"
                        : "md:pr-16 md:text-right"
                    )}
                  >
                    <span className="block font-headline text-2xl md:text-headline-md text-secondary">
                      {item.year}
                    </span>
                    <h4 className="mt-2 font-headline text-2xl md:text-headline-md text-primary">
                      {item.title}
                    </h4>
                    <p className="mt-4 font-body text-body-md text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                  <div className="absolute left-0 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-surface bg-primary md:left-1/2 md:block" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
