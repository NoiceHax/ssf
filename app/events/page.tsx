import type { Metadata } from "next";
import { EventsHero } from "@/components/events/hero";
import { EventsGrid } from "@/components/events/events-grid";

// Force Node runtime (the scanner uses `fs`) and re-render on every request so
// that newly added /public/events/ folders are discovered without a code
// change. Both flags are required for Vercel hosting.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Events Archive | Sneha Sammilana Foundation",
  description:
    "A visual archive of every gathering, camps, drives, and community moments that have shaped the work of the Sneha Sammilana Foundation.",
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventsGrid />
    </>
  );
}
