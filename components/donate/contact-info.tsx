import { Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/brand";
import { TrusteePhones } from "@/components/ui/trustee-phones";

export function ContactInfo() {
  return (
    <section className="bg-surface-container-low section-py">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="mb-8 max-w-2xl md:mb-12">
          <h2 className="mb-3 font-headline text-3xl md:mb-4 md:text-4xl lg:text-headline-lg text-primary">
            Talk to a Trustee
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Before you give, we&rsquo;d love to answer any question about a
            program, a past donor receipt, or simply who we are. A trustee
            personally responds to every message.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-gutter">
          <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-5 md:p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed text-primary">
              <Phone size={18} />
            </div>
            <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
              Phone
            </span>
            <div className="mt-3">
              <TrusteePhones variant="primary" />
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-5 md:p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed text-primary">
              <Mail size={18} />
            </div>
            <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
              Email
            </span>
            <a
              href={`mailto:${brand.contact.email}`}
              className="mt-2 break-words font-headline text-lg text-primary transition-colors hover:text-secondary md:text-xl"
            >
              {brand.contact.email}
            </a>
          </div>

          <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-5 md:p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed text-primary">
              <MapPin size={18} />
            </div>
            <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
              Address
            </span>
            <p className="mt-2 font-body text-body-md text-primary">
              {brand.contact.address.lineOne}, {brand.contact.address.lineTwo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
