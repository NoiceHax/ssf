import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/logo";
import { brand } from "@/lib/brand";

const footerNav = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Donate", href: "/donate" },
];

export function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-12 md:gap-gutter md:px-8 md:py-20 lg:px-margin-desktop lg:py-24">
        <div className="md:col-span-4">
          <Logo variant="dark" />
          <p className="mt-6 max-w-sm font-body text-body-md text-inverse-on-surface/80">
            {brand.tagline}
          </p>
          <div className="mt-6 flex items-center gap-3">
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
          <h4 className="mb-5 font-body text-label-md font-semibold uppercase tracking-widest text-tertiary-fixed-dim">
            Explore
          </h4>
          <ul className="space-y-3 font-body text-body-md text-inverse-on-surface/80">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-tertiary-fixed-dim"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <h4 className="mb-5 font-body text-label-md font-semibold uppercase tracking-widest text-tertiary-fixed-dim">
            Contact
          </h4>
          <ul className="space-y-4 font-body text-body-md text-inverse-on-surface/80">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-tertiary-fixed-dim" />
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
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-inverse-on-surface/20 px-3 py-1 font-body text-label-md font-semibold uppercase tracking-widest text-tertiary-fixed-dim transition-colors hover:border-tertiary-fixed-dim hover:bg-inverse-on-surface/5"
                >
                  Open in Maps
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-1 shrink-0 text-tertiary-fixed-dim" />
              <a
                href={`mailto:${brand.contact.email}`}
                className="hover:text-tertiary-fixed-dim transition-colors"
              >
                {brand.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-1 shrink-0 text-tertiary-fixed-dim" />
              <div className="flex flex-col gap-1">
                {brand.contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/[^+\d]/g, "")}`}
                    className="hover:text-tertiary-fixed-dim transition-colors"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-inverse-on-surface/10">
        <div className="mx-auto w-full max-w-7xl px-5 py-6 text-inverse-on-surface/60 md:px-8 lg:px-margin-desktop">
          <p className="font-body text-sm">
            © {new Date().getFullYear()} {brand.name}. Registered NGO
            under Section 8. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
