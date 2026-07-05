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
    eventNumber: 59,
    title: "Clothing Distribution at Sipani Seva Sadan",
    date: "13-Mar-2026",
    description: [
      "SSF distributed clothing and snacks to inmates at Sipani Seva Sadhan, Marsur.",
      "Nighties, T-shirts, Nikkars, and snacks for approximately 300 inmates.",
    ],
  },
  {
    eventNumber: 58,
    title: "Exam Pads and Pens at SVPH School, Sarjapura",
    date: "13-Mar-2026",
    description: [
      "SSF supported SSLC students at SVPH School, Sarjapura with exam materials, teacher gifts, and snacks.",
      "240 exam pads and 500 pens distributed.",
    ],
  },
  {
    eventNumber: 57,
    title: "Annual Eye Camp at Sarjapura",
    date: "13-Dec-2025",
    description: [
      "SSF organized the annual eye camp at Sarjapura with spectacles, food, gifts, and sweets for beneficiaries.",
      "Spectacles ₹27,590, food ₹27,000, gifts ₹30,500, sweets ₹14,920.",
    ],
  },
  {
    eventNumber: 56,
    title: "Clothing Distribution at Sipani Seva Sadan",
    date: "13-Oct-2025",
    description: [
      "SSF distributed clothing, shoes, fruits, and buns to inmates at Sipani Seva Sadhan, Marsur.",
      "Nighties, T-shirts, and shoes for approximately 300 inmates.",
    ],
  },
  {
    eventNumber: 55,
    title: "Eye Camp at Attibele",
    date: "Jun-2025",
    description: [
      "SSF organized a free eye camp at Attibele with eye check-ups, spectacles distribution, food, and felicitation.",
    ],
  },
  {
    eventNumber: 54,
    title: "Clothing and Groceries at Sipani Seva Sadan",
    date: "12-Apr-2025",
    description: [
      "SSF donated groceries, fruits, and buns to inmates at Sipani Seva Sadhan, Marsur.",
      "Groceries ₹37,000, fruits ₹3,700, buns ₹6,000, approximately 300 inmates served.",
    ],
  },
  {
    eventNumber: 53,
    title: "Exam Pads and Pens at SVPH School, Sarjapura",
    date: "13-Mar-2025",
    description: [
      "SSF distributed exam materials, teacher gifts, and snacks to students at Govt High School / SVPH School, Sarjapura.",
      "200 exam pads and 400 pens, 250 students benefited.",
    ],
  },
  {
    eventNumber: 52,
    title: "Annadhanam Commencement at Sriram Temple, Sarjapura",
    date: "10-Jan-2025",
    description: [
      "SSF commenced community Annadhanam at Sriram Temple, Sarjapura.",
      "Kesaribath and Uppma served to 250 people.",
    ],
  },
  {
    eventNumber: 51,
    title: "Eye Camp at Sarjapura",
    date: "22-Dec-2024",
    description: [
      "SSF organized an eye camp at Sarjapura with spectacles, food, sweets, and gifts for beneficiaries.",
      "152+ beneficiaries, spectacles ₹31,210.",
    ],
  },
  {
    eventNumber: 50,
    title: "Sports and Study Materials at Sarjapur Cluster Schools",
    date: "13-Nov-2024",
    description: [
      "SSF distributed sports kits, reading materials, and fruits across multiple schools in the Sarjapur cluster.",
    ],
  },
  {
    eventNumber: 49,
    title: "Clothing Distribution at Sipani Seva Sadan",
    date: "27-Oct-2024",
    description: [
      "SSF distributed nighties, bermuda shorts, and T-shirts with fruits and buns to inmates at Sipani Seva Sadhan, Marsur.",
      "Approximately 300 inmates benefited.",
    ],
  },
  {
    eventNumber: 48,
    title: "Eye Camp at Attibele",
    date: "09-Jun-2024",
    description: [
      "SSF organized a free eye camp at Attibele with check-ups and screenings by Narayana Nethralaya doctors.",
    ],
  },
  {
    eventNumber: 47,
    title: "Exam Pads and Pens at SVPHS and Govt School, Sarjapura",
    date: "02-Mar-2024",
    description: [
      "SSF distributed exam pads, pens, teacher gifts, and snacks at SVPHS and Govt School, Sarjapura.",
      "230 students, 200 exam pads and 400 pens.",
    ],
  },
  {
    eventNumber: 46,
    title: "Spectacles Distribution at Sarjapura",
    date: "24-Dec-2023",
    description: [
      "SSF organized a spectacles distribution drive at Sarjapura as the 46th foundation event.",
      "152 spectacles distributed, 170 at ₹7 and 144 at ₹200.",
    ],
  },
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
      "SSF generously donated essential dress material to the inmates of Sipani Seva Sadhan.",
      "Nighties: 260, T-shirts: 190, Half pants: 190.",
    ],
  },
  {
    eventNumber: 40,
    title: "ABALA Orphanage Home for Ladies at Hosur",
    date: "13-Mar-2023",
    description: [
      "SSF extended its support to the residents of ABALA Orphanage Home for ladies in Hosur by distributing nighties.",
      "Nighties distributed: 50.",
    ],
  },
  {
    eventNumber: 39,
    title: "Distribution of Exam Materials at SVPHS for SSLC Students",
    date: "27-Feb-2023",
    description: [
      "SSF organized a distribution drive at SVPHS to support SSLC students with essential exam materials.",
      "140 exam pads and 280 pens distributed.",
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
  const id = `E${String(seed.eventNumber).padStart(2, "0")}`;
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
