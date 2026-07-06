  export const brand = {
  name: "Sneha Sammilana Foundation",
  tagline: "\"Service to mankind is service to God.\"",

  logoPath: "/logo/Logo_ssf_circled.png",
  logoDarkPath: "/logo/Logo_ssf_circled.png",

  faviconPath: "/logo/Logo_ssf_circled.png",
  appleTouchIconPath: "/logo/Logo_ssf_circled.png",

  contact: {
    email: "snehasammilanafoundation@gmail.com",
    phones: [
      "+91 98459 19905",
      "+91 99800 30440",
      "+91 94486 84989",
      "+91 70220 20811",
      "+91 98450 11464",
      "+91 99005 14779",
    ],
    address: {
      lineOne: "Sy. No. 5, Navami Nilaya, Ittangur Road",
      lineTwo: "Sarjapura, Bengaluru, Karnataka 562125",
      mapsUrl: "https://share.google/oaGOxzILoPdvATbF2",
    },
    youtube: "https://www.youtube.com/@snehasammilanafoundation1286",
  },

  registration: {
    type: "Section 8 Registered Foundation",
    regNo: "BKIIV337/2015-16",
    registeredSince: "2016",
    act: "Registered under Govt Act of 1996",
    urd: "AAQTS8012AE20231",
    taxExemption: "Tax exemption under Section 80G",
    pan: "",
  },
  website: "https://snehasammilana.in",
} as const;

export type Brand = typeof brand;
