import { BadgeCheck, FileText, Receipt } from "lucide-react";
import { brand } from "@/lib/brand";

const items = [
  {
    icon: BadgeCheck,
    label: "Registration",
    value: brand.registration.type,
    note: `Reg. No. ${brand.registration.regNo}`,
  },
  {
    icon: FileText,
    label: "PAN",
    value: brand.registration.pan,
    note: "Required for 80G receipts",
  },
  {
    icon: Receipt,
    label: "Tax Exemption",
    value: "Section 80G",
    note: brand.registration.taxExemption,
  },
];

export function NgoDetails() {
  return (
    <section className="bg-primary py-20 text-on-primary md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-4 font-headline text-3xl md:text-4xl lg:text-headline-lg">
            NGO Details
          </h2>
          <p className="font-body text-body-md text-on-primary-container">
            We are a non-profit registered under the Companies Act, 2013. All
            governance documents are available on request. We believe trust is
            built one verifiable detail at a time.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-gutter">
          {items.map(({ icon: Icon, label, value, note }) => (
            <div
              key={label}
              className="border border-on-primary/15 p-8 md:p-10"
            >
              <Icon
                size={24}
                strokeWidth={1.75}
                className="mb-6 text-secondary-container"
              />
              <dt className="font-body text-label-md uppercase tracking-widest text-on-primary/60">
                {label}
              </dt>
              <dd className="mt-2 font-headline text-xl md:text-headline-sm">
                {value}
              </dd>
              <p className="mt-3 font-body text-body-md text-on-primary-container">
                {note}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
