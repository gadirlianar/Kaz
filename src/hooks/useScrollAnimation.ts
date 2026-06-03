/* ============================================================
   useScrollAnimation — Intersection Observer hook
   Triggers Framer Motion animations when elements scroll into view.
   ============================================================ */

"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  /** Percentage of element that must be visible (0-1) */
  threshold?: number;
  /** Root margin offset (e.g., "-100px") */
  rootMargin?: string;
  /** If true, animation only triggers once */
  triggerOnce?: boolean;
}

interface UseScrollAnimationReturn {
  /** Ref to attach to the observed element */
  ref: React.RefObject<HTMLDivElement | null>;
  /** Whether the element is currently in view */
  isInView: boolean;
}

/**
 * Custom hook wrapping IntersectionObserver for scroll-triggered animations.
 * Designed to work seamlessly with Framer Motion's animate prop.
 *
 * @example
 * const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });
 * <motion.div ref={ref} animate={isInView ? { opacity: 1 } : { opacity: 0 }} />
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const { threshold = 0.15, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // If triggerOnce, disconnect after first trigger
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}
