import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventNotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center md:px-8 lg:px-margin-desktop">
      <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
        404
      </span>
      <h1 className="mt-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
        Event not found
      </h1>
      <p className="mt-4 font-body text-body-md text-on-surface-variant">
        We couldn&rsquo;t find the event you were looking for. It may have been
        renamed or removed from the archive.
      </p>
      <Link href="/events" className="mt-8">
        <Button variant="primary" size="md">
          Back to all events
        </Button>
      </Link>
    </section>
  );
}
