/* ============================================================
   AnimatedSection — Scroll-triggered animation wrapper
   Uses Framer Motion + IntersectionObserver for reveal effects.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Animation direction: "up" | "down" | "left" | "right" | "fade" */
  direction?: "up" | "down" | "left" | "right" | "fade";
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Distance in pixels for the slide effect */
  distance?: number;
}

/**
 * Reusable wrapper that animates its children into view
 * when scrolled into the viewport. Supports directional slides
 * and fade-in effects with configurable timing.
 */
export default function AnimatedSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  // Calculate initial position based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "fade":
      default:
        return { y: 0, x: 0 };
    }
  };

  const initial = getInitialTransform();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...initial,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, ...initial }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easeOutQuad
      }}
    >
      {children}
    </motion.div>
  );
}
