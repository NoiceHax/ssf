import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/brand";

type Item = {
  icon: typeof Phone;
  label: string;
  values: { text: string; href?: string }[];
  /** Optional action pill rendered at the bottom of the card. */
  action?: { label: string; href: string };
};

const items: Item[] = [
  {
    icon: Phone,
    label: "Phone",
    values: brand.contact.phones.map((p) => ({
      text: p,
      href: `tel:${p.replace(/[^+\d]/g, "")}`,
    })),
  },
  {
    icon: Mail,
    label: "Email",
    values: [
      { text: brand.contact.email, href: `mailto:${brand.contact.email}` },
    ],
  },
  {
    icon: MapPin,
    label: "Address",
    values: [
      {
        text: `${brand.contact.address.lineOne} ${brand.contact.address.lineTwo}`,
      },
    ],
    action: {
      label: "Open in Maps",
      href: brand.contact.address.mapsUrl,
    },
  },
];

export function ContactInfo() {
  return (
    <section className="bg-surface-container-low py-20 md:py-28 lg:py-section-gap">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="mb-12 max-w-2xl md:mb-16">
          <h2 className="mb-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
            Talk to a Trustee
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Before you give, we&rsquo;d love to answer any question about a
            program, a past donor receipt, or simply who we are. A trustee
            personally responds to every message.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-gutter">
          {items.map(({ icon: Icon, label, values, action }) => (
            <div
              key={label}
              className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-8"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
                <Icon size={20} />
              </div>
              <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
                {label}
              </span>
              <div className="mt-2 flex flex-col gap-1">
                {values.map(({ text, href }) =>
                  href ? (
                    <a
                      key={text}
                      href={href}
                      className="break-words font-headline text-xl text-primary transition-colors hover:text-secondary md:text-headline-sm"
                    >
                      {text}
                    </a>
                  ) : (
                    <p
                      key={text}
                      className="font-body text-body-md text-primary"
                    >
                      {text}
                    </p>
                  )
                )}
              </div>
              {action && (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-outline-variant px-4 py-2 font-body text-label-md font-semibold uppercase tracking-widest text-primary transition-all hover:border-primary hover:bg-primary-fixed"
                >
                  {action.label}
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
