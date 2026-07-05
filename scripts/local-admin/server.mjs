/**
 * Local-only events admin dashboard.
 *
 * Stores drafts in gitignored `.local/`, nothing is pushed to GitHub.
 * Run alongside `npm run dev` to preview changes on localhost:3000.
 *
 *   npm run admin   ->  http://127.0.0.1:3847
 */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import {
  HOST,
  LOCAL_IMAGES_DIR,
  PORT,
  PUBLIC_DIR,
  ensureLocalDirs,
} from "./lib/paths.mjs";
import {
  deleteLocalEvent,
  deleteLocalImage,
  getMergedView,
  readLocalEvents,
  readLocalUpcoming,
  saveLocalImage,
  upsertLocalEvent,
  writeLocalUpcoming,
} from "./lib/events-io.mjs";

ensureLocalDirs();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function serveStatic(res, filePath) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
  res.end(fs.readFileSync(filePath));
}

function serveLocalImage(res, id, filename) {
  const safeName = path.basename(filename);
  const filePath = path.join(LOCAL_IMAGES_DIR, id, safeName);
  const resolved = path.resolve(filePath);
  const root = path.resolve(LOCAL_IMAGES_DIR, id);
  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!fs.existsSync(resolved)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(resolved).toLowerCase();
  res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
  res.end(fs.readFileSync(resolved));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${HOST}:${PORT}`);
  const { pathname } = url;
  const method = req.method ?? "GET";

  try {
    // Static UI
    if (method === "GET" && pathname === "/") {
      return serveStatic(res, path.join(PUBLIC_DIR, "index.html"));
    }
    if (method === "GET" && pathname === "/admin.css") {
      return serveStatic(res, path.join(PUBLIC_DIR, "admin.css"));
    }
    if (method === "GET" && pathname === "/admin.js") {
      return serveStatic(res, path.join(PUBLIC_DIR, "admin.js"));
    }

    // Preview images in dashboard (Next.js serves them at /api/local-media in dev)
    const mediaMatch = pathname.match(/^\/media\/([^/]+)\/([^/]+)$/);
    if (method === "GET" && mediaMatch) {
      return serveLocalImage(res, decodeURIComponent(mediaMatch[1]), decodeURIComponent(mediaMatch[2]));
    }

    // API
    if (method === "GET" && pathname === "/api/status") {
      return json(res, 200, {
        ok: true,
        localDir: ".local/",
        gitignored: true,
        previewUrl: "http://localhost:3000/events",
        note: "Run npm run dev in another terminal to preview on the site.",
      });
    }

    if (method === "GET" && pathname === "/api/events") {
      return json(res, 200, getMergedView());
    }

    if (method === "GET" && pathname === "/api/local/events") {
      return json(res, 200, readLocalEvents());
    }

    if (method === "POST" && pathname === "/api/local/events") {
      const body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
      const event = upsertLocalEvent(body);
      return json(res, 200, { ok: true, event });
    }

    const deleteEventMatch = pathname.match(/^\/api\/local\/events\/([^/]+)$/);
    if (method === "DELETE" && deleteEventMatch) {
      deleteLocalEvent(decodeURIComponent(deleteEventMatch[1]));
      return json(res, 200, { ok: true });
    }

    const uploadMatch = pathname.match(/^\/api\/local\/events\/([^/]+)\/images$/);
    if (method === "POST" && uploadMatch) {
      const id = decodeURIComponent(uploadMatch[1]);
      const body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
      if (!body.filename || !body.data) {
        return json(res, 400, { error: "filename and data (base64) required" });
      }
      const buffer = Buffer.from(body.data, "base64");
      const result = saveLocalImage(id, body.filename, buffer);
      return json(res, 200, { ok: true, ...result });
    }

    const deleteImageMatch = pathname.match(/^\/api\/local\/events\/([^/]+)\/images\/([^/]+)$/);
    if (method === "DELETE" && deleteImageMatch) {
      deleteLocalImage(
        decodeURIComponent(deleteImageMatch[1]),
        decodeURIComponent(deleteImageMatch[2])
      );
      return json(res, 200, { ok: true });
    }

    if (method === "GET" && pathname === "/api/upcoming") {
      const local = readLocalUpcoming();
      return json(res, 200, { local, usingLocal: local !== null });
    }

    if (method === "POST" && pathname === "/api/upcoming") {
      const body = JSON.parse((await readBody(req)).toString("utf8") || "{}");
      if (!Array.isArray(body.events)) {
        return json(res, 400, { error: "events array required" });
      }
      writeLocalUpcoming(body.events);
      return json(res, 200, { ok: true, count: body.events.length });
    }

    if (method === "DELETE" && pathname === "/api/upcoming") {
      const file = path.join(process.cwd(), ".local", "upcoming.json");
      if (fs.existsSync(file)) fs.unlinkSync(file);
      return json(res, 200, { ok: true });
    }

    res.writeHead(404);
    res.end("Not found");
  } catch (err) {
    console.error("[local-admin]", err);
    json(res, 500, { error: err.message ?? "Internal error" });
  }
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error("");
    console.error(`  Port ${PORT} is already in use, another admin instance is probably running.`);
    console.error(`  Open http://${HOST}:${PORT} or stop the other process, then retry.`);
    console.error(`  Windows: Get-NetTCPConnection -LocalPort ${PORT} | Select OwningProcess`);
    console.error("");
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, HOST, () => {
  console.log("");
  console.log("  SSF Local Admin (gitignored, nothing touches GitHub)");
  console.log(`  Dashboard:  http://${HOST}:${PORT}`);
  console.log("  Data:       .local/events.json, .local/images/, .local/upcoming.json");
  console.log("  Preview:    npm run dev  →  http://localhost:3000/events");
  console.log("");
});
