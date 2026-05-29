/** @type {import('next').NextConfig} */
const nextConfig = {
  // Event media is served from a CDN and the only local static files live in
  // /public. Neither should ever be traced into serverless function bundles
  // (that's what blew past Vercel's 250 MB function limit). Exclude them so the
  // /events and /events/[slug] functions stay tiny.
  experimental: {
    outputFileTracingExcludes: {
      "*": ["public/**", "ssfimages/**"],
      "/events/[slug]": ["public/**", "ssfimages/**"],
      "/events": ["public/**", "ssfimages/**"],
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.statically.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
