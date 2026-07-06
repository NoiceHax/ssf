import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type EventLayoutCardProps = {
  badge: string;
  title: string;
  date?: string;
  location?: string;
  description?: string;
  href?: string;
  coverImage?: string;
  priority?: boolean;
  footerLabel?: string;
  className?: string;
};

const cardClassName =
  "group flex h-full w-full min-h-0 flex-col overflow-hidden border border-outline-variant bg-surface-container-lowest transition-all duration-300 editorial-shadow";

export function EventLayoutCard({
  badge,
  title,
  date,
  location,
  description,
  href,
  coverImage,
  priority = false,
  footerLabel,
  className,
}: EventLayoutCardProps) {
  const interactive = Boolean(href);

  const content = (
    <>
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface-container-high">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`${title} cover`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed via-surface-container-high to-secondary-fixed/25" />
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <Image
                src={brand.logoPath}
                alt={`${brand.name} logo`}
                width={128}
                height={128}
                className="h-auto w-24 object-contain drop-shadow-sm md:w-32"
              />
            </div>
          </>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 font-body text-label-md font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
          {badge}
        </span>
      </div>

      <div className="flex min-h-[11rem] flex-1 flex-col gap-4 p-6 md:min-h-[12rem] md:p-8">
        {date && (
          <p className="inline-flex shrink-0 items-center gap-1.5 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
            <Calendar size={14} /> {date}
          </p>
        )}
        <h3 className="min-h-[3.25rem] flex-1 font-headline text-xl leading-tight text-primary md:min-h-[4rem] md:text-2xl lg:min-h-[4.5rem] lg:text-headline-sm">
          {title}
        </h3>
        {location && (
          <p className="inline-flex items-center gap-1.5 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
            <MapPin size={14} /> {location}
          </p>
        )}
        {description && (
          <p className="font-body text-body-sm leading-relaxed text-on-surface-variant md:text-body-md">
            {description}
          </p>
        )}
        {footerLabel && (
          <div className="mt-auto inline-flex items-center gap-2 font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
            {footerLabel}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        )}
      </div>
    </>
  );

  if (interactive && href) {
    return (
      <Link
        href={href}
        aria-label={`View event: ${title}`}
        className={cn(
          cardClassName,
          "hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <article
      className={cn(cardClassName, className)}
      aria-label={title}
    >
      {content}
    </article>
  );
}
