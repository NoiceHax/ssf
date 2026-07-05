import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT = path.resolve(__dirname, "..", "..", "..");
export const LOCAL_DIR = path.join(ROOT, ".local");
export const LOCAL_EVENTS_FILE = path.join(LOCAL_DIR, "events.json");
export const LOCAL_UPCOMING_FILE = path.join(LOCAL_DIR, "upcoming.json");
export const LOCAL_IMAGES_DIR = path.join(LOCAL_DIR, "images");
export const MANIFEST_FILE = path.join(ROOT, "src", "data", "events-manifest.json");
export const MANUAL_EVENTS_FILE = path.join(ROOT, "src", "data", "manual-events.ts");
export const PUBLIC_DIR = path.join(ROOT, "scripts", "local-admin", "public");

export const PORT = Number(process.env.LOCAL_ADMIN_PORT ?? 3847);
export const HOST = "127.0.0.1";

/** URL prefix the Next.js dev server uses for local images. */
export const NEXT_MEDIA_PREFIX = "/api/local-media";

export function ensureLocalDirs() {
  fs.mkdirSync(LOCAL_IMAGES_DIR, { recursive: true });
}

export function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

export function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}
