/* ================================================================
   AYSANII — Framer Motion Animation System
   
   Centralized animation variants, scroll utilities, and
   interaction primitives. Every animation feels unhurried,
   organic, and expensive — never robotic or flashy.
   
   Architecture:
   ├── Scroll Reveal Variants (fade, slide, stagger)
   ├── Parallax Utilities (useParallax hook)
   ├── Magnetic Interaction (useMagnetic hook)
   ├── Page Transition Variants
   └── Micro-interaction Presets
   ================================================================ */

"use client";

import { useMotionValue, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, useCallback, type RefObject } from "react";

/* ─── TIMING CONSTANTS ─────────────────────────────────────────
   Consistent timing tokens across all animations.
   Everything should feel like silk sliding on marble.
   ──────────────────────────────────────────────────────────── */

/** Premium easing — fast-out, slow-in with overshoot resistance */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/** Soft easing — for subtle background/decorative motions */
export const EASE_SOFT = [0.25, 0.46, 0.45, 0.94] as const;

/** Spring config — buttery, no bounce */
export const SPRING_GENTLE = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 1,
};

/** Spring config — responsive, minimal bounce for interactions */
export const SPRING_SNAPPY = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

/* ─── SCROLL REVEAL VARIANTS ──────────────────────────────────
   Used with <motion.div variants={...} initial="hidden" whileInView="visible">
   ──────────────────────────────────────────────────────────── */

/** Fade in from zero opacity. The most minimal reveal. */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};

/** Soft upward slide + fade. Primary reveal for content blocks. */
export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};

/** Downward slide — for top-anchored elements like navbars. */
export const slideDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

/** Slide from left — for sidebar/filter panels. */
export const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

/** Slide from right — for asymmetric layouts. */
export const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

/** Scale up from 95% — for cards and interactive elements. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

/* ─── STAGGER CONTAINERS ──────────────────────────────────────
   Parent containers that orchestrate staggered child reveals.
   Usage: <motion.div variants={staggerContainer}> + children with variants={slideUp}
   ──────────────────────────────────────────────────────────── */

/** Standard stagger: 0.12s between each child. */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Fast stagger: 0.08s — for dense grids (university cards). */
export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Slow stagger: 0.2s — for hero text lines, dramatic reveals. */
export const staggerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

/* ─── PAGE TRANSITION VARIANTS ────────────────────────────────
   For route-level transitions using AnimatePresence.
   ──────────────────────────────────────────────────────────── */

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: EASE_SOFT },
  },
};

/* ─── PARALLAX HOOK ───────────────────────────────────────────
   Creates a parallax scroll effect for any element.
   
   Usage:
     const { ref, y } = useParallax({ speed: 0.3 });
     <motion.div ref={ref} style={{ y }} />
   
   speed: 0 = static, 0.5 = half scroll speed, 1 = full
   ──────────────────────────────────────────────────────────── */

interface UseParallaxOptions {
  /** Parallax speed multiplier (0-1). Default 0.3 */
  speed?: number;
  /** Whether to invert direction. Default false */
  invert?: boolean;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.3, invert = false } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate element's position relative to viewport center
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const delta = (elementCenter - viewportCenter) * speed;
      setOffsetY(invert ? -delta : delta);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, invert]);

  return { ref, y: offsetY };
}

/* ─── MAGNETIC BUTTON HOOK ────────────────────────────────────
   Creates a magnetic pull effect on hover. The element
   subtly follows the cursor position within its bounds.
   
   Usage:
     const { ref, x, y } = useMagnetic({ strength: 0.3 });
     <motion.button ref={ref} style={{ x, y }} />
   ──────────────────────────────────────────────────────────── */

interface UseMagneticOptions {
  /** Pull strength (0-1). Default 0.3 */
  strength?: number;
  /** Distance in px beyond which the effect activates. Default 100 */
  activationDistance?: number;
}

export function useMagnetic(options: UseMagneticOptions = {}) {
  const { strength = 0.3, activationDistance = 100 } = options;
  const ref = useRef<HTMLElement>(null);

  // Raw motion values — unsprung
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed output — this is what the button actually uses
  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < activationDistance) {
        rawX.set(distX * strength);
        rawY.set(distY * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    // Also listen on window for edge cases
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [strength, activationDistance, rawX, rawY]);

  return { ref: ref as RefObject<HTMLElement>, x, y };
}

/* ─── SMOOTH COUNTER HOOK ─────────────────────────────────────
   Animates a number from 0 to target when triggered.
   ──────────────────────────────────────────────────────────── */

export function useSmoothCounter(target: number, isActive: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out quad for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, isActive, duration]);

  return count;
}

/* ─── HOVER LIFT PRESET ───────────────────────────────────────
   Reusable whileHover/whileTap props for interactive cards.
   ──────────────────────────────────────────────────────────── */

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.35, ease: EASE_PREMIUM } },
  whileTap: { y: -1, scale: 0.995, transition: { duration: 0.15 } },
};

export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.35, ease: EASE_PREMIUM } },
  whileTap: { scale: 0.98, transition: { duration: 0.15 } },
};

/** Subtle glow expansion for cards on hover */
export const hoverGlow = {
  whileHover: {
    y: -3,
    boxShadow: "0 16px 48px rgba(28, 25, 23, 0.08)",
    transition: { duration: 0.4, ease: EASE_PREMIUM },
  },
};
