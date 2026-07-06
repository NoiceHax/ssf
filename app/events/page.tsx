import type { Metadata } from "next";
import { EventsHero } from "@/components/events/hero";
import { EventsImpact } from "@/components/events/events-impact";
import { Annadhanam } from "@/components/events/annadhanam";
import { EventsGrid } from "@/components/events/events-grid";

export const metadata: Metadata = {
  title: "Events Archive | Sneha Sammilana Foundation",
  description:
    "A visual archive of every gathering, camps, drives, and community moments that have shaped the work of the Sneha Sammilana Foundation.",
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventsImpact />
      <Annadhanam />
      <EventsGrid />
    </>
  );
}
