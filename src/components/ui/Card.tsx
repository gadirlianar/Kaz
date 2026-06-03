/* ============================================================
   Card — Base glassmorphism card component
   Foundation for TourCard, UniversityCard, and other card layouts.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enable hover lift animation */
  hoverable?: boolean;
  /** Optional glow color on hover */
  glowColor?: "sky" | "kais" | "gold" | "none";
  /** Click handler */
  onClick?: () => void;
}

/**
 * Glassmorphism card with backdrop blur, subtle borders,
 * and optional hover lift + glow effects.
 */
export default function Card({
  children,
  className = "",
  hoverable = true,
  glowColor = "none",
  onClick,
}: CardProps) {
  // Glow shadow on hover based on brand color
  const glowClasses = {
    sky: "hover:shadow-sky-500/10 hover:border-sky-500/30",
    kais: "hover:shadow-kais-500/10 hover:border-kais-500/30",
    gold: "hover:shadow-gold-500/10 hover:border-gold-500/30",
    none: "hover:border-glass-border",
  };

  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        glass-card
        ${hoverable ? "glass-card-hover cursor-pointer" : ""}
        ${glowColor !== "none" ? `hover:shadow-2xl ${glowClasses[glowColor]}` : ""}
        p-6 overflow-hidden
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
