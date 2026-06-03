/* ============================================================
   TourSearch — Tour/flight/hotel search component
   Visually appealing search interface for Sky Eagle.
   ============================================================ */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import FilterChip from "@/components/ui/FilterChip";
import TourCard from "./TourCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Tour, TourCategory, TourType } from "@/lib/types";

/**
 * Full-featured tour search component with category/type filters,
 * free-text search, and a responsive card grid of results.
 */
export default function TourSearch() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<TourCategory | "all">("all");
  const [activeType, setActiveType] = useState<TourType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  /** Category options */
  const categories: Array<{ value: TourCategory | "all"; label: string }> = [
    { value: "all", label: "Барлығы" },
    { value: "тур", label: "🗺️ Турлар" },
    { value: "билет", label: "✈️ Билеттер" },
    { value: "қонақ үй", label: "🏨 Қонақ үйлер" },
    { value: "трансфер", label: "🚐 Трансфер" },
  ];

  /** Type options */
  const types: Array<{ value: TourType | "all"; label: string }> = [
    { value: "all", label: "Барлық түрлері" },
    { value: "ішкі", label: "🇰🇿 Ішкі" },
    { value: "халықаралық", label: "🌍 Халықаралық" },
  ];

  // Fetch tours when filters change
  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory !== "all") params.set("category", activeCategory);
        if (activeType !== "all") params.set("type", activeType);
        if (searchQuery) params.set("q", searchQuery);

        const res = await fetch(`/api/tours?${params.toString()}`);
        const json = await res.json();
        setTours(json.data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchTours, searchQuery ? 300 : 0);
    return () => clearTimeout(timer);
  }, [activeCategory, activeType, searchQuery]);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12" direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Тур{" "}
            <span className="gradient-text-sky">іздеу</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Армандаған демалысыңызды табыңыз — турлар, билеттер, қонақ үйлер мен трансфер
          </p>
        </AnimatedSection>

        {/* Search Bar */}
        <AnimatedSection direction="up" delay={0.1} className="mb-8">
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Бағытты, қонақ үйді немесе турды іздеңіз..."
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-background border border-glass-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter toggle (mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`
                  sm:hidden p-3.5 rounded-xl border transition-all cursor-pointer
                  ${
                    showFilters
                      ? "bg-sky-500/10 border-sky-500/30 text-sky-400"
                      : "bg-glass-bg border-glass-border text-foreground-muted"
                  }
                `}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Category filters */}
            <div className={`mt-4 space-y-3 ${showFilters ? "block" : "hidden sm:block"}`}>
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <FilterChip
                    key={cat.value}
                    label={cat.label}
                    active={activeCategory === cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    activeColor="sky"
                  />
                ))}
              </div>

              {/* Types */}
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <FilterChip
                    key={t.value}
                    label={t.label}
                    active={activeType === t.value}
                    onClick={() => setActiveType(t.value)}
                    activeColor="sky"
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-foreground-muted">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Іздеу жүріп жатыр...
              </span>
            ) : (
              <>
                <span className="font-semibold text-foreground">{tours.length}</span>{" "}
                нәтиже табылды
              </>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-glass-bg" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-glass-bg rounded-lg w-3/4" />
                  <div className="h-4 bg-glass-bg rounded-lg w-1/2" />
                  <div className="h-4 bg-glass-bg rounded-lg w-full" />
                  <div className="h-4 bg-glass-bg rounded-lg w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Нәтиже табылмады
            </h3>
            <p className="text-foreground-muted">
              Іздеу параметрлерін өзгертіп көріңіз
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
