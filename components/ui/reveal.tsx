"use client";

import { motion, type MotionProps } from "framer-motion";
import * as React from "react";

type RevealProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    delay?: number;
    y?: number;
    scale?: number;
  };

export function Reveal({
  delay = 0,
  y = 20,
  scale = 1,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: scale === 1 ? 1 : scale * 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
