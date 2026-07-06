import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Youtube } from "lucide-react";
import { Logo } from "@/components/logo";
import { VisitorCounter } from "@/components/visitor-counter";
import { brand } from "@/lib/brand";

const footerNav = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Donate", href: "/donate" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 py-12 md:grid-cols-12 md:gap-gutter md:px-8 md:py-14 lg:px-margin-desktop lg:py-16">
        <div className="md:col-span-4">
          <Logo variant="dark" />
          <p className="mt-4 max-w-xs font-body text-[15px] leading-relaxed text-inverse-on-surface/80">
            {brand.tagline}
          </p>
          <VisitorCounter />
          <div className="mt-5 flex items-center gap-3">
            <a
              href={`mailto:${brand.contact.email}`}
              aria-label="Email us"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-inverse-on-surface/30 hover:bg-inverse-on-surface/10 transition-colors"
            >
              <Mail size={18} />
            </a>
            <a
              href={brand.contact.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube channel"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-inverse-on-surface/30 hover:bg-inverse-on-surface/10 transition-colors"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 font-body text-[13px] font-semibold uppercase tracking-widest text-tertiary-fixed-dim">
            Explore
          </h4>
          <ul className="space-y-2.5 font-body text-[15px] text-inverse-on-surface/80">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-tertiary-fixed-dim"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <h4 className="mb-4 font-body text-[13px] font-semibold uppercase tracking-widest text-tertiary-fixed-dim">
            Contact
          </h4>
          <ul className="space-y-3 font-body text-[15px] text-inverse-on-surface/80">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-tertiary-fixed-dim" />
              <div>
                <p>
                  {brand.contact.address.lineOne}
                  <br />
                  {brand.contact.address.lineTwo}
                </p>
                <a
                  href={brand.contact.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-widest text-tertiary-fixed-dim transition-colors hover:text-inverse-on-surface"
                >
                  Open in Maps
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-tertiary-fixed-dim" />
              <a
                href={`mailto:${brand.contact.email}`}
                className="hover:text-tertiary-fixed-dim transition-colors"
              >
                {brand.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-inverse-on-surface/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-margin-desktop">
          <p className="font-body text-[13px] text-inverse-on-surface/50">
            &copy; {new Date().getFullYear()} {brand.name}. Registered NGO
            under Section 8.
          </p>
          <Link
            href="/privacy-policy"
            className="font-body text-[13px] text-inverse-on-surface/50 transition-colors hover:text-tertiary-fixed-dim"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
