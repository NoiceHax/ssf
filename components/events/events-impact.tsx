import { Users, GraduationCap, Eye, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getAllEvents } from "@/src/data/events";

const otherStats = [
  {
    icon: GraduationCap,
    value: "10000+",
    label: "Students Supported",
  },
  {
    icon: Eye,
    value: "2500+",
    label: "Patients Screened",
  },
  {
    icon: UtensilsCrossed,
    value: "Weekly",
    label: "Food Service",
  },
] as const;

export function EventsImpact() {
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
    <section className="relative overflow-hidden bg-primary py-16 text-on-primary md:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-secondary-fixed opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary-fixed opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-on-primary/15 bg-on-primary/10 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center gap-3 bg-primary px-6 py-8 text-center transition-colors duration-300 hover:bg-white/5 md:py-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary-fixed/20 text-secondary-container">
                  <Icon size={24} strokeWidth={1.5} />
                </span>
                <div className="font-headline text-3xl leading-none md:text-4xl lg:text-5xl">
                  {value}
                </div>
                <p className="font-body text-label-md uppercase tracking-widest text-on-primary/70">
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
