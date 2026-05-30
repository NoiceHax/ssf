"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Upcoming", href: "/upcoming" },
  { label: "Contact", href: "/donate" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-outline-variant shadow-sm"
          : "bg-surface border-b border-outline-variant"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-7xl items-center gap-6 pl-3 pr-5 md:pl-4 md:pr-8 lg:pl-6 lg:pr-margin-desktop"
      >
        <Logo />

        <div className="ml-auto hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-body text-label-md font-semibold transition-colors",
                  active
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "text-on-surface-variant hover:text-secondary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/donate#bank-details" className="hidden md:inline-flex md:translate-x-2 lg:translate-x-3">
            <Button variant="primary" size="sm">
              Donate
            </Button>
          </Link>
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-surface-container-high transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-outline-variant bg-surface">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-4 py-3 font-body text-label-md font-semibold transition-colors",
                    active
                      ? "bg-primary-fixed text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/donate#bank-details" className="mt-2">
              <Button variant="primary" size="md" className="w-full">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
