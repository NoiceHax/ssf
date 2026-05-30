"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Phone, Send } from "lucide-react";
import { brand } from "@/lib/brand";

const trusteePhones = brand.contact.phones.slice(0, 3);

// Client-side rate limit (no backend yet): cap how many messages can be sent
// within a rolling time window. Persisted so a refresh can't bypass it.
const MAX_MESSAGES = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const STORAGE_KEY = "ssf-contact-submissions";

function loadTimestamps(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    return parsed.filter(
      (t): t is number => typeof t === "number" && now - t < WINDOW_MS
    );
  } catch {
    return [];
  }
}

function saveTimestamps(timestamps: number[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

export function ContactTrustee() {
  const [submitted, setSubmitted] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const isCoolingDown = cooldownUntil !== null && now < cooldownUntil;
  const secondsLeft = isCoolingDown
    ? Math.ceil((cooldownUntil - now) / 1000)
    : 0;

  useEffect(() => {
    if (!isCoolingDown) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [isCoolingDown]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const timestamps = loadTimestamps();
    if (timestamps.length >= MAX_MESSAGES) {
      const oldest = Math.min(...timestamps);
      setCooldownUntil(oldest + WINDOW_MS);
      setNow(Date.now());
      return;
    }

    const next = [...timestamps, Date.now()];
    saveTimestamps(next);
    setCooldownUntil(null);
    setSubmitted(true);
  }

  function formatCooldown(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  return (
    <section
      id="contact-trustee"
      className="scroll-mt-24 bg-surface-container-low py-20 md:py-28 lg:py-section-gap"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-gutter lg:px-margin-desktop">
        <div>
          <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
            Want to Help?
          </span>
          <h2 className="mt-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
            Contact a Trustee
          </h2>
          <p className="mt-4 max-w-md font-body text-body-md text-on-surface-variant md:text-body-lg">
            Whether you&rsquo;d like to volunteer, partner on a drive, or simply
            learn more, a trustee will personally get back to you. Leave a note
            below or call us directly.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
              Call a trustee
            </span>
            <div className="flex flex-wrap gap-3">
              {trusteePhones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2 font-body text-body-md text-primary transition-all hover:border-primary hover:bg-primary-fixed"
                >
                  <Phone size={15} /> {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 md:p-8 lg:p-10">
          {submitted ? (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed text-primary">
                <CheckCircle2 size={32} strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-headline text-2xl md:text-headline-sm text-primary">
                Message submitted
              </h3>
              <p className="mt-3 max-w-xs font-body text-body-md text-on-surface-variant">
                Thank you for reaching out. A trustee will get back to you
                shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 font-body text-label-md font-semibold uppercase tracking-widest text-secondary transition-colors hover:text-primary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {isCoolingDown && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-lg border border-error/40 bg-error/5 px-4 py-3 font-body text-body-sm text-error"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>
                    You&rsquo;ve sent a few messages already. Please wait{" "}
                    <strong>{formatCooldown(secondsLeft)}</strong> before
                    sending another, or call a trustee directly.
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ct-name"
                  className="font-body text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Your name
                </label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full name"
                  className="rounded-lg border border-outline-variant bg-surface px-4 py-3 font-body text-body-md text-primary outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ct-contact"
                  className="font-body text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Phone or email
                </label>
                <input
                  id="ct-contact"
                  name="contact"
                  type="text"
                  required
                  placeholder="How can we reach you?"
                  className="rounded-lg border border-outline-variant bg-surface px-4 py-3 font-body text-body-md text-primary outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ct-message"
                  className="font-body text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Message
                </label>
                <textarea
                  id="ct-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us how you'd like to help…"
                  className="resize-none rounded-lg border border-outline-variant bg-surface px-4 py-3 font-body text-body-md text-primary outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isCoolingDown}
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-body text-label-md font-semibold uppercase tracking-wider text-on-primary transition-all hover:bg-primary-container hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary disabled:hover:shadow-none"
              >
                {isCoolingDown ? (
                  <>Try again in {formatCooldown(secondsLeft)}</>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
