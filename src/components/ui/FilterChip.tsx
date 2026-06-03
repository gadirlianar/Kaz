/* ============================================================
   FilterChip — Selectable filter toggle chip
   Used in filter bars for categories, countries, etc.
   ============================================================ */

"use client";

import { motion } from "framer-motion";

interface FilterChipProps {
  label: string;
  /** Whether this chip is currently selected */
  active: boolean;
  /** Click handler to toggle selection */
  onClick: () => void;
  /** Brand color when active */
  activeColor?: "sky" | "kais";
  className?: string;
}

/**
 * Toggleable chip for filter interfaces. Smooth
 * color transition with spring-based scale animation.
 */
export default function FilterChip({
  label,
  active,
  onClick,
  activeColor = "sky",
  className = "",
}: FilterChipProps) {
  const activeClasses = {
    sky: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    kais: "bg-kais-500/20 text-kais-300 border-kais-500/40",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium
        border transition-all duration-300 cursor-pointer
        ${
          active
            ? activeClasses[activeColor]
            : "bg-glass-bg text-foreground-muted border-glass-border hover:border-foreground-muted hover:text-foreground"
        }
        ${className}
      `}
    >
      {label}
    </motion.button>
  );
}
