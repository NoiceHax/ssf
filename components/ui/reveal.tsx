"use client";

import { motion, type MotionProps } from "framer-motion";
import * as React from "react";

type RevealProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    delay?: number;
    y?: number;
  };

export function Reveal({
  delay = 0,
  y = 24,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
