import type { Metadata } from "next";
import { Literata, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { brand } from "@/lib/brand";

const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-literata",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "Sneha Sammilana Foundation | A Friendship That Chose to Give Back",
  description:
    "Sneha Sammilana is a Bengaluru-based foundation bridging privilege and need through education, healthcare, and community welfare across Karnataka.",
  icons: {
    icon: brand.faviconPath,
    apple: brand.appleTouchIconPath,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${literata.variable} ${beVietnamPro.variable} scroll-smooth`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
