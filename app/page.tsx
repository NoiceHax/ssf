import { HomeHero } from "@/components/home/hero";
import { OriginStory } from "@/components/home/origin-story";
import { ImpactMetrics } from "@/components/home/impact";
import { Testimonials } from "@/components/home/testimonials";
import { Programs } from "@/components/home/programs";
import { Timeline } from "@/components/home/timeline";
import { VolunteerCta } from "@/components/home/volunteer-cta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <OriginStory />
      <ImpactMetrics />
      <Testimonials />
      <Programs />
      <Timeline />
      <VolunteerCta />
    </>
  );
}
