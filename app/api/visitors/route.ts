import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const COUNT_FILE = path.join(process.cwd(), ".local", "visitor-count.json");
/** Added to the stored count for public display. */
const VISITOR_BASELINE = 650;

type GlobalStore = typeof globalThis & { __ssfVisitorCount?: number };

function readFileCount(): number | null {
  try {
    if (!fs.existsSync(COUNT_FILE)) return null;
    const data = JSON.parse(fs.readFileSync(COUNT_FILE, "utf8")) as {
      count?: number;
    };
    return typeof data.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}

function getCount(): number {
  const g = globalThis as GlobalStore;
  if (typeof g.__ssfVisitorCount === "number") return g.__ssfVisitorCount;
  return readFileCount() ?? 0;
}

function setCount(count: number) {
  const g = globalThis as GlobalStore;
  g.__ssfVisitorCount = count;
  try {
    fs.mkdirSync(path.dirname(COUNT_FILE), { recursive: true });
    fs.writeFileSync(
      COUNT_FILE,
      JSON.stringify({ count, updated: new Date().toISOString() }, null, 2)
    );
  } catch {
    // read-only filesystem on some hosts — in-memory only
  }
}

function displayCount(stored: number) {
  return stored + VISITOR_BASELINE;
}

export async function GET() {
  return NextResponse.json({ count: displayCount(getCount()) });
}

export async function POST() {
  const stored = getCount() + 1;
  setCount(stored);
  return NextResponse.json({ count: displayCount(stored) });
}
