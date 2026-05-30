import { brand } from "@/lib/brand";

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.6652981363036!2d77.78677499999999!3d12.864881400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae72de3e6e9267%3A0x3a6846035a4d495f!2sSri%20Ram%20Public%20School%20-%20CBSE%20School%2C%20Sarjapura!5e0!3m2!1sen!2sin!4v1780159291539!5m2!1sen!2sin";

export function LocationSection() {
  return (
    <section
      aria-labelledby="find-us-heading"
      className="bg-surface py-20 md:py-28 lg:py-section-gap"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="mb-10 max-w-2xl md:mb-12">
          <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
            Visit Us
          </span>
          <h2
            id="find-us-heading"
            className="mt-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary"
          >
            Find Us
          </h2>
          <p className="mt-4 font-body text-body-md text-on-surface-variant md:text-body-lg">
            {brand.contact.address.lineOne}, {brand.contact.address.lineTwo}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-outline-variant editorial-shadow">
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sneha Sammilana Foundation location — Sarjapura, Bengaluru"
            className="block w-full"
          />
        </div>
      </div>
    </section>
  );
}
