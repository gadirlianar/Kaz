/* ============================================================
   Badge — Status/category badge component
   Used for labels like country, ranking, category tags.
   ============================================================ */

import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  /** Color variant matching the brand system */
  variant?: "sky" | "kais" | "gold" | "neutral" | "success" | "danger";
  /** Badge size */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Small label badge for metadata display.
 * Semi-transparent backgrounds with matching text colors.
 */
export default function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    sky: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    kais: "bg-kais-500/15 text-kais-300 border-kais-500/20",
    gold: "bg-gold-500/15 text-gold-400 border-gold-500/20",
    neutral: "bg-white/5 text-foreground-muted border-glass-border",
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    danger: "bg-red-500/15 text-red-300 border-red-500/20",
  };

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        border rounded-full font-medium
        ${className}
      `}
    >
      {children}
    </span>
  );
}
