/* ============================================================
   HeroTourism — Tourism side panel for the split hero
   Renders the Sky Eagle tourism content with flying animations.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { Plane, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

/**
 * Left panel of the hero when "Tourism" is selected.
 * Features animated plane icon, destination tags, and CTA.
 */
export default function HeroTourism() {
  // Destination preview tags
  const destinations = [
    "Түркия 🇹🇷",
    "БАӘ 🇦🇪",
    "Қазақстан 🇰🇿",
    "Малайзия 🇲🇾",
    "Италия 🇮🇹",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative z-10"
    >
      {/* Floating plane icon */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium">
          <Plane className="w-4 h-4" />
          Sky Eagle Tourism
        </div>
      </motion.div>

      {/* Main heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
        <span className="text-foreground">Әлемді </span>
        <span className="gradient-text-sky">біздімен</span>
        <br />
        <span className="text-foreground">саяхаттаңыз</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg text-foreground-muted leading-relaxed mb-8 max-w-md">
        Ішкі және халықаралық турлар, әуе билеттері, қонақ үй брондау және
        трансфер қызметі — барлығы бір жерде.
      </p>

      {/* Quick stats */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <MapPin className="w-4 h-4 text-sky-400" />
          <span><strong className="text-foreground">50+</strong> бағыт</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <Calendar className="w-4 h-4 text-sky-400" />
          <span><strong className="text-foreground">365</strong> күн қызмет</span>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        <Link href="/tourism">
          <Button variant="sky" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Турларды қарау
          </Button>
        </Link>
        <Link href="/tourism">
          <Button variant="outline" size="lg">
            Билет іздеу
          </Button>
        </Link>
      </div>

      {/* Destination tags */}
      <div className="flex flex-wrap gap-2">
        {destinations.map((dest, i) => (
          <motion.span
            key={dest}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="px-3 py-1.5 rounded-full bg-glass-bg border border-glass-border text-xs text-foreground-muted"
          >
            {dest}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
