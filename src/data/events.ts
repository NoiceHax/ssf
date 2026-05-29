import "server-only";
import fs from "fs";
import path from "path";



export type SiteEvent = {
  id: string;
  eventNumber: number;
  title: string;
  slug: string;
  date?: string;

  coverImage: string | null;

  galleryImages: string[];
  description?: string[];
};



const EVENTS_DIR = path.join(process.cwd(), "public", "events");

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif|svg)$/i;
const DESCRIPTION_FILES = ["description.txt", "description.md"];

const FOLDER_RE = /^E(\d+)\s+(.+)$/i;


const DATE_RE =
  /(?:\s+on\s+|\s+)(\d{1,2}-[A-Za-z]{3,9}-\d{2,4}|\d{4}-\d{1,2}-\d{1,2})\s*$/;



function normalize(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

function slugify(input: string): string {
  return normalize(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

function parseFolderName(name: string) {
  const cleaned = normalize(name);
  const match = cleaned.match(FOLDER_RE);
  if (!match) return null;

  const eventNumber = parseInt(match[1], 10);
  let rest = match[2].trim();

  let date: string | undefined;
  const dateMatch = rest.match(DATE_RE);
  if (dateMatch && typeof dateMatch.index === "number") {
    date = dateMatch[1];
    rest = rest.slice(0, dateMatch.index).replace(/\s+on\s*$/i, "").trim();
  }

  return { eventNumber, title: rest, date };
}

function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function webPath(folderName: string, fileName: string): string {
  return `/events/${encodeURIComponent(folderName)}/${encodeURIComponent(
    fileName
  )}`;
}

function readDescription(folderPath: string): string[] | undefined {
  for (const name of DESCRIPTION_FILES) {
    const filePath = path.join(folderPath, name);
    if (!fs.existsSync(filePath)) continue;
    try {
      const raw = fs.readFileSync(filePath, "utf8").trim();
      if (!raw) return undefined;
      const paragraphs = raw
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.replace(/\s+/g, " ").trim())
        .filter(Boolean);
      return paragraphs.length > 0 ? paragraphs : undefined;
    } catch {
      return undefined;
    }
  }
  return undefined;
}

const TAG = "[events]";

export function getAllEvents(): SiteEvent[] {
  if (!fs.existsSync(EVENTS_DIR)) {
    console.warn(`${TAG} /public/events/ does not exist — returning 0 events.`);
    return [];
  }

  const started = Date.now();

  let dirents: fs.Dirent[];
  try {
    dirents = fs.readdirSync(EVENTS_DIR, { withFileTypes: true });
  } catch (err) {
    console.error(`${TAG} failed to read /public/events/:`, err);
    return [];
  }

  const events: SiteEvent[] = [];
  const skipped: string[] = [];
  const empty: string[] = [];

  for (const dirent of dirents) {
    if (!dirent.isDirectory()) continue;

    const parsed = parseFolderName(dirent.name);
    if (!parsed) {
      skipped.push(dirent.name);
      continue;
    }

    const folderPath = path.join(EVENTS_DIR, dirent.name);

    let imageFiles: string[] = [];
    try {
      imageFiles = fs
        .readdirSync(folderPath)
        .filter((f) => IMAGE_RE.test(f))
        .sort(naturalSort);
    } catch (err) {
      console.warn(
        `${TAG} could not read images in "${dirent.name}":`,
        (err as Error).message
      );
    }

    if (imageFiles.length === 0) {
      empty.push(dirent.name);
    }

    const gallery = imageFiles.map((f) => webPath(dirent.name, f));
    const cover = gallery[0] ?? null;
    const description = readDescription(folderPath);

    const id = `E${pad(parsed.eventNumber)}`;
    const slug = slugify(`${id}-${parsed.title}`);

    events.push({
      id,
      eventNumber: parsed.eventNumber,
      title: parsed.title,
      slug,
      date: parsed.date,
      coverImage: cover,
      galleryImages: gallery,
      description,
    });
  }

  events.sort((a, b) => b.eventNumber - a.eventNumber);

  const ms = Date.now() - started;
  console.log(
    `${TAG} scanned /public/events/ in ${ms}ms — ${events.length} event${
      events.length === 1 ? "" : "s"
    }, ${skipped.length} skipped, ${empty.length} empty`
  );
  if (skipped.length > 0) {
    console.warn(
      `${TAG} skipped (folder name didn't match "E<n> <title>"): ${skipped
        .map((s) => `"${s}"`)
        .join(", ")}`
    );
  }
  if (empty.length > 0) {
    console.warn(
      `${TAG} empty (no images found, cover will be a placeholder): ${empty
        .map((s) => `"${s}"`)
        .join(", ")}`
    );
  }

  return events;
}

export function getEventBySlug(slug: string): SiteEvent | undefined {
  return getAllEvents().find((e) => e.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllEvents().map((e) => e.slug);
}
