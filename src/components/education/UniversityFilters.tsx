/* ============================================================
   UniversityFilters — Filter sidebar for the university database
   Supports country, price range, faculty, and search.
   ============================================================ */

"use client";

import { Search, X, RotateCcw } from "lucide-react";
import FilterChip from "@/components/ui/FilterChip";
import Button from "@/components/ui/Button";
import type { UniversityFilters as FiltersType, PriceRange, UniversityCountry } from "@/lib/types";

interface UniversityFiltersProps {
  filters: FiltersType;
  availableFaculties: string[];
  onFilterChange: <K extends keyof FiltersType>(
    key: K,
    value: FiltersType[K]
  ) => void;
  onReset: () => void;
  total: number;
}

/** Price range options */
const priceRanges: Array<{ value: PriceRange; label: string }> = [
  { value: "all", label: "Барлық бағалар" },
  { value: "under-3000", label: "< $3,000" },
  { value: "3000-6000", label: "$3,000 – $6,000" },
  { value: "6000-10000", label: "$6,000 – $10,000" },
  { value: "over-10000", label: "> $10,000" },
];

/** Country options */
const countries: Array<{ value: UniversityCountry | "all"; label: string }> = [
  { value: "all", label: "Барлық елдер" },
  { value: "Малайзия", label: "🇲🇾 Малайзия" },
  { value: "Италия", label: "🇮🇹 Италия" },
];

/**
 * Filter panel for the university database.
 * Works with the useUniversityFilter hook.
 */
export default function UniversityFiltersComponent({
  filters,
  availableFaculties,
  onFilterChange,
  onReset,
  total,
}: UniversityFiltersProps) {
  const hasActiveFilters =
    filters.country !== "all" ||
    filters.faculty !== "" ||
    filters.priceRange !== "all" ||
    filters.searchQuery !== "";

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      {/* Search input */}
      <div>
        <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2 block">
          Іздеу
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            placeholder="Университет, мамандық..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-background border border-glass-border text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:border-kais-500/50 focus:ring-1 focus:ring-kais-500/20 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange("searchQuery", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Country filter */}
      <div>
        <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2 block">
          Ел
        </label>
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <FilterChip
              key={c.value}
              label={c.label}
              active={filters.country === c.value}
              onClick={() => onFilterChange("country", c.value)}
              activeColor="kais"
            />
          ))}
        </div>
      </div>

      {/* Price range filter */}
      <div>
        <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2 block">
          Оқу ақысы (жылдық)
        </label>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <FilterChip
              key={range.value}
              label={range.label}
              active={filters.priceRange === range.value}
              onClick={() => onFilterChange("priceRange", range.value)}
              activeColor="kais"
            />
          ))}
        </div>
      </div>

      {/* Faculty filter */}
      {availableFaculties.length > 0 && (
        <div>
          <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2 block">
            Факультет
          </label>
          <select
            value={filters.faculty}
            onChange={(e) => onFilterChange("faculty", e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-background border border-glass-border text-foreground text-sm focus:outline-none focus:border-kais-500/50 focus:ring-1 focus:ring-kais-500/20 transition-all cursor-pointer"
          >
            <option value="">Барлық факультеттер</option>
            {availableFaculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Results count + Reset */}
      <div className="pt-4 border-t border-glass-border flex items-center justify-between">
        <p className="text-sm text-foreground-muted">
          <span className="font-semibold text-foreground">{total}</span> университет
          табылды
        </p>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Тазалау
          </Button>
        )}
      </div>
    </div>
  );
}
