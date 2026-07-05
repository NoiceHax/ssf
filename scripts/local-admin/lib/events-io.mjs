import fs from "node:fs";
import path from "node:path";
import {
  LOCAL_EVENTS_FILE,
  LOCAL_IMAGES_DIR,
  LOCAL_UPCOMING_FILE,
  MANIFEST_FILE,
  MANUAL_EVENTS_FILE,
  NEXT_MEDIA_PREFIX,
  readJson,
  writeJson,
} from "./paths.mjs";

function normalize(s) {
  return s.replace(/[\s\u00a0]+/g, " ").trim();
}

export function slugify(s) {
  return normalize(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function eventId(eventNumber) {
  return `E${String(eventNumber).padStart(2, "0")}`;
}

export function localMediaUrl(eventId, filename) {
  return `${NEXT_MEDIA_PREFIX}/${encodeURIComponent(eventId)}/${encodeURIComponent(filename)}`;
}

export function readManifestEvents() {
  const data = readJson(MANIFEST_FILE, []);
  return Array.isArray(data) ? data : [];
}

/** Best-effort parse of manual-events.ts seeds for read-only listing. */
export function readManualEvents() {
  if (!fs.existsSync(MANUAL_EVENTS_FILE)) return [];
  const text = fs.readFileSync(MANUAL_EVENTS_FILE, "utf8");
  const start = text.indexOf("const seeds: ManualSeed[] = [");
  if (start === -1) return [];
  const end = text.indexOf("];", start);
  if (end === -1) return [];
  const block = text.slice(start, end);

  const events = [];
  const objectRe = /\{\s*eventNumber:\s*(\d+)\s*,\s*title:\s*"([^"]*)"\s*,\s*date:\s*"([^"]*)"\s*,\s*description:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
  let match;
  while ((match = objectRe.exec(block)) !== null) {
    const eventNumber = parseInt(match[1], 10);
    const title = match[2];
    const date = match[3];
    const descBlock = match[4];
    const description = [...descBlock.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((m) =>
      m[1].replace(/\\"/g, '"')
    );
    const id = eventId(eventNumber);
    events.push({
      id,
      eventNumber,
      title,
      slug: slugify(`${id}-${title}`),
      date,
      coverImage: null,
      galleryImages: [],
      description,
      source: "manual",
    });
  }
  return events;
}

export function readLocalEvents() {
  const data = readJson(LOCAL_EVENTS_FILE, []);
  if (!Array.isArray(data)) return [];
  return data.map((e) => ({ ...e, source: "local" }));
}

export function writeLocalEvents(events) {
  const cleaned = events.map(({ source: _s, ...rest }) => rest);
  writeJson(LOCAL_EVENTS_FILE, cleaned);
}

export function readLocalUpcoming() {
  const data = readJson(LOCAL_UPCOMING_FILE, null);
  return Array.isArray(data) ? data : null;
}

export function writeLocalUpcoming(events) {
  writeJson(LOCAL_UPCOMING_FILE, events);
}

export function getMergedView() {
  const manifest = readManifestEvents().map((e) => ({ ...e, source: "manifest" }));
  const manifestIds = new Set(manifest.map((e) => e.id));
  const manual = readManualEvents().filter((e) => !manifestIds.has(e.id));
  const published = [...manifest, ...manual].sort((a, b) => b.eventNumber - a.eventNumber);

  const local = readLocalEvents();
  const localIds = new Set(local.map((e) => e.id));
  const effective = [...local, ...published.filter((e) => !localIds.has(e.id))].sort(
    (a, b) => b.eventNumber - a.eventNumber
  );

  return { published, local, effective, counts: { published: published.length, local: local.length, effective: effective.length } };
}

export function upsertLocalEvent(payload) {
  const eventNumber = Number(payload.eventNumber);
  if (!Number.isFinite(eventNumber) || eventNumber < 1) {
    throw new Error("eventNumber must be a positive number");
  }
  const title = normalize(payload.title ?? "");
  if (!title) throw new Error("title is required");

  const id = eventId(eventNumber);
  const slug = slugify(`${id}-${title}`);
  const date = payload.date ? normalize(payload.date) : undefined;
  const description = Array.isArray(payload.description)
    ? payload.description.map(normalize).filter(Boolean)
    : typeof payload.description === "string"
      ? payload.description
          .split(/\n\s*\n/)
          .map(normalize)
          .filter(Boolean)
      : undefined;

  const imageDir = path.join(LOCAL_IMAGES_DIR, id);
  let galleryImages = Array.isArray(payload.galleryImages) ? [...payload.galleryImages] : [];

  if (fs.existsSync(imageDir)) {
    const files = fs
      .readdirSync(imageDir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    galleryImages = files.map((f) => localMediaUrl(id, f));
  }

  const event = {
    id,
    eventNumber,
    title,
    slug,
    ...(date && { date }),
    coverImage: galleryImages[0] ?? null,
    galleryImages,
    ...(description && description.length > 0 && { description }),
  };

  const events = readLocalEvents();
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) events.push(event);
  else events[idx] = event;
  events.sort((a, b) => b.eventNumber - a.eventNumber);
  writeLocalEvents(events);
  return event;
}

export function deleteLocalEvent(id) {
  const events = readLocalEvents().filter((e) => e.id !== id);
  writeLocalEvents(events);
  const imageDir = path.join(LOCAL_IMAGES_DIR, id);
  if (fs.existsSync(imageDir)) {
    fs.rmSync(imageDir, { recursive: true, force: true });
  }
}

export function refreshLocalEventGallery(id) {
  const events = readLocalEvents();
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  const imageDir = path.join(LOCAL_IMAGES_DIR, id);
  let galleryImages = [];
  if (fs.existsSync(imageDir)) {
    const files = fs
      .readdirSync(imageDir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    galleryImages = files.map((f) => localMediaUrl(id, f));
  }

  events[idx] = {
    ...events[idx],
    coverImage: galleryImages[0] ?? null,
    galleryImages,
  };
  writeLocalEvents(events);
  return events[idx];
}

export function saveLocalImage(id, filename, buffer) {
  const safeName = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, "_");
  if (!/\.(jpe?g|png|webp|gif|avif)$/i.test(safeName)) {
    throw new Error("Only image files are allowed");
  }
  const dir = path.join(LOCAL_IMAGES_DIR, id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, safeName), buffer);
  refreshLocalEventGallery(id);
  return { filename: safeName, url: localMediaUrl(id, safeName) };
}

export function deleteLocalImage(id, filename) {
  const safeName = path.basename(filename);
  const filePath = path.join(LOCAL_IMAGES_DIR, id, safeName);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  refreshLocalEventGallery(id);
}
