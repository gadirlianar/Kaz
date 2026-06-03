/* ============================================================
   StatsCounter — Animated statistics counters
   Displays key metrics with count-up animations on scroll.
   ============================================================ */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Users,
  GraduationCap,
  Plane,
  Globe,
  Star,
  Award,
} from "lucide-react";
import type { StatItem } from "@/lib/types";

/** Icon mapping for the stats */
const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6" />,
  graduation: <GraduationCap className="w-6 h-6" />,
  plane: <Plane className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
};

/** The statistics to display */
const stats: StatItem[] = [
  {
    id: "stat-1",
    value: 2500,
    suffix: "+",
    label: "Қанағаттанған клиент",
    icon: "users",
  },
  {
    id: "stat-2",
    value: 350,
    suffix: "+",
    label: "Студент шетелге жіберілді",
    icon: "graduation",
  },
  {
    id: "stat-3",
    value: 50,
    suffix: "+",
    label: "Туристік бағыт",
    icon: "plane",
  },
  {
    id: "stat-4",
    value: 12,
    suffix: "",
    label: "Серіктес университет",
    icon: "globe",
  },
];

/**
 * Single animated counter that counts up from 0 to the target value.
 */
function Counter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Determine animation duration based on value magnitude
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString("kk-KZ")}
      {suffix}
    </span>
  );
}

/**
 * Statistics section with animated count-up numbers.
 * Triggers animation when scrolled into viewport.
 */
export default function StatsCounter() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-glass-bg border border-glass-border mb-4 text-sky-400 group-hover:text-kais-400 transition-colors duration-500">
                {iconMap[stat.icon]}
              </div>

              {/* Number */}
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>

              {/* Label */}
              <p className="text-sm text-foreground-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
