/* ================================================================
   HeroSection — Dual-Path Hero
   
   Palette: Canvas #FCFCFA · Tourism #1E3A5F · Edu #C5A880
   Typography: Inter · tracking-tight headings · leading-relaxed body
   Animations: Framer Motion fade-up with stagger
   Privacy: ALL links are # or +7 (000) 000-00-00
   ================================================================ */

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plane, GraduationCap, Globe, MapPin, Star, Users } from "lucide-react";
import { useMagnetic } from "@/lib/animations";
import type { ActiveBranch } from "@/lib/types";

/* ── Animation Variants ───────────────────────────────────────── */
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── Magnetic CTA ─────────────────────────────────────────────── */
function MagCTA({
  children,
  href,
  variant,
}: {
  children: React.ReactNode;
  href: string;
  variant: "tourism" | "edu" | "outline";
}) {
  const { ref, x, y } = useMagnetic({ strength: 0.2 });
  const styles = {
    tourism: "bg-tourism text-white hover:bg-tourism-light shadow-[0_4px_20px_rgba(30,58,95,0.20)]",
    edu: "bg-edu text-primary hover:bg-edu-dark hover:text-white shadow-[0_4px_20px_rgba(197,168,128,0.25)]",
    outline: "bg-transparent text-primary border border-border-subtle hover:border-secondary hover:bg-surface",
  };

  return (
    <motion.div style={{ x, y }} ref={ref as React.RefObject<HTMLDivElement>}>
      <Link href={href}>
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-[15px] font-semibold cursor-pointer transition-colors duration-300 ${styles[variant]}`}
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ── Main Hero ────────────────────────────────────────────────── */
export default function HeroSection() {
  const [branch, setBranch] = useState<ActiveBranch>("tourism");
  const heroRef = useRef<HTMLElement>(null);
  const isTourism = branch === "tourism";

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxCard = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxText = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-canvas">
      {/* Dot grid — slowest parallax */}
      <motion.div style={{ y: parallaxSlow }} className="absolute inset-0 dot-grid opacity-30" />

      {/* Decorative blurred shapes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={branch}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {isTourism ? (
            <>
              <div className="absolute w-[600px] h-[600px] -top-48 -right-32 rounded-full" style={{ background: "rgba(30,58,95,0.05)", filter: "blur(100px)" }} />
              <div className="absolute w-[300px] h-[300px] bottom-24 left-[8%] rounded-full" style={{ background: "rgba(30,58,95,0.04)", filter: "blur(80px)" }} />
            </>
          ) : (
            <>
              <div className="absolute w-[600px] h-[600px] -top-48 -left-32 rounded-full" style={{ background: "rgba(197,168,128,0.08)", filter: "blur(100px)" }} />
              <div className="absolute w-[300px] h-[300px] bottom-24 right-[8%] rounded-full" style={{ background: "rgba(197,168,128,0.06)", filter: "blur(80px)" }} />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content layer */}
      <motion.div
        style={{ y: parallaxText, opacity: opacityFade }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 w-full"
      >
        {/* ── Toggle ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex justify-center mb-20">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white border border-border-subtle" style={{ boxShadow: "var(--shadow-card)" }}>
            <button
              onClick={() => setBranch("tourism")}
              className="relative flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold transition-colors duration-400 cursor-pointer"
            >
              {isTourism && (
                <motion.div
                  layoutId="hero-pill"
                  className="absolute inset-0 bg-tourism rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Plane className={`w-4 h-4 relative z-10 transition-colors duration-300 ${isTourism ? "text-white" : "text-secondary"}`} />
              <span className={`relative z-10 transition-colors duration-300 ${isTourism ? "text-white" : "text-secondary"}`}>Туризм</span>
            </button>

            <button
              onClick={() => setBranch("education")}
              className="relative flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold transition-colors duration-400 cursor-pointer"
            >
              {!isTourism && (
                <motion.div
                  layoutId="hero-pill"
                  className="absolute inset-0 bg-edu rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <GraduationCap className={`w-4 h-4 relative z-10 transition-colors duration-300 ${!isTourism ? "text-primary" : "text-secondary"}`} />
              <span className={`relative z-10 transition-colors duration-300 ${!isTourism ? "text-primary" : "text-secondary"}`}>Шетелде оқу</span>
            </button>
          </div>
        </motion.div>

        {/* ── Grid: Text + Card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={branch}
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-lg"
            >
              {/* Overline */}
              <motion.div variants={fadeUp} className="mb-5">
                <span className="overline" style={{ color: isTourism ? "var(--tourism)" : "var(--edu-dark)" }}>
                  {isTourism ? "Sky Eagle Tourism" : "Kais Exchange Education"}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold tracking-tight text-primary mb-6" style={{ lineHeight: 1.08 }}>
                {isTourism ? (
                  <>Әлемді ашыңыз —<br /><span style={{ color: "var(--tourism)" }}>бір қадам</span> жеткілікті</>
                ) : (
                  <>Болашағыңызды<br /><span style={{ color: "var(--edu)" }}>шетелде</span> құрыңыз</>
                )}
              </motion.h1>

              {/* Body */}
              <motion.p variants={fadeUp} className="text-[17px] text-secondary leading-relaxed mb-10 max-w-md">
                {isTourism
                  ? "Ішкі және халықаралық турлар, әуе билеттері, қонақ үй брондау мен трансфер қызметтері. Демалысыңызды біз жоспарлаймыз."
                  : "Малайзия мен Италияның үздік университеттеріне толық сүйемелдеу: құжат дайындау, виза алу, тұрғын үй табу."}
              </motion.p>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="flex items-center gap-8 mb-12">
                {isTourism ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <MapPin className="w-4 h-4" style={{ color: "var(--tourism)" }} />
                      <span><strong className="text-primary font-semibold">50+</strong> бағыт</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Users className="w-4 h-4" style={{ color: "var(--tourism)" }} />
                      <span><strong className="text-primary font-semibold">2 500+</strong> клиент</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Star className="w-4 h-4" style={{ color: "var(--tourism)" }} />
                      <span><strong className="text-primary font-semibold">4.9</strong> рейтинг</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <GraduationCap className="w-4 h-4" style={{ color: "var(--edu)" }} />
                      <span><strong className="text-primary font-semibold">12</strong> университет</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Globe className="w-4 h-4" style={{ color: "var(--edu)" }} />
                      <span><strong className="text-primary font-semibold">2</strong> ел</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Users className="w-4 h-4" style={{ color: "var(--edu)" }} />
                      <span><strong className="text-primary font-semibold">350+</strong> студент</span>
                    </div>
                  </>
                )}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                {isTourism ? (
                  <>
                    <MagCTA href="/tourism" variant="tourism">Турларды қарау <ArrowRight className="w-4 h-4" /></MagCTA>
                    <MagCTA href="#" variant="outline">Билет іздеу</MagCTA>
                  </>
                ) : (
                  <>
                    <MagCTA href="/education" variant="edu">Университеттер <ArrowRight className="w-4 h-4" /></MagCTA>
                    <MagCTA href="#" variant="outline">Тегін кеңес</MagCTA>
                  </>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Preview card */}
          <div className="hidden lg:block">
            <motion.div style={{ y: parallaxCard }}>
              <AnimatePresence mode="wait">
                {isTourism ? (
                  <motion.div key="tour-card" variants={scaleIn} initial="hidden" animate="visible" exit="hidden" className="relative">
                    {/* Glow behind */}
                    <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full" style={{ background: "rgba(30,58,95,0.06)", filter: "blur(70px)" }} />

                    <div className="relative card-elevated max-w-md ml-auto overflow-hidden">
                      <div className="relative h-48 w-full">
                        <img 
                          src="https://images.unsplash.com/photo-1545562083-a600704fa486?q=80&w=800&auto=format&fit=crop" 
                          alt="Анталия" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center bg-white/30 backdrop-blur-md border border-white/20">
                          <Plane className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="mb-6">
                          <p className="text-xl font-bold text-primary">Анталия демалысы</p>
                          <p className="text-sm text-secondary">7 күн · All Inclusive</p>
                        </div>
                      <div className="space-y-3.5 mb-8">
                        {["5★ қонақ үй · Трансфер", "Әуе билеті · Сақтандыру", "Экскурсиялар · Гид"].map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--tourism)", opacity: 1 - i * 0.25 }} />
                            <span className="text-sm text-secondary">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-end justify-between pt-6 border-t border-border-subtle">
                        <div>
                          <p className="text-[11px] text-secondary-faint uppercase tracking-widest mb-1">Бағасы</p>
                          <p className="text-3xl font-bold tracking-tight" style={{ color: "var(--tourism)" }}>320 000 ₸</p>
                        </div>
                        <span className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: "var(--tourism)" }}>Брондау</span>
                      </div>
                      </div>
                    </div>

                    {/* Floating mini card */}
                    <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-5 -left-4 card-elevated p-4 w-52">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center"><MapPin className="w-4 h-4 text-secondary" /></div>
                        <div><p className="text-[11px] text-secondary-faint">Келесі тур</p><p className="text-sm font-semibold text-primary">Дубай · 5 күн</p></div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div key="edu-card" variants={scaleIn} initial="hidden" animate="visible" exit="hidden" className="relative">
                    <div className="absolute -top-10 -left-10 w-80 h-80 rounded-full" style={{ background: "rgba(197,168,128,0.08)", filter: "blur(70px)" }} />

                    <div className="relative card-elevated max-w-md ml-auto overflow-hidden">
                      <div className="relative h-48 w-full">
                        <img 
                          src="https://images.unsplash.com/photo-1633320625900-58074d22187b?q=80&w=800&auto=format&fit=crop" 
                          alt="Милан" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center bg-white/30 backdrop-blur-md border border-white/20">
                          <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="mb-6">
                          <p className="text-xl font-bold text-primary">Politecnico di Milano</p>
                          <p className="text-sm text-secondary">Милан, Италия · QS #111</p>
                        </div>
                      <div className="space-y-4 mb-8">
                        {[["Мамандық", "Инженерия · Дизайн"], ["Оқу ақысы", "$2,000 – $4,000/жыл"], ["Қабылдау", "Қыркүйек 2026"]].map(([label, value], i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-secondary">{label}</span>
                              <span className="text-primary font-medium" style={i === 2 ? { color: "var(--edu-dark)" } : {}}>{value}</span>
                            </div>
                            {i < 2 && <div className="h-px bg-border-subtle mt-4" />}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-border-subtle">
                        <div className="flex gap-2">
                          <span className="pill pill-sage">🇮🇹 Италия</span>
                          <span className="pill pill-neutral">3 жыл</span>
                        </div>
                        <span className="px-5 py-2.5 rounded-xl text-primary text-sm font-semibold" style={{ background: "var(--edu)" }}>Толығырақ</span>
                      </div>
                      </div>
                    </div>

                    <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-5 -left-4 card-elevated p-4 w-56">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--edu-wash)" }}><GraduationCap className="w-4 h-4" style={{ color: "var(--edu-dark)" }} /></div>
                        <div><p className="text-[11px] text-secondary-faint">Тағы бір нұсқа</p><p className="text-sm font-semibold text-primary">UTM · Малайзия</p></div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-canvas to-transparent pointer-events-none z-20" />
    </section>
  );
}
