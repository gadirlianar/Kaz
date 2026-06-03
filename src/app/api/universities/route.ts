/* ============================================================
   AYSANII — Universities API Route
   Simulates a relational database connection with full filtering.
   Supports query params: country, faculty, priceRange, q (search)
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { universities } from "@/data/universities";
import { filterUniversities } from "@/lib/utils";
import type { UniversityFilters, PriceRange, UniversityCountry } from "@/lib/types";

/**
 * GET /api/universities
 * Fetches and filters universities from the simulated database.
 *
 * Query Parameters:
 * - country: "Малайзия" | "Италия" | "all"
 * - faculty: string (partial match)
 * - priceRange: "all" | "under-3000" | "3000-6000" | "6000-10000" | "over-10000"
 * - q: free-text search query
 */
export async function GET(request: NextRequest) {
  // Simulate database latency (300-600ms)
  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 300)
  );

  // Parse query parameters into filter state
  const searchParams = request.nextUrl.searchParams;
  const filters: UniversityFilters = {
    country: (searchParams.get("country") as UniversityCountry | "all") || "all",
    faculty: searchParams.get("faculty") || "",
    priceRange: (searchParams.get("priceRange") as PriceRange) || "all",
    searchQuery: searchParams.get("q") || "",
  };

  // Apply filters using the shared utility function
  const filtered = filterUniversities(universities, filters);

  return NextResponse.json({
    data: filtered,
    total: filtered.length,
    filters: {
      applied: filters,
      availableCountries: ["Малайзия", "Италия"],
      availableFaculties: [
        ...new Set(universities.flatMap((u) => u.faculties)),
      ].sort(),
    },
  });
}
