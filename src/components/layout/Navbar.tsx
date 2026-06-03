/* ============================================================
   Navbar — Sticky navigation with dual-branch toggle
   Switches visual context between Sky Eagle and Kais Exchange.
   Full Kazakh language navigation labels.
   ============================================================ */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plane,
  GraduationCap,
  Menu,
  X,
  Phone,
  Globe,
} from "lucide-react";
import type { ActiveBranch } from "@/lib/types";

/**
 * Primary navigation bar. Features:
 * - Sticky positioning with backdrop blur on scroll
 * - Dual-branch toggle (Tourism / Education)
 * - Mobile hamburger menu with slide-in animation
 * - Dynamic brand color based on active section
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Determine active branch from the current route
  const activeBranch: ActiveBranch = pathname.startsWith("/education")
    ? "education"
    : "tourism";

  // Track scroll position for navbar background transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Brand-specific accent colors
  const accentColor =
    activeBranch === "tourism" ? "sky" : "kais";

  // Navigation links grouped by branch
  const navLinks = [
    { label: "Басты бет", href: "/", branch: undefined },
    { label: "Турлар", href: "/tourism", branch: "tourism" as const },
    { label: "Шетелде оқу", href: "/education", branch: "education" as const },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${
            scrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-glass-border shadow-2xl shadow-black/20"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* ── Logo / Brand ── */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${accentColor === "sky"
                    ? "bg-gradient-to-br from-sky-500 to-sky-600"
                    : "bg-gradient-to-br from-kais-500 to-kais-600"
                  }
                `}
              >
                {activeBranch === "tourism" ? (
                  <Plane className="w-5 h-5 text-white" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-white" />
                )}
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight">
                  Aysanii
                </span>
                <span className="text-[10px] text-foreground-muted leading-tight tracking-wider uppercase">
                  {activeBranch === "tourism"
                    ? "Sky Eagle"
                    : "Kais Exchange"}
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative px-4 py-2 rounded-lg text-sm font-medium
                      transition-colors duration-300
                      ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground-muted hover:text-foreground"
                      }
                    `}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className={`
                          absolute bottom-0 left-2 right-2 h-0.5 rounded-full
                          ${accentColor === "sky" ? "bg-sky-500" : "bg-kais-500"}
                        `}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Right Side: CTA + Contact ── */}
            <div className="hidden md:flex items-center gap-4">
              {/* Branch toggle pills */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-glass-bg border border-glass-border">
                <Link
                  href="/tourism"
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    transition-all duration-300
                    ${
                      activeBranch === "tourism"
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                        : "text-foreground-muted hover:text-foreground"
                    }
                  `}
                >
                  <Plane className="w-3.5 h-3.5" />
                  Туризм
                </Link>
                <Link
                  href="/education"
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    transition-all duration-300
                    ${
                      activeBranch === "education"
                        ? "bg-kais-500 text-white shadow-lg shadow-kais-500/30"
                        : "text-foreground-muted hover:text-foreground"
                    }
                  `}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Оқу
                </Link>
              </div>

              {/* Phone CTA */}
              <a
                href="tel:+77001234567"
                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">+7 700 123 45 67</span>
              </a>
            </div>

            {/* ── Mobile Menu Button ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-glass-bg transition-colors"
              aria-label="Мәзірді ашу"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Overlay ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-glass-border overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`
                          block px-4 py-3 rounded-xl text-base font-medium
                          transition-colors duration-300
                          ${
                            isActive
                              ? `${accentColor === "sky" ? "bg-sky-500/10 text-sky-400" : "bg-kais-500/10 text-kais-400"}`
                              : "text-foreground-muted hover:text-foreground hover:bg-glass-bg"
                          }
                        `}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile branch toggle */}
                <div className="pt-4 flex gap-2">
                  <Link
                    href="/tourism"
                    className={`
                      flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium
                      transition-all duration-300
                      ${
                        activeBranch === "tourism"
                          ? "bg-sky-500 text-white"
                          : "bg-glass-bg text-foreground-muted border border-glass-border"
                      }
                    `}
                  >
                    <Plane className="w-4 h-4" />
                    Туризм
                  </Link>
                  <Link
                    href="/education"
                    className={`
                      flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium
                      transition-all duration-300
                      ${
                        activeBranch === "education"
                          ? "bg-kais-500 text-white"
                          : "bg-glass-bg text-foreground-muted border border-glass-border"
                      }
                    `}
                  >
                    <GraduationCap className="w-4 h-4" />
                    Оқу
                  </Link>
                </div>

                {/* Phone */}
                <a
                  href="tel:+77001234567"
                  className="flex items-center gap-2 px-4 py-3 text-foreground-muted hover:text-foreground"
                >
                  <Phone className="w-4 h-4" />
                  +7 700 123 45 67
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-18 md:h-20" />
    </>
  );
}
