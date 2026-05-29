import { Users, GraduationCap, HeartHandshake, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const stats = [
  {
    icon: Users,
    value: "45+",
    label: "Community Initiatives",
  },
  {
    icon: GraduationCap,
    value: "1000+",
    label: "Students Supported",
    offset: true,
  },
  {
    icon: HeartHandshake,
    value: "250+",
    label: "Healthcare Camps",
  },
  {
    icon: UtensilsCrossed,
    value: "50k+",
    label: "Meals Distributed",
    offset: true,
  },
];

export function ImpactMetrics() {
  return (
    <section
      id="impact"
      className="bg-primary py-20 text-on-primary md:py-28 lg:py-section-gap overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, offset }, i) => (
            <Reveal
              key={label}
              delay={i * 0.08}
              className={
                offset ? "lg:translate-y-12" : ""
              }
            >
              <div className="flex h-full flex-col justify-between border border-on-primary/10 p-8 transition-colors duration-300 hover:bg-white/5 md:p-10">
                <Icon
                  className="mb-12 text-secondary-container"
                  size={36}
                  strokeWidth={1.5}
                />
                <div>
                  <div className="font-headline text-4xl md:text-5xl">
                    {value}
                  </div>
                  <p className="mt-2 font-body text-label-md uppercase tracking-widest text-on-primary/60">
                    {label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
