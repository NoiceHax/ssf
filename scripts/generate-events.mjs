/**
 * Build-time event discovery.
 *
 * Enumerates the event-media GitHub repository through the GitHub REST "git
 * tree" API (one request lists every file, no repo size limit) and writes a
 * JSON manifest so the Next.js app never touches the network or a filesystem at
 * runtime.
 *
 *   GitHub repo  ->  GitHub API (discovery)   ->  manifest
 *   GitHub repo  ->  Statically CDN (delivery) ->  <Image src=...>
 *
 * Folder names are the single source of truth. Drop a new folder like
 * "E27 Event Name" with img_001.webp, img_002.webp into the repo, push, and
 * redeploy — the event appears automatically. No code changes, no manual paths.
 *
 * Run: node scripts/generate-events.mjs
 *
 * Optional: set GITHUB_TOKEN to raise the GitHub API rate limit (60/hr -> 5000/hr).
 * NOTE: env defaults below are kept in sync with src/config/cdn.ts.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = path.join(ROOT, "src", "data", "events-manifest.json");

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GH_USERNAME ?? "noicehax";
const GITHUB_REPO = process.env.NEXT_PUBLIC_GH_REPO ?? "ssfimages";
const GITHUB_BRANCH = process.env.NEXT_PUBLIC_GH_BRANCH ?? "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
const EVENTS_PATH = "events";

const CDN_BASE_URL = `https://cdn.statically.io/gh/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;
const GITHUB_TREE_API = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`;

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif|svg)$/i;
const FOLDER_RE = /^E(\d+)\s+(.+)$/i;
const DATE_RE =
  /(?:\s+on\s+|\s+)(\d{1,2}-[A-Za-z]{3,9}-\d{2,4}|\d{4}-\d{1,2}-\d{1,2})\s*$/;
const DESCRIPTION_FILES = ["description.txt", "description.md"];

function normalize(s) {
  // Collapse all whitespace (incl. non-breaking spaces) and trim.
  return s.replace(/[\s\u00a0]+/g, " ").trim();
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

function cdnUrl(relativePath) {
  const clean = relativePath.replace(/^\/+/, "");
  const encoded = clean
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${CDN_BASE_URL}/${encoded}`;
}

function parseDescription(raw) {
  const text = (raw ?? "").trim();
  if (!text) return undefined;
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/[\s\u00a0]+/g, " ").trim())
    .filter(Boolean);
  return paragraphs.length > 0 ? paragraphs : undefined;
}

async function fetchFileList() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "sneha-sammilana-build",
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const res = await fetch(GITHUB_TREE_API, { headers });
  if (!res.ok) {
    throw new Error(`GitHub tree API responded ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  if (!Array.isArray(data.tree)) {
    throw new Error("Unexpected GitHub response: missing 'tree' array");
  }
  if (data.truncated) {
    console.warn(
      "[generate-events] WARNING: GitHub tree was truncated (>100k entries). Some events may be missing."
    );
  }
  // blobs only -> repo-relative paths, e.g. "events/E01 Foo/img_001.webp"
  return data.tree
    .filter((node) => node.type === "blob" && typeof node.path === "string")
    .map((node) => node.path);
}

async function fetchDescription(folder, files) {
  for (const name of DESCRIPTION_FILES) {
    const rel = `${EVENTS_PATH}/${folder}/${name}`;
    if (!files.includes(rel)) continue;
    try {
      const res = await fetch(cdnUrl(rel));
      if (!res.ok) continue;
      const parsed = parseDescription(await res.text());
      if (parsed) return parsed;
    } catch {
      // ignore – descriptions are optional
    }
  }
  return undefined;
}

async function generate() {
  let files;
  try {
    files = await fetchFileList();
  } catch (err) {
    console.warn(
      `[generate-events] Could not reach the assets repo (${GITHUB_USERNAME}/${GITHUB_REPO}@${GITHUB_BRANCH}): ${err.message}`
    );
    console.warn("[generate-events] Writing an empty manifest so the build still succeeds.");
    fs.writeFileSync(OUT_FILE, "[]", "utf8");
    return;
  }

  // Group image files by their top-level event folder (events/<folder>/<file>).
  const prefix = `${EVENTS_PATH}/`;
  const byFolder = new Map();
  for (const file of files) {
    if (!file.startsWith(prefix)) continue;
    const rest = file.slice(prefix.length);
    const slashIdx = rest.indexOf("/");
    if (slashIdx === -1) continue; // file directly under events/, not in a folder
    const folder = rest.slice(0, slashIdx);
    const fileName = rest.slice(slashIdx + 1);
    if (fileName.includes("/")) continue; // ignore nested subfolders
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder).push(fileName);
  }

  const events = [];

  for (const [folder, fileNames] of byFolder) {
    const cleaned = normalize(folder);
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

    const imageFiles = fileNames
      .filter((f) => IMAGE_RE.test(f))
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
      );

    if (imageFiles.length === 0) continue;

    // First image = cover, the rest make up the gallery.
    const gallery = imageFiles.map((f) => cdnUrl(`${EVENTS_PATH}/${folder}/${f}`));
    const cover = gallery[0] ?? null;
    const description = await fetchDescription(folder, files);

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
  console.log(
    `[generate-events] wrote ${events.length} events to ${path.relative(ROOT, OUT_FILE)} (source: ${GITHUB_USERNAME}/${GITHUB_REPO}@${GITHUB_BRANCH})`
  );
}

generate().catch((err) => {
  console.error("[generate-events] Fatal error:", err);
  process.exit(1);
});
