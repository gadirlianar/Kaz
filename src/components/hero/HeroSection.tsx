/* ============================================================
   HeroSection — Dual-Path Split-Screen Hero
   Allows users to choose between Tourism (Sky Eagle) and
   Education (Kais Exchange) with smooth animated transitions.
   ============================================================ */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, GraduationCap } from "lucide-react";
import HeroTourism from "./HeroTourism";
import HeroEducation from "./HeroEducation";
import type { ActiveBranch } from "@/lib/types";

/**
 * The primary hero component implementing a toggle-based dual-path design.
 * Users visually choose their path: Tourism or Education.
 *
 * Features:
 * - Animated mesh gradient orbs that shift color based on active branch
 * - Smooth cross-fade between tourism and education content
 * - Floating geometric decorations
 * - Responsive toggle selector
 */
export default function HeroSection() {
  const [activeBranch, setActiveBranch] = useState<ActiveBranch>("tourism");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* ── Animated Background Orbs ── */}
      <AnimatePresence mode="wait">
        {activeBranch === "tourism" ? (
          <motion.div
            key="orbs-tourism"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Primary sky orb */}
            <div className="orb orb-sky w-[600px] h-[600px] -top-40 -right-40 animate-float" />
            {/* Secondary sky orb */}
            <div className="orb orb-sky w-[400px] h-[400px] bottom-20 -left-20 opacity-20 animate-float-delayed" />
            {/* Accent gold orb */}
            <div className="orb orb-gold w-[200px] h-[200px] top-1/3 right-1/4 opacity-15" />
          </motion.div>
        ) : (
          <motion.div
            key="orbs-education"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Primary kais orb */}
            <div className="orb orb-kais w-[600px] h-[600px] -top-40 -left-40 animate-float" />
            {/* Secondary kais orb */}
            <div className="orb orb-kais w-[400px] h-[400px] bottom-20 -right-20 opacity-20 animate-float-delayed" />
            {/* Accent gold orb */}
            <div className="orb orb-gold w-[200px] h-[200px] top-1/2 left-1/4 opacity-15" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Grid Pattern Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        {/* ── Branch Toggle Selector ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-glass-bg border border-glass-border">
            {/* Tourism toggle */}
            <button
              onClick={() => setActiveBranch("tourism")}
              className={`
                relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold
                transition-all duration-500 cursor-pointer
                ${
                  activeBranch === "tourism"
                    ? "text-white"
                    : "text-foreground-muted hover:text-foreground"
                }
              `}
            >
              {activeBranch === "tourism" && (
                <motion.div
                  layoutId="hero-toggle-bg"
                  className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-500 rounded-xl shadow-lg shadow-sky-500/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Plane className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Туризм</span>
              <span className="relative z-10 text-xs opacity-70">Sky Eagle</span>
            </button>

            {/* Education toggle */}
            <button
              onClick={() => setActiveBranch("education")}
              className={`
                relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold
                transition-all duration-500 cursor-pointer
                ${
                  activeBranch === "education"
                    ? "text-white"
                    : "text-foreground-muted hover:text-foreground"
                }
              `}
            >
              {activeBranch === "education" && (
                <motion.div
                  layoutId="hero-toggle-bg"
                  className="absolute inset-0 bg-gradient-to-r from-kais-600 to-kais-500 rounded-xl shadow-lg shadow-kais-500/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <GraduationCap className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Шетелде оқу</span>
              <span className="relative z-10 text-xs opacity-70">Kais Exchange</span>
            </button>
          </div>
        </motion.div>

        {/* ── Main Content Area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Branch-specific content */}
          <AnimatePresence mode="wait">
            {activeBranch === "tourism" ? (
              <HeroTourism key="hero-tourism" />
            ) : (
              <HeroEducation key="hero-education" />
            )}
          </AnimatePresence>

          {/* Right: Visual element — animated card stack */}
          <div className="hidden lg:block relative">
            <AnimatePresence mode="wait">
              {activeBranch === "tourism" ? (
                <motion.div
                  key="visual-tourism"
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Stacked preview cards */}
                  <div className="relative w-full aspect-[4/3] max-w-lg mx-auto">
                    {/* Back card */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-8 left-8 right-0 bottom-0 glass-card rounded-2xl bg-sky-900/30 border-sky-500/20 transform rotate-3"
                    />
                    {/* Middle card */}
                    <motion.div
                      animate={{ y: [-3, 7, -3] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-4 left-4 right-4 bottom-4 glass-card rounded-2xl bg-sky-800/20 border-sky-500/15 transform rotate-1"
                    />
                    {/* Front card — Tourism preview */}
                    <div className="relative glass-card rounded-2xl p-8 glow-sky">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
                          <Plane className="w-6 h-6 text-sky-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Анталия тур
                          </p>
                          <p className="text-xs text-foreground-muted">
                            7 күн / 6 түн
                          </p>
                        </div>
                      </div>
                      {/* Simulated booking UI elements */}
                      <div className="space-y-3">
                        <div className="h-3 bg-glass-bg rounded-full w-full" />
                        <div className="h-3 bg-glass-bg rounded-full w-3/4" />
                        <div className="h-3 bg-glass-bg rounded-full w-1/2" />
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-foreground-muted">Бағасы</p>
                          <p className="text-xl font-bold gradient-text-sky">
                            320 000 ₸
                          </p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium">
                          Брондау
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="visual-education"
                  initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Stacked university preview cards */}
                  <div className="relative w-full aspect-[4/3] max-w-lg mx-auto">
                    {/* Back card */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-8 left-8 right-0 bottom-0 glass-card rounded-2xl bg-kais-900/30 border-kais-500/20 transform -rotate-3"
                    />
                    {/* Middle card */}
                    <motion.div
                      animate={{ y: [-3, 7, -3] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute top-4 left-4 right-4 bottom-4 glass-card rounded-2xl bg-kais-800/20 border-kais-500/15 transform -rotate-1"
                    />
                    {/* Front card — University preview */}
                    <div className="relative glass-card rounded-2xl p-8 glow-kais">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-kais-500/20 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-kais-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Politecnico di Milano
                          </p>
                          <p className="text-xs text-foreground-muted">
                            Милан, Италия
                          </p>
                        </div>
                      </div>
                      {/* University info preview */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-muted">Рейтинг</span>
                          <span className="text-kais-400 font-medium">QS #111</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-muted">Оқу ақысы</span>
                          <span className="text-foreground font-medium">$2,000 - $4,000/жыл</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-muted">Оқу жылы</span>
                          <span className="text-foreground font-medium">3 жыл</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {["Инженерия", "Дизайн"].map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-md bg-kais-500/10 text-kais-300 text-[10px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-kais-500 text-white text-sm font-medium">
                          Толығырақ
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Bottom Fade to Background ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
