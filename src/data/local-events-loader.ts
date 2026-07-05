import fs from "node:fs";
import path from "node:path";
import type { SiteEvent } from "./events";
import type { UpcomingEvent } from "./upcoming-events";

const LOCAL_DIR = path.join(process.cwd(), ".local");

function readJsonFile<T>(fileName: string): T | null {
  const filePath = path.join(LOCAL_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}

/** Local-only event overrides, only loaded in development. */
export function loadLocalEvents(): SiteEvent[] {
  if (process.env.NODE_ENV !== "development") return [];
  const data = readJsonFile<SiteEvent[]>("events.json");
  return Array.isArray(data) ? data : [];
}

/** Local-only upcoming events, only loaded in development. */
export function loadLocalUpcomingEvents(): UpcomingEvent[] {
  if (process.env.NODE_ENV !== "development") return [];
  const data = readJsonFile<UpcomingEvent[]>("upcoming.json");
  return Array.isArray(data) ? data : [];
}

export function isLocalAdminAvailable(): boolean {
  return process.env.NODE_ENV === "development";
}
