import type { Metadata } from "next";
import { AboutHero } from "@/components/about/hero";
import { FoundersStory } from "@/components/about/founders";
import { Compass } from "@/components/about/compass";
import { Trustees } from "@/components/about/trustees";
import { ReunionCta } from "@/components/about/reunion-cta";

export const metadata: Metadata = {
  title: "About Us | Sneha Sammilana Foundation",
  description:
    "Learn how a 10th-grade promise grew into Sneha Sammilana, a foundation built on friendship, trust, and community service in Karnataka.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FoundersStory />
      <Compass />
      <Trustees />
      <ReunionCta />
    </>
  );
}
