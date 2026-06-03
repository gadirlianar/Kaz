/* ============================================================
   AYSHAN — TypeScript Type Definitions
   Covers both Sky Eagle (Tourism) and Kais Exchange (Education)
   ============================================================ */

// ─── Education (Kais Exchange) ─────────────────────────────

/** Country options for the university database */
export type UniversityCountry = "Малайзия" | "Италия";

/** Full university entity matching the interactive database spec */
export interface University {
  id: string;
  /** University name (original language) */
  name: string;
  /** Country — Малайзия or Италия */
  country: UniversityCountry;
  /** City where the university is located */
  city: string;
  /** Available faculties — Факультеттер */
  faculties: string[];
  /** Available specialties — Мамандықтар */
  specialties: string[];
  /** Intake/admission dates — Қабылдау мерзімдері */
  intakeDates: string[];
  /** Study duration — Оқу жылы */
  duration: string;
  /** Application fee in USD — Өтінім ақысы */
  applicationFee: number;
  /** Annual study fee range — Оқу ақысы */
  studyFee: string;
  /** World/national ranking (optional) */
  ranking?: string;
  /** University logo path */
  logoUrl: string;
  /** Brief description of the university */
  description: string;
  /** Whether this university is featured/promoted */
  featured: boolean;
}

/** Filter state for the university database component */
export interface UniversityFilters {
  country: UniversityCountry | "all";
  faculty: string;
  priceRange: PriceRange;
  searchQuery: string;
}

/** Price range bracket for filtering */
export type PriceRange =
  | "all"
  | "under-3000"
  | "3000-6000"
  | "6000-10000"
  | "over-10000";

// ─── Tourism (Sky Eagle) ───────────────────────────────────

/** Tour type (domestic or international) */
export type TourType = "ішкі" | "халықаралық";

/** Service category within tourism */
export type TourCategory = "тур" | "билет" | "қонақ үй" | "трансфер";

/** Full tour/destination entity */
export interface Tour {
  id: string;
  /** Tour title */
  title: string;
  /** Destination name */
  destination: string;
  /** Country of destination */
  country: string;
  /** Domestic or international */
  type: TourType;
  /** Service category */
  category: TourCategory;
  /** Price in KZT */
  price: number;
  /** Currency code */
  currency: string;
  /** Duration (e.g., "7 күн / 6 түн") */
  duration: string;
  /** Full description */
  description: string;
  /** Cover image path */
  imageUrl: string;
  /** Customer rating (1-5) */
  rating: number;
  /** Whether this tour is promoted on the home page */
  featured: boolean;
}

/** Filter state for the tour search component */
export interface TourFilters {
  category: TourCategory | "all";
  type: TourType | "all";
  country: string;
  priceMin: number;
  priceMax: number;
  searchQuery: string;
}

// ─── Social Proof & Trust ──────────────────────────────────

/** Customer testimonial/review */
export interface Testimonial {
  id: string;
  /** Customer name */
  name: string;
  /** Customer avatar path */
  avatarUrl: string;
  /** Which branch they used */
  branch: "tourism" | "education";
  /** Star rating (1-5) */
  rating: number;
  /** Review text */
  text: string;
  /** Date of review */
  date: string;
  /** Destination or university they reviewed */
  destination: string;
}

/** Partner or university logo for the marquee */
export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  /** Type of partner */
  type: "university" | "airline" | "hotel" | "agency";
}

// ─── UI Component Props ────────────────────────────────────

/** Active branch in the dual-path hero */
export type ActiveBranch = "tourism" | "education";

/** Statistic counter data */
export interface StatItem {
  id: string;
  /** The numeric value to count up to */
  value: number;
  /** Suffix (e.g., "+", "%") */
  suffix: string;
  /** Label text in Kazakh */
  label: string;
  /** Icon name from Lucide */
  icon: string;
}

/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
  /** Optional: which branch this link belongs to */
  branch?: ActiveBranch;
}

/** Process step for application timeline */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}
