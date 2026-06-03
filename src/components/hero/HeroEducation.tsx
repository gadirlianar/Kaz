/* ============================================================
   HeroEducation — Education side panel for the split hero
   Renders the Kais Exchange education content with book animations.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

/**
 * Right panel of the hero when "Education" is selected.
 * Features animated graduation cap, university highlights, and CTA.
 */
export default function HeroEducation() {
  // University preview highlights
  const highlights = [
    "Politecnico di Milano",
    "University of Malaya",
    "Università Bocconi",
    "UTM Malaysia",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative z-10"
    >
      {/* Floating graduation cap badge */}
      <motion.div
        animate={{ y: [-8, 12, -8], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kais-500/10 border border-kais-500/20 text-kais-400 text-sm font-medium">
          <GraduationCap className="w-4 h-4" />
          Kais Exchange
        </div>
      </motion.div>

      {/* Main heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
        <span className="text-foreground">Шетелде </span>
        <span className="gradient-text-kais">білім</span>
        <br />
        <span className="text-foreground">алыңыз</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg text-foreground-muted leading-relaxed mb-8 max-w-md">
        Малайзия мен Италияның үздік университеттеріне түсу. Құжат дайындау,
        виза қолдауы және толық сүйемелдеу.
      </p>

      {/* Quick stats */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <BookOpen className="w-4 h-4 text-kais-400" />
          <span><strong className="text-foreground">12+</strong> университет</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <Globe className="w-4 h-4 text-kais-400" />
          <span><strong className="text-foreground">2</strong> ел</span>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        <Link href="/education">
          <Button variant="kais" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Университеттерді қарау
          </Button>
        </Link>
        <Link href="/education">
          <Button variant="outline" size="lg">
            Тегін кеңес алу
          </Button>
        </Link>
      </div>

      {/* University highlight tags */}
      <div className="flex flex-wrap gap-2">
        {highlights.map((uni, i) => (
          <motion.span
            key={uni}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="px-3 py-1.5 rounded-full bg-glass-bg border border-glass-border text-xs text-foreground-muted"
          >
            🎓 {uni}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
