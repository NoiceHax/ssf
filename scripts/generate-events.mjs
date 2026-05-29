/**
 * Scans /public/events/ and writes a JSON manifest so that the Next.js app
 * never needs `fs` at runtime. This keeps serverless function bundles tiny
 * because Vercel won't trace into the (potentially huge) image directories.
 *
 * Run: node scripts/generate-events.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const EVENTS_DIR = path.join(ROOT, "public", "events");
const OUT_FILE = path.join(ROOT, "src", "data", "events-manifest.json");

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif|svg)$/i;
const FOLDER_RE = /^E(\d+)\s+(.+)$/i;
const DATE_RE =
  /(?:\s+on\s+|\s+)(\d{1,2}-[A-Za-z]{3,9}-\d{2,4}|\d{4}-\d{1,2}-\d{1,2})\s*$/;
const DESCRIPTION_FILES = ["description.txt", "description.md"];

function normalize(s) {
  return s.replace(/\s+/g, " ").trim();
}

function slugify(s) {
  return normalize(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pad(n, w = 2) {
  return String(n).padStart(w, "0");
}

function webPath(folder, file) {
  return `/events/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

function readDescription(folderPath) {
  for (const name of DESCRIPTION_FILES) {
    const fp = path.join(folderPath, name);
    if (!fs.existsSync(fp)) continue;
    try {
      const raw = fs.readFileSync(fp, "utf8").trim();
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

function generate() {
  if (!fs.existsSync(EVENTS_DIR)) {
    console.warn("[generate-events] /public/events/ not found, writing empty manifest.");
    fs.writeFileSync(OUT_FILE, "[]", "utf8");
    return;
  }

  const dirents = fs.readdirSync(EVENTS_DIR, { withFileTypes: true });
  const events = [];

  for (const d of dirents) {
    if (!d.isDirectory()) continue;

    const cleaned = normalize(d.name);
    const match = cleaned.match(FOLDER_RE);
    if (!match) continue;

    const eventNumber = parseInt(match[1], 10);
    let rest = match[2].trim();

    let date;
    const dateMatch = rest.match(DATE_RE);
    if (dateMatch && typeof dateMatch.index === "number") {
      date = dateMatch[1];
      rest = rest.slice(0, dateMatch.index).replace(/\s+on\s*$/i, "").trim();
    }

    const folderPath = path.join(EVENTS_DIR, d.name);
    const imageFiles = fs
      .readdirSync(folderPath)
      .filter((f) => IMAGE_RE.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

    const gallery = imageFiles.map((f) => webPath(d.name, f));
    const cover = gallery[0] ?? null;
    const description = readDescription(folderPath);

    const id = `E${pad(eventNumber)}`;
    const slug = slugify(`${id}-${rest}`);

    events.push({
      id,
      eventNumber,
      title: rest,
      slug,
      ...(date && { date }),
      coverImage: cover,
      galleryImages: gallery,
      ...(description && { description }),
    });
  }

  events.sort((a, b) => b.eventNumber - a.eventNumber);

  fs.writeFileSync(OUT_FILE, JSON.stringify(events, null, 2), "utf8");
  console.log(`[generate-events] wrote ${events.length} events to ${path.relative(ROOT, OUT_FILE)}`);
}

generate();
