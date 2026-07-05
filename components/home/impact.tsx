import { Users, GraduationCap, HeartHandshake, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getAllEvents } from "@/src/data/events";

const otherStats = [
  {
    icon: GraduationCap,
    value: "2000+",
    label: "Students Supported",
  },
  {
    icon: HeartHandshake,
    value: "25+",
    label: "Healthcare Camps",
  },
  {
    icon: UtensilsCrossed,
    value: "5k+",
    label: "Meals Distributed",
  },
] as const;

export function ImpactMetrics() {
  const eventCount = getAllEvents().length;
  const stats = [
    {
      icon: Users,
      value: `${eventCount}+`,
      label: "Community Initiatives",
    },
    ...otherStats,
  ];

  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-surface-container-low py-20 md:py-28 lg:py-section-gap"
    >
      {/* warm ambient accents */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-secondary-fixed opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary-fixed opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
            Our Impact
          </span>
          <h2 className="mt-4 font-headline text-3xl leading-tight text-primary md:text-4xl lg:text-headline-lg">
            Measured in lives, not numbers
          </h2>
          <p className="mt-4 font-body text-body-md text-on-surface-variant md:text-body-lg">
            Nearly a decade of friendship turned into action across education,
            healthcare, and community welfare.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-outline-variant bg-outline-variant/60 md:mt-16 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center gap-4 bg-surface-container-lowest px-6 py-10 text-center transition-colors duration-300 hover:bg-surface-container-high md:py-12">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary-fixed text-secondary">
                  <Icon size={26} strokeWidth={1.5} />
                </span>
                <div className="font-headline text-4xl leading-none text-primary md:text-5xl lg:text-6xl">
                  {value}
                </div>
                <p className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
