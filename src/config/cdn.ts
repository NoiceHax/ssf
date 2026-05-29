/**
 * Centralized CDN configuration.
 *
 * Event media lives in a dedicated GitHub repository and is served — for free —
 * through a CDN. NOTHING in the app should hardcode an image URL: every event
 * image URL is derived from `CDN_BASE_URL` below (the build-time discovery
 * script `scripts/generate-events.mjs` mirrors these same values from the same
 * env vars and bakes the finished URLs into the manifest).
 *
 *   GitHub repo  ->  CDN  ->  Next.js website
 *
 * DELIVERY: Statically.io (https://statically.io) — a free CDN that serves
 * files straight from GitHub with no repository size limit. (jsDelivr was the
 * original plan but enforces a hard 50 MB total-repo limit, which this 700 MB+
 * and growing library exceeds.)
 *
 * DISCOVERY: the GitHub REST "git tree" API (in the build script) — lists every
 * file regardless of repo size, so events are still auto-discovered.
 *
 * To point the site at a different repo/branch — or swap CDN providers (e.g.
 * Cloudflare Pages) — change the env vars / this one constant. No other code
 * changes are required because every URL flows from here.
 */

export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GH_USERNAME ?? "noicehax";
export const GITHUB_REPO = process.env.NEXT_PUBLIC_GH_REPO ?? "ssfimages";
export const GITHUB_BRANCH = process.env.NEXT_PUBLIC_GH_BRANCH ?? "main";

/** Root folder (inside the assets repo) that holds the event folders. */
export const EVENTS_PATH = "events";

/**
 * Base URL every image derives from, e.g.
 * https://cdn.statically.io/gh/noicehax/ssfimages/main
 */
export const CDN_BASE_URL = `https://cdn.statically.io/gh/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

/**
 * Build a fully-qualified CDN URL from a repo-relative path. Each path segment
 * is URL-encoded so folder names with spaces (e.g. "E01 Event Name") work.
 */
export function cdnUrl(relativePath: string): string {
  const clean = relativePath.replace(/^\/+/, "");
  const encoded = clean
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${CDN_BASE_URL}/${encoded}`;
}

/** Convenience helper for an event image given its folder + file name. */
export function eventImageUrl(folder: string, file: string): string {
  return cdnUrl(`${EVENTS_PATH}/${folder}/${file}`);
}
