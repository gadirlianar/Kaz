/* ============================================================
   Testimonials — Customer reviews carousel
   Builds trust through social proof. SWOT mitigation.
   All reviews in Kazakh language.
   ============================================================ */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import AnimatedSection from "@/components/ui/AnimatedSection";

/**
 * Interactive testimonials carousel with star ratings,
 * customer details, and smooth slide animations.
 * Addresses SWOT weakness in financial transparency/trust.
 */
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const review = testimonials[current];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background orb */}
      <div className="orb orb-gold w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Кері{" "}
            <span className="gradient-text-gold">байланыс</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Клиенттеріміздің пікірлері — біздің жұмысымыздың ең жақсы бағасы
          </p>
        </AnimatedSection>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto">
          <div className="relative glass-card rounded-2xl p-8 sm:p-12 min-h-[320px] flex items-center">
            {/* Quote icon */}
            <div className="absolute top-6 right-8 text-glass-border">
              <Quote className="w-12 h-12" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={review.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-gold-400 fill-gold-400"
                          : "text-glass-border"
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-8">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder — colored circle with initials */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      review.branch === "tourism"
                        ? "bg-gradient-to-br from-sky-500 to-sky-600"
                        : "bg-gradient-to-br from-kais-500 to-kais-600"
                    }`}
                  >
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {review.name}
                    </p>
                    <p className="text-sm text-foreground-muted">
                      {review.destination}
                    </p>
                  </div>
                  {/* Branch badge */}
                  <div className="ml-auto hidden sm:block">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        review.branch === "tourism"
                          ? "bg-sky-500/15 text-sky-400"
                          : "bg-kais-500/15 text-kais-400"
                      }`}
                    >
                      {review.branch === "tourism"
                        ? "Sky Eagle"
                        : "Kais Exchange"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-all cursor-pointer"
              aria-label="Алдыңғы пікір"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-all cursor-pointer"
              aria-label="Келесі пікір"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
                  ${
                    i === current
                      ? "w-8 bg-gold-500"
                      : "bg-glass-border hover:bg-foreground-muted"
                  }
                `}
                aria-label={`Пікір ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
