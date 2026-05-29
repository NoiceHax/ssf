import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteImages } from "@/src/data/site-images";

export function HomeHero() {
  return (
    <header className="relative flex min-h-[88vh] items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteImages.home_hero}
          alt="A young boy reading a textbook on a charpai outside his rural home, the quiet hope at the heart of every Sneha Sammilana programme."
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.7] grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-primary/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-margin-desktop text-center text-on-primary">
        <div className="mb-8 inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <span className="font-body text-label-md uppercase tracking-widest text-secondary-fixed">
            Founded 2015
          </span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span className="font-body text-label-md uppercase tracking-widest text-white">
            Community Driven
          </span>
        </div>

        <h1
  className="mx-auto mb-6 max-w-4xl font-headline text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-headline-display"
  style={{ color: "#F28C28", textShadow: "none" }}
>
  A Bond That Chose to Give Back
</h1>

        <p className="mx-auto mb-12 max-w-2xl font-body text-body-md md:text-body-lg text-white/90">
          What began as a bond between school friends became a mission to
          support underserved communities through education, healthcare, and
          social welfare.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="#impact">
            <Button variant="secondary" size="lg">
              See Our Impact
            </Button>
          </Link>
          <Link href="/donate">
            <Button variant="ghost" size="lg">
              Join Our Mission
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 z-10 w-full px-5 text-center">
        <span className="font-body text-label-md uppercase tracking-widest text-white/70">
          Serving mankind
        </span>
      </div>
    </header>
  );
}
