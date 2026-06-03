/* ============================================================
   useUniversityFilter — Custom hook for university filtering
   Manages filter state and fetches from the simulated API.
   ============================================================ */

"use client";

import { useState, useEffect, useCallback } from "react";
import type { University, UniversityFilters, PriceRange, UniversityCountry } from "@/lib/types";

interface UseUniversityFilterReturn {
  /** Filtered universities from the API */
  universities: University[];
  /** Total count of filtered results */
  total: number;
  /** Whether the API is currently loading */
  isLoading: boolean;
  /** Current filter state */
  filters: UniversityFilters;
  /** Available faculties for the filter dropdown */
  availableFaculties: string[];
  /** Update a single filter field */
  setFilter: <K extends keyof UniversityFilters>(
    key: K,
    value: UniversityFilters[K]
  ) => void;
  /** Reset all filters to defaults */
  resetFilters: () => void;
}

const DEFAULT_FILTERS: UniversityFilters = {
  country: "all",
  faculty: "",
  priceRange: "all",
  searchQuery: "",
};

/**
 * Hook that manages the university database filtering state
 * and syncs with the /api/universities endpoint.
 */
export function useUniversityFilter(): UseUniversityFilterReturn {
  const [universities, setUniversities] = useState<University[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<UniversityFilters>(DEFAULT_FILTERS);
  const [availableFaculties, setAvailableFaculties] = useState<string[]>([]);

  // Fetch universities whenever filters change
  const fetchUniversities = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.country !== "all") params.set("country", filters.country);
      if (filters.faculty) params.set("faculty", filters.faculty);
      if (filters.priceRange !== "all")
        params.set("priceRange", filters.priceRange);
      if (filters.searchQuery) params.set("q", filters.searchQuery);

      const res = await fetch(`/api/universities?${params.toString()}`);
      const json = await res.json();

      setUniversities(json.data);
      setTotal(json.total);
      setAvailableFaculties(json.filters.availableFaculties);
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // Debounce search queries to avoid flooding the API
    const timer = setTimeout(() => {
      fetchUniversities();
    }, filters.searchQuery ? 300 : 0);

    return () => clearTimeout(timer);
  }, [fetchUniversities, filters.searchQuery]);

  // Update a single filter key
  const setFilter = useCallback(
    <K extends keyof UniversityFilters>(
      key: K,
      value: UniversityFilters[K]
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Reset all filters to defaults
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    universities,
    total,
    isLoading,
    filters,
    availableFaculties,
    setFilter,
    resetFilters,
  };
}
