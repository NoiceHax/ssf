import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center md:px-8 lg:px-margin-desktop">
      <span className="font-headline text-7xl leading-none text-secondary md:text-8xl lg:text-9xl">
        404
      </span>
      <h1 className="mt-6 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
        This page wandered off
      </h1>
      <p className="mt-4 max-w-md font-body text-body-md text-on-surface-variant md:text-body-lg">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have been
        moved. Let&rsquo;s get you back to familiar ground.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/">
          <Button variant="primary" size="md">
            Back to Home
          </Button>
        </Link>
        <Link href="/events">
          <Button variant="outline" size="md">
            Browse Events
          </Button>
        </Link>
      </div>
    </section>
  );
}
