/* ================================================================
   Preloader — Cinematic Splash Screen/Preloader Component
   
   Palette: bg-canvas #FCFCFA · accent-tourism #1E3A5F · accent-edu #C5A880
   Typography: Geometric font-clash-display / Outfit
   Animations: Framer Motion clip-path text reveal, self-drawing borders,
               drifting glowing orbs, and full-panel slide-up.
   ================================================================ */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable body scroll while preloader is active
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 1700); // 1.5s presentation + 0.2s padding

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  // Framer Motion Variants
  const containerVariants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1] as const, // Custom cinematic cubic-bezier
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, scaleY: 0 },
    visible: {
      scaleX: 1,
      scaleY: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const orbVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.12,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" as const },
    },
  };

  const wordContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const, delay: 0.05 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-canvas overflow-hidden select-none"
          style={{ backgroundColor: "#FCFCFA" }}
        >
          {/* Subtle Background Glows */}
          <motion.div
            variants={orbVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full orb-sky"
            style={{
              background: "radial-gradient(circle, rgba(30,58,95,0.12) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <motion.div
            variants={orbVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full orb-kais"
            style={{
              background: "radial-gradient(circle, rgba(197,168,128,0.15) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />

          {/* Staggered Line-Drawing Borders */}
          {/* Top Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-8 left-8 right-8 h-[1px] bg-border-subtle origin-left"
          />
          {/* Bottom Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 left-8 right-8 h-[1px] bg-border-subtle origin-right"
          />
          {/* Left Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-8 bottom-8 left-8 w-[1px] bg-border-subtle origin-top"
          />
          {/* Right Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-8 bottom-8 right-8 w-[1px] bg-border-subtle origin-bottom"
          />

          {/* Main Cinematic Logo + Text Area */}
          <div className="relative flex flex-col items-center gap-6 text-center z-10 px-6">
            {/* Minimalist Crest/Symbol */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="mb-2 relative"
            >
              <div className="w-16 h-16 rounded-full border border-border-subtle flex items-center justify-center relative overflow-hidden bg-surface">
                {/* Decorative rotating circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-1 rounded-full border-t border-b border-edu/40 border-l border-r border-transparent"
                />
                {/* Logo emblem */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <path
                    d="M12 2L2 22H22L12 2Z"
                    stroke="#1E3A5F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2L17 12H7L12 2Z"
                    fill="#C5A880"
                    opacity="0.85"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Typography Reveal */}
            <motion.div
              variants={wordContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 font-clash-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.15em] text-primary"
            >
              <div className="overflow-hidden h-[1.3em] flex items-center">
                <motion.span variants={wordVariants} className="inline-block text-tourism">
                  Sky Eagle
                </motion.span>
              </div>

              <div className="overflow-hidden h-[1.3em] flex items-center">
                <motion.span variants={wordVariants} className="inline-block text-edu font-medium">
                  &
                </motion.span>
              </div>

              <div className="overflow-hidden h-[1.3em] flex items-center">
                <motion.span variants={wordVariants} className="inline-block text-edu">
                  Kais Exchange
                </motion.span>
              </div>
            </motion.div>

            {/* Subtext indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="overline text-[10px] tracking-[0.3em] mt-3"
            >
              Саяхат пен Білім платформасы
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
