import {
  BookOpenText,
  Eye,
  Soup,
  Home as HomeIcon,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Program = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: "primary" | "secondary";
};

const programs: Program[] = [
  {
    icon: BookOpenText,
    title: "Education Support",
    description:
      "Providing scholarships, school kits, and digital literacy programs for children in government schools across Bangalore surroundings.",
    tone: "primary",
  },
  {
    icon: Eye,
    title: "Healthcare & Eye Camps",
    description:
      "Free medical check-ups and specialized eye camps including cataract surgeries and spectacle distribution for the elderly.",
    tone: "secondary",
  },
  {
    icon: Soup,
    title: "Food & Annadhanam",
    description:
      "Regular meal distribution drives at the Ram Temple in Sarjapur, serving nutritious food to devotees and families in need.",
    tone: "primary",
  },
  {
    icon: HeartPulse,
    title: "Orphanage Support",
    description:
      "Continuous resource support and mentorship for child care institutions and elder care facilities.",
    tone: "primary",
  },
];

export function Programs() {
  return (
    <section className="bg-surface-bright py-20 md:py-28 lg:py-section-gap">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <Reveal className="mb-16 text-center md:mb-20">
          <SectionEyebrow>Our Focus Areas</SectionEyebrow>
          <h2 className="mt-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
            Nurturing Communities
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal
              key={program.title}
              delay={i * 0.06}
              className="h-full"
            >
              <ProgramCard {...program} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  icon: Icon,
  title,
  description,
  tone,
}: Program) {
  const iconWrap =
    tone === "primary"
      ? "bg-primary-fixed text-primary"
      : "bg-secondary-fixed text-secondary";
  return (
    <article
      className="flex h-full flex-col border border-outline-variant bg-surface p-8 transition-colors duration-300 hover:border-secondary md:p-10"
    >
      <div
        className={cn(
          "mb-8 inline-flex h-16 w-16 items-center justify-center",
          iconWrap
        )}
      >
        <Icon size={28} strokeWidth={1.75} />
      </div>
      <h3 className="mb-4 font-headline text-2xl md:text-headline-md text-primary">
        {title}
      </h3>
      <p className="flex-grow font-body text-body-md text-on-surface-variant">
        {description}
      </p>
    </article>
  );
}
