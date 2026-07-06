"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

type ToastProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
  variant?: "success" | "error";
};

export function Toast({
  message,
  visible,
  onClose,
  variant = "success",
}: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-[100] flex w-[min(calc(100vw-2rem),24rem)] -translate-x-1/2 items-start gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3.5 shadow-lg md:bottom-8 md:left-auto md:right-8 md:translate-x-0"
        >
          <CheckCircle2
            size={20}
            className={
              variant === "success" ? "shrink-0 text-secondary" : "shrink-0 text-error"
            }
          />
          <p className="flex-1 font-body text-body-md text-primary">{message}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="shrink-0 rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
