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
 * Flags:
 *   --quick            Skip CDN description fetches (fast dev startup)
 *   --skip-if-present  Keep existing manifest when GitHub is unreachable
 *
 * Optional: set GITHUB_TOKEN to raise the GitHub API rate limit (60/hr -> 5000/hr).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = path.join(ROOT, "src", "data", "events-manifest.json");

const args = new Set(process.argv.slice(2));
const QUICK = args.has("--quick");
const SKIP_IF_PRESENT = args.has("--skip-if-present");

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GH_USERNAME ?? "noicehax";
const GITHUB_REPO = process.env.NEXT_PUBLIC_GH_REPO ?? "ssfimages";
const GITHUB_BRANCH = process.env.NEXT_PUBLIC_GH_BRANCH ?? "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
const EVENTS_PATH = "events";
const FETCH_TIMEOUT_MS = 15_000;

const CDN_BASE_URL = `https://cdn.statically.io/gh/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;
const GITHUB_TREE_API = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`;

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif|svg)$/i;
const FOLDER_RE = /^E(\d+)\s+(.+)$/i;
const DATE_RE =
  /(?:\s+on\s+|\s+)(\d{1,2}-[A-Za-z]{3,9}-\d{2,4}|\d{4}-\d{1,2}-\d{1,2})\s*$/;
const DESCRIPTION_FILES = ["description.txt", "description.md"];

function normalize(s) {
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

function readExistingManifest() {
  if (!fs.existsSync(OUT_FILE)) return null;
  try {
    const existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
    return Array.isArray(existing) && existing.length > 0 ? existing : null;
  } catch {
    return null;
  }
}

function keepExistingManifest(reason) {
  const existing = readExistingManifest();
  if (existing) {
    console.warn(
      `[generate-events] ${reason} Keeping existing manifest (${existing.length} events).`
    );
    return true;
  }
  return false;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(`timed out after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(fn, { retries = 3, delayMs = 2000 } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < retries) {
        console.warn(
          `[generate-events] Attempt ${attempt}/${retries} failed: ${err.message}. Retrying…`
        );
        await new Promise((r) => setTimeout(r, delayMs * attempt));
      }
    }
  }
  throw lastErr;
}

async function fetchFileList() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "sneha-sammilana-build",
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const res = await fetchWithTimeout(GITHUB_TREE_API, { headers });
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
  return data.tree
    .filter((node) => node.type === "blob" && typeof node.path === "string")
    .map((node) => node.path);
}

async function fetchDescription(folder, files) {
  for (const name of DESCRIPTION_FILES) {
    const rel = `${EVENTS_PATH}/${folder}/${name}`;
    if (!files.includes(rel)) continue;
    try {
      const res = await fetchWithTimeout(cdnUrl(rel));
      if (!res.ok) continue;
      const parsed = parseDescription(await res.text());
      if (parsed) return parsed;
    } catch {
      // descriptions are optional
    }
  }
  return undefined;
}

async function generate() {
  const cached = readExistingManifest();
  if (SKIP_IF_PRESENT && cached) {
    console.log(
      `[generate-events] Using cached manifest (${cached.length} events, --skip-if-present).`
    );
    return;
  }

  console.log(
    `[generate-events] Fetching ${GITHUB_USERNAME}/${GITHUB_REPO}@${GITHUB_BRANCH}…`
  );

  let files;
  try {
    files = await fetchWithRetry(() => fetchFileList());
  } catch (err) {
    console.warn(
      `[generate-events] Could not reach the assets repo: ${err.message}`
    );
    if (keepExistingManifest("GitHub unreachable.")) return;
    console.warn("[generate-events] Writing an empty manifest so the build still succeeds.");
    fs.writeFileSync(OUT_FILE, "[]", "utf8");
    return;
  }

  const prefix = `${EVENTS_PATH}/`;
  const byFolder = new Map();
  for (const file of files) {
    if (!file.startsWith(prefix)) continue;
    const rest = file.slice(prefix.length);
    const slashIdx = rest.indexOf("/");
    if (slashIdx === -1) continue;
    const folder = rest.slice(0, slashIdx);
    const fileName = rest.slice(slashIdx + 1);
    if (fileName.includes("/")) continue;
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder).push(fileName);
  }

  const events = [];
  const folders = [...byFolder.keys()];
  console.log(`[generate-events] Found ${folders.length} event folders.`);

  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    const fileNames = byFolder.get(folder);
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

    const gallery = imageFiles.map((f) => cdnUrl(`${EVENTS_PATH}/${folder}/${f}`));
    const cover = gallery[0] ?? null;
    const description = QUICK
      ? undefined
      : await fetchDescription(folder, files);

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

    if (!QUICK && (i + 1) % 10 === 0) {
      console.log(`[generate-events] Processed ${i + 1}/${folders.length} folders…`);
    }
  }

  events.sort((a, b) => b.eventNumber - a.eventNumber);

  fs.writeFileSync(OUT_FILE, JSON.stringify(events, null, 2), "utf8");
  console.log(
    `[generate-events] wrote ${events.length} events to ${path.relative(ROOT, OUT_FILE)}` +
      (QUICK ? " (quick mode, descriptions skipped)" : "")
  );
}

generate().catch((err) => {
  console.error("[generate-events] Fatal error:", err);
  process.exit(1);
});
