"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function track() {
      try {
        const already = sessionStorage.getItem("ssf-visitor-tracked");
        const res = await fetch("/api/visitors", {
          method: already ? "GET" : "POST",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { count?: number };
        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
          if (!already) sessionStorage.setItem("ssf-visitor-tracked", "1");
        }
      } catch {
        // ignore network errors
      }
    }

    track();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 inline-flex items-center gap-2 font-body text-[13px] text-inverse-on-surface/60"
    >
      <Users size={14} className="text-tertiary-fixed-dim" aria-hidden />
      <span>
        <strong className="font-semibold text-inverse-on-surface/80">
          {count.toLocaleString("en-IN")}
        </strong>{" "}
        visitors
      </span>
    </motion.p>
  );
}
