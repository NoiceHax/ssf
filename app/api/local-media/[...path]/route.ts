import fs from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

type Params = { path: string[] };

export async function GET(
  _request: NextRequest,
  { params }: { params: Params }
) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const segments = params.path ?? [];
  if (segments.length === 0 || segments.some((s) => s.includes(".."))) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const imagesRoot = path.join(process.cwd(), ".local", "images");
  const filePath = path.join(imagesRoot, ...segments);
  const resolved = path.resolve(filePath);

  if (!resolved.startsWith(path.resolve(imagesRoot) + path.sep)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(resolved).toLowerCase();
  const body = fs.readFileSync(resolved);
  return new NextResponse(body, {
    headers: {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    },
  });
}
