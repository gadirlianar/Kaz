/* ============================================================
   Button — Reusable button component with brand variants
   Supports Sky Eagle (sky) and Kais Exchange (kais) themes.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  /** Visual variant: sky (tourism), kais (education), outline, ghost */
  variant?: "sky" | "kais" | "outline" | "ghost" | "gold";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Optional icon to render before the label */
  icon?: ReactNode;
  /** Full-width mode */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
}

/**
 * Premium button component with brand-specific gradients,
 * hover lift effects, and smooth micro-animations.
 */
export default function Button({
  children,
  variant = "sky",
  size = "md",
  icon,
  fullWidth = false,
  className = "",
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Variant classes
  const variantClasses = {
    sky: "bg-gradient-to-r from-sky-500 to-sky-400 text-white hover:from-sky-400 hover:to-sky-300 shadow-lg shadow-sky-500/25",
    kais: "bg-gradient-to-r from-kais-500 to-kais-400 text-white hover:from-kais-400 hover:to-kais-300 shadow-lg shadow-kais-500/25",
    gold: "bg-gradient-to-r from-gold-500 to-gold-400 text-gray-900 hover:from-gold-400 hover:to-gold-500 shadow-lg shadow-gold-500/25",
    outline:
      "bg-transparent border border-glass-border text-foreground hover:bg-glass-bg hover:border-foreground-muted",
    ghost:
      "bg-transparent text-foreground-muted hover:text-foreground hover:bg-glass-bg",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        inline-flex items-center justify-center gap-2
        rounded-xl font-semibold
        transition-all duration-300
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
