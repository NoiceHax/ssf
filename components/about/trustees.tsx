import Image from "next/image";
import { trustees } from "@/src/data/trustees";

export function Trustees() {
  return (
    <section className="bg-surface-container-high section-py">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="mb-12 max-w-2xl md:mb-16">
          <h2 className="mb-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
            Our Trustees
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            The custodians of our promise a group of friends, professionals,
            and community leaders entrusted with guiding the foundation&rsquo;s
            work.
          </p>
        </div>

        <ul
          role="list"
          className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8 md:gap-y-12 lg:gap-x-10"
        >
          {trustees.map((trustee) => (
            <li key={trustee.id} className="flex flex-col items-center text-center">
              <TrusteeAvatar image={trustee.image} name={trustee.name} />
              <p className="mt-4 font-body text-body-md font-medium text-primary">
                {trustee.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrusteeAvatar({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-full border border-outline-variant bg-surface-container-low">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
        loading="lazy"
        className="object-cover"
      />
    </div>
  );
}
