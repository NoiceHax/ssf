"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Send } from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { TrusteePhones } from "@/components/ui/trustee-phones";
import { motion } from "framer-motion";

const MAX_MESSAGES = 3;
const WINDOW_MS = 10 * 60 * 1000;
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
    // ignore storage failures
  }
}

export function ContactTrustee() {
  const [toastVisible, setToastVisible] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isCoolingDown = cooldownUntil !== null && now < cooldownUntil;
  const secondsLeft = isCoolingDown
    ? Math.ceil((cooldownUntil - now) / 1000)
    : 0;

  useEffect(() => {
    if (!isCoolingDown) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [isCoolingDown]);

  useEffect(() => {
    if (!toastVisible) return;
    const id = window.setTimeout(() => setToastVisible(false), 5000);
    return () => window.clearTimeout(id);
  }, [toastVisible]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setFormError(null);

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const timestamps = loadTimestamps();
    if (timestamps.length >= MAX_MESSAGES) {
      const oldest = Math.min(...timestamps);
      setCooldownUntil(oldest + WINDOW_MS);
      setNow(Date.now());
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const payload = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(payload.error ?? "Could not send your message.");
      }

      saveTimestamps([...timestamps, Date.now()]);
      setCooldownUntil(null);
      form.reset();
      setToastVisible(true);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not send your message."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function formatCooldown(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  return (
    <>
      <Toast
        message="Message sent! A trustee will get back to you shortly."
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <section
        id="contact-trustee"
        className="scroll-mt-24 section-py bg-surface-container-low"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 md:px-8 lg:grid-cols-2 lg:gap-gutter lg:px-margin-desktop">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
              Want to Help?
            </span>
            <h2 className="mt-3 font-headline text-3xl text-primary md:mt-4 md:text-4xl lg:text-headline-lg">
              Contact a Trustee
            </h2>
            <p className="mt-3 max-w-md font-body text-body-md text-on-surface-variant md:mt-4 md:text-body-lg">
              Whether you&rsquo;d like to volunteer, partner on a drive, or simply
              learn more, a trustee will personally get back to you. All fields
              are required.
            </p>

            <div className="mt-6 md:mt-8">
              <span className="mb-2 block font-body text-label-md uppercase tracking-widest text-on-surface-variant">
                Call a trustee
              </span>
              <TrusteePhones />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 md:p-8 lg:p-10"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5" noValidate={false}>
              {isCoolingDown && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-lg border border-error/40 bg-error/5 px-4 py-3 font-body text-body-sm text-error"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>
                    You&rsquo;ve sent a few messages already. Please wait{" "}
                    <strong>{formatCooldown(secondsLeft)}</strong> before sending
                    another, or call a trustee directly.
                  </span>
                </div>
              )}

              {formError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-lg border border-error/40 bg-error/5 px-4 py-3 font-body text-body-sm text-error"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ct-name"
                  className="font-body text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Your name <span className="text-error">*</span>
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
                  htmlFor="ct-email"
                  className="font-body text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Email <span className="text-error">*</span>
                </label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-lg border border-outline-variant bg-surface px-4 py-3 font-body text-body-md text-primary outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ct-phone"
                  className="font-body text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Phone <span className="text-error">*</span>
                </label>
                <input
                  id="ct-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="rounded-lg border border-outline-variant bg-surface px-4 py-3 font-body text-body-md text-primary outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ct-message"
                  className="font-body text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Message <span className="text-error">*</span>
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
                disabled={isCoolingDown || submitting}
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-body text-label-md font-semibold uppercase tracking-wider text-on-primary transition-all hover:bg-primary-container hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary disabled:hover:shadow-none"
              >
                {submitting ? (
                  <>Sending…</>
                ) : isCoolingDown ? (
                  <>Try again in {formatCooldown(secondsLeft)}</>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
