/* ============================================================
   AYSHAN — Tours API Route
   Simulates database queries for tours, flights, hotels, transfers.
   Supports query params: category, type, country, priceMin, priceMax, q
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { tours } from "@/data/tours";
import { filterTours } from "@/lib/utils";
import type { TourFilters, TourCategory, TourType } from "@/lib/types";

/**
 * GET /api/tours
 * Fetches and filters tours from the simulated database.
 *
 * Query Parameters:
 * - category: "тур" | "билет" | "қонақ үй" | "трансфер" | "all"
 * - type: "ішкі" | "халықаралық" | "all"
 * - country: string (exact match)
 * - priceMin: number
 * - priceMax: number
 * - q: free-text search query
 */
export async function GET(request: NextRequest) {
  // Simulate database latency (200-500ms)
  await new Promise((resolve) =>
    setTimeout(resolve, 200 + Math.random() * 300)
  );

  // Parse query parameters into filter state
  const searchParams = request.nextUrl.searchParams;
  const filters: TourFilters = {
    category: (searchParams.get("category") as TourCategory | "all") || "all",
    type: (searchParams.get("type") as TourType | "all") || "all",
    country: searchParams.get("country") || "",
    priceMin: parseInt(searchParams.get("priceMin") || "0", 10),
    priceMax: parseInt(searchParams.get("priceMax") || "9999999", 10),
    searchQuery: searchParams.get("q") || "",
  };

  // Apply filters
  const filtered = filterTours(tours, filters);

  return NextResponse.json({
    data: filtered,
    total: filtered.length,
    filters: {
      applied: filters,
      availableCountries: [...new Set(tours.map((t) => t.country))].sort(),
      availableCategories: ["тур", "билет", "қонақ үй", "трансфер"],
    },
  });
}
