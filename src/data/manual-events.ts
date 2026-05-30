/**
 * Manually-listed events.
 *
 * Past events are normally auto-discovered from the GitHub assets repo by
 * `scripts/generate-events.mjs`. These newer events (E34+) don't have their
 * photos uploaded yet, so they're listed here by hand and shown with the
 * branded placeholder image (coverImage = null).
 *
 * Zero-maintenance: when an event's photos are added to the assets repo, the
 * generated manifest will include it and automatically take precedence over the
 * matching entry here (merge in `events.ts` de-dupes by id, manifest wins).
 * At that point the entry below can simply be deleted.
 */

import type { SiteEvent } from "./events";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type ManualSeed = {
  eventNumber: number;
  title: string;
  date: string;
  description: string[];
};

const seeds: ManualSeed[] = [
  {
    eventNumber: 45,
    title: "Eye Checkup Camp and Spectacles Distribution",
    date: "10-Dec-2023",
    description: [
      "SSF organized a free eye camp and annual event to promote health and community welfare. The eye camp aimed to provide free eye check-ups, consultations, and spectacles to those in need.",
      "Qualified ophthalmologists and medical staff from NNH conducted vision tests and screenings for common eye conditions. Many elderly individuals and underprivileged people benefited from this noble initiative.",
    ],
  },
  {
    eventNumber: 44,
    title: "Sipani Seva Sadhan Distribution of Groceries",
    date: "04-Sep-2023",
    description: [
      "SSF generously donated essential groceries to the inmates of Sipani Seva Sadhan. This initiative aimed to provide nutritious food supplies and support the daily needs of the residents.",
    ],
  },
  {
    eventNumber: 43,
    title: "Eye Camp Spectacles Distribution at Attibele",
    date: "23-Jun-2023",
    description: [
      "Sneha Sammilana organized a spectacles distribution drive to help individuals with vision impairments. The initiative aimed to provide free prescription glasses to those in need, especially the elderly and underprivileged.",
      "Spectacles distributed: 98.",
    ],
  },
  {
    eventNumber: 42,
    title: "Eye Camp at Attibele",
    date: "11-Jun-2023",
    description: [
      "SSF organized a free eye camp and annual event to promote health and community welfare. The eye camp aimed to provide free eye check-ups, consultations, and spectacles to those in need.",
      "Qualified ophthalmologists and medical staff from NNH conducted vision tests and screenings for common eye conditions. Many elderly individuals and underprivileged people benefited from this noble initiative.",
    ],
  },
  {
    eventNumber: 41,
    title: "Sipani Seva Sadhan Distribution of Dress Material",
    date: "13-Mar-2023",
    description: [
      "SSF generously donated essential dress material to the inmates of Sipani Seva Sadhan. This initiative aimed to provide clothing and support the daily needs of the residents.",
    ],
  },
  {
    eventNumber: 40,
    title: "ABALA Orphanage Home for Ladies at Hosur",
    date: "13-Mar-2023",
    description: [
      "SSF extended its support to the residents of ABALA Orphanage Home for ladies by distributing nighties. This initiative aimed to provide comfort and dignity to the women residing there.",
      "The recipients expressed their gratitude and happiness for the thoughtful donation. Nighties distributed: 260.",
    ],
  },
  {
    eventNumber: 39,
    title: "Distribution of Exam Materials at SVPHS for SSLC Students",
    date: "27-Feb-2023",
    description: [
      "SSF organized a distribution drive at SVPHS to support SSLC students with essential exam materials. This initiative aimed to help students prepare for their board exams by providing notebooks, pens, geometry boxes, and other stationery items.",
      "The event was conducted to ease the financial burden on students from underprivileged backgrounds.",
    ],
  },
  {
    eventNumber: 38,
    title: "Eye Camp Spectacles Distribution at Sarjapur",
    date: "24-Dec-2022",
    description: [
      "Sneha Sammilana organized a spectacles distribution drive to help individuals with vision impairments. The initiative aimed to provide free prescription glasses to those in need, especially the elderly and underprivileged.",
    ],
  },
  {
    eventNumber: 37,
    title: "Eye Camp and Annual Event at Sarjapura",
    date: "18-Dec-2022",
    description: [
      "SSF organized a free eye camp and annual event to promote health and community welfare. The eye camp aimed to provide free eye check-ups, consultations, and spectacles to those in need.",
      "Qualified ophthalmologists and medical staff from NNH conducted vision tests and screenings for common eye conditions. Total patients: 340, cataract patients: 62, spectacles: 123.",
    ],
  },
  {
    eventNumber: 36,
    title: "Felicitation to Teachers at SVPHS School for Sir V. Ramakrishna",
    date: "30-Jul-2022",
    description: [
      "Teachers play a vital role in shaping the future of students, and to honor their dedication, SVPHS School organized a felicitation ceremony.",
      "The event aimed to recognize the hard work, patience, and commitment of educators who tirelessly guide students toward success.",
    ],
  },
  {
    eventNumber: 35,
    title: "Distribution of Groceries at Mathru Foundation",
    date: "16-Jun-2022",
    description: [
      "SSF organized a grocery distribution drive at Mathru Foundation, a home for physically challenged children. This noble initiative aimed to provide essential food supplies and support the daily needs of the children.",
      "We contributed rice, pulses, vegetables, dairy products, and other necessities to ensure proper nutrition. The event was marked by kindness, generosity, and community spirit, bringing smiles to the children's faces.",
    ],
  },
  {
    eventNumber: 34,
    title: "Eye Camp at Attibele",
    date: "12-Dec-2021",
    description: [
      "SSF organized a free eye camp to promote health and community welfare. The eye camp aimed to provide free eye check-ups, consultations, and spectacles to those in need.",
      "Qualified ophthalmologists and medical staff from NNH conducted vision tests and screenings for common eye conditions. Many elderly individuals and underprivileged people benefited from this noble initiative.",
    ],
  },
];

export const manualEvents: SiteEvent[] = seeds.map((seed) => {
  const id = `E${seed.eventNumber}`;
  return {
    id,
    eventNumber: seed.eventNumber,
    title: seed.title,
    slug: slugify(`${id}-${seed.title}`),
    date: seed.date,
    coverImage: null,
    galleryImages: [],
    description: seed.description,
  };
});
