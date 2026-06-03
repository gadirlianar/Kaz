/* ============================================================
   PageTransition — Framer Motion page transition wrapper
   Wraps page content for smooth enter/exit animations.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps page content to provide a consistent fade + slide
 * animation when navigating between routes. Uses Framer Motion's
 * layout animation system.
 */
export default function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`flex-1 ${className}`}
    >
      {children}
    </motion.main>
  );
}
