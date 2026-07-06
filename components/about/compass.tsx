import { HeartHandshake, Eye, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type Pillar = {
  icon: LucideIcon;
  title: string;
  description?: string;
  bullets?: string[];
};

const pillars: Pillar[] = [
  {
    icon: HeartHandshake,
    title: "Mission",
    description:
      "To bridge the gap between privilege and potential through community-led initiatives that focus on sustainable livelihoods and education.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "A world where every individual, regardless of their origin, has a supportive circle, a 'Sammilana', to help them thrive and succeed.",
  },
  {
    icon: Users,
    title: "Core Values",
    bullets: ["Trust (Vishwasa)", "Friendship (Sneha)", "Community (Samaaja)"],
  },
];

export function Compass() {
  return (
    <section className="section-py">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <Reveal className="mb-12 text-center md:mb-20">
          <h2 className="mb-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
            Our Compass
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            "Service to mankind is service to god"
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description, bullets }, i) => (
            <Reveal
              key={title}
              delay={i * 0.08}
              className="group rounded-xl border border-outline-variant bg-surface p-8 transition-all hover:border-primary md:p-10"
            >
              <Icon size={32} className="mb-6 text-secondary" strokeWidth={1.75} />
              <h3 className="mb-4 font-headline text-2xl md:text-headline-md text-primary">
                {title}
              </h3>
              {description && (
                <p className="font-body text-body-md text-on-surface-variant">
                  {description}
                </p>
              )}
              {bullets && (
                <ul className="space-y-3 font-body text-body-md text-on-surface-variant">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
