/* ================================================================
   HeroSection — Ultra-Dynamic Dual-Path Hero
   
   Combines Sky Eagle (Tourism) and Kais Exchange (Education)
   with parallax layers, staggered text reveals, magnetic CTAs,
   and abstract earthy glass shapes.
   
   Design: Clean Minimalist / Scandinavian
   Language: Kazakh (persuasive marketing copy)
   Privacy: NO real contacts — all dummy data
   ================================================================ */

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plane, GraduationCap, Globe, MapPin } from "lucide-react";
import {
  staggerSlow,
  slideUp,
  fadeIn,
  scaleIn,
  useMagnetic,
} from "@/lib/animations";
import type { ActiveBranch } from "@/lib/types";

/* ─── Magnetic CTA Button ───────────────────────────────────── */
function MagneticCTA({
  children,
  href,
  variant = "accent",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "accent" | "sage" | "outline";
}) {
  const { ref, x, y } = useMagnetic({ strength: 0.25 });

  const styles = {
    accent: "bg-accent text-white hover:bg-accent-hover shadow-[0_4px_24px_rgba(184,111,80,0.15)]",
    sage: "bg-sage text-white hover:bg-sage-hover shadow-[0_4px_24px_rgba(124,140,110,0.15)]",
    outline: "bg-transparent text-ink border border-border-strong hover:border-ink hover:bg-canvas-alt",
  };

  return (
    <motion.div style={{ x, y }} ref={ref as React.RefObject<HTMLDivElement>}>
      <Link href={href}>
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`
            inline-flex items-center gap-3 px-8 py-4 rounded-2xl
            text-[15px] font-semibold tracking-wide cursor-pointer
            transition-colors duration-300 ${styles[variant]}
          `}
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ─── Main Hero Component ───────────────────────────────────── */
export default function HeroSection() {
  const [activeBranch, setActiveBranch] = useState<ActiveBranch>("tourism");
  const heroRef = useRef<HTMLElement>(null);

  /* Parallax scroll transforms */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parallaxMedium = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const parallaxText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const isTourism = activeBranch === "tourism";

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Layer 0: Canvas ── */}
      <div className="absolute inset-0 bg-canvas" />

      {/* ── Layer 1: Dot Grid (slow parallax) ── */}
      <motion.div style={{ y: parallaxSlow }} className="absolute inset-0 dot-grid opacity-40" />

      {/* ── Layer 2: Glass Shapes ── */}
      <AnimatePresence mode="wait">
        {isTourism ? (
          <motion.div
            key="shapes-tour"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute w-[500px] h-[500px] -top-32 -right-24 rounded-full opacity-25" style={{ background: "var(--accent-light)", filter: "blur(80px)" }} />
            <div className="absolute w-[350px] h-[350px] bottom-20 left-[10%] rounded-full opacity-20" style={{ background: "var(--canvas-warm)", filter: "blur(80px)" }} />
            <div className="absolute w-[200px] h-[200px] top-[40%] right-[30%] rounded-full opacity-15" style={{ background: "var(--accent-light)", filter: "blur(60px)" }} />
          </motion.div>
        ) : (
          <motion.div
            key="shapes-edu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute w-[500px] h-[500px] -top-32 -left-24 rounded-full opacity-25" style={{ background: "var(--sage-light)", filter: "blur(80px)" }} />
            <div className="absolute w-[350px] h-[350px] bottom-20 right-[10%] rounded-full opacity-20" style={{ background: "var(--canvas-warm)", filter: "blur(80px)" }} />
            <div className="absolute w-[200px] h-[200px] top-[35%] left-[25%] rounded-full opacity-15" style={{ background: "var(--sage-light)", filter: "blur(60px)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Layer 3: Content ── */}
      <motion.div
        style={{ y: parallaxText, opacity: opacityFade }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 w-full"
      >
        {/* ── Toggle Switcher ── */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="flex justify-center mb-20">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-canvas-elevated border border-border" style={{ boxShadow: "var(--shadow-md)" }}>
            <button
              onClick={() => setActiveBranch("tourism")}
              className="relative flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-medium transition-colors duration-500 cursor-pointer"
            >
              {isTourism && (
                <motion.div
                  layoutId="hero-toggle"
                  className="absolute inset-0 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Plane className={`w-4 h-4 relative z-10 ${isTourism ? "text-white" : "text-ink-muted"}`} />
              <span className={`relative z-10 tracking-wide ${isTourism ? "text-white" : "text-ink-muted"}`}>Саяхат</span>
            </button>

            <button
              onClick={() => setActiveBranch("education")}
              className="relative flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-medium transition-colors duration-500 cursor-pointer"
            >
              {!isTourism && (
                <motion.div
                  layoutId="hero-toggle"
                  className="absolute inset-0 bg-sage rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <GraduationCap className={`w-4 h-4 relative z-10 ${!isTourism ? "text-white" : "text-ink-muted"}`} />
              <span className={`relative z-10 tracking-wide ${!isTourism ? "text-white" : "text-ink-muted"}`}>Білім</span>
            </button>
          </div>
        </motion.div>

        {/* ── Grid: Text + Visual Card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Staggered Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBranch}
              variants={staggerSlow}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-xl"
            >
              {/* Overline */}
              <motion.div variants={slideUp} className="mb-6">
                <span className={`overline tracking-[0.15em] ${isTourism ? "text-accent" : "text-sage"}`}>
                  {isTourism ? "Sky Eagle Tourism" : "Kais Exchange Education"}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={slideUp}
                className="text-[clamp(2.5rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink mb-8"
              >
                {isTourism ? (
                  <>Әлемді ашыңыз.<br /><span className="text-accent">Бір қадам</span> жеткілікті.</>
                ) : (
                  <>Болашағыңызды<br /><span className="text-sage">шетелде</span> құрыңыз.</>
                )}
              </motion.h1>

              {/* Body */}
              <motion.p variants={slideUp} className="text-lg text-ink-muted leading-relaxed mb-10 max-w-md" style={{ lineHeight: "1.8" }}>
                {isTourism
                  ? "Ішкі және халықаралық турлар, әуе билеттері, қонақ үй брондау мен трансфер — сіздің тынығуыңызды біз жоспарлаймыз."
                  : "Малайзия мен Италияның үздік университеттеріне құжат дайындау, виза алу және толық сүйемелдеу — арманыңызға бірге жетеміз."}
              </motion.p>

              {/* Stats */}
              <motion.div variants={slideUp} className="flex items-center gap-8 mb-12">
                {isTourism ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-ink-muted">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span><strong className="text-ink font-semibold">50+</strong> бағыт</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-ink-muted">
                      <Globe className="w-4 h-4 text-accent" />
                      <span><strong className="text-ink font-semibold">10+</strong> ел</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-sm text-ink-muted">
                      <GraduationCap className="w-4 h-4 text-sage" />
                      <span><strong className="text-ink font-semibold">12</strong> университет</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-ink-muted">
                      <Globe className="w-4 h-4 text-sage" />
                      <span><strong className="text-ink font-semibold">2</strong> ел</span>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Magnetic CTAs */}
              <motion.div variants={slideUp} className="flex flex-wrap gap-4">
                {isTourism ? (
                  <>
                    <MagneticCTA href="/tourism" variant="accent">Турларды қарау <ArrowRight className="w-4 h-4" /></MagneticCTA>
                    <MagneticCTA href="/tourism" variant="outline">Билет іздеу</MagneticCTA>
                  </>
                ) : (
                  <>
                    <MagneticCTA href="/education" variant="sage">Университеттерді қарау <ArrowRight className="w-4 h-4" /></MagneticCTA>
                    <MagneticCTA href="/education" variant="outline">Тегін кеңес алу</MagneticCTA>
                  </>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Visual Preview Card */}
          <div className="hidden lg:block">
            <motion.div style={{ y: parallaxMedium }}>
              <AnimatePresence mode="wait">
                {isTourism ? (
                  <motion.div key="vcard-tour" variants={scaleIn} initial="hidden" animate="visible" exit="hidden" className="relative">
                    <div className="absolute -top-8 -right-8 w-72 h-72 rounded-full opacity-20" style={{ background: "var(--accent-light)", filter: "blur(60px)" }} />
                    <div className="relative card-elevated p-10 max-w-md ml-auto">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-accent-subtle flex items-center justify-center"><Plane className="w-6 h-6 text-accent" /></div>
                        <div>
                          <p className="text-base font-semibold text-ink">Анталия демалысы</p>
                          <p className="text-sm text-ink-faint">7 күн · All Inclusive</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent" /><span className="text-sm text-ink-muted">5★ қонақ үй · Трансфер кіреді</span></div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent opacity-60" /><span className="text-sm text-ink-muted">Әуе билеті · Сақтандыру</span></div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-accent opacity-30" /><span className="text-sm text-ink-muted">Экскурсиялар · Гид қызметі</span></div>
                      </div>
                      <div className="flex items-end justify-between pt-6 border-t border-border">
                        <div>
                          <p className="text-xs text-ink-faint uppercase tracking-widest">Бағасы</p>
                          <p className="text-3xl font-bold text-accent tracking-tight">320 000 ₸</p>
                        </div>
                        <span className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium">Брондау</span>
                      </div>
                    </div>
                    <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 -left-6 card-elevated p-5 w-56">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-canvas-warm flex items-center justify-center"><MapPin className="w-5 h-5 text-ink-muted" /></div>
                        <div><p className="text-xs text-ink-faint">Келесі тур</p><p className="text-sm font-semibold text-ink">Дубай · 5 күн</p></div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div key="vcard-edu" variants={scaleIn} initial="hidden" animate="visible" exit="hidden" className="relative">
                    <div className="absolute -top-8 -left-8 w-72 h-72 rounded-full opacity-20" style={{ background: "var(--sage-light)", filter: "blur(60px)" }} />
                    <div className="relative card-elevated p-10 max-w-md ml-auto">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-sage-subtle flex items-center justify-center"><GraduationCap className="w-6 h-6 text-sage" /></div>
                        <div>
                          <p className="text-base font-semibold text-ink">Politecnico di Milano</p>
                          <p className="text-sm text-ink-faint">Милан, Италия · QS #111</p>
                        </div>
                      </div>
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between text-sm"><span className="text-ink-muted">Мамандық</span><span className="text-ink font-medium">Инженерия · Дизайн</span></div>
                        <div className="h-px bg-border" />
                        <div className="flex items-center justify-between text-sm"><span className="text-ink-muted">Оқу ақысы</span><span className="text-ink font-medium">$2,000 – $4,000/жыл</span></div>
                        <div className="h-px bg-border" />
                        <div className="flex items-center justify-between text-sm"><span className="text-ink-muted">Қабылдау</span><span className="text-sage font-medium">Қыркүйек 2026</span></div>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                        <div className="flex gap-2"><span className="pill pill-sage">🇮🇹 Италия</span><span className="pill pill-neutral">3 жыл</span></div>
                        <span className="px-5 py-2.5 rounded-xl bg-sage text-white text-sm font-medium">Толығырақ</span>
                      </div>
                    </div>
                    <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 -left-6 card-elevated p-5 w-60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sage-subtle flex items-center justify-center"><GraduationCap className="w-5 h-5 text-sage" /></div>
                        <div><p className="text-xs text-ink-faint">Тағы бір нұсқа</p><p className="text-sm font-semibold text-ink">UTM · Малайзия</p></div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-canvas to-transparent pointer-events-none z-20" />
    </section>
  );
}
