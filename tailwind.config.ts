import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "4rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        surface: "#fbf9f5",
        "surface-bright": "#fbf9f5",
        "surface-dim": "#dbdad6",
        "surface-variant": "#e4e2de",
        "surface-tint": "#455f88",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3ef",
        "surface-container": "#efeeea",
        "surface-container-high": "#eae8e4",
        "surface-container-highest": "#e4e2de",
        "inverse-surface": "#30312e",
        "inverse-on-surface": "#f2f0ed",
        "inverse-primary": "#adc7f7",
        background: "#fbf9f5",
        "on-background": "#1b1c1a",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#43474e",
        outline: "#74777f",
        "outline-variant": "#c4c6cf",
        primary: "#002045",
        "on-primary": "#ffffff",
        "primary-container": "#1a365d",
        "on-primary-container": "#86a0cd",
        "primary-fixed": "#d6e3ff",
        "primary-fixed-dim": "#adc7f7",
        "on-primary-fixed": "#001b3c",
        "on-primary-fixed-variant": "#2d476f",
        secondary: "#904d00",
        "on-secondary": "#ffffff",
        "secondary-container": "#fe932c",
        "on-secondary-container": "#663500",
        "secondary-fixed": "#ffdcc3",
        "secondary-fixed-dim": "#ffb77d",
        "on-secondary-fixed": "#2f1500",
        "on-secondary-fixed-variant": "#6e3900",
        tertiary: "#321b00",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#4f2e00",
        "on-tertiary-container": "#c6955e",
        "tertiary-fixed": "#ffddba",
        "tertiary-fixed-dim": "#f2bc82",
        "on-tertiary-fixed": "#2b1700",
        "on-tertiary-fixed-variant": "#633f0f",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        "section-gap": "80px",
        gutter: "24px",
        unit: "8px",
      },
      fontFamily: {
        display: ["var(--font-literata)", "Literata", "serif"],
        headline: ["var(--font-literata)", "Literata", "serif"],
        body: ["var(--font-be-vietnam-pro)", "Be Vietnam Pro", "sans-serif"],
      },
      fontSize: {
        "headline-display": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "headline-lg": [
          "3rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "headline-lg-mobile": [
          "2.25rem",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        "headline-md": ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-sm": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["1.25rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "label-md": [
          "0.875rem",
          { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }
        ],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        marquee: "marquee 180s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
