import { BookOpenText, Stethoscope, Soup, Home as HomeIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const supports = [
  {
    icon: BookOpenText,
    title: "Education Support",
    description:
      "Scholarships, school kits, uniforms, and digital learning for children in government schools across rural Karnataka.",
    examples: ["₹1,500 one school kit", "₹6,000 one annual scholarship"],
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description:
      "Eye camps, mobile clinics, cataract surgeries, and spectacles for elders in villages that have no nearby hospital.",
    examples: ["₹2,500 one cataract surgery", "₹500 one pair of spectacles"],
  },
  {
    icon: Soup,
    title: "Food Drives",
    description:
      "Annadhanam meal services for daily-wage families, construction workers, and elders during festivals and crises.",
    examples: ["₹3,000 meals for 100 people", "₹150 one warm meal"],
  },
  {
    icon: HomeIcon,
    title: "Welfare Programs",
    description:
      "Water filters, sanitation, and infrastructure support for community centers, orphanages, and elder care homes.",
    examples: ["₹12,000 one community water filter"],
  },
];

export function WhatDonationsSupport() {
  return (
    <section className="bg-surface-container-low py-20 md:py-28 lg:py-section-gap">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <h2 className="mb-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
            What Your Donation Supports
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Each rupee is mapped to one of four programs. You can also choose
            where your contribution goes, just mention it in your transfer
            note or write to us.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {supports.map(({ icon: Icon, title, description, examples }, i) => (
            <Reveal
              key={title}
              delay={i * 0.06}
              className="flex h-full flex-col border border-outline-variant bg-surface-container-lowest p-8 transition-colors hover:border-secondary md:p-10"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center bg-primary-fixed text-primary">
                <Icon size={26} strokeWidth={1.75} />
              </div>
              <h3 className="mb-3 font-headline text-2xl md:text-headline-sm text-primary">
                {title}
              </h3>
              <p className="mb-6 font-body text-body-md text-on-surface-variant">
                {description}
              </p>
              <ul className="mt-auto space-y-2 border-t border-outline-variant pt-5">
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
