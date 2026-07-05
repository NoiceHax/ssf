
export const siteImages = {
  // ---- Home page ----
  home_hero: "/home_hero.png",
  home_origin_story: "/sslc.jpeg",

  // ---- About page ----
  about_hero: "/sslc.jpeg",
  about_founders: "/2015.jpeg",
  about_cta:
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=80",

  // ---- Events page ----
  // The events hero now derives from the latest event's cover image
  // (see components/events/hero.tsx), served via the jsDelivr CDN.

  // ---- Donate page ----
  donate_hero: "/donate_hero.png",
} as const;

export type SiteImageKey = keyof typeof siteImages;
