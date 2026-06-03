/* ============================================================
   UniversityDatabase — Interactive filterable university grid
   Critical component: simulates relational database connection.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useUniversityFilter } from "@/hooks/useUniversityFilter";
import UniversityFiltersComponent from "./UniversityFilters";
import UniversityCard from "./UniversityCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

/**
 * Main interactive university database component.
 * Features:
 * - Sidebar filter panel (country, price, faculty, search)
 * - Responsive card grid displaying filtered results
 * - Loading skeleton states
 * - Empty state handling
 * - Fetches from /api/universities (simulated DB)
 */
export default function UniversityDatabase() {
  const {
    universities,
    total,
    isLoading,
    filters,
    availableFaculties,
    setFilter,
    resetFilters,
  } = useUniversityFilter();

  return (
    <section className="py-24" id="universities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16" direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Университеттер{" "}
            <span className="gradient-text-kais">базасы</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Малайзия мен Италияның үздік университеттерін зерттеңіз. Факультет,
            баға және ел бойынша сүзгілеңіз.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── Sidebar Filters ── */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <AnimatedSection direction="left">
                <UniversityFiltersComponent
                  filters={filters}
                  availableFaculties={availableFaculties}
                  onFilterChange={setFilter}
                  onReset={resetFilters}
                  total={total}
                />
              </AnimatedSection>
            </div>
          </div>

          {/* ── Results Grid ── */}
          <div className="lg:col-span-3">
            {isLoading ? (
              /* Skeleton loading state */
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-2xl overflow-hidden animate-pulse"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-glass-bg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-glass-bg rounded-lg w-1/2" />
                          <div className="h-4 bg-glass-bg rounded-lg w-1/3" />
                        </div>
                      </div>
                      <div className="h-4 bg-glass-bg rounded-lg w-full" />
                      <div className="h-4 bg-glass-bg rounded-lg w-3/4" />
                    </div>
                    <div className="px-6 py-4 border-t border-glass-border grid grid-cols-3 gap-4">
                      <div className="h-12 bg-glass-bg rounded-lg" />
                      <div className="h-12 bg-glass-bg rounded-lg" />
                      <div className="h-12 bg-glass-bg rounded-lg" />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center py-8 text-foreground-muted gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Деректер жүктелуде...
                </div>
              </div>
            ) : universities.length === 0 ? (
              /* Empty state */
              <div className="text-center py-20 glass-card rounded-2xl">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Университет табылмады
                </h3>
                <p className="text-foreground-muted mb-6">
                  Сүзгі параметрлерін өзгертіп көріңіз
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 rounded-xl bg-kais-500/10 text-kais-400 text-sm font-medium hover:bg-kais-500 hover:text-white transition-all cursor-pointer"
                >
                  Сүзгілерді тазалау
                </button>
              </div>
            ) : (
              /* Results */
              <motion.div layout className="space-y-6">
                {universities.map((uni, index) => (
                  <motion.div
                    key={uni.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <UniversityCard university={uni} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
