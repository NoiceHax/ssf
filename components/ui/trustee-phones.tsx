import { Phone } from "lucide-react";
import { brand } from "@/lib/brand";

type TrusteePhonesProps = {
  /** "all" — full list (Contact a Trustee). "primary" — first two, comma-separated (Talk to a Trustee). */
  variant?: "all" | "primary";
};

export function TrusteePhones({ variant = "all" }: TrusteePhonesProps) {
  const phones =
    variant === "primary"
      ? brand.contact.phones.slice(0, 2)
      : brand.contact.phones;

  if (variant === "primary") {
    return (
      <p className="font-headline text-lg leading-relaxed text-primary md:text-xl">
        {phones.map((phone, index) => (
          <span key={phone}>
            {index > 0 && ", "}
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="transition-colors hover:text-secondary"
            >
              {phone}
            </a>
          </span>
        ))}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-outline-variant overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
      {phones.map((phone, index) => (
        <li key={phone}>
          <a
            href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-3 px-3 py-2 font-body text-body-sm text-primary transition-colors hover:bg-surface-container-low md:px-4 md:py-2.5 md:text-body-md"
          >
            <Phone size={14} className="shrink-0 text-secondary" aria-hidden />
            <span className="min-w-0 flex-1">{phone}</span>
            {index === 0 && (
              <span className="shrink-0 font-body text-label-md uppercase tracking-widest text-secondary">
                Primary
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
