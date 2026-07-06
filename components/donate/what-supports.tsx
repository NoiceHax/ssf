import { BookOpenText, Stethoscope, Soup, Home as HomeIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const supports = [
  {
    icon: BookOpenText,
    title: "Education Support",
    description:
      "Scholarships, notebooks, uniforms, and digital learning for children in government schools across rural Karnataka.",
    examples: [
      "₹500 can help a child stay in school",
      "₹6,000 roughly covers one annual scholarship",
    ],
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description:
      "Eye camps, mobile clinics, cataract surgeries, and spectacles for elders in villages that have no nearby hospital.",
    examples: [
      "₹2,500 can fund cataract care for one elder",
      "₹500 can provide a pair of spectacles",
    ],
  },
  {
    icon: Soup,
    title: "Food Drives",
    description:
      "Annadhanam meal services for daily-wage families, construction workers, and elders during festivals and crises.",
    examples: [
      "₹150 can provide one warm meal",
      "₹3,000 can feed about 100 people",
    ],
  },
  {
    icon: HomeIcon,
    title: "Welfare Programs",
    description:
      "Water filters, sanitation, and infrastructure support for community centers, orphanages, and elder care homes.",
    examples: ["₹12,000 can install a community water filter"],
  },
];

export function WhatDonationsSupport() {
  return (
    <section className="bg-surface-container-low section-py">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <Reveal className="mb-8 max-w-2xl md:mb-12">
          <h2 className="mb-3 font-headline text-3xl md:mb-4 md:text-4xl lg:text-headline-lg text-primary">
            What Your Donation Supports
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Each rupee goes toward one of four programs. The amounts below are
            illustrative, they show the kind of difference your gift can make,
            not physical items we ship. You can also choose where your
            contribution goes; mention it in your transfer note or write to us.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-gutter">
          {supports.map(({ icon: Icon, title, description, examples }, i) => (
            <Reveal
              key={title}
              delay={i * 0.06}
              className="flex h-full flex-col border border-outline-variant bg-surface-container-lowest p-5 transition-colors hover:border-secondary md:p-8 lg:p-10"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-primary-fixed text-primary md:mb-6 md:h-14 md:w-14">
                <Icon size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 font-headline text-xl text-primary md:mb-3 md:text-2xl lg:text-headline-sm">
                {title}
              </h3>
              <p className="mb-4 font-body text-body-md text-on-surface-variant md:mb-6">
                {description}
              </p>
              <ul className="mt-auto space-y-2 border-t border-outline-variant pt-4 md:pt-5">
                {examples.map((ex) => (
                  <li
                    key={ex}
                    className="font-body text-label-md uppercase tracking-widest text-secondary"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
