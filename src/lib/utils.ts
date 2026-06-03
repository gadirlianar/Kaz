/* ============================================================
   AYSHAN — Utility Functions
   Shared helpers for formatting, filtering, and data transforms
   ============================================================ */

import type { University, UniversityFilters, Tour, TourFilters, PriceRange } from "./types";

/**
 * Formats a number as a currency string.
 * Uses Kazakh locale conventions.
 * @example formatCurrency(150000, "KZT") → "150 000 ₸"
 */
export function formatCurrency(amount: number, currency: string = "KZT"): string {
  if (currency === "KZT") {
    return `${amount.toLocaleString("kk-KZ")} ₸`;
  }
  if (currency === "USD") {
    return `$${amount.toLocaleString("en-US")}`;
  }
  return `${amount.toLocaleString()} ${currency}`;
}

/**
 * Extracts the minimum numeric fee from a university's studyFee string.
 * Used for price-range filtering.
 * @example extractMinFee("$3,000 - $8,000/жыл") → 3000
 */
export function extractMinFee(studyFee: string): number {
  const match = studyFee.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10);
}

/**
 * Checks whether a university falls within the given price range.
 */
function matchesPriceRange(fee: string, range: PriceRange): boolean {
  if (range === "all") return true;
  const minFee = extractMinFee(fee);
  switch (range) {
    case "under-3000":
      return minFee < 3000;
    case "3000-6000":
      return minFee >= 3000 && minFee <= 6000;
    case "6000-10000":
      return minFee > 6000 && minFee <= 10000;
    case "over-10000":
      return minFee > 10000;
    default:
      return true;
  }
}

/**
 * Filters a list of universities based on the active filter state.
 * Supports country, faculty, price range, and free-text search.
 */
export function filterUniversities(
  universities: University[],
  filters: UniversityFilters
): University[] {
  return universities.filter((uni) => {
    // Country filter
    if (filters.country !== "all" && uni.country !== filters.country) {
      return false;
    }

    // Faculty filter
    if (
      filters.faculty &&
      !uni.faculties.some((f) =>
        f.toLowerCase().includes(filters.faculty.toLowerCase())
      )
    ) {
      return false;
    }

    // Price range filter
    if (!matchesPriceRange(uni.studyFee, filters.priceRange)) {
      return false;
    }

    // Free-text search (matches name, city, specialties)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchable = [
        uni.name,
        uni.city,
        uni.country,
        ...uni.specialties,
        ...uni.faculties,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Filters a list of tours based on the active filter state.
 */
export function filterTours(tours: Tour[], filters: TourFilters): Tour[] {
  return tours.filter((tour) => {
    // Category filter
    if (filters.category !== "all" && tour.category !== filters.category) {
      return false;
    }

    // Type filter (domestic/international)
    if (filters.type !== "all" && tour.type !== filters.type) {
      return false;
    }

    // Country filter
    if (filters.country && tour.country !== filters.country) {
      return false;
    }

    // Price range
    if (tour.price < filters.priceMin || tour.price > filters.priceMax) {
      return false;
    }

    // Free-text search
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchable = [
        tour.title,
        tour.destination,
        tour.country,
        tour.description,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Collects all unique faculties from a list of universities.
 * Used to populate the faculty filter dropdown.
 */
export function getUniqueFaculties(universities: University[]): string[] {
  const faculties = new Set<string>();
  universities.forEach((uni) => {
    uni.faculties.forEach((f) => faculties.add(f));
  });
  return Array.from(faculties).sort();
}

/**
 * Collects all unique countries from a list of tours.
 */
export function getUniqueCountries(tours: Tour[]): string[] {
  const countries = new Set<string>();
  tours.forEach((tour) => countries.add(tour.country));
  return Array.from(countries).sort();
}

/**
 * Generates star rating display.
 * Returns array of "full" | "half" | "empty" for 5 stars.
 */
export function getStarRating(
  rating: number
): Array<"full" | "half" | "empty"> {
  const stars: Array<"full" | "half" | "empty"> = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push("full");
    } else if (rating >= i - 0.5) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }
  return stars;
}

/**
 * Truncates text to a given length and appends "..." if needed.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Creates a URL-friendly slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Clamps a value between a min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
